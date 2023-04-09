const makeFullKey = (e) => `__yomom_${e}`,
  makeTranscriptKey = (...e) => {
    const [t, r, n] = e,
      s = [`hangout_${t}`];
    return (
      e.length >= 2 &&
        (s.push(`session_${r}`), e.length >= 3 && s.push(`speaker_${n}`)),
      s.join("_")
    );
  },
  get = (e) => {
    const t = window.localStorage.getItem(makeFullKey(e));
    return "string" == typeof t || t instanceof String
      ? (debug(e, t), JSON.parse(t))
      : t;
  },
  set = (e, t) => {
    window.localStorage.setItem(makeFullKey(e), JSON.stringify(t));
  },
  remove = (e) => {
    debug(`remove ${makeFullKey(e)}`),
      window.localStorage.removeItem(makeFullKey(e));
  },
  getOrSet = (e, t) => {
    const r = get(e);
    return null == r ? (set(e, t), t) : r;
  },
  increment = (e) => {
    const t = get(e);
    if (null == t) return set(e, 0), 0;
    {
      let r = t + 1;
      return set(e, r), r;
    }
  },
  setSpeaker = (e) => {
    set(makeTranscriptKey(e.transcriptId, e.sessionIndex, e.speakerIndex), {
      image: e.image,
      person: e.person,
      text: e.text,
      startedAt: e.startedAt,
      endedAt: e.endedAt,
      highlight: e.highlight,
    });
  },
  getTranscript = (e) => {
    try {
      const t = get(makeTranscriptKey(e)) || 0;
      let r = [];
      for (let n = 0; n <= t; n += 1) {
        const t = get(makeTranscriptKey(e, n)) || 0;
        for (let s = 0; s <= t; s += 1) {
          const t = get(makeTranscriptKey(e, n, s));
          if (t && t.text && t.text.match(/\S/g)) {
            startTimeStored ||
              ((startTimeStored = new Date(t.startedAt)),
              (startTime = new Date(t.startedAt)));
            const a = {
              transcriptId: e,
              sessionIndex: n,
              speakerIndex: s,
              person:
                t.person in SPEAKER_NAME_MAP
                  ? SPEAKER_NAME_MAP[t.person]
                  : t.person,
              startedAt: new Date(t.startedAt),
              endedAt: new Date(t.endedAt),
              image: t.image,
              text: t.text,
              highlight: t.highlight,
            };
            r.push(a);
          }
        }
      }
      return r;
    } catch (error) {
      console.log(error);
    }
  },
  deleteTranscript = (e) => {
    const t = get(makeTranscriptKey(e));
    for (let r = 0; r <= t; r += 1) {
      const t = get(makeTranscriptKey(e, r));
      for (let n = 0; n <= t; n += 1) remove(makeTranscriptKey(e, r, n));
      remove(makeTranscriptKey(e, r));
    }
    remove(makeTranscriptKey(e)),
      get(makeTranscriptKey(`${e}_name`)) &&
        remove(makeTranscriptKey(`${e}_name`));
    let r = get(KEY_TRANSCRIPT_IDS) || [],
      n = get(APPLICATION_SPEECH_IDS) || [];
    const s = r.indexOf(e),
      a = n.findIndex((t) => t.ext === e);
    r.splice(s, 1),
      n.splice(a, 1),
      debug("would set transcript to", r),
      debug("would set transcript pairs to", n),
      set(KEY_TRANSCRIPT_IDS, r),
      set(APPLICATION_SPEECH_IDS, n);
    const i = document.querySelector(`#${e}`);
    if (i) {
      const e = i.parentNode;
      e.removeChild(i),
        0 === e.children.length &&
          (e.parentNode.removeChild(e.previousSibling),
          e.parentNode.removeChild(e));
    } else debug(`transcriptNode doesn't exist for ${e}`);
  },
  deleteTranscripts = () => {
    let e = get(KEY_TRANSCRIPT_IDS) || [];
    if (e.length > 1)
      for (let t of e) t !== currentTranscriptId && deleteTranscript(t);
  };
