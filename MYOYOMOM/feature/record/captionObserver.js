const findCaptionsContainer = () => {
    captionContainerChildObserver.disconnect(),
      captionContainerAttributeObserver.disconnect();
    const e = {},
      t = Array.from(document.querySelectorAll("img")).filter((e) =>
        e.src.match(/\.googleusercontent\.com\//)
      );
    for (let n of t)
      n.className in e || (e[n.className] = []), e[n.className].push(n);
    const n = [];
    for (let t of Object.values(e)) {
      let e = 0;
      for (let n of t) {
        const t = document.evaluate(
          "..//span",
          n.parentElement,
          null,
          XPathResult.ORDERED_NODE_ITERATOR_TYPE
        );
        let r;
        for (; (r = t.iterateNext()); )
          if (0 === r.children.length && r.textContent.length > 3) {
            e += 1;
            break;
          }
      }
      if (e !== t.length) continue;
      let r = null;
      if (t.length >= 2) {
        const e = [...t];
        let n = null,
          o = !1;
        do {
          for (let t in e) {
            if (!e[t].parent) {
              o = !0;
              break;
            }
            (e[t] = e[t].parent),
              0 === t ? (n = e[t]) : n && n !== e[t] && (n = null),
              debug("current", n);
          }
        } while (null === n && !1 === o);
        r = n;
      } else {
        let e = t[0];
        for (; null === r && e; )
          e.getAttribute("jscontroller") ? (r = e) : (e = e.parentNode);
      }
      if (r) {
        const e = r?.firstChild?.firstChild?.tagName;
        debug("first grand child tag name", e);
        const t = "IMG" === e ? r : r.firstChild.firstChild;
        debug("caption container candidate", t), null !== t && n.push(t);
      }
    }
    if (1 === n.length)
      return (
        captionContainerChildObserver.observe(n[0], {
          childList: !0,
          subtree: !0,
        }),
        captionContainerAttributeObserver.observe(n[0], {
          attributes: !0,
          subtree: !1,
          attributeOldValue: !0,
        }),
        Array.from(n[0].children).forEach(
          tryTo((e) => {
            updateCurrentTranscriptSession(e);
          }, "handling child node")
        ),
        debug("Final CaptionsContainer", n[0]),
        n[0]
      );
  },
  captionContainerChildObserver = new MutationObserver(
    tryTo((e) => {
      for (let t of e)
        if (
          (debug("mutation target", t.target), t.target === captionsContainer)
        ) {
          debug("update with added nodes");
          for (let e of t.addedNodes) updateCurrentTranscriptSession(e);
        } else {
          const e = Array.from(t.addedNodes).filter(
              (e) => "SPAN" === e.nodeName || "#text" === e.nodeName
            ),
            n = Array.from(t.removedNodes).filter(
              (e) => "SPAN" === e.nodeName || "#text" === e.nodeName
            );
          if ((debug("addedSpansOrTexts", e), e.length > 0 || n.length > 0)) {
            let e = t.target;
            for (; e && e.parentNode !== captionsContainer; ) e = e.parentNode;
            if (!e) {
              debug("could not find root for", t.target);
              continue;
            }
            debug("update with parent node"), updateCurrentTranscriptSession(e);
          }
        }
    }, "executing observer")
  ),
  captionContainerAttributeObserver = new MutationObserver(
    tryTo((e) => {
      for (let t of e)
        if ("style" === t.attributeName) {
          const e = t.target.getAttribute("style");
          "display: none;" === t.oldValue &&
            "" === e &&
            (currentSessionIndex = null);
        }
    }, "executing observer")
  );
let isCaptionTurnedOn = !1;
const closedCaptionsAttachLoop = () => {
    if (((captionsContainer = findCaptionsContainer()), captionsContainer))
      debug("attached to closed captions"),
        (isCaptionTurnedOn = !0),
        clearInterval(closedCaptionsAttachInterval);
    else if (!hasCaptionButtons) {
      if (isCaptionTurnedOn) return;
      if (
        getElementWithXPathFallback(
          document,
          XPATH_CAPTION_OPEN_TOAST,
          XPATH_CAPTION_OPEN_TOAST_V20210602
        )
      )
        return (
          popup.classList.remove("show"),
          (isCaptionTurnedOn = !0),
          notificationsOn(),
          void clearInterval(closedCaptionsAttachInterval)
        );
      isCaptionTurnedOn || turnOnCaptionNotificationsOn();
    }
  },
  removeCaptionPanel = () => {
    console.log("ho rha hai");
    debug("start remove caption panel");
    const e = document.querySelector('div[jscontroller="D1tHje"]');
    const cc = document.querySelector('div[jscontroller="xzbRj"]');
    debug("googleMeetCaptionsPanel", e), e && (e.style.height = "0px");
    cc && (cc.style.height = "0px");
    cc && (cc.style.width = "0px");
  };
