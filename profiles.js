const memberList = document.querySelector("#member-list");
const profileDetail = document.querySelector("#profile-detail");
const profileChatSidebar = document.querySelector("#profile-chat-sidebar");
const profileSearch = document.querySelector("#profile-search");
const profileFilters = [...document.querySelectorAll(".profile-filter")];
const profileCount = document.querySelector("#profile-count");

let members = [
  {
    name: "Togos Garage",
    initials: "TG",
    location: "Oslo East",
    status: "In the workshop",
    intro: "Patient troubleshooting, first-start checks, and old-engine optimism.",
    vehicles: ["1950s green coupe", "1960s twin motorcycle"],
    skills: ["Carb tuning", "First starts", "Route planning", "Beginner friendly"],
    tools: ["Timing light", "Compression tester", "Metric tools", "Trailer access"],
    helps: ["First-start checks", "Carb sync", "Finding sensible routes", "Calm second opinions"],
    build: "Winter tune-up and chrome trim hunt",
    maintenance: "Oil done, valves due next month, tires need sidewall inspection",
    route: "Harbor coffee loop",
    story: "Best road trip: an unplanned lake-road detour after fixing a loose ground wire."
  },
  {
    name: "Arne M.",
    initials: "AR",
    location: "Oslo North",
    status: "Tuning carbs",
    intro: "Loves old twins, clean wiring, and methodical repair notes.",
    vehicles: ["1974 Honda CB550", "1968 Volvo Amazon"],
    skills: ["Carb tuning", "Wiring", "Maintenance logs"],
    tools: ["Vacuum gauges", "Torque wrench", "Compression tester"],
    helps: ["Carb sync", "Spark diagnosis", "Maintenance planning"],
    build: "CB550 first-start diary",
    maintenance: "Spark plugs fresh, brake fluid due, chain adjustment soon",
    route: "North forest shakedown",
    story: "Worst repair: chasing a charging fault caused by one tired connector."
  },
  {
    name: "Mia S.",
    initials: "MS",
    location: "Oslo West",
    status: "Out riding",
    intro: "Route scout, photo-run organizer, and keeper of good cafe stops.",
    vehicles: ["1971 Triumph Bonneville", "Classic Mini"],
    skills: ["Route planning", "Photo contests", "Beginner friendly"],
    tools: ["Tool roll", "Fuel can", "Jump leads"],
    helps: ["Ride plans", "Emergency roadside basics", "Photo run planning"],
    build: "Mini interior refresh",
    maintenance: "Tires inspected, winter storage checklist ready",
    route: "Lake road before noon",
    story: "Best ride: dry roads, fog lifting, and six classics arriving at the same cafe."
  },
  {
    name: "Leif K.",
    initials: "LF",
    location: "Bergen area",
    status: "Sorting chrome trim",
    intro: "Parts hunter with a suspiciously good memory for badges and brackets.",
    vehicles: ["1965 Mercedes sedan", "1970s project moped"],
    skills: ["Parts ID", "Marketplace watchlist", "Paint prep"],
    tools: ["Parts catalogues", "Calipers", "Label printer"],
    helps: ["What is this part?", "Listing red flags", "Trim identification"],
    build: "Sedan chrome and seal replacement",
    maintenance: "Door seals ordered, chrome clips catalogued",
    route: "Coastal parts run",
    story: "Favorite find: an original badge in a coffee tin full of mixed bolts."
  },
  {
    name: "Nora V.",
    initials: "NR",
    location: "Trondheim",
    status: "Upholstery bench",
    intro: "Interior trim, seat pans, story archive, and restoration patience.",
    vehicles: ["1962 Saab 96", "1950s scooter"],
    skills: ["Upholstery", "Story archive", "Build diaries"],
    tools: ["Staple gun", "Sewing machine", "Trim tools"],
    helps: ["Seat patterns", "Interior trim", "Before-and-after build posts"],
    build: "Scooter seat pan and cover",
    maintenance: "Seat cover mocked up, foam ordered",
    route: "Old town photo loop",
    story: "First machine: a scooter that ran best when it was treated gently."
  },
  {
    name: "Jon P.",
    initials: "JN",
    location: "Oslo South",
    status: "Trailer available",
    intro: "Welding, towing, shop-night logistics, and practical emergency help.",
    vehicles: ["1978 Land Rover", "1969 BSA project"],
    skills: ["Welding", "Towing", "Emergency help", "Beginner friendly"],
    tools: ["Trailer", "Welder", "Bike lift", "Angle grinder"],
    helps: ["Breakdowns", "Trailer transport", "Weld repairs", "Shop setup"],
    build: "BSA frame and paint preparation",
    maintenance: "Trailer lights checked, lift serviced",
    route: "Short safe shakedown loop",
    story: "Worst repair: removing one bolt that had clearly made life choices."
  }
];

const demoMembers = members.map((member) => ({
  ...member,
  id: member.id || initialsFromName(member.name).toLowerCase() + "-demo",
  qrCode: member.qrCode || `tvg:${member.name}`,
  vehicles: [...member.vehicles],
  skills: [...member.skills],
  tools: [...member.tools],
  helps: [...member.helps]
}));

let activeFilter = "all";
let activeMember = 0;
let activeProfileTab = "feed";
let isProfileFullScreen = false;
let previousUnreadTotal = null;
let chatSearchQuery = "";
let friendSearchQuery = "";
let friendFeedFilter = "all";
let profileFeedFilter = "all";
let messageSoundsEnabled = localStorage.getItem("togos-message-sounds") !== "off";
let activeSidebarChatMemberId = localStorage.getItem("togos-active-sidebar-chat") || "";
const followedMembers = new Set();
const profileStatusTagKey = "togos-profile-status-tags";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function avatarMarkup(member, extraClass = "") {
  const className = `avatar ${extraClass}`.trim();
  if (member.photoUrl) {
    return `<img class="${className}" src="${escapeHtml(member.photoUrl)}" alt="${escapeHtml(member.name)} profile picture">`;
  }
  return `<span class="${className}">${escapeHtml(member.initials)}</span>`;
}

function readProfileStatusTags() {
  if (window.togosData) {
    return window.togosData.get("profileStatusTags");
  }

  return JSON.parse(localStorage.getItem(profileStatusTagKey) || "{}");
}

function writeProfileStatusTags(tagsByMember) {
  if (window.togosData) {
    window.togosData.save("profileStatusTags", tagsByMember);
    return;
  }

  localStorage.setItem(profileStatusTagKey, JSON.stringify(tagsByMember));
}

function getProfileStatusTags(member) {
  const stored = readProfileStatusTags()[member.name];
  return stored?.length ? stored : [member.status, member.name === "Mia S." ? "Riding the bike" : "Working on the car"];
}

function saveProfileStatusTags(member, tags) {
  const tagsByMember = readProfileStatusTags();
  tagsByMember[member.name] = [...new Set(tags)].slice(0, 6);
  writeProfileStatusTags(tagsByMember);
}

function getCurrentMember() {
  return window.togosAuth?.getCurrentMember?.() || null;
}

function memberById(memberId) {
  return members.find((member) => member.id === memberId) || null;
}

function isOwnProfile(member) {
  const current = getCurrentMember();
  return Boolean(current && member.id && current.id === member.id);
}

async function updateOwnProfile(updates) {
  const response = await fetch("/api/profile/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...window.togosAuth.authHeaders()
    },
    body: JSON.stringify(updates)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Could not update profile.");
  }
  await window.togosData?.refresh?.();
  return data.member;
}

function privateChatId(a, b) {
  return [a, b].sort().join("__");
}

function getPrivateChats() {
  return window.togosData?.get("privateChats") || [];
}

function savePrivateChats(chats) {
  return window.togosData?.save("privateChats", chats);
}

function getPrivateChatReads() {
  return window.togosData?.get("privateChatReads") || {};
}

function savePrivateChatReads(reads) {
  return window.togosData?.save("privateChatReads", reads);
}

function unreadMessagesForChat(chat) {
  const current = getCurrentMember();
  if (!current || !chat) {
    return 0;
  }
  const reads = getPrivateChatReads();
  const readCount = Number(reads[current.id]?.[chat.id] || 0);
  return chat.messages.slice(readCount).filter((message) => message.authorId !== current.id).length;
}

function totalUnreadPrivateMessages() {
  const current = getCurrentMember();
  if (!current) {
    return 0;
  }
  return getPrivateChats()
    .filter((chat) => chat.participants.includes(current.id))
    .reduce((total, chat) => total + unreadMessagesForChat(chat), 0);
}

function markChatRead(chatId) {
  const current = getCurrentMember();
  const chat = getPrivateChats().find((item) => item.id === chatId);
  if (!current || !chat) {
    return;
  }
  const reads = getPrivateChatReads();
  reads[current.id] = reads[current.id] || {};
  reads[current.id][chat.id] = chat.messages.length;
  savePrivateChatReads(reads);
}

function playMessageSound() {
  if (!messageSoundsEnabled) {
    return;
  }
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(740, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(520, context.currentTime + 0.18);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.24);
  } catch {
    // Browsers may block sound until the user has interacted with the page.
  }
}

function checkUnreadSound() {
  const total = totalUnreadPrivateMessages();
  if (previousUnreadTotal !== null && total > previousUnreadTotal) {
    playMessageSound();
  }
  previousUnreadTotal = total;
}

function setMessageSounds(enabled) {
  messageSoundsEnabled = enabled;
  localStorage.setItem("togos-message-sounds", enabled ? "on" : "off");
}

function markAllChatsRead() {
  const current = getCurrentMember();
  if (!current) {
    return;
  }
  const reads = getPrivateChatReads();
  reads[current.id] = reads[current.id] || {};
  getPrivateChats()
    .filter((chat) => chat.participants.includes(current.id))
    .forEach((chat) => {
      reads[current.id][chat.id] = chat.messages.length;
    });
  savePrivateChatReads(reads);
  previousUnreadTotal = 0;
}

function getOrCreatePrivateChat(member) {
  const current = getCurrentMember();
  if (!current || !member.id || current.id === member.id) {
    return null;
  }
  const chats = getPrivateChats();
  const id = privateChatId(current.id, member.id);
  let chat = chats.find((item) => item.id === id);
  if (!chat) {
    chat = {
      id,
      participants: [current.id, member.id],
      names: [current.name, member.name],
      messages: [],
      invitedAt: Date.now()
    };
    chats.unshift(chat);
    savePrivateChats(chats);
  }
  return chat;
}

function sendPrivateMessage(member, text) {
  const current = getCurrentMember();
  const chat = getOrCreatePrivateChat(member);
  if (!chat || !text.trim()) {
    return;
  }
  const chats = getPrivateChats();
  const stored = chats.find((item) => item.id === chat.id) || chat;
  stored.messages.push({
    authorId: current.id,
    author: current.name,
    text: text.trim(),
    createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });
  if (!chats.find((item) => item.id === stored.id)) {
    chats.unshift(stored);
  }
  savePrivateChats(chats);
}

function selectSidebarChat(memberId) {
  activeSidebarChatMemberId = memberId || "";
  if (activeSidebarChatMemberId) {
    localStorage.setItem("togos-active-sidebar-chat", activeSidebarChatMemberId);
    const current = getCurrentMember();
    const chat = current ? getPrivateChats().find((item) => item.id === privateChatId(current.id, activeSidebarChatMemberId)) : null;
    if (chat) {
      markChatRead(chat.id);
    }
  } else {
    localStorage.removeItem("togos-active-sidebar-chat");
  }
}

function sendFriendInvite(member) {
  const current = getCurrentMember();
  if (!current || !member.id || current.id === member.id) {
    return;
  }
  const invites = window.togosData?.get("chatInvites") || [];
  if (!invites.some((invite) => invite.fromId === current.id && invite.toId === member.id)) {
    invites.unshift({
      id: `invite-${Date.now()}`,
      fromId: current.id,
      fromName: current.name,
      toId: member.id,
      toName: member.name,
      status: "pending",
      createdAt: new Date().toLocaleString()
    });
    window.togosData?.save("chatInvites", invites);
  }
}

function getFriendLinks() {
  return window.togosData?.get("friendLinks") || [];
}

function saveFriendLinks(links) {
  return window.togosData?.save("friendLinks", links);
}

function getGarageChallenges() {
  return window.togosData?.get("garageChallenges") || [];
}

function saveGarageChallenges(challenges) {
  return window.togosData?.save("garageChallenges", challenges);
}

function getChallengeInvites() {
  return window.togosData?.get("challengeInvites") || [];
}

function saveChallengeInvites(invites) {
  return window.togosData?.save("challengeInvites", invites);
}

function getFeedReactions() {
  return window.togosData?.get("feedReactions") || {};
}

function saveFeedReactions(reactions) {
  return window.togosData?.save("feedReactions", reactions);
}

function getProfileNotifications() {
  return window.togosData?.get("profileNotifications") || [];
}

function saveProfileNotifications(notifications) {
  return window.togosData?.save("profileNotifications", notifications);
}

function reactionFor(itemId) {
  const reactions = getFeedReactions();
  return reactions[itemId] || { likes: [], comments: [] };
}

function toggleFeedLike(itemId) {
  const current = getCurrentMember();
  if (!current) {
    return;
  }
  const reactions = getFeedReactions();
  const item = reactions[itemId] || { likes: [], comments: [] };
  item.likes = item.likes || [];
  item.comments = item.comments || [];
  if (item.likes.includes(current.id)) {
    item.likes = item.likes.filter((id) => id !== current.id);
  } else {
    item.likes.push(current.id);
  }
  reactions[itemId] = item;
  saveFeedReactions(reactions);
}

function addFeedComment(itemId, text) {
  const current = getCurrentMember();
  if (!current || !text.trim()) {
    return;
  }
  const reactions = getFeedReactions();
  const item = reactions[itemId] || { likes: [], comments: [] };
  item.likes = item.likes || [];
  item.comments = item.comments || [];
  item.comments.push({
    id: `feed-comment-${Date.now()}`,
    authorId: current.id,
    author: current.name,
    text: text.trim(),
    createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });
  reactions[itemId] = item;
  saveFeedReactions(reactions);

  const post = getProfilePosts().find((profilePost) => profilePost.id === itemId);
  if (post && post.authorId !== current.id) {
    const notifications = getProfileNotifications();
    notifications.unshift({
      id: `profile-post-notice-${Date.now()}`,
      type: "profile-post-comment",
      owner: post.authorName,
      ownerId: post.authorId,
      profilePostId: post.id,
      title: "Profile post comment",
      text: `${current.name} commented on your ${post.type.toLowerCase()}: ${text.trim()}`,
      createdAt: "Just now",
      read: false
    });
    saveProfileNotifications(notifications);
  }
}

function getProfilePosts() {
  return window.togosData?.get("profilePosts") || [];
}

function saveProfilePosts(posts) {
  return window.togosData?.save("profilePosts", posts);
}

function addProfilePost(member, payload) {
  const posts = getProfilePosts();
  posts.unshift({
    id: `profile-post-${Date.now()}`,
    authorId: member.id,
    authorName: member.name,
    type: payload.type || "Garage update",
    text: payload.text,
    photoUrl: payload.photoUrl || "",
    photo: payload.photoUrl ? "photo" : "garage",
    createdAt: new Date().toLocaleString(),
    baseLikes: 0
  });
  saveProfilePosts(posts);
}

function deleteProfilePost(postId) {
  const current = getCurrentMember();
  const posts = getProfilePosts();
  const post = posts.find((item) => item.id === postId);
  if (!current || !post || post.authorId !== current.id) {
    return;
  }
  saveProfilePosts(posts.filter((item) => item.id !== postId));
  const reactions = getFeedReactions();
  delete reactions[postId];
  saveFeedReactions(reactions);
}

function activeFriendLinksFor(memberId) {
  return getFriendLinks().filter((link) => link.status === "friends" && link.members.includes(memberId));
}

function friendIdsFor(memberId) {
  return activeFriendLinksFor(memberId).map((link) => link.members.find((id) => id !== memberId)).filter(Boolean);
}

function friendsFor(memberId) {
  const ids = new Set(friendIdsFor(memberId));
  return members.filter((member) => ids.has(member.id));
}

function areFriends(a, b) {
  return activeFriendLinksFor(a).some((link) => link.members.includes(b));
}

function acceptFriendInvite(inviteId) {
  const invites = window.togosData?.get("chatInvites") || [];
  const invite = invites.find((item) => item.id === inviteId);
  if (!invite) {
    return;
  }
  invite.status = "accepted";
  const links = getFriendLinks();
  if (!links.some((link) => link.members.includes(invite.fromId) && link.members.includes(invite.toId))) {
    links.unshift({
      id: `friend-${Date.now()}`,
      members: [invite.fromId, invite.toId],
      names: [invite.fromName, invite.toName],
      status: "friends",
      createdAt: new Date().toLocaleString()
    });
  }
  window.togosData?.saveMany?.({ chatInvites: invites, friendLinks: links });
}

function declineFriendInvite(inviteId) {
  const invites = window.togosData?.get("chatInvites") || [];
  const invite = invites.find((item) => item.id === inviteId);
  if (invite) {
    invite.status = "declined";
    window.togosData?.save("chatInvites", invites);
  }
}

function removeFriend(friendId) {
  const current = getCurrentMember();
  if (!current) {
    return;
  }
  const links = getFriendLinks().filter((link) => !(link.members.includes(current.id) && link.members.includes(friendId)));
  saveFriendLinks(links);
}

function challengesFor(member) {
  return getGarageChallenges().filter((challenge) => (
    challenge.ownerId === member.id || (challenge.invitedIds || []).includes(member.id)
  ));
}

function challengeProgressStyle(value) {
  const progress = Math.max(0, Math.min(100, Number(value) || 0));
  return `--w: ${progress}%`;
}

function makeInviteOptions(current, selected = []) {
  const friendList = friendsFor(current.id);
  const candidates = friendList.length ? friendList : members.filter((member) => member.id !== current.id).slice(0, 8);
  return candidates.map((member) => `
    <label>
      <input type="checkbox" name="invitees" value="${member.id}" ${selected.includes(member.id) ? "checked" : ""}>
      <span>${escapeHtml(member.name)}</span>
    </label>
  `).join("") || `<p class="planner-note">Add friends first, then invite them into personal challenges.</p>`;
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

function readGarageMembers() {
  return window.togosData?.get("garageMembers") || [];
}

function normalizeGarageMember(profile) {
  const vehicle = profile.vehicles?.[0] || "Garage project";
  return {
    name: profile.name,
    id: profile.id,
    initials: profile.initials || initialsFromName(profile.name),
    location: profile.location || "Location shared later",
    status: profile.status || "In the workshop",
    intro: profile.intro || "New garage member ready to meet people, share progress, and keep old machines moving.",
    vehicles: profile.vehicles?.length ? profile.vehicles : [vehicle],
    skills: profile.skills?.length ? profile.skills : ["Beginner friendly"],
    tools: profile.tools?.length ? profile.tools : ["Basic tools"],
    helps: profile.helps?.length ? profile.helps : ["Learning together"],
    build: profile.build || `${vehicle} build diary`,
    maintenance: profile.maintenance || "First maintenance log pending",
    route: profile.route || "Local shakedown route",
    story: profile.story || "New profile created at Togos Vintage Garage.",
    qrCode: profile.qrCode || `tvg:${profile.id || profile.name}`,
    photoUrl: profile.photoUrl || "",
    friends: profile.friends || [],
    isUserProfile: true
  };
}

function prepareMembers() {
  members.forEach((member, index) => {
    member.followers = member.followers ?? 140 + index * 37;
    member.posts = [
      {
        type: member.isUserProfile ? "New member" : "Build update",
        text: `${member.build}: logged the next small job and what still needs checking.`,
        meta: member.isUserProfile ? "Just now" : "2 hours ago",
        likes: member.isUserProfile ? 0 : 12 + index,
        photo: "garage"
      },
      {
        type: "Route note",
        text: `${member.route} is a good match for older machines and relaxed Sunday pacing.`,
        meta: member.isUserProfile ? "Start here" : "Yesterday",
        likes: member.isUserProfile ? 0 : 8 + index,
        photo: "route"
      },
      {
        type: "Story",
        text: member.story,
        meta: member.isUserProfile ? "Profile story" : "This week",
        likes: member.isUserProfile ? 0 : 18 + index,
        photo: "story"
      }
    ];
    member.progress = [70 - index * 5, 45 + index * 4, 20 + index * 6].map((value) => Math.max(12, Math.min(92, value)));
  });
}

function syncMembersFromSharedData() {
  const seen = new Set();
  const sharedMembers = readGarageMembers()
    .map(normalizeGarageMember)
    .filter((member) => {
      const key = member.name.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  const demoNames = new Set(demoMembers.map((member) => member.name.toLowerCase()));
  members = [
    ...demoMembers.map((member) => ({
      ...member,
      vehicles: [...member.vehicles],
      skills: [...member.skills],
      tools: [...member.tools],
      helps: [...member.helps]
    })),
    ...sharedMembers.filter((member) => !demoNames.has(member.name.toLowerCase()))
  ];
  prepareMembers();
}

function searchableText(member) {
  return [
    member.name,
    member.location,
    member.status,
    member.intro,
    ...member.vehicles,
    ...member.skills,
    ...member.tools,
    ...member.helps,
    member.build,
    member.route,
    member.story
  ].join(" ").toLowerCase();
}

function getMatches() {
  const query = profileSearch.value.trim().toLowerCase();

  return members.filter((member) => {
    const text = searchableText(member);
    const matchesSearch = !query || text.includes(query);
    const matchesFilter = activeFilter === "all" || text.includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });
}

function renderMembers() {
  const matches = getMatches();
  memberList.innerHTML = "";
  profileCount.textContent = `${matches.length} ${matches.length === 1 ? "member" : "members"}`;
  renderProfileChatSidebar();

  if (!matches.length) {
    memberList.innerHTML = `
      <article class="member-card">
        <span class="avatar">?</span>
        <div>
          <h3>No profiles found</h3>
          <p>Try a broader skill, tool, vehicle, or location search.</p>
        </div>
      </article>
    `;
    return;
  }

  matches.forEach((member) => {
    const index = members.indexOf(member);
    const card = document.createElement("button");
    card.className = `member-card${index === activeMember ? " active" : ""}`;
    card.type = "button";
    card.dataset.member = index;
    card.innerHTML = `
      ${avatarMarkup(member)}
      <div>
        <h3>${member.name}</h3>
        <p>${member.vehicles.join(" / ")}</p>
        <div class="member-tags">${member.skills.slice(0, 3).map((skill) => `<span>${skill}</span>`).join("")}</div>
      </div>
      <small>${member.location}</small>
    `;
    card.addEventListener("click", () => renderDetail(index));
    memberList.append(card);
  });
}

function renderSidebarChatThread(current, selectedMember) {
  if (!selectedMember || selectedMember.id === current.id) {
    return `
      <div class="sidebar-chat-thread empty-thread">
        <strong>Select a private chat</strong>
        <p>Pick a chat above or press Chat from the Friends tab. The conversation opens here on the right.</p>
      </div>
    `;
  }

  const chat = getOrCreatePrivateChat(selectedMember);
  if (chat) {
    markChatRead(chat.id);
  }

  return `
    <div class="sidebar-chat-thread" data-sidebar-thread="${selectedMember.id}">
      <div class="sidebar-thread-head">
        ${avatarMarkup(selectedMember)}
        <div>
          <strong>${escapeHtml(selectedMember.name)}</strong>
          <span>${escapeHtml(getProfileStatusTags(selectedMember)[0] || selectedMember.status)}</span>
        </div>
      </div>
      <div class="sidebar-message-list">
        ${(chat?.messages || []).map((message) => `
          <article class="${message.authorId === current.id ? "mine" : ""}">
            <strong>${escapeHtml(message.author)}</strong>
            <p>${escapeHtml(message.text)}</p>
            <small>${escapeHtml(message.createdAt)}</small>
          </article>
        `).join("") || `<p class="planner-note">No private messages yet.</p>`}
      </div>
      <form class="sidebar-chat-form" data-sidebar-private-chat="${selectedMember.id}">
        <textarea placeholder="Message ${escapeHtml(selectedMember.name)}..."></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  `;
}

function renderProfileChatSidebar() {
  if (!profileChatSidebar) {
    return;
  }

  const current = getCurrentMember();
  if (!current) {
    profileChatSidebar.innerHTML = `
      <div class="sidebar-card">
        <p class="eyebrow">Right-side chat</p>
        <h2>Login to see your garage friends</h2>
        <p>After login, this right rail shows private chats, unread messages, invites, and quick challenge signals.</p>
        <button type="button" data-open-auth="login">Login</button>
      </div>
    `;
    return;
  }

  const chats = getPrivateChats().filter((chat) => chat.participants.includes(current.id));
  const pendingInvites = (window.togosData?.get("chatInvites") || [])
    .filter((invite) => invite.toId === current.id && invite.status === "pending");
  const unreadTotal = totalUnreadPrivateMessages();
  const visibleChats = chats.filter((chat) => {
    const text = [...(chat.names || []), chat.messages.at(-1)?.text || ""].join(" ").toLowerCase();
    return !chatSearchQuery || text.includes(chatSearchQuery.toLowerCase());
  });
  if (!activeSidebarChatMemberId && visibleChats.length) {
    activeSidebarChatMemberId = visibleChats[0].participants.find((id) => id !== current.id) || "";
  }
  const selectedSidebarMember = memberById(activeSidebarChatMemberId);
  const challenges = getGarageChallenges()
    .filter((challenge) => challenge.ownerId === current.id || (challenge.invitedIds || []).includes(current.id))
    .slice(0, 4);

  profileChatSidebar.innerHTML = `
    <div class="sidebar-card">
      <p class="eyebrow">Right-side chat</p>
      <div class="sidebar-title-row">
        <h2>${escapeHtml(current.name)}'s chats</h2>
        ${unreadTotal ? `<span class="unread-badge">${unreadTotal}</span>` : "<span>0</span>"}
      </div>
      <p>Keep private chat here. Manage a bigger friend list from the Friends tab so the page stays tidy.</p>
      <div class="sidebar-action-row">
        <button type="button" data-open-friends-tab>Open Friends tab</button>
        <button type="button" data-mark-all-read ${unreadTotal ? "" : "disabled"}>Mark read</button>
      </div>
      <label class="sound-toggle"><input type="checkbox" data-message-sounds ${messageSoundsEnabled ? "checked" : ""}> <span>Message sound</span></label>
    </div>

    <div class="sidebar-card compact-card">
      <h3>Private chats</h3>
      <label class="chat-search"><span class="sr-only">Search chats</span><input type="search" data-chat-search value="${escapeHtml(chatSearchQuery)}" placeholder="Search private chats"></label>
      ${visibleChats.length ? visibleChats.map((chat) => {
        const otherId = chat.participants.find((id) => id !== current.id);
        const other = members.find((member) => member.id === otherId);
        const unread = unreadMessagesForChat(chat);
        const isActive = other?.id && other.id === activeSidebarChatMemberId;
        return `
          <button class="sidebar-chat-link${unread ? " has-unread" : ""}${isActive ? " active" : ""}" type="button" data-open-member="${other ? members.indexOf(other) : activeMember}" data-open-chat="true">
            <strong>${escapeHtml(other?.name || chat.names.filter((name) => name !== current.name).join(", ") || "Saved chat")} ${unread ? `<span class="unread-dot">${unread}</span>` : ""}</strong>
            <span>${escapeHtml(chat.messages.at(-1)?.text || "No messages yet")}</span>
          </button>
        `;
      }).join("") : `<p class="planner-note">${chats.length ? "No chats match that search." : "No one-to-one chats yet."}</p>`}
      ${pendingInvites.length ? `
        <h3>Friend invites</h3>
        ${pendingInvites.map((invite) => `
          <article class="invite-row">
            <strong>${escapeHtml(invite.fromName)}</strong>
            <div>
              <button type="button" data-accept-invite="${invite.id}">Accept</button>
              <button type="button" data-decline-invite="${invite.id}">Decline</button>
            </div>
          </article>
        `).join("")}
      ` : ""}
      ${renderSidebarChatThread(current, selectedSidebarMember)}
    </div>

    <div class="sidebar-card compact-card">
      <div class="sidebar-title-row">
        <h3>Garage Challenges</h3>
        <span>${challenges.length}</span>
      </div>
      ${challenges.length ? challenges.map((challenge) => `
        <article class="challenge-mini">
          <strong>${escapeHtml(challenge.title)}</strong>
          <span>${escapeHtml(challenge.goal)}</span>
          <div class="challenge-progress" style="${challengeProgressStyle(challenge.progress)}"><i></i></div>
        </article>
      `).join("") : `<p class="planner-note">Create a personal challenge from your profile's Challenges tab.</p>`}
    </div>
  `;
}

function renderDetail(index) {
  activeMember = index;
  const member = members[index];
  const isFollowing = followedMembers.has(index);
  const ownProfile = isOwnProfile(member);
  const sharedPostCount = getProfilePosts().filter((post) => post.authorId === member.id).length;
  const profileUrl = `${window.location.origin}${window.location.pathname}?member=${encodeURIComponent(member.name)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=148x148&data=${encodeURIComponent(profileUrl)}`;

  profileDetail.innerHTML = `
    <article class="social-profile">
      <div class="social-cover">
        <span>${member.vehicles[0]}</span>
      </div>
      <div class="social-head">
        ${avatarMarkup(member, "social-avatar")}
        <div>
          <h2>${member.name}</h2>
          <p>${member.location} / ${member.status}</p>
          <div class="detail-tags">${member.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
          <div class="profile-status-tags" aria-label="Custom status tags">
            ${getProfileStatusTags(member).map((tag, tagIndex) => `
              <button type="button" ${ownProfile ? `data-remove-status-tag="${tagIndex}"` : "disabled"}>
                ${escapeHtml(tag)}<span aria-hidden="true">x</span>
              </button>
            `).join("")}
          </div>
          ${ownProfile ? `<form class="status-tag-form" id="status-tag-form">
            <label class="sr-only" for="status-tag-input">Add custom status tag</label>
            <input id="status-tag-input" type="text" placeholder="Add status tag like Riding the bike" maxlength="42">
            <button type="submit">Add status</button>
          </form>` : ""}
        </div>
        <div class="profile-qr">
          <img src="${qrUrl}" alt="QR code for ${escapeHtml(member.name)} profile">
          <small>Scan to add or open profile</small>
        </div>
        <div class="profile-actions social-actions">
          <button type="button" data-profile-action="follow">${isFollowing ? "Following" : "Follow"}</button>
          <button class="secondary" type="button" data-profile-action="message">${ownProfile ? "Private inbox" : "Message"}</button>
          <button type="button" data-profile-action="mentor">Ask for help</button>
          ${ownProfile ? `<button type="button" data-profile-action="edit">Edit profile</button>` : ""}
          <button type="button" data-profile-action="fullscreen">${isProfileFullScreen ? "Exit full screen" : "Full screen"}</button>
        </div>
      </div>
      <div class="social-stats">
        <span><strong>${member.followers + (isFollowing ? 1 : 0)}</strong> followers</span>
        <span><strong>${member.posts.length + sharedPostCount}</strong> posts</span>
        <span><strong>${member.vehicles.length}</strong> vehicles</span>
        <span><strong>${member.tools.length}</strong> shared tools</span>
      </div>
      <nav class="social-tabs" aria-label="Profile sections">
        <button class="${activeProfileTab === "feed" ? "active" : ""}" type="button" data-profile-tab="feed">Feed</button>
        <button class="${activeProfileTab === "friend-feed" ? "active" : ""}" type="button" data-profile-tab="friend-feed">Friend Feed</button>
        <button class="${activeProfileTab === "friends" ? "active" : ""}" type="button" data-profile-tab="friends">Friends</button>
        <button class="${activeProfileTab === "garage" ? "active" : ""}" type="button" data-profile-tab="garage">Garage</button>
        <button class="${activeProfileTab === "media" ? "active" : ""}" type="button" data-profile-tab="media">Media</button>
        <button class="${activeProfileTab === "motorprint" ? "active" : ""}" type="button" data-profile-tab="motorprint">Motorprint</button>
        <button class="${activeProfileTab === "challenges" ? "active" : ""}" type="button" data-profile-tab="challenges">Challenges</button>
        <button class="${activeProfileTab === "chat" ? "active" : ""}" type="button" data-profile-tab="chat">Private Chat ${totalUnreadPrivateMessages() ? `<span class="tab-unread">${totalUnreadPrivateMessages()}</span>` : ""}</button>
        <button class="${activeProfileTab === "notifications" ? "active" : ""}" type="button" data-profile-tab="notifications">Notifications ${ownProfile && getUnreadCount(member) ? `(${getUnreadCount(member)})` : ""}</button>
        ${ownProfile ? `<button class="${activeProfileTab === "settings" ? "active" : ""}" type="button" data-profile-tab="settings">Settings</button>` : ""}
      </nav>
      <div class="social-content">
        ${renderProfileTab(member)}
      </div>
    </article>
  `;

  renderMembers();
}

function renderProfileTab(member) {
  if (activeProfileTab === "notifications") {
    if (!isOwnProfile(member)) {
      return `<section class="profile-notifications"><article class="profile-notice-card"><strong>Private notifications</strong><p>Only ${member.name} can read personal notifications for this profile.</p></article></section>`;
    }
    return renderProfileNotifications(member);
  }

  if (activeProfileTab === "chat") {
    return renderPrivateChat(member);
  }

  if (activeProfileTab === "friend-feed") {
    return renderFriendFeed(member);
  }

  if (activeProfileTab === "friends") {
    return renderFriendsTab(member);
  }

  if (activeProfileTab === "challenges") {
    return renderGarageChallenges(member);
  }

  if (activeProfileTab === "settings") {
    return renderProfileSettings(member);
  }

  if (activeProfileTab === "garage") {
    return `
      <section class="social-grid">
        ${member.vehicles.map((vehicle, vehicleIndex) => `
          <article class="garage-tile">
            <div class="vehicle-photo" aria-hidden="true"></div>
            <h3>${vehicle}</h3>
            <p>${vehicleIndex === 0 ? member.build : member.maintenance}</p>
            <a class="vehicle-profile-link" href="vehicle-profile.html?vehicle=${window.togosVehicleSocial.makeVehicleSlug(vehicle)}">Open vehicle profile</a>
          </article>
        `).join("")}
        <article class="garage-tile">
          <h3>Build progress</h3>
          <div class="build-bars">
            <span style="--w: ${member.progress[0]}%"><b>Parts</b><em>${member.progress[0]}%</em></span>
            <span style="--w: ${member.progress[1]}%"><b>Wiring</b><em>${member.progress[1]}%</em></span>
            <span style="--w: ${member.progress[2]}%"><b>Road ready</b><em>${member.progress[2]}%</em></span>
          </div>
        </article>
        <article class="garage-tile">
          <h3>Tool locker</h3>
          <div class="detail-tags">${member.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
        </article>
      </section>
    `;
  }

  if (activeProfileTab === "media") {
    return `
      <section class="media-grid">
        <div class="media-tile large"><span>Build photo</span></div>
        <div class="media-tile"><span>Engine bay</span></div>
        <div class="media-tile"><span>Dashboard</span></div>
        <div class="media-tile"><span>Patina</span></div>
        <div class="media-tile"><span>Route stop</span></div>
      </section>
    `;
  }

  if (activeProfileTab === "motorprint") {
    return `
      <section class="motorprint-grid">
        <article>
          <h3>Help signal</h3>
          <strong>High trust / fast replies</strong>
          <p>${member.helps.join(", ")}</p>
        </article>
        <article>
          <h3>Engine sound</h3>
          <div class="mini-wave" aria-label="Engine sound waveform"><i></i><i></i><i></i><i></i><i></i></div>
          <p>Idle clip, cold start, and after-tune comparison.</p>
        </article>
        <article>
          <h3>Route compatibility</h3>
          <strong>${member.route}</strong>
          <p>Matched by machine age, road quality, fuel stops, and cafe distance.</p>
        </article>
        <article>
          <h3>Parts watch</h3>
          <p>Alerts for trim, manuals, badges, cables, and model-specific spares.</p>
        </article>
      </section>
    `;
  }

  return renderProfileFeed(member);
}

function friendFeedItems(member) {
  const current = getCurrentMember();
  const sourceFriends = current && isOwnProfile(member) ? friendsFor(current.id) : friendsFor(member.id);
  const authors = sourceFriends.length ? sourceFriends : members.filter((item) => item.id !== member.id).slice(0, 5);
  const authorIds = new Set(authors.map((author) => author.id));
  const sharedPostItems = getProfilePosts()
    .filter((post) => authorIds.has(post.authorId))
    .map((post) => {
      const author = memberById(post.authorId) || {
        id: post.authorId,
        name: post.authorName,
        initials: initialsFromName(post.authorName),
        status: "Garage member"
      };
      return {
        id: post.id,
        author,
        type: post.type,
        text: post.text,
        meta: post.createdAt,
        photo: post.photo,
        photoUrl: post.photoUrl,
        baseLikes: post.baseLikes || 0
      };
    });
  const postItems = authors.flatMap((author) => author.posts.slice(0, 2).map((post, index) => ({
    id: `${author.id}-post-${index}`,
    author,
    type: post.type,
    text: post.text,
    meta: post.meta,
    photo: post.photo,
    baseLikes: post.likes
  })));
  const challengeItems = getGarageChallenges()
    .filter((challenge) => authors.some((author) => author.id === challenge.ownerId || (challenge.invitedIds || []).includes(author.id)))
    .map((challenge) => {
      const author = members.find((item) => item.id === challenge.ownerId) || member;
      return {
        id: challenge.id,
        author,
        type: "Garage Challenge",
        text: `${challenge.title}: ${challenge.goal || "progress update"}`,
        meta: challenge.dueDate ? `Due ${challenge.dueDate}` : "Challenge",
        photo: "garage",
        progress: challenge.progress,
        baseLikes: 0
      };
    });
  const allItems = [...sharedPostItems, ...challengeItems, ...postItems];
  const filtered = allItems.filter((item) => {
    if (friendFeedFilter === "all") {
      return true;
    }
    if (friendFeedFilter === "challenges") {
      return item.type === "Garage Challenge";
    }
    if (friendFeedFilter === "photos") {
      return Boolean(item.photoUrl) || item.type.toLowerCase().includes("photo");
    }
    return item.type !== "Garage Challenge";
  });
  return filtered.slice(0, 24);
}

function renderFeedCard(item) {
  const current = getCurrentMember();
  const reaction = reactionFor(item.id);
  const liked = current && (reaction.likes || []).includes(current.id);
  const likeCount = (Number(item.baseLikes) || 0) + (reaction.likes || []).length;
  return `
    <article class="social-post feed-item" data-feed-item="${item.id}">
      <div class="post-top">
        ${avatarMarkup(item.author)}
        <div>
          <strong>${escapeHtml(item.author.name)}</strong>
          <small>${escapeHtml(item.type)} / ${escapeHtml(item.meta)}</small>
        </div>
      </div>
      <p>${escapeHtml(item.text)}</p>
      ${item.photoUrl
        ? `<figure class="post-photo-image"><img src="${escapeHtml(item.photoUrl)}" alt="${escapeHtml(item.type)} photo"></figure>`
        : `<div class="post-photo ${escapeHtml(item.photo || "garage")}" aria-hidden="true"></div>`}
      ${item.progress !== undefined ? `<div class="challenge-progress" style="${challengeProgressStyle(item.progress)}"><i></i></div>` : ""}
      <div class="post-actions">
        <button type="button" data-feed-like="${item.id}">${liked ? "Liked" : "Like"}</button>
        ${item.canDelete ? `<button class="danger-action" type="button" data-delete-profile-post="${item.id}">Delete</button>` : ""}
        <span>${likeCount} likes</span>
        <span>${(reaction.comments || []).length} comments</span>
      </div>
      <div class="feed-comments">
        ${(reaction.comments || []).slice(-4).map((comment) => `
          <p><strong>${escapeHtml(comment.author)}</strong> ${escapeHtml(comment.text)} <small>${escapeHtml(comment.createdAt)}</small></p>
        `).join("")}
      </div>
      <form class="feed-comment-form" data-feed-comment="${item.id}">
        <input type="text" placeholder="Comment on this update">
        <button type="submit">Comment</button>
      </form>
    </article>
  `;
}

function profileFeedItems(member) {
  const ownProfile = isOwnProfile(member);
  const sharedPostItems = getProfilePosts()
    .filter((post) => post.authorId === member.id)
    .map((post) => ({
      id: post.id,
      author: member,
      type: post.type,
      text: post.text,
      meta: post.createdAt,
      photo: post.photo,
      photoUrl: post.photoUrl,
      baseLikes: post.baseLikes || 0,
      source: "shared",
      canDelete: ownProfile
    }));
  const seedItems = member.posts.map((post, index) => ({
    id: `${member.id}-seed-${index}`,
    author: member,
    type: post.type,
    text: post.text,
    meta: post.meta,
    photo: post.photo,
    baseLikes: post.likes,
    source: "seed",
    canDelete: false
  }));
  return [...sharedPostItems, ...seedItems].filter((item) => {
    if (profileFeedFilter === "all") {
      return true;
    }
    if (profileFeedFilter === "photos") {
      return Boolean(item.photoUrl) || item.type.toLowerCase().includes("photo");
    }
    if (profileFeedFilter === "projects") {
      return /project|build|progress|restoration/i.test(item.type);
    }
    if (profileFeedFilter === "questions") {
      return /question|part|parts/i.test(item.type);
    }
    if (profileFeedFilter === "challenges") {
      return /challenge/i.test(item.type);
    }
    return item.source === "shared" && !/photo|project|build|progress|question|part|challenge/i.test(item.type);
  });
}

function renderProfileFeed(member) {
  const ownProfile = isOwnProfile(member);
  const items = profileFeedItems(member);
  return `
    ${!ownProfile ? `
      <section class="profile-visitor-panel">
        <article class="profile-notice-card">
          <strong>${member.name}'s public feed</strong>
          <p>You can view this profile and start a private chat. Only ${member.name} can publish profile posts and edit settings.</p>
          <button type="button" data-profile-action="message">Open private chat</button>
        </article>
      </section>
    ` : `
      <form class="post-composer expanded-composer" id="profile-post-form">
        ${avatarMarkup(member)}
        <div class="composer-fields">
          <label>
            <span class="sr-only">Post type</span>
            <select name="type">
              <option>Garage update</option>
              <option>Build photo</option>
              <option>Project progress</option>
              <option>Parts question</option>
              <option>Challenge update</option>
              <option>Route note</option>
            </select>
          </label>
          <label>
            <span class="sr-only">Write a post</span>
            <textarea name="text" placeholder="Share a build update, route note, part question, challenge progress, or photo..."></textarea>
          </label>
          <label>
            <span class="sr-only">Photo URL</span>
            <input name="photoUrl" type="url" placeholder="Optional photo URL for the update">
          </label>
          <label>
            <span class="sr-only">Upload photo</span>
            <input name="photoFile" type="file" accept="image/*">
          </label>
        </div>
        <button type="submit">Post</button>
      </form>
    `}
    <div class="feed-filter-row" aria-label="Profile feed filters">
      <button class="${profileFeedFilter === "all" ? "active" : ""}" type="button" data-profile-feed-filter="all">All</button>
      <button class="${profileFeedFilter === "updates" ? "active" : ""}" type="button" data-profile-feed-filter="updates">Updates</button>
      <button class="${profileFeedFilter === "photos" ? "active" : ""}" type="button" data-profile-feed-filter="photos">Photos</button>
      <button class="${profileFeedFilter === "projects" ? "active" : ""}" type="button" data-profile-feed-filter="projects">Projects</button>
      <button class="${profileFeedFilter === "questions" ? "active" : ""}" type="button" data-profile-feed-filter="questions">Questions</button>
      <button class="${profileFeedFilter === "challenges" ? "active" : ""}" type="button" data-profile-feed-filter="challenges">Challenges</button>
    </div>
    <section class="social-feed">
      ${items.length ? items.map(renderFeedCard).join("") : `<article class="profile-notice-card"><strong>No posts yet</strong><p>Shared garage posts will appear here.</p></article>`}
    </section>
  `;
}

function renderFriendFeed(member) {
  const current = getCurrentMember();
  if (!current) {
    return `<section class="profile-notifications"><article class="profile-notice-card"><strong>Login required</strong><p>Login to see a middle feed of friend updates, projects, photos, and Garage Challenges.</p><button type="button" data-open-auth="login">Login</button></article></section>`;
  }

  const items = friendFeedItems(member);
  return `
    <section class="friend-feed-panel">
      <article class="profile-notice-card">
        <strong>Latest from garage friends</strong>
        <p>This middle feed collects friend posts, photos, project updates, and personal Garage Challenges. Likes and comments are shared through the local server.</p>
      </article>
      <div class="feed-filter-row" aria-label="Friend feed filters">
        <button class="${friendFeedFilter === "all" ? "active" : ""}" type="button" data-feed-filter="all">All</button>
        <button class="${friendFeedFilter === "updates" ? "active" : ""}" type="button" data-feed-filter="updates">Updates</button>
        <button class="${friendFeedFilter === "photos" ? "active" : ""}" type="button" data-feed-filter="photos">Photos</button>
        <button class="${friendFeedFilter === "challenges" ? "active" : ""}" type="button" data-feed-filter="challenges">Challenges</button>
      </div>
      <section class="social-feed">
        ${items.length ? items.map(renderFeedCard).join("") : `<article class="profile-notice-card"><strong>No friend updates yet</strong><p>Add friends from the Friends tab, then their updates will show here.</p></article>`}
      </section>
    </section>
  `;
}

function renderFriendsTab(member) {
  const current = getCurrentMember();
  const ownProfile = isOwnProfile(member);
  const friendList = friendsFor(member.id);
  const matchesFriendSearch = (candidate) => {
    const text = [candidate.name, candidate.location, candidate.status, candidate.vehicles.join(" "), candidate.skills.join(" "), candidate.tools.join(" ")].join(" ").toLowerCase();
    return !friendSearchQuery || text.includes(friendSearchQuery.toLowerCase());
  };
  const visibleFriends = friendList.filter(matchesFriendSearch);
  const pendingInvites = current && ownProfile
    ? (window.togosData?.get("chatInvites") || []).filter((invite) => invite.toId === current.id && invite.status === "pending")
    : [];
  const suggested = members
    .filter((candidate) => candidate.id !== member.id && !friendList.some((friend) => friend.id === candidate.id))
    .filter(matchesFriendSearch)
    .slice(0, 10);

  return `
    <section class="friends-panel">
      <article class="profile-notice-card">
        <strong>Friends</strong>
        <p>A separate friends area keeps the right-side chat clean when the garage grows. Search by name, skill, vehicle, tool, or location.</p>
      </article>
      <label class="friend-search"><span class="sr-only">Search friends</span><input type="search" data-friend-search value="${escapeHtml(friendSearchQuery)}" placeholder="Search friends, skills, vehicles, tools, location"></label>
      ${pendingInvites.length ? `
        <div class="challenge-invites">
          <h3>Incoming friend invites</h3>
          ${pendingInvites.map((invite) => `
            <article class="invite-row">
              <strong>${escapeHtml(invite.fromName)}</strong>
              <span>${escapeHtml(invite.createdAt)}</span>
              <div>
                <button type="button" data-accept-invite="${invite.id}">Accept</button>
                <button type="button" data-decline-invite="${invite.id}">Decline</button>
              </div>
            </article>
          `).join("")}
        </div>
      ` : ""}
      <div class="friends-grid">
        ${visibleFriends.length ? visibleFriends.map((friend) => `
          <article class="friend-card">
            ${avatarMarkup(friend, "large")}
            <div>
              <strong>${escapeHtml(friend.name)}</strong>
              <p>${escapeHtml(friend.location)} / ${escapeHtml(getProfileStatusTags(friend)[0] || friend.status)}</p>
              <div class="detail-tags">${friend.skills.slice(0, 3).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
            </div>
            <div class="friend-card-actions">
              <button type="button" data-open-member="${members.indexOf(friend)}">View</button>
              <button type="button" data-open-friend-chat="${members.indexOf(friend)}">Chat</button>
              ${ownProfile ? `<button type="button" data-remove-friend="${friend.id}">Remove</button>` : ""}
            </div>
          </article>
        `).join("") : `<article class="profile-notice-card"><strong>${friendList.length ? "No matching friends" : "No friends yet"}</strong><p>${friendList.length ? "Try a broader search." : "Open a profile and send a friend invite, or use the suggestions below."}</p></article>`}
      </div>
      ${ownProfile ? `
        <div class="suggested-friends">
          <h3>Suggested garage people</h3>
          <div class="friends-grid">
            ${suggested.map((candidate) => `
              <article class="friend-card compact">
                ${avatarMarkup(candidate)}
                <div>
                  <strong>${escapeHtml(candidate.name)}</strong>
                  <p>${escapeHtml(candidate.vehicles.join(" / "))}</p>
                </div>
                <div class="friend-card-actions">
                  <button type="button" data-open-member="${members.indexOf(candidate)}">View</button>
                  <button type="button" data-open-friend-chat="${members.indexOf(candidate)}">Chat</button>
                  <button type="button" data-send-friend-invite="${members.indexOf(candidate)}">Invite</button>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </section>
  `;
}

function renderGarageChallenges(member) {
  const current = getCurrentMember();
  const ownProfile = isOwnProfile(member);
  const challenges = challengesFor(member);
  const incoming = current
    ? getChallengeInvites().filter((invite) => invite.toId === current.id && invite.status === "pending")
    : [];

  return `
    <section class="challenge-panel">
      ${ownProfile ? `
        <form class="challenge-form" id="challenge-form">
          <h3>Create a personal Garage Challenge</h3>
          <label><span>Challenge name</span><input name="title" placeholder="Fix one thing this week" required></label>
          <label><span>Goal</span><textarea name="goal" placeholder="Example: diagnose weak spark, post before photo, and ride 20 test miles"></textarea></label>
          <label><span>Deadline</span><input name="dueDate" type="date"></label>
          <label><span>Progress</span><input name="progress" type="number" min="0" max="100" value="0"></label>
          <fieldset>
            <legend>Invite friends</legend>
            <div class="invite-check-grid">${makeInviteOptions(current)}</div>
          </fieldset>
          <button type="submit">Create challenge and invite friends</button>
        </form>
      ` : `
        <article class="profile-notice-card">
          <strong>${member.name}'s garage challenges</strong>
          <p>View public challenge progress and send ${member.name} a private chat if you want to join or help.</p>
        </article>
      `}

      ${incoming.length && ownProfile ? `
        <div class="challenge-invites">
          <h3>Challenge invites</h3>
          ${incoming.map((invite) => `
            <article class="invite-row">
              <strong>${escapeHtml(invite.challengeTitle)}</strong>
              <span>From ${escapeHtml(invite.fromName)}</span>
              <div>
                <button type="button" data-accept-challenge="${invite.id}">Accept</button>
                <button type="button" data-decline-challenge="${invite.id}">Decline</button>
              </div>
            </article>
          `).join("")}
        </div>
      ` : ""}

      <div class="challenge-list">
        ${challenges.length ? challenges.map((challenge) => `
          <article class="challenge-card" data-challenge-id="${challenge.id}">
            <div class="challenge-card-head">
              <div>
                <strong>${escapeHtml(challenge.title)}</strong>
                <span>${escapeHtml(challenge.ownerName)} / ${challenge.dueDate ? `Due ${escapeHtml(challenge.dueDate)}` : "No deadline set"}</span>
              </div>
              <em>${Number(challenge.progress) || 0}%</em>
            </div>
            <p>${escapeHtml(challenge.goal || "No goal notes yet.")}</p>
            <div class="challenge-progress" style="${challengeProgressStyle(challenge.progress)}"><i></i></div>
            <small>Invited: ${(challenge.invitedNames || []).map(escapeHtml).join(", ") || "No invites yet"}</small>
            ${ownProfile && challenge.ownerId === member.id ? `
              <form class="challenge-update-form" data-update-challenge="${challenge.id}">
                <label><span>Update progress</span><input name="progress" type="number" min="0" max="100" value="${Number(challenge.progress) || 0}"></label>
                <button type="submit">Save progress</button>
                <button type="button" data-delete-challenge="${challenge.id}">Delete</button>
              </form>
            ` : ""}
          </article>
        `).join("") : `<article class="profile-notice-card"><strong>No challenges yet</strong><p>Create a challenge like ride 100 miles, fix one small thing, or organize the parts shelf.</p></article>`}
      </div>
    </section>
  `;
}

function renderPrivateChat(member) {
  const current = getCurrentMember();
  if (!current) {
    return `<section class="private-chat-panel"><article class="profile-notice-card"><strong>Login required</strong><p>Login before starting private chats or sending friend invites.</p><button type="button" data-open-auth="login">Login</button></article></section>`;
  }

  if (isOwnProfile(member)) {
    const chats = getPrivateChats().filter((chat) => chat.participants.includes(current.id));
    const invites = (window.togosData?.get("chatInvites") || []).filter((invite) => invite.toId === current.id && invite.status === "pending");
    const friendList = friendsFor(current.id);
    return `
      <section class="private-chat-layout">
        <aside class="private-chat-list">
          <h3>Friends</h3>
          ${friendList.length ? friendList.map((friend) => `<article><strong>${friend.name}</strong><span>${friend.location}</span></article>`).join("") : `<p>No friends added yet.</p>`}
          <h3>Private chats</h3>
          ${chats.length ? chats.map((chat) => `
            <article>
              <strong>${chat.names.filter((name) => name !== current.name).join(", ") || "Saved chat"}</strong>
              <span>${chat.messages.at(-1)?.text || "No messages yet"}</span>
            </article>
          `).join("") : `<p>No private chats yet. Open another member profile and send a message.</p>`}
          <h3>Invites</h3>
          ${invites.length ? invites.map((invite) => `
            <article>
              <strong>${invite.fromName}</strong>
              <span>${invite.createdAt}</span>
              <div class="invite-actions">
                <button type="button" data-accept-invite="${invite.id}">Accept</button>
                <button type="button" data-decline-invite="${invite.id}">Decline</button>
              </div>
            </article>
          `).join("") : `<p>No pending invites.</p>`}
        </aside>
        <div class="private-chat-empty">
          <strong>Your private inbox</strong>
          <p>Friend invites and one-to-one garage chats appear here.</p>
        </div>
      </section>
    `;
  }

  const chat = getOrCreatePrivateChat(member);
  if (chat) {
    markChatRead(chat.id);
  }
  return `
    <section class="private-chat-layout">
      <aside class="private-chat-list">
        <h3>Friends</h3>
        ${areFriends(current.id, member.id)
          ? `<p class="planner-note">${member.name} is in your garage friends list.</p>`
          : `<button type="button" data-profile-action="friend-invite">Send friend invite</button>`}
        <p>Scan the QR code above or send an invite to connect faster.</p>
      </aside>
      <div class="private-chat-thread">
        <h3>Private chat with ${member.name}</h3>
        <div class="private-message-list">
          ${(chat?.messages || []).map((message) => `
            <article class="${message.authorId === current.id ? "mine" : ""}">
              <strong>${message.author}</strong>
              <p>${escapeHtml(message.text)}</p>
              <small>${message.createdAt}</small>
            </article>
          `).join("") || `<p class="planner-note">No private messages yet.</p>`}
        </div>
        <form class="private-chat-form" data-private-chat="${member.id}">
          <textarea placeholder="Message ${member.name} privately..."></textarea>
          <button type="submit">Send private message</button>
        </form>
      </div>
    </section>
  `;
}

function renderProfileSettings(member) {
  if (!isOwnProfile(member)) {
    return `<p class="profile-toast">Only the profile owner can edit these settings.</p>`;
  }

  return `
    <form class="profile-settings-form" id="profile-settings-form">
      <div class="profile-photo-settings">
        ${avatarMarkup(member, "large")}
        <div>
          <strong>Profile picture</strong>
          <p>Use a small image file or paste an image URL. Small square photos work best.</p>
        </div>
      </div>
      <label><span>Profile picture URL</span><input name="photoUrl" value="${escapeHtml(member.photoUrl || "")}" placeholder="https://..."></label>
      <label><span>Upload profile picture</span><input name="photoFile" type="file" accept="image/*"></label>
      <label><span>Location</span><input name="location" value="${escapeHtml(member.location)}"></label>
      <label><span>Status</span><input name="status" value="${escapeHtml(member.status)}"></label>
      <label><span>Intro</span><textarea name="intro">${escapeHtml(member.intro)}</textarea></label>
      <label><span>Vehicles, comma separated</span><input name="vehicles" value="${escapeHtml(member.vehicles.join(", "))}"></label>
      <label><span>Skills, comma separated</span><input name="skills" value="${escapeHtml(member.skills.join(", "))}"></label>
      <label><span>Tools, comma separated</span><input name="tools" value="${escapeHtml(member.tools.join(", "))}"></label>
      <label><span>Happy to help with</span><input name="helps" value="${escapeHtml(member.helps.join(", "))}"></label>
      <button type="submit">Save profile</button>
    </form>
  `;
}

function readImageFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

function getUnreadCount(member) {
  return window.togosVehicleSocial.notificationsForOwner(member.name).filter((notice) => !notice.read).length;
}

function renderProfileNotifications(member) {
  const notifications = window.togosVehicleSocial.notificationsForOwner(member.name);
  if (!notifications.length) {
    return `
      <section class="profile-notifications">
        <article class="profile-notice-card">
          <strong>No notifications yet</strong>
          <p>Vehicle comments and profile post comments for ${member.name} will appear here.</p>
        </article>
      </section>
    `;
  }

  return `
    <section class="profile-notifications">
      ${notifications.map((notice) => {
        const isProfilePostNotice = notice.type === "profile-post-comment";
        const title = notice.title || notice.vehicleName || "Garage notification";
        return `
        <article class="profile-notice-card${notice.read ? "" : " unread"}" data-notification-id="${notice.id}" data-comment-id="${notice.commentId}">
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(notice.text)}</p>
          <small>${escapeHtml(notice.createdAt)}</small>
          <div class="profile-notice-actions">
            ${isProfilePostNotice
              ? `<a href="profiles.html?member=${encodeURIComponent(member.name)}">View profile feed</a>`
              : `<a href="vehicle-profile.html?vehicle=${notice.vehicleSlug}">View vehicle comment</a>`}
            <button type="button" data-mark-read="${notice.id}">${notice.read ? "Read" : "Mark read"}</button>
          </div>
          ${isProfilePostNotice ? "" : `
          <form class="notice-reply-form" data-notice-reply="${notice.commentId}">
            <textarea placeholder="Answer from your profile..."></textarea>
            <button type="submit">Reply to comment</button>
          </form>
          `}
        </article>
      `;
      }).join("")}
    </section>
  `;
}

profileSearch.addEventListener("input", renderMembers);

profileFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    activeProfileTab = "feed";
    profileFilters.forEach((item) => item.classList.toggle("active", item === button));
    renderMembers();
  });
});

profileChatSidebar?.addEventListener("click", (event) => {
  const openMember = event.target.closest("[data-open-member]");
  const remove = event.target.closest("[data-remove-friend]");
  const accept = event.target.closest("[data-accept-invite]");
  const decline = event.target.closest("[data-decline-invite]");
  const openFriends = event.target.closest("[data-open-friends-tab]");
  const markRead = event.target.closest("[data-mark-all-read]");

  if (openFriends) {
    activeProfileTab = "friends";
    renderRequestedOrCurrentProfile();
    return;
  }

  if (markRead) {
    markAllChatsRead();
    renderProfileChatSidebar();
    renderDetail(activeMember);
    return;
  }

  if (openMember) {
    const member = members[Number(openMember.dataset.openMember)];
    if (openMember.dataset.openChat && member) {
      selectSidebarChat(member.id);
      renderProfileChatSidebar();
      renderDetail(activeMember);
      return;
    }
    activeProfileTab = "feed";
    renderDetail(Number(openMember.dataset.openMember));
    return;
  }

  if (remove) {
    removeFriend(remove.dataset.removeFriend);
    renderMembers();
    return;
  }

  if (accept) {
    acceptFriendInvite(accept.dataset.acceptInvite);
    renderMembers();
    renderRequestedOrCurrentProfile();
    return;
  }

  if (decline) {
    declineFriendInvite(decline.dataset.declineInvite);
    renderMembers();
  }
});

profileChatSidebar?.addEventListener("input", (event) => {
  const search = event.target.closest("[data-chat-search]");
  if (!search) {
    return;
  }
  chatSearchQuery = search.value.trim();
  renderProfileChatSidebar();
});

profileChatSidebar?.addEventListener("change", (event) => {
  const soundToggle = event.target.closest("[data-message-sounds]");
  if (!soundToggle) {
    return;
  }
  setMessageSounds(soundToggle.checked);
  renderProfileChatSidebar();
});

profileChatSidebar?.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-sidebar-private-chat]");
  if (!form) {
    return;
  }
  event.preventDefault();
  const member = memberById(form.dataset.sidebarPrivateChat);
  const input = form.querySelector("textarea");
  const text = input.value.trim();
  if (!member || !text) {
    return;
  }
  sendPrivateMessage(member, text);
  selectSidebarChat(member.id);
  input.value = "";
  renderProfileChatSidebar();
  if (activeProfileTab === "chat") {
    renderDetail(activeMember);
  }
});

profileDetail.addEventListener("click", (event) => {
  const action = event.target.closest("[data-profile-action]");
  const tab = event.target.closest("[data-profile-tab]");
  const like = event.target.closest("[data-like-post]");
  const markRead = event.target.closest("[data-mark-read]");
  const removeStatusTag = event.target.closest("[data-remove-status-tag]");
  const acceptInvite = event.target.closest("[data-accept-invite]");
  const declineInvite = event.target.closest("[data-decline-invite]");
  const acceptChallenge = event.target.closest("[data-accept-challenge]");
  const declineChallenge = event.target.closest("[data-decline-challenge]");
  const deleteChallenge = event.target.closest("[data-delete-challenge]");
  const feedLike = event.target.closest("[data-feed-like]");
  const openMember = event.target.closest("[data-open-member]");
  const openFriendChat = event.target.closest("[data-open-friend-chat]");
  const sendInviteButton = event.target.closest("[data-send-friend-invite]");
  const removeFriendButton = event.target.closest("[data-remove-friend]");
  const feedFilter = event.target.closest("[data-feed-filter]");
  const profileFeedFilterButton = event.target.closest("[data-profile-feed-filter]");
  const deleteProfilePostButton = event.target.closest("[data-delete-profile-post]");

  if (feedFilter) {
    friendFeedFilter = feedFilter.dataset.feedFilter;
    renderDetail(activeMember);
    return;
  }

  if (profileFeedFilterButton) {
    profileFeedFilter = profileFeedFilterButton.dataset.profileFeedFilter;
    renderDetail(activeMember);
    return;
  }

  if (deleteProfilePostButton) {
    deleteProfilePost(deleteProfilePostButton.dataset.deleteProfilePost);
    renderDetail(activeMember);
    return;
  }

  if (feedLike) {
    toggleFeedLike(feedLike.dataset.feedLike);
    renderDetail(activeMember);
    return;
  }

  if (openMember) {
    activeProfileTab = "feed";
    renderDetail(Number(openMember.dataset.openMember));
    return;
  }

  if (openFriendChat) {
    const friend = members[Number(openFriendChat.dataset.openFriendChat)];
    if (friend) {
      selectSidebarChat(friend.id);
      renderProfileChatSidebar();
      renderDetail(activeMember);
    }
    return;
  }

  if (sendInviteButton) {
    sendFriendInvite(members[Number(sendInviteButton.dataset.sendFriendInvite)]);
    renderDetail(activeMember);
    return;
  }

  if (removeFriendButton) {
    removeFriend(removeFriendButton.dataset.removeFriend);
    renderDetail(activeMember);
    return;
  }

  if (acceptInvite) {
    acceptFriendInvite(acceptInvite.dataset.acceptInvite);
    renderDetail(activeMember);
    return;
  }

  if (declineInvite) {
    declineFriendInvite(declineInvite.dataset.declineInvite);
    renderDetail(activeMember);
    return;
  }

  if (acceptChallenge || declineChallenge) {
    const invites = getChallengeInvites();
    const inviteId = (acceptChallenge || declineChallenge).dataset.acceptChallenge || (acceptChallenge || declineChallenge).dataset.declineChallenge;
    const invite = invites.find((item) => item.id === inviteId);
    if (invite) {
      invite.status = acceptChallenge ? "accepted" : "declined";
      saveChallengeInvites(invites);
    }
    renderDetail(activeMember);
    return;
  }

  if (deleteChallenge) {
    const challenges = getGarageChallenges().filter((challenge) => challenge.id !== deleteChallenge.dataset.deleteChallenge);
    const invites = getChallengeInvites().filter((invite) => invite.challengeId !== deleteChallenge.dataset.deleteChallenge);
    window.togosData?.saveMany?.({ garageChallenges: challenges, challengeInvites: invites });
    renderDetail(activeMember);
    return;
  }

  if (tab) {
    activeProfileTab = tab.dataset.profileTab;
    renderDetail(activeMember);
    return;
  }

  if (like) {
    const member = members[activeMember];
    const post = member.posts[Number(like.dataset.likePost)];
    post.likes += 1;
    renderDetail(activeMember);
    return;
  }

  if (markRead) {
    window.togosVehicleSocial.markNotificationRead(markRead.dataset.markRead);
    renderDetail(activeMember);
    return;
  }

  if (removeStatusTag) {
    const member = members[activeMember];
    if (!isOwnProfile(member)) {
      return;
    }
    const tags = getProfileStatusTags(member);
    tags.splice(Number(removeStatusTag.dataset.removeStatusTag), 1);
    saveProfileStatusTags(member, tags.length ? tags : [member.status]);
    renderDetail(activeMember);
    return;
  }

  if (!action) {
    return;
  }

  const member = members[activeMember];
  if (action.dataset.profileAction === "follow") {
    if (followedMembers.has(activeMember)) {
      followedMembers.delete(activeMember);
    } else {
      followedMembers.add(activeMember);
    }
    renderDetail(activeMember);
    return;
  }

  if (action.dataset.profileAction === "fullscreen") {
    toggleProfileFullScreen();
    return;
  }

  if (action.dataset.profileAction === "message") {
    activeProfileTab = "chat";
    renderDetail(activeMember);
    return;
  }

  if (action.dataset.profileAction === "edit") {
    activeProfileTab = "settings";
    renderDetail(activeMember);
    return;
  }

  if (action.dataset.profileAction === "friend-invite") {
    sendFriendInvite(member);
    renderProfileChatSidebar();
    const content = profileDetail.querySelector(".private-chat-thread") || profileDetail.querySelector(".social-content");
    const note = document.createElement("p");
    note.className = "profile-toast";
    note.textContent = `Friend invite sent to ${member.name}.`;
    content.prepend(note);
    return;
  }

  if (action.dataset.profileAction === "post") {
    if (!isOwnProfile(member)) {
      return;
    }
    const input = profileDetail.querySelector("#profile-post-text");
    const text = input.value.trim();
    if (!text) {
      return;
    }
    member.posts.unshift({
      type: "Garage post",
      text,
      meta: "Just now",
      likes: 0,
      photo: "garage"
    });
    renderDetail(activeMember);
    return;
  }

  const content = profileDetail.querySelector(".social-content");
  const note = document.createElement("p");
  note.className = "profile-toast";
  note.textContent = action.dataset.profileAction === "mentor"
    ? `Mentor request drafted for ${member.name}. A real build would send this through private chat.`
    : `Message drafted for ${member.name}. A real build would open the private room.`;
  content.prepend(note);
});

profileDetail.addEventListener("input", (event) => {
  const friendSearch = event.target.closest("[data-friend-search]");
  if (!friendSearch) {
    return;
  }
  friendSearchQuery = friendSearch.value.trim();
  renderDetail(activeMember);
});

profileDetail.addEventListener("submit", (event) => {
  const postForm = event.target.closest("#profile-post-form");
  if (postForm) {
    event.preventDefault();
    const member = members[activeMember];
    if (!isOwnProfile(member)) {
      return;
    }
    const formData = new FormData(postForm);
    const text = String(formData.get("text") || "").trim();
    const photoUrl = String(formData.get("photoUrl") || "").trim();
    const photoFile = postForm.querySelector('input[name="photoFile"]')?.files?.[0];
    if (!text && !photoUrl && !photoFile) {
      return;
    }
    readImageFileAsDataUrl(photoFile).then((uploadedPhoto) => {
      addProfilePost(member, {
        type: String(formData.get("type") || "Garage update"),
        text: text || "Shared a garage photo.",
        photoUrl: uploadedPhoto || photoUrl
      });
      profileFeedFilter = "all";
      renderDetail(activeMember);
    });
    return;
  }

  const feedCommentForm = event.target.closest("[data-feed-comment]");
  if (feedCommentForm) {
    event.preventDefault();
    const input = feedCommentForm.querySelector("input");
    const text = input.value.trim();
    if (text) {
      addFeedComment(feedCommentForm.dataset.feedComment, text);
    }
    renderDetail(activeMember);
    return;
  }

  const settingsForm = event.target.closest("#profile-settings-form");
  if (settingsForm) {
    event.preventDefault();
    const formData = new FormData(settingsForm);
    const list = (name) => String(formData.get(name) || "").split(",").map((item) => item.trim()).filter(Boolean);
    const file = settingsForm.querySelector('input[name="photoFile"]')?.files?.[0];
    readImageFileAsDataUrl(file).then((uploadedPhoto) => updateOwnProfile({
      photoUrl: uploadedPhoto || formData.get("photoUrl") || "",
      location: formData.get("location"),
      status: formData.get("status"),
      intro: formData.get("intro"),
      vehicles: list("vehicles"),
      skills: list("skills"),
      tools: list("tools"),
      helps: list("helps")
    })).then(() => {
      activeProfileTab = "feed";
      syncMembersFromSharedData();
      renderRequestedOrCurrentProfile();
    }).catch((error) => {
      const note = document.createElement("p");
      note.className = "profile-toast";
      note.textContent = error.message || "Could not save profile.";
      settingsForm.prepend(note);
    });
    return;
  }

  const privateForm = event.target.closest("[data-private-chat]");
  if (privateForm) {
    event.preventDefault();
    const input = privateForm.querySelector("textarea");
    const text = input.value.trim();
    if (!text) {
      return;
    }
    sendPrivateMessage(members[activeMember], text);
    input.value = "";
    renderDetail(activeMember);
    return;
  }

  const statusForm = event.target.closest("#status-tag-form");
  if (statusForm) {
    event.preventDefault();
    const input = statusForm.querySelector("#status-tag-input");
    const value = input.value.trim();
    if (!value) {
      return;
    }
    const member = members[activeMember];
    if (!isOwnProfile(member)) {
      return;
    }
    saveProfileStatusTags(member, [...getProfileStatusTags(member), value]);
    renderDetail(activeMember);
    return;
  }

  const challengeForm = event.target.closest("#challenge-form");
  if (challengeForm) {
    event.preventDefault();
    const current = getCurrentMember();
    const member = members[activeMember];
    if (!current || !isOwnProfile(member)) {
      return;
    }
    const formData = new FormData(challengeForm);
    const invitedIds = formData.getAll("invitees").map(String);
    const invitedMembers = members.filter((item) => invitedIds.includes(item.id));
    const challenge = {
      id: `challenge-${Date.now()}`,
      ownerId: current.id,
      ownerName: current.name,
      title: String(formData.get("title") || "").trim(),
      goal: String(formData.get("goal") || "").trim(),
      dueDate: String(formData.get("dueDate") || ""),
      progress: Math.max(0, Math.min(100, Number(formData.get("progress")) || 0)),
      invitedIds,
      invitedNames: invitedMembers.map((item) => item.name),
      createdAt: new Date().toLocaleString()
    };

    if (!challenge.title) {
      return;
    }

    const challenges = getGarageChallenges();
    const invites = getChallengeInvites();
    challenges.unshift(challenge);
    invitedMembers.forEach((friend) => {
      invites.unshift({
        id: `challenge-invite-${Date.now()}-${friend.id}`,
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        fromId: current.id,
        fromName: current.name,
        toId: friend.id,
        toName: friend.name,
        status: "pending",
        createdAt: new Date().toLocaleString()
      });
    });
    window.togosData?.saveMany?.({ garageChallenges: challenges, challengeInvites: invites });
    renderDetail(activeMember);
    return;
  }

  const challengeUpdateForm = event.target.closest("[data-update-challenge]");
  if (challengeUpdateForm) {
    event.preventDefault();
    const formData = new FormData(challengeUpdateForm);
    const challenges = getGarageChallenges();
    const challenge = challenges.find((item) => item.id === challengeUpdateForm.dataset.updateChallenge);
    if (challenge) {
      challenge.progress = Math.max(0, Math.min(100, Number(formData.get("progress")) || 0));
      saveGarageChallenges(challenges);
    }
    renderDetail(activeMember);
    return;
  }

  const form = event.target.closest("[data-notice-reply]");
  if (!form) {
    return;
  }
  event.preventDefault();
  const input = form.querySelector("textarea");
  const text = input.value.trim();
  if (!text) {
    return;
  }
  window.togosVehicleSocial.addVehicleReply(form.dataset.noticeReply, members[activeMember].name, text);
  renderDetail(activeMember);
});

async function toggleProfileFullScreen() {
  isProfileFullScreen = !isProfileFullScreen;
  document.body.classList.toggle("profile-fullscreen", isProfileFullScreen);

  try {
    if (isProfileFullScreen && !document.fullscreenElement) {
      await profileDetail.requestFullscreen();
    } else if (!isProfileFullScreen && document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch {
    // Some browsers block fullscreen unless the page is trusted. The CSS focus mode still works.
  }

  renderDetail(activeMember);
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && isProfileFullScreen) {
    isProfileFullScreen = false;
    document.body.classList.remove("profile-fullscreen");
    renderDetail(activeMember);
  }
});

const requestedMember = new URLSearchParams(window.location.search).get("member");
function renderRequestedOrCurrentProfile() {
  const currentName = members[activeMember]?.name;
  const requestedIndex = requestedMember
    ? members.findIndex((member) => member.name.toLowerCase() === requestedMember.toLowerCase())
    : -1;
  const currentIndex = currentName
    ? members.findIndex((member) => member.name === currentName)
    : activeMember;
  renderDetail(requestedIndex >= 0 ? requestedIndex : Math.max(0, currentIndex));
}

syncMembersFromSharedData();
renderRequestedOrCurrentProfile();

window.addEventListener("togos-data-ready", () => {
  syncMembersFromSharedData();
  checkUnreadSound();
  renderRequestedOrCurrentProfile();
});

window.addEventListener("togos-auth-change", () => {
  syncMembersFromSharedData();
  previousUnreadTotal = null;
  checkUnreadSound();
  renderRequestedOrCurrentProfile();
});

setInterval(async () => {
  if (document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.tagName === "INPUT") {
    return;
  }
  await window.togosData?.refresh?.();
  syncMembersFromSharedData();
  checkUnreadSound();
  renderProfileChatSidebar();
  if (activeProfileTab === "chat" || activeProfileTab === "notifications" || activeProfileTab === "challenges" || activeProfileTab === "friend-feed" || activeProfileTab === "friends") {
    renderRequestedOrCurrentProfile();
  }
}, 2500);
