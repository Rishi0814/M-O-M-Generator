addRoot(), addMiniPanel();
const checkOngoingMeeting = setInterval(
  addCaptionPanel,
  tryTo(addCaptionPanel, "adding button"),
  1e3
);
let notificationsTimeout;
const notificationsTimeoutDuration = 3e3;
let checkCaptionStatusInterval;
