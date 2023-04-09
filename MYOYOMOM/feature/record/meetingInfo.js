const getMeetingName = () => {
    let e = xpath(XPATH_TITLE_V20220324)?.innerText;
    e || (e = xpath(XPATH_TITLE)?.innerText),
      e === SEARCH_TEXT_NO_MEETING_NAME &&
        (e = xpath(XPATH_TITLE_TOOLTIP)?.innerText);
    const t = document.location.pathname.match(/\/(.+)/)[1];
    if (e && e !== SEARCH_TEXT_NO_MEETING_NAME && e !== t) return e;
  },
  checkMeetingStatus = () => {
    const e = xpath(
        "//body[@id='yDmH0d']/c-wiz/div/div[2]/div/div/div[3]/div/div/div/div/button/div[2]"
      ),
      t = xpath('//*[@id="ow3"]/div/div[1]');
    e
      ? (meetingStatus = 0)
      : findButtonContainer()
      ? (meetingStatus = 1)
      : t &&
        ((meetingStatus = 2),
        clearInterval(checkCaptionStatusInterval),
        clearInterval(autoSaveInterval));
  };
//   renewToken = (e) => {
//     chrome.storage.local.get(["refreshToken"], function (t) {
//       let n = JSON.stringify({ idToken: e, refreshToken: t.refreshToken }),
//         o = {
//           Authorization: `Bearer ${e}`,
//           "Content-Type": "application/json",
//         };
//       window
//         .fetch(`${domainUrl}/api/v1/users/token`, {
//           method: "POST",
//           headers: o,
//           body: n,
//         })
//         .then((e) => {
//           200 === e.status
//             ? e.json().then((e) => {
//                 chrome.storage.local.set(
//                   { token: e.id_token, refreshToken: e.refreshToken },
//                   function () {}
//                 );
//               })
//             : 401 === e.status
//             ? (debug("Unauthorized"), reDisplayRemindLogin())
//             : (e.json().then((e) => {
//                 debug(e.message);
//               }),
//               reDisplayRemindLogin());
//         })
//         .catch((e) => {
//           debug(e), reDisplayRemindLogin();
//         });
//     });
//   },
//   checkToken = () => {
//     chrome.storage.local.get(["token"], function (e) {
//       if (e.token) {
//         const t = () => {
//           const t = 1e3 * JSON.parse(atob(e.token.split(".")[1])).exp,
//             n = Date.now();
//           if (n >= t)
//             return (
//               debug("Your token is expired!"),
//               reDisplayPrompt(),
//               void reDisplayRemindLogin()
//             );
//           var o;
//           t - n < 6048e5 &&
//             (debug("Refresh JWT token"),
//             (o = e.token),
//             chrome.storage.local.get(["refreshToken"], function (e) {
//               let t = JSON.stringify({
//                   idToken: o,
//                   refreshToken: e.refreshToken,
//                 }),
//                 n = {
//                   Authorization: `Bearer ${o}`,
//                   "Content-Type": "application/json",
//                 };
//               window
//                 .fetch(`${domainUrl}/api/v1/users/token`, {
//                   method: "POST",
//                   headers: n,
//                   body: t,
//                 })
//                 .then((e) => {
//                   200 === e.status
//                     ? e.json().then((e) => {
//                         chrome.storage.local.set(
//                           { token: e.id_token, refreshToken: e.refreshToken },
//                           function () {}
//                         );
//                       })
//                     : 401 === e.status
//                     ? (debug("Unauthorized"), reDisplayRemindLogin())
//                     : (e.json().then((e) => {
//                         debug(e.message);
//                       }),
//                       reDisplayRemindLogin());
//                 })
//                 .catch((e) => {
//                   debug(e), reDisplayRemindLogin();
//                 });
//             }));
//         };
//         tryTo(t(), "check whether token expired");
//         const n = {
//             method: "GET",
//             headers: { Authorization: `Bearer ${e.token}` },
//           },
//           o = () => window.fetch(`${domainUrl}/api/v1/users/info`, n),
//           i = () =>
//             window.fetch(`${domainUrl}/api/v1/templates?quick-note=true`, n);
//         Promise.all([o(), i()])
//           .then((e) => {
//             if (200 === e[0].status && 200 === e[1].status) {
//               loginStatus = 1;
//               const t = document.getElementById("login-prompt");
//               t && (t.style.display = "none");
//               const o = document.getElementById("yomom-remindLogin");
//               o && (o.style.display = "none"),
//                 e[0].json().then((e) => {
//                   const t = e;
//                   appUser = `${t.firstName} ${t.lastName}`;
//                   const o = new Map();
//                   o.set("free", 30),
//                     o.set("starter", 60),
//                     o.set("basic", -1),
//                     o.set("premium", -1),
//                     window
//                       .fetch(`${domainUrl}/api/v1/teams/isAdmin`, n)
//                       .then((e) => {
//                         e.json().then((e) => {
//                           e.isAdmin || e.hasTeam
//                             ? window
//                                 .fetch(`${domainUrl}/api/v1/teams/info`, n)
//                                 .then((e) => {
//                                   e.json().then((e) => {
//                                     console.log(e),
//                                       displayGoogleMeetQuota(
//                                         e.usedGoogleMeetQuota +
//                                           e.usedZoomAppQuota +
//                                           e.usedWebexQuota,
//                                         0 === e.onlineMeetingsQuota
//                                           ? -1
//                                           : e.onlineMeetingsQuota
//                                       );
//                                   });
//                                 })
//                             : displayGoogleMeetQuota(
//                                 t.usedGoogleMeetQuota +
//                                   t.usedZoomAppQuota +
//                                   t.usedWebexQuota,
//                                 o.get(t.plan)
//                               );
//                         });
//                       });
//                 }),
//                 e[1].json().then((e) => {
//                   let t = bookmarkList;
//                   e.items[0].topics.forEach((e) => {
//                     let n = bookmarkList.findIndex((t) => t.code === e.color);
//                     if (-1 !== n) {
//                       if (
//                         ((t[n].name = e.name),
//                         document.getElementById(
//                           `yomom-highlight-${e.color}-title`
//                         ))
//                       ) {
//                         document.getElementById(
//                           `yomom-highlight-${e.color}-title`
//                         ).innerHTML = e.name;
//                       }
//                       let o = document.getElementById(
//                           `yomom-highlight-${e.color}`
//                         ),
//                         i = document.getElementById(
//                           `yomom-highlight-${e.color}-mini`
//                         );
//                       o && (o.title = `Highlight as ${e.name}`),
//                         i && (i.title = `Highlight as ${e.name}`);
//                     }
//                   }),
//                     (bookmarkList = t);
//                 });
//             } else
//               401 === e[0].status || 401 === e[2].status
//                 ? (reDisplayPrompt(), reDisplayRemindLogin())
//                 : e[0].json().then((e) => {
//                     window.alert(e.message);
//                   });
//           })
//           .catch((e) => {
//             window.alert(e);
//           });
//       } else reDisplayPrompt(), reDisplayRemindLogin();
//     });
//   };

let hasCaptionButtons = !1;
const checkCaptionStatus = () => {
    if ((checkMeetingStatus(), 1 === meetingStatus)) {
      const e = getElementWithXPathFallback(
          document,
          XPATH_TURN_ON_CAPTIONS_BUTTON,
          XPATH_TURN_ON_CAPTIONS_BUTTON_V20210602
        ),
        t = getElementWithXPathFallback(
          document,
          XPATH_TURN_OFF_CAPTIONS_BUTTON,
          XPATH_TURN_OFF_CAPTIONS_BUTTON_V20210602
        );
      if (null == e && null == t)
        return void tryTo(startTranscribing(), "start");
      hasCaptionButtons = !0;
      let n = !1;
      if (
        (e && !t && (n = !1),
        !e && t && (n = !0),
        firstStart || n !== weTurnedCaptionsOn)
      ) {
        (firstStart = !1), (weTurnedCaptionsOn = n);
        const e = document.getElementById("feature"),
          t = document.getElementById("yomom-caption-toggle");
        e &&
          t &&
          (n
            ? ((isCaptionTurnedOn = !0),
              notificationsOn(),
              tryTo(startTranscribing(), "start"))
            : tryTo(stopTranscribing(), "stop"));
      }
    }
  },
  setCurrentTranscriptDetails = () => {
    const e = new Date(),
      t = `${e.getFullYear()}-${pad(e.getMonth() + 1)}-${pad(e.getDate())}`,
      n = `${document.location.pathname.match(/\/(.+)/)[1]}-${t}`,
      o = n !== currentTranscriptId;
    if (o || null === currentSessionIndex) {
      (currentTranscriptId = n), checkTranscriptionId(), (loadLocalStorage = 1);
      const e = get(KEY_TRANSCRIPT_IDS) || [];
      if (
        (e.includes(currentTranscriptId) ||
          (e.unshift(currentTranscriptId), set(KEY_TRANSCRIPT_IDS, e)),
        (currentSessionIndex = increment(`hangout_${currentTranscriptId}`)),
        debug({
          currentTranscriptId: currentTranscriptId,
          currentSessionIndex: currentSessionIndex,
        }),
        o)
      ) {
        const e = getMeetingName();
        e && set(`${makeTranscriptKey(currentTranscriptId)}_name`, e);
      }
    }
  };
