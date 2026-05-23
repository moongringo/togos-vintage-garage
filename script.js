const header = document.querySelector(".site-header");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const messages = document.querySelector("#messages");
const onlineCount = document.querySelector("#online-count");
const roomButtons = [...document.querySelectorAll(".room-button")];
const roomCount = document.querySelector("#room-count");
const activeRoomName = document.querySelector("#active-room-name");
const activeRoomBlurb = document.querySelector("#active-room-blurb");
const roomPrivacy = document.querySelector("#room-privacy");
const onlineList = document.querySelector("#online-list");
const typingNote = document.querySelector("#typing-note");
const photoReplyButton = document.querySelector("#photo-reply");
const myStatus = document.querySelector("#my-status");
const statusChoices = [...document.querySelectorAll(".status-choice")];
const customStatusForm = document.querySelector("#custom-status-form");
const customStatusInput = document.querySelector("#custom-status-input");
const threadButtons = [...document.querySelectorAll(".thread")];
const threadDetail = document.querySelector("#thread-detail");
const cartCount = document.querySelector("#cart-count");
const actionNote = document.querySelector("#action-note");
const checklistProgress = document.querySelector("#checklist-progress");
const startChecks = [...document.querySelectorAll(".start-check")];
const challengeButton = document.querySelector("#join-challenge");
const challengeCount = document.querySelector("#challenge-count");
const voteResult = document.querySelector("#vote-result");
const voteButtons = [...document.querySelectorAll("[data-vote]")];
const hubNote = document.querySelector("#hub-note");

const chatRooms = [
  {
    name: "Shop Talk",
    privacy: "Private group",
    blurb: "Quick repair questions, tool tips, and bench stories.",
    placeholder: "Message Shop Talk",
    typing: "Arne is typing about carb sync.",
    members: [
      ["Arne", "Tuning carbs", "online"],
      ["Mia", "Packing tools", "online"],
      ["Leif", "Reading manuals", "away"],
      ["Togos Garage", "In the workshop", "online"]
    ],
    messages: [
      ["AR", "Arne", "Anyone know a good carb sync trick for an old twin?", "09:41"],
      ["TG", "Togos Garage", "Bring it to Saturday coffee. I have gauges and patience.", "09:44", true],
      ["MS", "Mia", "Sunday route is dry if we take the lake road before noon.", "09:48"],
      ["LF", "Leif", "Is this plug color too lean or about right?", "10:03", false, { type: "photo", title: "Photo reply", caption: "Spark plug close-up for tuning advice" }]
    ]
  },
  {
    name: "Ride Plans",
    privacy: "Private group",
    blurb: "Coffee runs, route notes, weather calls, and meetup times.",
    placeholder: "Share a ride plan",
    typing: "Mia is checking the weekend weather.",
    members: [
      ["Mia", "Route scout", "online"],
      ["Jon", "Fuel stop finder", "online"],
      ["Togos Garage", "In the workshop", "online"]
    ],
    messages: [
      ["MS", "Mia", "Lake road first, ferry road back, coffee at 11?", "08:15"],
      ["JN", "Jon", "Works for me. I can mark the fuel stops.", "08:19"],
      ["TG", "Togos Garage", "Keep it relaxed so the older bikes can breathe.", "08:26", true],
      ["SYS", "Ride reminder", "Back-road photo run starts Jun 21 at 09:30. Bring fuel, rain shell, and a charged phone.", "08:30", false, { type: "reminder", title: "Event reminder" }]
    ]
  },
  {
    name: "Parts Swap",
    privacy: "Private group",
    blurb: "Wanted posts, spare parts, fair prices, and local pickups.",
    placeholder: "Ask for a part or post a spare",
    typing: "Leif is uploading a photo of trim pieces.",
    members: [
      ["Leif", "Sorting chrome trim", "online"],
      ["Sofia", "Looking for mirrors", "away"],
      ["Togos Garage", "Looking for parts", "online"]
    ],
    messages: [
      ["LF", "Leif", "I have two cable sleeves that might fit a mid-70s twin.", "10:02"],
      ["SF", "Sofia", "Can you post the length and end fittings?", "10:04"],
      ["TG", "Togos Garage", "A photo beside a ruler would help everyone.", "10:05", true],
      ["SF", "Sofia", "What is this bracket from? Found it in a box of mixed trim.", "10:12", false, { type: "photo", title: "What is this piece?", caption: "Small stamped bracket with two offset holes" }]
    ]
  },
  {
    name: "Build Logs",
    privacy: "Private group",
    blurb: "Restoration journals, photos, milestones, and moral support.",
    placeholder: "Post a build update",
    typing: "Jon is writing a paint prep checklist.",
    members: [
      ["Jon", "Paint prep", "online"],
      ["Arne", "First-start nerves", "away"],
      ["Nora", "Interior trim", "online"],
      ["Togos Garage", "In the workshop", "online"]
    ],
    messages: [
      ["NR", "Nora", "New rule: every build log needs one ugly before photo.", "12:31"],
      ["JN", "Jon", "And one honest budget note. Future owners will thank us.", "12:36"],
      ["TG", "Togos Garage", "I vote for a weekly milestone, even if it is tiny.", "12:40", true],
      ["NR", "Nora", "Progress photo: seat pan is finally straight and ready for upholstery.", "12:46", false, { type: "photo", title: "Restoration progress", caption: "Before-and-after seat pan alignment" }]
    ]
  },
  {
    name: "Emergency Help",
    privacy: "Priority room",
    blurb: "Breakdowns, trailer help, roadside tools, and urgent local support.",
    placeholder: "Ask for urgent help",
    typing: "Jon is checking who has a trailer free.",
    members: [
      ["Jon", "Trailer available", "online"],
      ["Mia", "Tool roll packed", "online"],
      ["Arne", "Away from phone", "away"],
      ["Togos Garage", "In the workshop", "online"]
    ],
    messages: [
      ["JN", "Jon", "If anyone breaks down north of town, I can tow after 16:00.", "13:02"],
      ["MS", "Mia", "I have jump leads, fuses, and a spare fuel can in the car.", "13:05"],
      ["TG", "Togos Garage", "Pin location, machine type, and what happened. Someone will know the next move.", "13:08", true],
      ["SYS", "Help format", "Post: location, bike/car, symptom, tools needed, and whether you need a trailer.", "13:09", false, { type: "reminder", title: "Emergency checklist" }]
    ]
  }
];

const threads = [
  {
    tag: "Restoration",
    title: "How would you approach a winter rebuild?",
    body: "Start with a shared project log: photos, parts numbers, budget, and one small milestone per week. It gives people a reason to follow along and offer useful advice.",
    reply: "Make the first post about the story behind the machine."
  },
  {
    tag: "Parts",
    title: "Good sources for chrome trim and cable sleeves",
    body: "Create a trusted supplier list with notes from members: shipping speed, fit accuracy, return experience, and whether the part needed finishing.",
    reply: "Ask members to add one photo of the part installed."
  },
  {
    tag: "Events",
    title: "Best first spring meetup route?",
    body: "Choose a relaxed route with fuel stops, easy pull-offs, and a fallback cafe. Classic machines make better memories when nobody feels rushed.",
    reply: "Post a GPX link and a short safety note before the ride."
  }
];

const ideaActions = {
  route: "Next step: add a simple form for start point, cafe stop, distance, road type, and who is riding.",
  parts: "Next step: collect part name, condition, fitment, location, photos, and swap-or-sell preference.",
  journal: "Next step: make a timeline with before photos, current issue, parts ordered, and this week's goal.",
  mentor: "Next step: match people by skill, location, preferred machines, and what kind of help they enjoy giving."
};

let activeRoom = 0;
let cartItems = 0;
let photoMode = false;
let challengeJoined = false;
let challengeMembers = 18;
const seedRoomMessages = chatRooms.map((room) => room.messages.map((message) => [...message]));

function getChatMember() {
  const member = window.togosAuth?.getCurrentMember?.();
  return {
    name: member?.name || "You",
    initials: member?.initials || "YOU"
  };
}

function readSharedChatMessages() {
  return window.togosData?.get("chatMessages") || {};
}

function readSharedStatuses() {
  return window.togosData?.get("memberStatuses") || {};
}

async function readServerSection(section, fallback) {
  try {
    const response = await fetch("/api/site-data", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Shared data unavailable");
    }
    const data = await response.json();
    return data[section] ?? fallback;
  } catch {
    return fallback;
  }
}

async function saveSharedChatMessage(room, message) {
  if (!window.togosData) {
    return Promise.resolve();
  }

  await window.togosData.ready;
  const sharedMessages = await readServerSection("chatMessages", readSharedChatMessages());
  sharedMessages[room.name] = [...(sharedMessages[room.name] || []), message].slice(-80);
  return window.togosData.save("chatMessages", sharedMessages);
}

async function saveSharedStatus(memberName, status) {
  if (!window.togosData) {
    return;
  }

  await window.togosData.ready;
  const statuses = await readServerSection("memberStatuses", readSharedStatuses());
  statuses[memberName] = status;
  window.togosData.save("memberStatuses", statuses);
}

function applySharedChatState() {
  const sharedMessages = readSharedChatMessages();
  const statuses = readSharedStatuses();

  chatRooms.forEach((room, index) => {
    room.messages = [
      ...seedRoomMessages[index].map((message) => [...message]),
      ...(sharedMessages[room.name] || [])
    ];
    room.members.forEach((member) => {
      if (statuses[member[0]]) {
        member[1] = statuses[member[0]];
      }
    });
  });

  const currentMember = getChatMember();
  if (statuses[currentMember.name]) {
    myStatus.textContent = statuses[currentMember.name];
  }
}

function createMessage([initials, name, text, time, mine = false, extra = null]) {
  const message = document.createElement("article");
  message.className = `message${mine ? " mine" : ""}`;

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = initials;

  const body = document.createElement("div");
  const author = document.createElement("strong");
  author.textContent = name;
  const timestamp = document.createElement("small");
  timestamp.textContent = time;
  const copy = document.createElement("p");
  copy.textContent = text;

  body.append(author, timestamp, copy);

  if (extra?.type === "photo") {
    const attachment = document.createElement("div");
    attachment.className = "message-attachment";
    attachment.innerHTML = `
      <span class="photo-swatch" aria-hidden="true"></span>
      <span>
        <strong>${extra.title}</strong>
        <small>${extra.caption}</small>
      </span>
    `;
    body.append(attachment);
  }

  if (extra?.type === "reminder") {
    const reminder = document.createElement("div");
    reminder.className = "message-reminder";
    reminder.innerHTML = `<strong>${extra.title}</strong><small>${text}</small>`;
    copy.remove();
    body.append(reminder);
  }

  message.append(avatar, body);
  return message;
}

function renderMembers(room) {
  onlineList.innerHTML = "";

  room.members.forEach(([name, status, presence]) => {
    const person = document.createElement("article");
    person.className = `online-person${presence === "away" ? " away" : ""}`;
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    person.innerHTML = `
      <span class="avatar">${initials}</span>
      <span>
        <strong>${name}</strong>
        <small>${status}</small>
      </span>
    `;
    onlineList.append(person);
  });
}

function renderRoom(index) {
  activeRoom = index;
  const room = chatRooms[index];
  const onlineMembers = room.members.filter((member) => member[2] === "online").length;

  activeRoomName.textContent = room.name;
  activeRoomBlurb.textContent = room.blurb;
  roomPrivacy.textContent = room.privacy;
  onlineCount.textContent = `${onlineMembers} online`;
  chatInput.placeholder = room.placeholder;
  typingNote.textContent = room.typing;
  roomCount.textContent = `${chatRooms.length} rooms`;

  roomButtons.forEach((button) => {
    const roomIndex = Number(button.dataset.room);
    const isActive = roomIndex === index;
    button.classList.toggle("active", isActive);
    button.querySelector("em").textContent = chatRooms[roomIndex].members.length;
  });

  messages.innerHTML = "";
  room.messages.forEach((message) => messages.append(createMessage(message)));
  messages.scrollTop = messages.scrollHeight;
  renderMembers(room);
}

window.addEventListener("scroll", () => {
  header.dataset.elevated = window.scrollY > 18 ? "true" : "false";
});

roomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderRoom(Number(button.dataset.room));
  });
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();

  if (!text) {
    return;
  }

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const attachment = photoMode
    ? { type: "photo", title: "Photo reply", caption: "Shared preview attachment for parts, progress, or mystery pieces" }
    : null;
  const author = getChatMember();
  const message = [author.initials, author.name, text, time, true, attachment];
  chatRooms[activeRoom].messages.push(message);
  messages.append(createMessage(message));
  messages.scrollTop = messages.scrollHeight;
  chatInput.value = "";
  photoMode = false;
  photoReplyButton.setAttribute("aria-pressed", "false");
  photoReplyButton.textContent = "Photo";
  typingNote.textContent = "Saving message to the shared group chat...";
  await saveSharedChatMessage(chatRooms[activeRoom], message);
  typingNote.textContent = "Message posted to the shared group chat.";
});

photoReplyButton.addEventListener("click", () => {
  photoMode = !photoMode;
  photoReplyButton.setAttribute("aria-pressed", String(photoMode));
  photoReplyButton.textContent = photoMode ? "Photo on" : "Photo";
  typingNote.textContent = photoMode
    ? "Photo reply mode is on. Your next message will include a preview card."
    : chatRooms[activeRoom].typing;
});

statusChoices.forEach((button) => {
  button.addEventListener("click", () => {
    statusChoices.forEach((choice) => choice.classList.remove("active"));
    button.classList.add("active");
    setTogosStatus(button.dataset.status);
  });
});

customStatusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = customStatusInput.value.trim();

  if (!status) {
    return;
  }

  statusChoices.forEach((choice) => choice.classList.remove("active"));
  setTogosStatus(status);
  customStatusInput.value = "";
});

function setTogosStatus(status) {
  const currentMember = getChatMember();
  myStatus.textContent = status;
  chatRooms.forEach((room) => {
    const existing = room.members.find((member) => member[0] === currentMember.name);
    if (existing) {
      existing[1] = status;
    } else {
      room.members.push([currentMember.name, status, "online"]);
    }
  });
  saveSharedStatus(currentMember.name, status);
  renderMembers(chatRooms[activeRoom]);
}

threadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.thread);
    const thread = threads[index];

    threadButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    threadDetail.innerHTML = `
      <span class="thread-tag">${thread.tag}</span>
      <h3>${thread.title}</h3>
      <p>${thread.body}</p>
      <div class="reply-row">
        <span>Top reply</span>
        <strong>${thread.reply}</strong>
      </div>
    `;
  });
});

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = `${cartItems} ${cartItems === 1 ? "item" : "items"}`;
    button.textContent = "Added";
    setTimeout(() => {
      button.textContent = "Add";
    }, 1100);
  });
});

document.querySelectorAll(".rsvp").forEach((button) => {
  button.addEventListener("click", () => {
    const joined = button.classList.toggle("is-in");
    button.textContent = joined ? "Going" : "RSVP";
  });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    actionNote.textContent = ideaActions[button.dataset.action];
  });
});

startChecks.forEach((check) => {
  check.addEventListener("change", () => {
    const done = startChecks.filter((item) => item.checked).length;
    checklistProgress.textContent = `${done}/${startChecks.length} done`;
  });
});

if (challengeButton) {
  challengeButton.addEventListener("click", () => {
    challengeJoined = !challengeJoined;
    challengeMembers += challengeJoined ? 1 : -1;
    challengeCount.textContent = `${challengeMembers} joined`;
    challengeButton.textContent = challengeJoined ? "Joined" : "Join challenge";
  });
}

voteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    voteButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    voteResult.textContent = `${button.dataset.vote} leads`;
  });
});

  document.querySelectorAll("[data-hub-note]").forEach((button) => {
  button.addEventListener("click", () => {
    hubNote.textContent = button.dataset.hubNote;
  });
});

window.addEventListener("togos-data-ready", () => {
  applySharedChatState();
  renderRoom(activeRoom);
});

window.addEventListener("togos-auth-change", () => {
  renderRoom(activeRoom);
});

setInterval(async () => {
  if (document.activeElement === chatInput) {
    return;
  }
  await window.togosData?.refresh?.();
  applySharedChatState();
  renderRoom(activeRoom);
}, 2500);

renderRoom(0);
