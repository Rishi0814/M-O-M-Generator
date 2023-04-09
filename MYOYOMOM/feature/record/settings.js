(window.__gmt_get = (t) => get(`setting.${t}`)),
  (window.__gmt_set = (t, e) => {
    set(`setting.${t}`, e), syncSettings();
  }),
  (window.__gmt_remove = (t) => {
    remove(`setting.${t}`), syncSettings();
  });
const syncSettings = () => {
  (TRANSCRIPT_FORMAT_MEETING = getOrSet(
    "setting.transcript-format-meeting",
    "# $year$-$month$-$day$ $name$\n\n$text$"
  )),
    (TRANSCRIPT_FORMAT_SESSION_JOIN = getOrSet(
      "setting.transcript-format-session-join",
      "\n\n...\n\n"
    )),
    (TRANSCRIPT_FORMAT_SPEAKER = getOrSet(
      "setting.transcript-format-speaker",
      "$hour$:$minute$:$second$\n $name$: $text$"
    )),
    (TRANSCRIPT_FORMAT_SPEAKER_JOIN = getOrSet(
      "setting.transcript-format-speaker-join",
      "\n\n"
    )),
    (SPEAKER_NAME_MAP = getOrSet("setting.speaker-name-map", {})),
    (DEBUG = getOrSet("setting.debug", !1));
};
