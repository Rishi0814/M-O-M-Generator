const parents = (e) => {
    const t = [e];
    for (; e; e = e.parentNode) t.unshift(e);
    return t;
  },
  getCommonAncestor = (e, t) => {
    const n = parents(e),
      o = parents(t);
    if (n[0] === o[0])
      for (let e = 0; e < n.length; e++) if (n[e] !== o[e]) return n[e - 1];
  },
  xpath = (e, t = document) =>
    document.evaluate(e, t, null, XPathResult.FIRST_ORDERED_NODE_TYPE)
      .singleNodeValue,
  findButtonContainer = () => {
    const e = getElementWithXPathFallback(
        document,
        XPATH_SELECTOR_PARTICIPANTS,
        XPATH_SELECTOR_PARTICIPANTS_V20210602
      ),
      t = getElementWithXPathFallback(
        document,
        XPATH_SELECTOR_CHAT,
        XPATH_SELECTOR_CHAT_V20210602
      );
    return getCommonAncestor(e, t);
  },
  getElementWithXPathFallback = (e, t, n) => xpath(t, e) || xpath(n, e),
  displayMenu = () => {
    let v = document.getElementById("yomom-downloadMenu");
v.style.display = "flex";
v.style.flexDirection = "column";
v.style.alignItems = "center";
v.style.justifyContent = "center";
v.style.height = "300px";
v.style.width = "250px";
v.style.position = "absolute";
v.style.top = "30px";
v.style.right = "10px";
v.style.backgroundColor = "#fff";
v.style.borderRadius = "10px";
v.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";

const inputs = document.querySelectorAll("#yomom-downloadMenu input[type='checkbox'], #yomom-downloadMenu select");
const buttons = document.querySelectorAll("#yomom-downloadMenu button");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].style.borderRadius = "5px";
  inputs[i].style.backgroundColor = "#f2f2f2";
  inputs[i].style.border = "none";
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.borderRadius = "5px";
  buttons[i].style.backgroundColor = "#292c35";
  buttons[i].style.color = "#fff";
  buttons[i].style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.29)";
}

  },
  dragElement = (e) => {
    let t = 0,
      n = 0,
      o = 0,
      l = 0;
    function u(e) {
      (e = e || window.event).preventDefault(),
        (o = e.clientX),
        (l = e.clientY),
        (document.onmouseup = c),
        (document.onmousemove = a);
    }
    function a(u) {
      (u = u || window.event).preventDefault(),
        (t = o - u.clientX),
        (n = l - u.clientY),
        (o = u.clientX),
        (l = u.clientY),
        (e.style.top = e.offsetTop - n + "px"),
        (e.style.left = e.offsetLeft - t + "px"),
        (currentTop = e.style.top),
        (currentRight = e.style.right);
    }
    function c() {
      (document.onmouseup = null), (document.onmousemove = null);
    }
    document.getElementsByName(e.id + "Header")
      ? document.getElementsByName(e.id + "Header").forEach((e) => {
          e.onmousedown = u;
        })
      : (e.onmousedown = u);
  };
