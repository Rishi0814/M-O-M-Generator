const addTutorialPanel = () => {
  var e, t;
  (e = chrome.runtime.getURL(
    "feature/utilities/packages/html2pdf.bundle.min.js"
  )),
    ((t = document.createElement("script")).type = "application/javascript"),
    (t.src = e),
    document.head.appendChild(t);
  const n = document.getElementById("yomom-root");
  document.getElementById("yomom-miniPanel").style.display = "none";
  let l = document.getElementById("yomom-mainPanel");
  if (l) l.style.display = "block";
  else {
    (l = document.createElement("div")),
      l.setAttribute("id", "yomom-mainPanel"),
      l.classList.add("panelBase"),
      (l.style.width = "300px"),
      (l.style.backgroundColor = "#454953");
    const e = document.createElement("div");
    e.setAttribute("name", "yomom-rootHeader"),
      (e.style.cursor = "move"),
      (e.style.width = "300px"),
      (e.style.height = "50px"),
      (e.style.backgroundColor = "#454953"),
      (e.style.borderRadius = "12px 12px 0 0"),
      (e.style.display = "flex"),
      (e.style.alignItems = "center"),
      (e.style.justifyContent = "space-between");
    const t = document.createElement("div");
    (t.style.display = "flex"),
      (t.style.alignItems = "center"),
      (t.style.paddingLeft = "8px");
    const i = document.createElement("img");
    (i.src = chrome.runtime.getURL("image/logo.png")),
      (i.alt = "none"),
      (i.style.height = "30px"),
      (i.style.width = "90px"),
      (i.style.marginLeft = "-16px"),
      (i.style.cursor = "pointer"),
      (i.style.zIndex = "999"),
      t.appendChild(i),
      e.appendChild(t);
    const o = document.createElement("div");
    (o.style.display = "flex"), (o.style.alignItems = "center");
    const d = document.createElement("div");
    d.classList.add("imageContainer"),
      (d.title = "Minimize"),
      d.addEventListener("click", minimize);
    const a = createCollapseIcon();
    d.appendChild(a), o.appendChild(d), e.appendChild(o), l.appendChild(e);
    let s = document.createElement("div");
    (s.style.padding = "24px"),
      (s.style.fontSize = "14px"),
      (s.style.color = "#ffffff"),
      (s.style.backgroundColor = "#292c35"),
      (s.style.borderRadius = "0 0 12px 12px");

    let v = document.createElement("div");
    (v.style.paddingTop = "32px"), (v.innerHTML = "Download"), s.appendChild(v);
    let f = document.createElement("div");
    (f.style.display = "flex"), (f.style.justifyContent = "center");
    let E = document.createElement("div");
    E.classList.add("tutorialContainer"),
      (E.style.display = "flex"),
      (E.style.alignItems = "center"),
      (E.style.justifyContent = "center");
    let b = createDownloadIcon();
    E.appendChild(b), f.appendChild(E), s.appendChild(f);
    let k = document.createElement("div");
    (k.style.textAlign = "center"),
      (k.innerHTML =
        "yomom provides multiple formats for downloading the transcripts."),
      s.appendChild(k),
      l.appendChild(s),
      n.appendChild(l),
      dragElement(n);
  }
};
const addCaptionPanel = () => {
  const e = findButtonContainer(),
    t = document.getElementById("yomom-root");
  if (e && !e.__gmt_button_added) {
    e.__gmt_button_added = !0;
    const n = document.getElementById("yomom-miniPanel"),
      l = document.createElement("div");
    (l.title = "Turn on/off captions"),
      l.setAttribute("id", "yomom-caption-toggle-mini"),
      l.style.width="100%",
      l.style.display = "flex",
      l.style.alignItems = "center",
      l.style.justifyContent = "center",
      l.classList.add("miniButtonContainer"),
      l.addEventListener("click", toggleCaptions);
    const i = createCaptionOnIcon();
    (i.id = "captionIconMini"), l.appendChild(i), n.appendChild(l);
    const o = document.createElement("div");
    (o.title = "Download"),
      o.setAttribute("id", "yomom-download-menu-mini"),
      o.style.width="100%",
      o.style.display = "flex",
      o.style.alignItems = "center",
      o.style.justifyContent = "center",
      o.classList.add("miniButtonContainer"),
      o.addEventListener("click", displayMenu);
    const d = createDownloadIcon();
    (d.id = "downloadIconMini"),
      (d.style.width = "20px"),
      (d.style.height = "20px"),
      o.appendChild(d),
      n.appendChild(o);
    const a = document.createElement("div");
    (a.style.margin = "12px 5px 0px"),
      (a.style.padding = "6px 12px"),
      (a.style.borderRadius = "12px"),
      (a.style.backgroundColor = "#3e4149");
    // for (let e = 0; e < bookmarkList.length; e++) {
    //   const t = document.createElement("div"),
    //     n = document.createElement("div");
    //   (t.style.display = "flex"),
    //     (t.style.flexDirection = "column"),
    //     (t.style.alignItems = "center"),
    //     (n.title = `Highlight as ${bookmarkList[e].name}`),
    //     n.classList.add("flagContainerMini"),
    //     (n.id = `yomom-highlight-${bookmarkList[e].code}-mini`),
    //     (n.onclick = () => {
    //       highlight(e);
    //     });
    //   const l = createSVGIcon(
    //     bookmarkList[e].attributes,
    //     bookmarkList[e].content
    //   );
    //   n.appendChild(l), t.appendChild(n), a.appendChild(t);
    // }
    n.appendChild(a), (n.style.display = "flex") ,(n.style.flexDirection = "column"), (n.style.alignItems = "center"), (n.style.justifyContent = "space-between");
    let s = document.getElementById("yomom-mainPanel");
    s && t.removeChild(s);
    const c = document.createElement("div");
    c.setAttribute("id", "yomom-mainPanel"),
      c.classList.add("panelBase"),
      (c.style.width = "300px"),
      (c.style.display = "none");
    const r = document.createElement("div");
    r.setAttribute("name", "yomom-rootHeader"),
      (r.style.cursor = "pointer"),
      (r.style.width = "300px"),
      (r.style.height = "50px"),
      (r.style.backgroundColor = "#454953"),
      (r.style.borderRadius = "12px 12px 0 0"),
      (r.style.display = "flex"),
      (r.style.alignItems = "center"),
      (r.style.justifyContent = "center");
    const p = document.createElement("div");
    (p.style.display = "flex"),
      (p.style.alignItems = "center"),
      (p.style.justifyContent = "space-between"),
      (p.style.paddingLeft = "8px");
    // const m = document.createElement("img");
    // (m.src = chrome.runtime.getURL("images/logo.jpg")),
    //   (m.alt = "none"),
    //   m.addEventListener("click", function () {
    //     window.open(`${domainUrl}/login`);
    //   }),
    //   (m.style.height = "30px"),
    //   (m.style.marginLeft = "-16px"),
    //   (m.style.cursor = "pointer"),
    //   (m.style.zIndex = "999"),
    //   p.appendChild(m),
      r.appendChild(p);
    const u = document.createElement("div");
    (u.style.width = "250px"),
    (u.style.display = "flex"), (u.style.alignItems = "center"), (u.style.justifyContent = "space-between");
    const y = document.createElement("div");
    (y.title = "Turn on/off captions"),
      y.setAttribute("id", "yomom-caption-toggle"),
      y.classList.add("imageContainer"),
      y.addEventListener("click", toggleCaptions);
    const h = createCaptionOnIcon();
    (h.id = "captionIcon"), y.appendChild(h), u.appendChild(y);
    const g = document.createElement("div");
    (g.title = "Auto-Scroll"), g.setAttribute("id", "yomom-autoScroll");
    const x = document.createElement("input");
    (x.type = "hidden"),
      (x.value = 1),
      x.setAttribute("id", "autoscroll"),
      (x.onchange = () => autoScroll()),
      g.appendChild(x),
      g.classList.add("imageContainer"),
      g.addEventListener("click", function () {
        let e = document.getElementById("autoscroll");
        "0" === e.value.toString() ? (e.value = 1) : (e.value = 0),
          autoScroll();
      });
    const C = createAutoScrollIcon();
    (C.style.width = "15px"),
      (C.style.height = "15px"),
      g.appendChild(C),
      u.appendChild(g);
    const v = document.createElement("div");
    (v.title = "Download"),
      (v.id = "yomom-openDownloadMenu"),
      v.classList.add("imageContainer"),
      v.addEventListener("click", displayMenu);
    const f = createDownloadIcon();
    (f.style.width = "15px"),
      (f.style.height = "15px"),
      v.appendChild(f),
      u.appendChild(v);
    const E = document.createElement("div");
    (E.title = "Minimize"),
      (E.id = "yomom-minimizePanel"),
      E.classList.add("imageContainer"),
      E.addEventListener("click", minimize);
    const b = createCollapseIcon();
    (b.style.width = "15px"),
      (b.style.height = "15px"),
      E.appendChild(b),
      u.appendChild(E),
      r.appendChild(u),
      c.appendChild(r);
      // H.appendChild(c);
    const k = document.createElement("div");
    (k.style.width = "300px"),
      (k.style.backgroundColor = "#292c35"),
      (k.style.paddingTop = "8px");
    const I = document.createElement("div");
    (I.id = "google-meet-quota"),
      (I.style.display = "none"),
      (I.style.margin = "0px 8px"),
      (I.style.padding = "4px"),
      (I.style.textAlign = "center"),
      I.addEventListener("click", upgrade),
      (I.style.cursor = "pointer"),
      (I.innerHTML = "Used Google Meet Quota: "),
      (I.style.borderRadius = "12px"),
      (I.style.border = "1px solid rgba(255, 255, 255, 0.5)"),
      (I.style.backgroundColor = "#454953"),
      (I.style.color = "#ffffff"),
      (I.style.fontSize = "10px");
    const w = document.createElement("div");
    (w.id = "meeting-name"),
      (w.style.fontWeight = "bold"),
      (w.style.padding = "8px"),
      (w.style.color = "#FFFFFF"),
      k.appendChild(I),
      k.appendChild(w);
    const T = document.createElement("div");
    (T.style.paddingTop = "8px"),
      (T.style.width = "25%"),
      (k.style.paddingBottom = "8px"),
      c.appendChild(k);
    const M = document.createElement("div");
    M.setAttribute("id", "feature"),
      (M.style.width = "300px"),
      (M.style.backgroundColor = "#292c35"),
      (M.style.borderRadius = "0 0 12px 12px");
    const B = document.createElement("div");
    B.setAttribute("id", "caption"),
      (B.style.height = "350px"),
      (B.style.width = "300px"),
      (B.style.overflowY = "auto"),
      (B.style.overflowX = "hidden"),
      (B.style.color = "#FFFFFF"),
      (B.style.paddingRight = "8px"),
      (B.onwheel = () => {
        x.value = 0;
      }),
      M.appendChild(B);
    const H = document.createElement("div");
    (H.id = "highlight-yomom"),
      (H.style.width = "300px"),
      (H.style.backgroundColor = "#292c35"),
      (H.style.display = "flex"),
      (H.style.justifyContent = "space-around"),
      (H.style.borderTop = "1px solid #e0e0e0"),
      (H.style.paddingTop = "10px"),
      (H.style.paddingBottom = "10px"),
      (H.style.cursor = "move")
      H.classList.add("popup"),
      (H.style.borderRadius = "0 0 12px 12px");
    // for (let e = 0; e < bookmarkList.length; e++) {
    //   const t = document.createElement("div"),
    //     n = document.createElement("div");
    //   (t.style.display = "flex"),
    //     (t.style.flexDirection = "column"),
    //     (t.style.alignItems = "center"),
    //     (n.style.textAlign = "center"),
    //     (n.style.fontSize = "10px"),
    //     (n.style.color = "#9e9e9e"),
    //     (n.style.marginTop = "4px"),
    //     (n.innerHTML = bookmarkList[e].name),
    //     (n.id = `yomom-highlight-${bookmarkList[e].code}-title`);
    //   const l = document.createElement("div");
    //   (l.title = `Highlight as ${bookmarkList[e].name}`),
    //     l.classList.add("flagContainer"),
    //     (l.id = `yomom-highlight-${bookmarkList[e].code}`);
    //   const i = createSVGIcon(
    //     bookmarkList[e].attributes,
    //     bookmarkList[e].content
    //   );
    //   l.appendChild(i),
    //     (l.onclick = () => {
    //       highlight(e);
    //     }),
    //     t.appendChild(l),
    //     t.appendChild(n),
    //     H.appendChild(t);
    // }
    // let A = document.createElement("div");
    // (A.id = "popup"),
    //   (A.className = "popupText"),
    //   (A.innerHTML = "Test"),
    //   (A.onclick = () => {
    //     clearTimeout(notificationsTimeout), A.classList.remove("show");
    //   }),
    //   H.appendChild(A),
      M.appendChild(H),
      c.appendChild(M),
      t.appendChild(c),
      dragElement(H),
      dragElement(t),
      
      autoScroll(),
      document.getElementById("yomom-downloadMenu") || addDownloadMenu(),
      (checkCaptionStatusInterval = setInterval(checkCaptionStatus, 500)),
      y.click(),
      debug("turned on caption"),
      removeCaptionPanel(),
      (autoSaveInterval = setInterval(() => {
        let e = document.getElementById("autoSaveCheck");
        e && e.checked && Export2Model(!0).catch((e) => console.error(e));
      }, 3e5)),
      setTimeout(updateMeetingName, 500),
      clearInterval(checkOngoingMeeting);
  }
};
function addRoot() {
  const e = document.createElement("div");
  e.setAttribute("id", "yomom-root"),
    (e.style.position = "absolute"),
    (e.style.zIndex = "2000"),
    (e.style.right = currentRight),
    (e.style.top = currentTop),
    (e.style.height = "10px"),
    (e.style.width = "10px"),
    document.body.appendChild(e);
}

function addMiniPanel() {
  const e = document.getElementById("yomom-root"),
    t = document.createElement("div");
  t.setAttribute("id", "yomom-miniPanel"),
    t.classList.add("panelBase"),
    (t.style.width = "60px"),
    (t.style.paddingBottom = "16px"),
    (t.style.backgroundColor = "#292c35");
  const n = document.createElement("div");
  n.setAttribute("name", "yomom-rootHeader"),
    (n.style.cursor = "pointer"),
    n.classList.add("col-12"),
    (n.style.height = "50px"),
    (n.style.width = "50px"),
    (n.style.marginBottom = "-10px"),
    (n.style.cursor = "move"),
    (n.style.zIndex = "999");

  t.appendChild(n);
  const i = document.createElement("div");
  (i.title = "Expand"),
    (i.id = "yomom-expandPanel"),
    (i.style.width = "100%"),
    (i.style.display = "flex"),
    (i.style.justifyContent = "center"),
    (i.style.alignItems = "center"),
    i.classList.add("miniButtonContainer"),
    i.addEventListener("click", addTutorialPanel);
  const o = createExpandIcon();
  (o.id = "expandInputIcon"),
    i.appendChild(o),
    t.appendChild(i),
    e.appendChild(t),
    dragElement(e);
}
removeCaptionPanel();

(addDownloadMenu = () => {
  let e = document.createElement("div");
  (e.id = "yomom-downloadMenu"),
    (e.className = "modal"),
    (e.style.display = "none");
  let t = document.createElement("div");
  (t.className = "modal-content"), (t.id = "yomom-downloadMenuContent"), (t.style.height = "80%"), (t.style.width = "100%"), (t.style.display = "flex"), (t.style.flexDirection = "column"), (t.style.justifyContent = "space-between"), (t.style.alignItems = "center");
  let n = document.createElement("div");
  (n.className = "modal-header"),
    (n.innerHTML = "Download settings"),
    t.appendChild(n);
  let l = document.createElement("div"),
    i = document.createElement("div");
  (i.className = "modal-body"),
    (i.innerHTML =
      "File type<select name='extension' id='extension' value='yomom'><option value='app'>Select format</option><option value='doc'>doc</option><option value='pdf'>pdf</option><option value='txt'>txt</option></select>"),
    l.appendChild(i);
  let o = document.createElement("div");
  (o.className = "modal-body"),
    (o.innerHTML =
      "<div>Highlights</div><div><input type='checkbox' name='highlightCheck' id='highlightCheck' checked='true'/></div>"),
    l.appendChild(o);
  let d = document.createElement("div");
  (d.className = "modal-body"),
    (d.innerHTML =
      "<div>Timestamps</div><div><input type='checkbox' checked='true' name='timestampCheck' id='timestampCheck'/></div>"),
    l.appendChild(d);
  let a = document.createElement("div");
  (a.className = "modal-body"),
    (a.title = "Autosave to yomom every 5 minutes"),
    (a.style.cursor = "help"),
    (a.innerHTML =
      "<div>Send to mail</div><div><input type='checkbox' checked='true' name='autoSaveCheck' id='autoSaveCheck'/></div>"),
    l.appendChild(a),
    t.appendChild(l);
  let s = document.createElement("div");
  s.className = "modal-footer";
  let c = document.createElement("button");
  c.classList.add("modal-button"),
    (c.id = "yomom-close-menu"),
    (c.style.border = "solid 2px #292c35"),
    (c.style.backgroundColor = "#454953"),
    (c.innerHTML = "Cancel"),
    (c.onclick = () => {
      document.getElementById("yomom-downloadMenu").style.display = "none";
    }),
    s.appendChild(c);
  let r = document.createElement("button");
  r.classList.add("modal-button"),
    (r.style.backgroundColor = "#292c35"),
    (r.style.boxShadow = "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.29)"),
    (r.innerHTML = "Download"),
    r.addEventListener("click", downloadTranscript),
    r.setAttribute("id", "yomom-confirm-download"),
    s.appendChild(r),
    t.appendChild(s),
    e.appendChild(t);
  const p = document.getElementById("yomom-root");
  p && p.appendChild(e);
}),
  (minimize = () => {
    const e = document.getElementById("yomom-mainPanel"),
      t = document.getElementById("yomom-miniPanel");
    (e.style.display = "none"), (t.style.display = "block");
  });

(autoScroll = () => {
  let e = document.getElementById("yomom-autoScroll");
  e.style.border = "1px solid #2196f3";
  const t = document.getElementById("caption"),
    n = document.getElementById("autoscroll"),
    l = setInterval(function () {
      "0" === n.value.toString()
        ? (clearInterval(l), (e.style.border = "1px solid #292c35"))
        : (t.scrollTop = t.scrollHeight);
    }, 1e3);
}),
  (updateMeetingName = () => {
    const e = document.getElementById("meeting-name");
    getMeetingName()
      ? (e.innerHTML = getMeetingName())
      : (e.innerHTML = getDefaultName());
  }),
  //   addRoot(),
  //   addMiniPanel();
  // const checkOngoingMeeting = setInterval(
  //   tryTo(addCaptionPanel, "adding button"),
  //   1e3
  // );
  (highlight = (e) => {
    let t = document.getElementById("highlight-yomom"),
      n = document.getElementById("popup"),
      l = document.getElementById("yomom-miniPanel");
    weTurnedCaptionsOn
      ? bookmarkList.forEach((l, i) => {
          const o = t.childNodes[i].childNodes[0],
            d = t.childNodes[i].childNodes[1],
            a = document.getElementById(
              `yomom-highlight-${bookmarkList[i].code}-mini`
            );
          i === e
            ? l.enable
              ? ((l.enable = !1),
                (o.style.backgroundColor = ""),
                (a.style.backgroundColor = ""),
                (d.style.color = "#9e9e9e"),
                clearTimeout(notificationsTimeout),
                n.classList.remove("show"))
              : ((l.enable = !0),
                (o.style.backgroundColor = "#696969"),
                (a.style.backgroundColor = "#696969"),
                (d.style.color = "#ffffff"),
                (n.innerHTML = "Your conversation is being highlighted."),
                (n.style.backgroundColor = "#454953"),
                (n.style.color = l.code),
                n.classList.add("show"),
                clearTimeout(notificationsTimeout),
                (notificationsTimeout = setTimeout(() => {
                  n.classList.remove("show");
                }, notificationsTimeoutDuration)))
            : ((l.enable = !1),
              (o.style.backgroundColor = ""),
              (a.style.backgroundColor = ""),
              (d.style.color = "#9e9e9e"));
        })
      : (l.style.display && alert("Your caption is turned off"),
        (n.style.backgroundColor = "#818388"),
        (n.style.color = "#292c35"),
        (n.innerHTML = "Your caption is turned off"),
        n.classList.add("show"),
        clearTimeout(notificationsTimeout),
        (notificationsTimeout = setTimeout(() => {
          n.classList.remove("show");
        }, notificationsTimeoutDuration)));
  });


  function trimText(e, t = ""){
    let o = document.createElement("a"),
    n = e.replaceAll("<br>", "\n"),
    i = document.createElement("div");
  (i.style.display = "none"), (i.innerHTML = n);
  let s = i.innerText;
  let usefulText = s.split("Transcripts")[1];
  return usefulText;
  }

  var oldTranscript = null;
  var global_generatedMOM = "";
  var global_agenda="";
  var timeMinutes = 0;
  var startTimeGlobal = new Date();
  generateAgenda("");
  
  setInterval(async function()  {
      console.log('I am running every 60 secs');
     
    const e = document.getElementById("meeting-name").innerText,
      t = document.getElementById("yomom-confirm-download");
      t.innerHTML = "Downloading...";
    const o = document.getElementById("highlightCheck").checked,
      n = document.getElementById("timestampCheck").checked,
      i = document.getElementById("extension").value.toString(),
      s = getTranscriptText(o, n);
      var newTranscript="";
  
      if (oldTranscript == null) {
          oldTranscript = s;
          newTranscript = s;
      } else if (oldTranscript != s) {    
          newTranscript = s.split(oldTranscript).pop();
          oldTranscript = s;
      }
      newTranscript = trimText(newTranscript,e);
      global_generatedMOM += "\n";
      global_generatedMOM += "(0"+timeMinutes.toString()+":00) -   "; 
      global_generatedMOM += await generateAndReturnMOM(newTranscript);
      global_generatedMOM += "\n\n";
      timeMinutes+=1;
      console.log(global_generatedMOM);
  }
  , 60000);
  