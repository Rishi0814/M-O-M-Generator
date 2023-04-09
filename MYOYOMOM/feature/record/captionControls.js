const stopTranscribing = () => {
    debug("call stopTranscribing"),
      notificationsOff(),
      clearInterval(closedCaptionsAttachInterval),
      (closedCaptionsAttachInterval = null),
      captionContainerChildObserver.disconnect(),
      captionContainerAttributeObserver.disconnect();
  },
  startTranscribing = () => {
    debug("call startTranscribing"),
      (currentSessionIndex = null),
      (closedCaptionsAttachInterval = setInterval(
        tryTo(closedCaptionsAttachLoop, "attach to captions"),
        1e3
      )),
      setCurrentTranscriptDetails();
  },
  toggleTranscribing = () => {
    debug("call toggleTranscribing"),
      isTranscribing
        ? (debug("call stopTranscribing"),
          notificationsOff(),
          clearInterval(closedCaptionsAttachInterval),
          (closedCaptionsAttachInterval = null),
          captionContainerChildObserver.disconnect(),
          captionContainerAttributeObserver.disconnect())
        : (debug("call startTranscribing"),
          (currentSessionIndex = null),
          (closedCaptionsAttachInterval = setInterval(
            tryTo(closedCaptionsAttachLoop, "attach to captions"),
            1e3
          )),
          setCurrentTranscriptDetails()),
      (isTranscribing = !isTranscribing);
  },
  turnOnCaptions = () => {
    const t = getElementWithXPathFallback(
      document,
      XPATH_TURN_ON_CAPTIONS_BUTTON,
      XPATH_TURN_ON_CAPTIONS_BUTTON_V20210602
    );
    return debug("captionsButtonOn", t), t && (t.click(), notificationsOn()), t;
  },
  turnOffCaptions = () => {
    const t = getElementWithXPathFallback(
      document,
      XPATH_TURN_OFF_CAPTIONS_BUTTON,
      XPATH_TURN_OFF_CAPTIONS_BUTTON_V20210602
    );
    return (
      debug("captionsButtonOff", t), t && (t.click(), notificationsOff()), t
    );
  },
  turnOnCaptionNotificationsOn = () => {
    const t = document.getElementById("popup");
    (t.style.backgroundColor = "#818388"),
      (t.style.color = "#292c35"),
      (t.innerHTML = "Please turn on captions"),
      t.classList.add("show"),
      clearTimeout(notificationsTimeout),
      (notificationsTimeout = setTimeout(() => {
        t.classList.remove("show");
      }, 500));
  },
  notificationsOn = () => {
    const t = document.getElementById("yomom-caption-toggle"),
      n = document.getElementById("yomom-caption-toggle-mini"),
      e = document.getElementById("captionIcon"),
      o = document.getElementById("captionIconMini");
    t.removeChild(e), n.removeChild(o);
    const i = createCaptionOffIcon(),
      c = createCaptionOffIcon();
    (i.id = "captionIcon"),
      (i.style.width = "15px"),
      (i.style.height = "15px"),
      t.appendChild(i),
      (c.id = "captionIconMini"),
      (c.style.width = "15px"),
      (c.style.height = "15px"),
      n.appendChild(c);
    // const a = document.getElementById("popup");
    // (a.style.backgroundColor = "#818388"),
    //   (a.style.color = "#292c35"),
    //   (a.innerHTML = "Your caption is turned on"),
    //   a.classList.add("show"),
    //   clearTimeout(notificationsTimeout),
    //   (notificationsTimeout = setTimeout(() => {
    //     a.classList.remove("show");
    //   }, notificationsTimeoutDuration));
  },
  notificationsOff = () => {
    const t = document.getElementById("yomom-caption-toggle"),
      n = document.getElementById("yomom-caption-toggle-mini"),
      e = document.getElementById("captionIcon"),
      o = document.getElementById("captionIconMini");
    t.removeChild(e), n.removeChild(o);
    const i = createCaptionOnIcon(),
      c = createCaptionOnIcon();
    (i.id = "captionIcon"),
      (i.style.width = "15px"),
      (i.style.height = "15px"),
      t.appendChild(i),
      (c.id = "captionIconMini"),
      (c.style.width = "15px"),
      (c.style.height = "15px"),
      n.appendChild(c);
    const a = document.getElementById("popup");
    (a.style.backgroundColor = "#818388"),
      (a.style.color = "#292c35"),
      (a.innerHTML = "Your caption is turned off"),
      a.classList.add("show"),
      clearTimeout(notificationsTimeout),
      (notificationsTimeout = setTimeout(() => {
        a.classList.remove("show");
      }, notificationsTimeoutDuration));
  },
  toggleCaptions = () => {
    debug("call toggleCaptions"),
      weTurnedCaptionsOn ? turnOffCaptions() : turnOnCaptions(),
      (weTurnedCaptionsOn = !weTurnedCaptionsOn);
  };
