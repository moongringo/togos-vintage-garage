const togosData = (() => {
  const apiUrl = "/api/site-data";
  const sectionKeys = {
    vehicleComments: "togos-vehicle-comments",
    profileNotifications: "togos-profile-notifications",
    profileStatusTags: "togos-profile-status-tags",
    helpPings: "togos-map-help-pings",
    routeMarkers: "togos-route-markers",
    garageMembers: "togos-garage-members",
    chatMessages: "togos-chat-messages",
    memberStatuses: "togos-member-statuses",
    privateChats: "togos-private-chats",
    chatInvites: "togos-chat-invites",
    friendLinks: "togos-friend-links",
    garageChallenges: "togos-garage-challenges",
    challengeInvites: "togos-challenge-invites",
    privateChatReads: "togos-private-chat-reads",
    feedReactions: "togos-feed-reactions",
    profilePosts: "togos-profile-posts"
  };
  const defaults = {
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
  const state = { ...defaults };
  let hasApi = false;
  let loaded = false;
  let readyPromise;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function fallbackRead(section) {
    try {
      const stored = localStorage.getItem(sectionKeys[section]);
      return stored ? JSON.parse(stored) : clone(defaults[section]);
    } catch {
      return clone(defaults[section]);
    }
  }

  function fallbackWrite(section, value) {
    try {
      localStorage.setItem(sectionKeys[section], JSON.stringify(value));
    } catch {
      // Storage can fail in strict privacy modes. The in-memory state still works for the page.
    }
  }

  function hydrateFromLocalStorage() {
    Object.keys(defaults).forEach((section) => {
      state[section] = fallbackRead(section);
    });
  }

  function applyServerData(data) {
    Object.keys(defaults).forEach((section) => {
      if (data && data[section] !== undefined) {
        state[section] = data[section];
        fallbackWrite(section, state[section]);
      }
    });
    window.dispatchEvent(new CustomEvent("togos-data-ready"));
  }

  async function load() {
    hydrateFromLocalStorage();

    try {
      const response = await fetch(apiUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Shared data API unavailable");
      }
      hasApi = true;
      applyServerData(await response.json());
    } catch {
      hasApi = false;
      window.dispatchEvent(new CustomEvent("togos-data-ready"));
    } finally {
      loaded = true;
    }
  }

  async function refresh() {
    try {
      const response = await fetch(apiUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Shared data API unavailable");
      }
      hasApi = true;
      applyServerData(await response.json());
    } catch {
      hasApi = false;
    }
  }

  async function save(section, value) {
    if (!loaded && readyPromise) {
      await readyPromise;
    }

    state[section] = clone(value);
    fallbackWrite(section, value);

    if (!hasApi) {
      return state[section];
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, value })
      });
      if (!response.ok) {
        throw new Error("Shared data save failed");
      }
      applyServerData(await response.json());
    } catch {
      hasApi = false;
    }

    return state[section];
  }

  async function saveMany(updates) {
    if (!loaded && readyPromise) {
      await readyPromise;
    }

    Object.entries(updates).forEach(([section, value]) => {
      state[section] = clone(value);
      fallbackWrite(section, value);
    });

    if (!hasApi) {
      return updates;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: updates })
      });
      if (!response.ok) {
        throw new Error("Shared data batch save failed");
      }
      applyServerData(await response.json());
    } catch {
      hasApi = false;
    }

    return updates;
  }

  function get(section) {
    return clone(state[section] ?? defaults[section]);
  }

  hydrateFromLocalStorage();
  readyPromise = load();

  return {
    get,
    hasApi: () => hasApi,
    ready: readyPromise,
    refresh,
    save,
    saveMany
  };
})();

window.togosData = togosData;
