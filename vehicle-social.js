const vehicleCommentKey = "togos-vehicle-comments";
const profileNotificationKey = "togos-profile-notifications";

function makeVehicleSlug(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readVehicleComments() {
  if (window.togosData) {
    return window.togosData.get("vehicleComments");
  }

  return JSON.parse(localStorage.getItem(vehicleCommentKey) || "[]");
}

function writeVehicleComments(comments) {
  if (window.togosData) {
    window.togosData.save("vehicleComments", comments);
    return;
  }

  localStorage.setItem(vehicleCommentKey, JSON.stringify(comments));
}

function readProfileNotifications() {
  if (window.togosData) {
    return window.togosData.get("profileNotifications");
  }

  return JSON.parse(localStorage.getItem(profileNotificationKey) || "[]");
}

function writeProfileNotifications(notifications) {
  if (window.togosData) {
    window.togosData.save("profileNotifications", notifications);
    return;
  }

  localStorage.setItem(profileNotificationKey, JSON.stringify(notifications));
}

function writeVehicleSocial(comments, notifications) {
  if (window.togosData?.saveMany) {
    window.togosData.saveMany({
      vehicleComments: comments,
      profileNotifications: notifications
    });
    return;
  }

  writeVehicleComments(comments);
  writeProfileNotifications(notifications);
}

function addVehicleComment({ vehicleSlug, vehicleName, owner, author, text }) {
  const comments = readVehicleComments();
  const comment = {
    id: `comment-${Date.now()}`,
    vehicleSlug,
    vehicleName,
    owner,
    author,
    text,
    createdAt: "Just now",
    replies: []
  };
  comments.unshift(comment);
  writeVehicleComments(comments);

  const notifications = readProfileNotifications();
  notifications.unshift({
    id: `notice-${Date.now()}`,
    owner,
    vehicleSlug,
    vehicleName,
    commentId: comment.id,
    text: `${author} commented on ${vehicleName}: ${text}`,
    createdAt: "Just now",
    read: false
  });
  writeVehicleSocial(comments, notifications);
  return comment;
}

function addVehicleReply(commentId, author, text) {
  const comments = readVehicleComments();
  const comment = comments.find((item) => item.id === commentId);
  if (!comment) {
    return null;
  }
  comment.replies.push({
    id: `reply-${Date.now()}`,
    author,
    text,
    createdAt: "Just now"
  });
  writeVehicleComments(comments);
  return comment;
}

function commentsForVehicle(vehicleSlug) {
  return readVehicleComments().filter((comment) => comment.vehicleSlug === vehicleSlug);
}

function notificationsForOwner(owner) {
  return readProfileNotifications().filter((notice) => notice.owner === owner);
}

function markNotificationRead(notificationId) {
  const notifications = readProfileNotifications();
  const notice = notifications.find((item) => item.id === notificationId);
  if (notice) {
    notice.read = true;
    writeProfileNotifications(notifications);
  }
}

window.togosVehicleSocial = {
  addVehicleComment,
  addVehicleReply,
  commentsForVehicle,
  makeVehicleSlug,
  markNotificationRead,
  notificationsForOwner,
  readVehicleComments
};
