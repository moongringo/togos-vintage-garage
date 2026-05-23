const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";
const dataDir = path.join(root, "data");
const dataFile = path.join(dataDir, "site-data.json");
const authFile = path.join(dataDir, "auth-data.json");
const maxBodySize = 1024 * 1024;
const sessions = new Map();

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png"
};

const defaultData = {
  vehicleComments: [],
  profileNotifications: [],
  profileStatusTags: {},
  helpPings: [],
  routeMarkers: [],
  garageMembers: [],
  chatMessages: {},
  memberStatuses: {},
  privateChats: [],
  chatInvites: [],
  friendLinks: [],
  garageChallenges: [],
  challengeInvites: [],
  privateChatReads: {},
  feedReactions: {},
  profilePosts: []
};

const defaultAuthData = {
  users: []
};

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2));
  }

  if (!fs.existsSync(authFile)) {
    fs.writeFileSync(authFile, JSON.stringify(defaultAuthData, null, 2));
  }
}

function readSiteData() {
  ensureDataFile();

  try {
    const parsed = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    return { ...defaultData, ...parsed };
  } catch {
    return { ...defaultData };
  }
}

function writeSiteData(data) {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function readAuthData() {
  ensureDataFile();

  try {
    const parsed = JSON.parse(fs.readFileSync(authFile, "utf8"));
    return { ...defaultAuthData, ...parsed };
  } catch {
    return { ...defaultAuthData };
  }
}

function writeAuthData(data) {
  ensureDataFile();
  fs.writeFileSync(authFile, JSON.stringify(data, null, 2));
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": types[".json"],
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBodySize) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function removeExpiredPings(data) {
  const now = Date.now();
  data.helpPings = (data.helpPings || []).filter((ping) => !ping.expiresAt || ping.expiresAt > now);
  return data;
}

function makeSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `member-${Date.now()}`;
}

function initialsFromName(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "TV";
}

function splitList(value, fallback) {
  return String(value || fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 210000, 64, "sha512").toString("hex");
  return { salt, hash };
}

function timingSafeEqualHex(a, b) {
  const left = Buffer.from(String(a), "hex");
  const right = Buffer.from(String(b), "hex");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function verifyPassword(password, user) {
  const candidate = hashPassword(password, user.passwordSalt);
  return timingSafeEqualHex(candidate.hash, user.passwordHash);
}

function makeToken(memberId) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { memberId, createdAt: Date.now() });
  return token;
}

function getSessionMember(request) {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const session = sessions.get(token);
  if (!session) {
    return null;
  }
  const data = readSiteData();
  return data.garageMembers.find((member) => member.id === session.memberId) || null;
}

function makePublicMember(payload) {
  const name = String(payload.name || "").trim();
  const vehicle = String(payload.vehicle || "").trim();
  return {
    id: `${makeSlug(name)}-${Date.now()}`,
    name,
    initials: initialsFromName(name),
    location: String(payload.location || "").trim(),
    status: String(payload.status || "").trim() || "In the workshop",
    intro: "New garage member ready to meet people, share progress, and keep old machines moving.",
    vehicles: [vehicle],
    skills: splitList(payload.skills, "Beginner friendly"),
    tools: splitList(payload.tools, "Basic tools"),
    helps: splitList(payload.helps, "Learning together"),
    build: "New member garage setup",
    maintenance: "First maintenance log pending",
    route: "Local shakedown route",
    story: "New profile created at Togos Vintage Garage.",
    qrCode: `tvg:${makeSlug(name)}`,
    friends: [],
    createdAt: Date.now()
  };
}

function sanitizeMember(member) {
  return member ? { ...member } : null;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/auth/register" && request.method === "POST") {
    readRequestBody(request).then((body) => {
      const payload = body ? JSON.parse(body) : {};
      const name = String(payload.name || "").trim();
      const password = String(payload.password || "");
      const vehicle = String(payload.vehicle || "").trim();

      if (!name || !vehicle || password.length < 8) {
        sendJson(response, 400, { error: "Name, vehicle, and an 8+ character password are required." });
        return;
      }

      const authData = readAuthData();
      if (authData.users.some((user) => user.name.toLowerCase() === name.toLowerCase())) {
        sendJson(response, 409, { error: "A profile with that name already exists. Login instead." });
        return;
      }

      const data = readSiteData();
      let member = data.garageMembers.find((item) => item.name.toLowerCase() === name.toLowerCase());
      if (member) {
        member.location = String(payload.location || member.location || "").trim();
        member.status = String(payload.status || member.status || "In the workshop").trim();
        member.vehicles = [vehicle];
        member.skills = splitList(payload.skills, member.skills?.join(", ") || "Beginner friendly");
        member.tools = splitList(payload.tools, member.tools?.join(", ") || "Basic tools");
        member.helps = splitList(payload.helps, member.helps?.join(", ") || "Learning together");
        member.qrCode = member.qrCode || `tvg:${makeSlug(member.name)}`;
      } else {
        member = makePublicMember(payload);
        data.garageMembers.unshift(member);
      }
      const passwordRecord = hashPassword(password);
      authData.users.push({
        memberId: member.id,
        name,
        passwordSalt: passwordRecord.salt,
        passwordHash: passwordRecord.hash,
        createdAt: Date.now()
      });
      writeAuthData(authData);
      writeSiteData(data);
      sendJson(response, 200, { token: makeToken(member.id), member: sanitizeMember(member) });
    }).catch(() => sendJson(response, 400, { error: "Invalid register request." }));
    return;
  }

  if (url.pathname === "/api/auth/login" && request.method === "POST") {
    readRequestBody(request).then((body) => {
      const payload = body ? JSON.parse(body) : {};
      const name = String(payload.name || "").trim();
      const password = String(payload.password || "");
      const authData = readAuthData();
      const user = authData.users.find((item) => item.name.toLowerCase() === name.toLowerCase());

      if (!user || !verifyPassword(password, user)) {
        sendJson(response, 401, { error: "Profile name or password is wrong." });
        return;
      }

      const data = readSiteData();
      const member = data.garageMembers.find((item) => item.id === user.memberId);
      if (!member) {
        sendJson(response, 404, { error: "Profile data was not found." });
        return;
      }

      sendJson(response, 200, { token: makeToken(member.id), member: sanitizeMember(member) });
    }).catch(() => sendJson(response, 400, { error: "Invalid login request." }));
    return;
  }

  if (url.pathname === "/api/auth/me" && request.method === "GET") {
    const member = getSessionMember(request);
    if (!member) {
      sendJson(response, 401, { error: "Not logged in." });
      return;
    }
    sendJson(response, 200, { member: sanitizeMember(member) });
    return;
  }

  if (url.pathname === "/api/profile/update" && request.method === "POST") {
    const sessionMember = getSessionMember(request);
    if (!sessionMember) {
      sendJson(response, 401, { error: "Login required." });
      return;
    }

    readRequestBody(request).then((body) => {
      const payload = body ? JSON.parse(body) : {};
      const data = readSiteData();
      const member = data.garageMembers.find((item) => item.id === sessionMember.id);
      if (!member) {
        sendJson(response, 404, { error: "Profile not found." });
        return;
      }

      ["location", "status", "intro", "build", "maintenance", "route", "story", "photoUrl"].forEach((field) => {
        if (payload[field] !== undefined) {
          member[field] = String(payload[field]).trim();
        }
      });
      ["vehicles", "skills", "tools", "helps", "friends"].forEach((field) => {
        if (Array.isArray(payload[field])) {
          member[field] = payload[field].map((item) => String(item).trim()).filter(Boolean).slice(0, 12);
        }
      });
      writeSiteData(data);
      sendJson(response, 200, { member: sanitizeMember(member) });
    }).catch(() => sendJson(response, 400, { error: "Invalid profile update." }));
    return;
  }

  if (url.pathname === "/api/site-data") {
    if (request.method === "GET") {
      const data = removeExpiredPings(readSiteData());
      writeSiteData(data);
      sendJson(response, 200, data);
      return;
    }

    if (request.method === "POST") {
      readRequestBody(request).then((body) => {
        const payload = body ? JSON.parse(body) : {};
        const protectedSections = new Set(["garageMembers"]);
        const allowedSections = Object.keys(defaultData);
        const data = removeExpiredPings(readSiteData());

        if (payload.sections && typeof payload.sections === "object" && !Array.isArray(payload.sections)) {
          const entries = Object.entries(payload.sections);
          const hasUnknownSection = entries.some(([section]) => !allowedSections.includes(section) || protectedSections.has(section));

          if (hasUnknownSection) {
            sendJson(response, 400, { error: "Unknown data section" });
            return;
          }

          entries.forEach(([section, value]) => {
            data[section] = value;
          });
          removeExpiredPings(data);
          writeSiteData(data);
          sendJson(response, 200, data);
          return;
        }

        if (!allowedSections.includes(payload.section) || protectedSections.has(payload.section)) {
          sendJson(response, 400, { error: "Unknown data section" });
          return;
        }

        data[payload.section] = payload.value;
        removeExpiredPings(data);
        writeSiteData(data);
        sendJson(response, 200, data);
      }).catch(() => {
        sendJson(response, 400, { error: "Invalid JSON body" });
      });
      return;
    }

    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  const cleanPath = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
  const requested = cleanPath || "index.html";
  const filePath = path.resolve(root, requested);
  const relativePath = path.relative(root, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Togos Vintage Garage is running at http://${host}:${port}`);
  console.log("From another PC, open http://YOUR-COMPUTER-LAN-IP:" + port);
});
