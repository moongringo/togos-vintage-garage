const togosAuth = (() => {
  const tokenKey = "togos-session-token";
  const currentMemberKey = "togos-current-member-id";
  let modal = null;
  let currentMember = null;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getToken() {
    return localStorage.getItem(tokenKey) || "";
  }

  function authHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function authRequest(url, payload = null, method = "POST") {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders()
      },
      body: payload ? JSON.stringify(payload) : null
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "Authentication request failed.");
    }
    return data;
  }

  function getMembers() {
    return window.togosData?.get("garageMembers") || [];
  }

  function getCurrentMember() {
    if (currentMember) {
      return currentMember;
    }
    const id = localStorage.getItem(currentMemberKey);
    return getMembers().find((member) => member.id === id) || null;
  }

  function setCurrentMember(member, token = null) {
    currentMember = member;
    if (token) {
      localStorage.setItem(tokenKey, token);
    }
    localStorage.setItem(currentMemberKey, member.id);
    renderAccountButtons();
    window.dispatchEvent(new CustomEvent("togos-auth-change", { detail: member }));
  }

  function logout() {
    currentMember = null;
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(currentMemberKey);
    renderAccountButtons();
    window.dispatchEvent(new CustomEvent("togos-auth-change"));
  }

  async function refreshSession() {
    if (!getToken()) {
      renderAccountButtons();
      return null;
    }

    try {
      const data = await authRequest("/api/auth/me", null, "GET");
      setCurrentMember(data.member);
      return data.member;
    } catch {
      logout();
      return null;
    }
  }

  function renderAccountButtons() {
    const current = getCurrentMember();
    document.querySelectorAll("[data-auth-state]").forEach((element) => {
      if (current) {
        element.textContent = current.name;
        element.href = `profiles.html?member=${encodeURIComponent(current.name)}`;
        element.removeAttribute("data-open-auth");
      } else {
        element.textContent = element.dataset.authSignedOut || "Login / Join";
        element.href = "#join";
        element.dataset.openAuth = "login";
      }
    });
  }

  function ensureModal() {
    if (modal) {
      return modal;
    }

    modal = document.createElement("section");
    modal.className = "auth-modal";
    modal.id = "garage-auth-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="auth-backdrop" data-close-auth></div>
      <article class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button class="auth-close" type="button" data-close-auth aria-label="Close login">x</button>
        <p class="eyebrow">Secure member access</p>
        <h2 id="auth-title">Join Togos Vintage Garage</h2>
        <p class="auth-copy">Create a garage profile with a password. Passwords are salted and hashed on the local server; use HTTPS before putting this online.</p>
        <div class="auth-tabs" role="tablist" aria-label="Member access">
          <button class="active" type="button" data-auth-tab="create">Create profile</button>
          <button type="button" data-auth-tab="login">Login</button>
        </div>
        <form class="auth-form active" id="create-profile-form" data-auth-panel="create">
          <label><span>Display name</span><input name="name" type="text" placeholder="Example: Morgan Garage" required maxlength="48"></label>
          <label><span>Password</span><input name="password" type="password" placeholder="At least 8 characters" required minlength="8" autocomplete="new-password"></label>
          <label><span>Location area</span><input name="location" type="text" placeholder="Example: Oslo area" required maxlength="48"></label>
          <label><span>Main vehicle</span><input name="vehicle" type="text" placeholder="Example: 1972 Honda CB350" required maxlength="64"></label>
          <label><span>Skills</span><input name="skills" type="text" placeholder="Carb tuning, wiring, paint"></label>
          <label><span>Tools available</span><input name="tools" type="text" placeholder="Timing light, trailer, welder"></label>
          <label><span>Happy to help with</span><input name="helps" type="text" placeholder="First starts, parts ID, towing"></label>
          <label><span>Status</span><input name="status" type="text" placeholder="In the workshop" maxlength="42"></label>
          <button type="submit">Create secure profile</button>
        </form>
        <form class="auth-form" id="login-profile-form" data-auth-panel="login">
          <label><span>Profile name</span><input name="name" list="garage-member-list" type="text" placeholder="Start typing your garage name" required maxlength="48"></label>
          <label><span>Password</span><input name="password" type="password" placeholder="Your password" required autocomplete="current-password"></label>
          <datalist id="garage-member-list"></datalist>
          <button type="submit">Login</button>
        </form>
        <p class="auth-note" id="auth-note" aria-live="polite">Create a profile first. Login requires the password for that profile.</p>
      </article>
    `;
    document.body.append(modal);
    bindModal();
    return modal;
  }

  function updateLoginOptions() {
    const datalist = modal?.querySelector("#garage-member-list");
    if (!datalist) {
      return;
    }
    datalist.innerHTML = getMembers().map((member) => `<option value="${escapeHtml(member.name)}"></option>`).join("");
  }

  function setPanel(panel) {
    modal.querySelectorAll("[data-auth-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.authTab === panel);
    });
    modal.querySelectorAll("[data-auth-panel]").forEach((form) => {
      form.classList.toggle("active", form.datasetAuthPanel === panel || form.dataset.authPanel === panel);
    });
  }

  function open(panel = "create") {
    ensureModal();
    updateLoginOptions();
    setPanel(panel);
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("auth-open");
    modal.querySelector(`[data-auth-panel="${panel}"] input`)?.focus();
  }

  function close() {
    if (!modal) {
      return;
    }
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-open");
  }

  function formPayload(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function bindModal() {
    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-auth]")) {
        close();
      }
      const tab = event.target.closest("[data-auth-tab]");
      if (tab) {
        setPanel(tab.dataset.authTab);
      }
    });

    modal.querySelector("#create-profile-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = modal.querySelector("#auth-note");
      note.textContent = "Creating secure profile...";
      try {
        const data = await authRequest("/api/auth/register", formPayload(event.currentTarget));
        setCurrentMember(data.member, data.token);
        await window.togosData?.refresh?.();
        note.textContent = `Profile ready for ${data.member.name}. Opening Garage Profiles...`;
        setTimeout(() => {
          window.location.href = `profiles.html?member=${encodeURIComponent(data.member.name)}`;
        }, 350);
      } catch (error) {
        note.textContent = error.message;
      }
    });

    modal.querySelector("#login-profile-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = modal.querySelector("#auth-note");
      note.textContent = "Checking password...";
      try {
        const data = await authRequest("/api/auth/login", formPayload(event.currentTarget));
        setCurrentMember(data.member, data.token);
        await window.togosData?.refresh?.();
        note.textContent = `Welcome back, ${data.member.name}. Opening your profile...`;
        setTimeout(() => {
          window.location.href = `profiles.html?member=${encodeURIComponent(data.member.name)}`;
        }, 350);
      } catch (error) {
        note.textContent = error.message;
      }
    });
  }

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-open-auth]");
    if (!opener) {
      return;
    }
    event.preventDefault();
    open(opener.dataset.openAuth || "create");
  });

  window.addEventListener("togos-data-ready", renderAccountButtons);
  refreshSession();

  return {
    authHeaders,
    getCurrentMember,
    getMembers,
    logout,
    open,
    refreshSession,
    renderAccountButtons
  };
})();

window.togosAuth = togosAuth;
