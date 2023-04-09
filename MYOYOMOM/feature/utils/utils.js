const pad = (e) => (e < 10 ? `0${e}` : e),
  debug = (...e) => {
    DEBUG && console.log("[yomom debug]", ...e);
  },
  tryTo =
    (e, t) =>
    async (...r) => {
      try {
        return await e(...r);
      } catch (er) {
        console.log("error", er);
      }
    },
  getTimeStr = (e, t) => {
    const r = new Date(t) - e,
      a = Math.trunc(r / 1e3) % 60,
      n = Math.trunc(r / 1e3 / 60);
    return pad(n) + ":" + pad(a);
  },
  signup = () => {
    window.open(loginUrl);
  },
  upgrade = () => {
    window.open(upgradeUrl);
  },
  getDefaultName = () => {
    const e = new Date(),
      t = e.getDate(),
      r = e.getMonth(),
      a = e.getFullYear(),
      n = e.getHours(),
      o = e.getMinutes();
    return `Meeting_${a}${pad(r + 1)}${pad(t)}_${pad(n)}${pad(o)}`;
  };
