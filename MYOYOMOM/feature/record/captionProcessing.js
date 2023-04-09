const spansToText = (e) => e.map((e) => e.textContent).join(" "),
  mergeSpans = (e, t) => {
    const s = e.map((e) => e.textContent);
    if (Array.isArray(t) && t.length) {
      const n = stringSimilarity.findBestMatch(t[0].textContent, s);
      return [].concat(e.slice(0, n.bestMatchIndex), t);
    }
    return t;
  },
  isDataNodeEquals = (e, t) => {
    if (e.hash === t.hash) return !0;
    if (
      e.person === t.person &&
      e.image === t.image &&
      Math.abs(e.spans.length - t.spans.length) <= 3
    ) {
      const s = spansToText(e.spans),
        n = spansToText(t.spans);
      return stringSimilarity.compareTwoStrings(s, n) >= 0.6;
    }
    return !1;
  },
  getCaptionData = (e) => {
    if (e && e.querySelector("img")?.src) {
      const t = e.querySelector("img").src.replace(/=s[\d]+/, "=s50"),
        s = xpath(".//div/text()", e),
        n = Array.from(e.querySelectorAll("span")).filter(
          (e) => 0 === e.children.length
        ),
        i = n.map((e) => e.textContent).join(" ");
      return { image: t, person: s.textContent, spans: n, text: i, hash: e };
    }
    return null;
  },
  updateCurrentTranscriptSession = (e) => {
    debug(e);
    const t = getCaptionData(e);
    if (t && t.text && t.text.trim()) {
      let e = new Date();
      if (1 === loginStatus || 0 === loginStatus) {
        const s = CACHE.length
          ? CACHE.findIndex((e) => isDataNodeEquals(e, t))
          : -1;
        if (-1 === s || e - CACHE[s].endedAt >= 1e4) {
          debug(`New paragraph: ${t.text}`);
          const s = increment(
            makeTranscriptKey(currentTranscriptId, currentSessionIndex)
          );
          CACHE.unshift({
            ...t,
            startedAt: e,
            endedAt: e,
            count: 0,
            pollCount: 0,
            transcriptId: currentTranscriptId,
            sessionIndex: currentSessionIndex,
            speakerIndex: s,
          }),
            sessionList.unshift({
              ...t,
              startedAt: e,
              endedAt: e,
              transcriptId: currentTranscriptId,
              sessionIndex: currentSessionIndex,
              speakerIndex: s,
            }),
            appendSessionNode(),
            setSpeaker(CACHE[0]);
        } else {
          const n = CACHE[s];
          debug(
            `Current paragraph: ${spansToText(
              n.spans
            )}, updating paragraph: ${spansToText(t.spans)}`
          ),
            (n.spans = mergeSpans(n.spans, t.spans)),
            (sessionList[s].text = spansToText(n.spans)),
            updateSessionNode(s),
            n.debounce && clearInterval(n.debounce),
            (n.count += 1),
            0 === s && ((n.endedAt = e), (sessionList[s].endedAt = e)),
            (n.debounce = setInterval(
              tryTo(() => {
                (n.text = spansToText(n.spans)),
                  debug("count", n.count, "polls", n.pollCount),
                  setSpeaker(n),
                  clearInterval(n.debounce),
                  clearInterval(n.poll),
                  delete n.poll;
              }, "trailing caption poll"),
              1e3
            )),
            "poll" in n ||
              ((sessionList[s].text = spansToText(n.spans)),
              updateSessionNode(s),
              (n.poll = setInterval(
                tryTo(() => {
                  (n.pollCount += 1),
                    (n.text = spansToText(n.spans)),
                    setSpeaker(n);
                }, "caption polling"),
                1e3
              )));
        }
      }
    }
  },
  checkTranscriptionId = () => {
    return;
    const e = getTranscript(currentTranscriptId);
    let t = document.getElementById("caption"),
      s = "";
    for (
      t &&
      t.childNodes &&
      t.childNodes[t.childNodes.length - 1] &&
      (s =
        t.childNodes[t.childNodes.length - 1].firstChild.childNodes[2]
          .innerText);
      e.length > 0;

    )
      (!s || s < getTimeStr(startTime, e[0].startedAt)) &&
        (sessionList.unshift(e[0]), appendSessionNode()),
        e.shift();
  },
  appendSessionNode = () => {
    let e = [];
    1 === loadLocalStorage &&
      (bookmarkList.forEach((t) => {
        t.enable && (e[0] = t.color);
      }),
      (sessionList[0].highlight = e),
      (CACHE[0].highlight = e)),
      0 === loadLocalStorage && (e = sessionList[0].highlight);
    const t = document.getElementById("caption"),
      s = document.createElement("div"),
      n = document.createElement("div");
    (n.style.display = "flex"),
      (n.style.alignItems = "center"),
      (n.style.width = "100%"),
      (s.style.width = "100%"),
      (s.style.paddingLeft = "8px"),
      (s.style.paddingBottom = "8px");
    const i = document.createElement("img");
    (i.src = sessionList[0].image),
      (i.alt = "none"),
      (i.style.width = "24px"),
      (i.style.height = "24px"),
      (i.style.borderRadius = "50%"),
      n.appendChild(i);
    const o = document.createElement("div");
    (o.innerHTML =
      "You" === sessionList[0].person ? appUser : sessionList[0].person),
      (o.style.color = "#ADFF2F"),
      (o.style.fontSize = "12px"),
      (o.style.paddingLeft = "8px"),
      (o.style.width = "25%"),
      (o.style.textOverflow = "ellipsis"),
      (o.style.whiteSpace = "nowrap"),
      (o.style.overflow = "hidden"),
      n.appendChild(o);
    const r = document.createElement("div");
    let l =
      getTimeStr(startTime, sessionList[0].startedAt) +
      " - " +
      getTimeStr(startTime, sessionList[0].endedAt);
    (r.innerHTML = l),
      (r.style.color = "#F0E68C"),
      (r.style.fontSize = "12px"),
      (r.style.paddingRight = "16px"),
      n.appendChild(r);
    const a = document.createElement("div");
    e.forEach((e) => {
      const t = document.createElement("img");
      (t.style.height = "12px"),
        (t.style.width = "12px"),
        (t.src = chrome.runtime.getURL("image/bookmark/" + e + ".svg")),
        a.appendChild(t);
    }),
      n.appendChild(a),
      s.appendChild(n);
    const d = document.createElement("div");
    if (
      (d.classList.add("tooltip", "col-12"),
      (d.style.marginTop = "4px"),
      (d.style.padding = "8px 4px"),
      e.length)
    ) {
      let t = e[0];
      (d.style.border = `1px solid ${t}`),
        (d.style.borderRadius = "12px"),
        (d.style.backgroundColor = "#454953");
    } else (d.style.border = ""), (d.style.backgroundColor = "inherit");
    const c = document.createElement("div");
    (c.style.color = "#FFFFFF"),
      (c.innerHTML = sessionList[0].text),
      d.appendChild(c);
    const p = document.createElement("span");
    // p.classList.add("tooltiptext"),
      // bookmarkList.forEach((t, s) => {
      //   const n = document.createElement("input");
      //   (n.type = "image"),
      //     (n.title = t.name),
      //     (n.style.width = "16px"),
      //     (n.style.height = "16px"),
      //     (n.style.borderRadius = "50%"),
      //     (n.style.padding = "2px"),
      //     (n.style.border = "solid 1px #9e9e9e"),
      //     (n.style.margin = "2px"),
      //     (n.src = chrome.runtime.getURL("image/bookmark/" + t.color + ".svg")),
      //     -1 !== e.indexOf(t.color) && (n.style.backgroundColor = "#696969");
      //   const i = sessionList.length;
      //   (n.onclick = tryTo(
      //     () => highlightTranscribed(s, sessionList.length - i),
      //     "bookmark transcribed paragraph"
      //   )),
      //     p.appendChild(n);
      // }),
      d.appendChild(p),
      s.appendChild(d),
      t.appendChild(s);
  },
  updateSessionNode = (e) => {
    let t = sessionList[e].highlight ? sessionList[e].highlight : [];
    1 === loadLocalStorage &&
      (bookmarkList.forEach((s) => {
        s.enable &&
          (sessionList[e]?.highlight.length > 0
            ? sessionList[e].highlight[0] !== s.color && (t[0] = s.color)
            : (t[0] = s.color));
      }),
      (sessionList[e].highlight = t),
      (CACHE[e].highlight = t)),
      0 === loadLocalStorage && (t = CACHE[e].highlight);
    const s = document.getElementById("caption"),
      n = s.childNodes[s.childNodes.length - 1 - e],
      i = n.firstChild,
      o = i.lastChild,
      r = n.lastChild,
      l = i.childNodes[2];
    if (
      ((r.firstChild.innerHTML = sessionList[e].text),
      (l.innerHTML =
        getTimeStr(startTime, sessionList[e].startedAt) +
        " - " +
        getTimeStr(startTime, sessionList[e].endedAt)),
      t.length)
    ) {
      let e = t[0];
      (r.style.border = `1px solid ${e}`),
        (r.style.borderRadius = "12px"),
        (r.style.backgroundColor = "#454953");
    } else (r.style.border = ""), (r.style.backgroundColor = "inherit");
    const a = r.getElementsByTagName("span")[0];
    (o.textContent = ""),
      t.forEach((e) => {
        const t = document.createElement("img");
        (t.style.height = "12px"),
          (t.style.width = "12px"),
          (t.src = chrome.runtime.getURL("image/bookmark/" + e + ".svg")),
          o.appendChild(t),
          a.childNodes.forEach((t) => {
            t.src.includes(e) && (t.style.backgroundColor = "#696969");
          });
      });
  },
  highlightTranscribed = (e, t) => {
    const s = bookmarkList[e].color,
      n = document.getElementById("caption"),
      i =
        n.childNodes[n.childNodes.length - 1 - t].getElementsByTagName(
          "span"
        )[0],
      o = n.childNodes[n.childNodes.length - 1 - t].childNodes[1],
      r = i.childNodes[e];
    -1 !== sessionList[t].highlight.indexOf(s)
      ? ((sessionList[t].highlight = []),
        setSpeaker(sessionList[t]),
        (r.style.backgroundColor = ""),
        (o.style.border = ""),
        (o.style.backgroundColor = "inherit"))
      : ((sessionList[t].highlight = [s]),
        setSpeaker(sessionList[t]),
        i.childNodes.forEach((e) => {
          e.style.backgroundColor = "";
        }),
        (r.style.backgroundColor = "#696969"),
        (o.style.border = `1px solid ${s}`),
        (o.style.borderRadius = "12px"),
        (o.style.backgroundColor = "#454953"));
    const l = n.childNodes[n.childNodes.length - 1 - t].firstChild.lastChild;
    (l.textContent = ""),
      sessionList[t].highlight.forEach((e) => {
        const t = document.createElement("img");
        (t.style.height = "12px"),
          (t.style.width = "12px"),
          (t.src = chrome.runtime.getURL("image/bookmark/" + e + ".svg")),
          l.appendChild(t);
      });
  };
