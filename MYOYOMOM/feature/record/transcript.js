const getTranscriptText = (e, t) => {
  let o = [];
  sessionList.forEach((e) => {
    o.unshift(e);
  });
  let n = "<div>",
    i = {};
  (n += "<div style='font-size:20pt; color: #2F5496'>Transcripts<br></div>"),
    o.forEach((s, a) => {
      if (
        s.text &&
        s.text.length &&
        (0 === a || s.startedAt !== o[a - 1].startedAt)
      ) {
        let o = "",
          a = "You" === s.person ? appUser : s.person;
        if (s.highlight.length && e && ((o = s.highlight[0]), s.highlight[0])) {
          let e = s.highlight[0],
            t = i[e] ? i[e] : [];
          t.push({
            text: s.text,
            time: getTimeStr(startTime, s.startedAt),
            person: a,
          }),
            (i[e] = t);
        }
        if (
          ((n += "<div style='font-size:11pt'>"),
          (n = n + "<i style='color:#9e9e9e'>" + a),
          t && (n += ` (${getTimeStr(startTime, s.startedAt)})`),
          (n += ": </i>"),
          e && o.length)
        ) {
          const e = bookmarkList.find((e) => e.color === o).code;
          n += `<div style="color:${e}; display:inline">`;
        }
        (n += s.text),
          e && o.length && (n += "</div>"),
          (n += "<br><br></div>");
      }
    }),
    (n += "</div>");
  let s = "";
  return (
    e &&
      ((s += "<div>"),
      (s += "<div style='font-size:20pt; color: #2F5496'>Highlights<br></div>"),
      Object.keys(i).forEach((e) => {
        let t = bookmarkList.find((t) => t.color === e),
          o = t.name,
          n = t.code;
        (s += "<div>"),
          (s += `<span style="color:${n}; font-weight:bold; font-size:14pt">${o}:<br></span>`),
          i[e].forEach((e) => {
            s += `<div style='font-size:11pt'><i style='color:#9e9e9e'>${e.person} (${e.time}): </i>${e.text}<br><br></div>`;
          }),
          (s += "</div>");
      }),
      (s += "</div>")),
    `<div style='font-family:calibri'><div style='font-size:14pt'>${startTime}<br></div>` +
      s +
      n +
      "</div>"
  );
};
(Export2Model = (e, t = "") => {
  let o = document.createElement("a"),
    n = e.replaceAll("<br>", "\n"),
    i = document.createElement("div");
  (i.style.display = "none"), (i.innerHTML = n);
  let s = i.innerText;
  let usefulText = s.split("Transcripts")[1];


  return generateMOM(usefulText);
}),
  (Export2Txt = async (e, t = "") => {
    let o = document.createElement("a");
    let durGlobal = Date() - startTimeGlobal;
      // n = e.replaceAll("<br>", "\n"),
      i = document.createElement("div");
    // (i.style.display = "none"), (i.innerHTML = n);
    // let s = i.innerText;
    var attendeesString = getAttendeedText();
    var agenda ="";
    try {
        agenda =await generateAgenda(global_generatedMOM);
        global_agenda = agenda;
    } catch (error) {

      agenda = "MOM generation project by dhruvish and mridul";
    }
 
    const a = new File(["\n\t\t\t\t\t\t\tMinutes of Meeting\n\n" + "Agenda: "+agenda+"\n\n\n" + attendeesString  + "\n\n"+"Minutes of Meeting \n" + global_generatedMOM], "filename"),
      d = URL.createObjectURL(a);
      return (
        (o.href = d),
        (o.download = `${t}.txt`),
        document.body.appendChild(o),
        o.click(),
        document.body.removeChild(o),
        Promise.resolve(1)
      );
  }),
  (Export2Pdf = (e, t = "") => {
    var attendeesList = sessionList.map((session) => {
      return session.person;
    })
    var uniqueList = attendeesList.filter(function(item, pos) {
      return attendeesList.indexOf(item) == pos;
  })
    const html = `
    <html>
      <head>
        <title>${global_agenda}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            padding: 20px;
            background-color: #f5f5f5;
          }
          h1 {
            font-size: 36px;
            margin-bottom: 20px;
            text-align: center;
          }
          h2 {
            font-size: 24px;
            margin-top: 40px;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Minutes of Meetings</h1>
        <h2>Summary</h2>
        <p>${global_generatedMOM}</p>
        <h2>Attendees</h2>
        <ul>
          ${uniqueList.map(goal => `<li>${goal}</li>`).join('')}
        </ul>
         
      </body>
    </html>
  `;
  getPdfUrl(html).then((url) => {
    chrome.tabs.create({ url: url });
    
  });
    const { jsPDF: o } = window.jspdf,
      n = window.html2pdf;
    t = t ? t + ".pdf" : `${getDefaultName()}.pdf`;
    let i = document.createElement("div");
    (i.innerHTML = e), document.body.appendChild(i);
    const s = {
      margin: [8, 16, 8, 16],
      filename: `${t}.pdf`,
      enableLinks: !1,
      pagebreak: { avoid: ["div"], mode: ["css"] },
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        allowTaint: !0,
        dpi: 144,
        letterRendering: !0,
        logging: !1,
        scale: 2,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: { pdf: new o("p", "pt", "a4") },
    };
    return new Promise((e, t) => {
      n()
        .from(i)
        .set(s)
        .toPdf()
        .get("pdf")
        .then((e) => {
          const t = e.internal.getNumberOfPages();
          for (let o = 1; o < t + 1; o++)
            e.setPage(o),
              e.setFontSize(14),
              e.text(
                `${o}/${t}`,
                e.internal.pageSize.getWidth() - 10,
                e.internal.pageSize.getHeight() - 5
              );
          document.body.removeChild(i);
        })
        // .save()
        .then(() => {
          e("Downloaded");
        })
        .catch((e) => t(e));
    });
  }),
  (Export2Word = (e, t = "") => {
    var o =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>" +
        // e +
       global_generatedMOM +
        "</body></html>",
      n = new Blob(["\ufeff", o], { type: "application/msword" }),
      i = "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(o);
    t = t ? `${t}.doc` : `${getDefaultName()}.doc`;
    var s = document.createElement("a");
    return (
      document.body.appendChild(s),
      navigator.msSaveOrOpenBlob
        ? navigator.msSaveOrOpenBlob(n, t)
        : ((s.href = i), (s.download = t), s.click()),
      document.body.removeChild(s),
      Promise.resolve(1)
    );
  }), 
  
  (Export2App = async (e) => {
    console.log("Rishi barad didnt worked yet ");
  });

  downloadTranscript = () => {
    const e = document.getElementById("meeting-name").innerText,
      t = document.getElementById("yomom-confirm-download");
    t.innerHTML = "Downloading...";
    const o = document.getElementById("highlightCheck").checked,
      n = document.getElementById("timestampCheck").checked,
      i = document.getElementById("extension").value.toString(),
      s = getTranscriptText(o, n);
    let a;
    switch (i) {
      case "pdf":
        a = () => Export2Pdf(s, e);
        break;
      case "doc":
        a = () => Export2Word(s, e);
        break;
      case "txt":
        a = () => Export2Txt(s, e);
        break;
      default:
        a = () => Export2App(o);
    }
    a()
      .then((e) => {
        // "app" === i && window.open(`${domainUrl}/transcript/${e}`, "_blank");
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        t.innerHTML = "Download";
        const e = document.getElementById("laxis-downloadMenu");
        e && (e.style.display = "none");
      });
  };

  function upload(htmlContent) {
    
let url = 'https://m-o-m-generator-4sow.onrender.com/api/';
 
let options = {
  method: 'POST',
  
  body: {
    "Title": global_agenda,
    "emails": ["rishibarad024@gmail.com"], 
    "content":htmlContent,}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
    
  }

  function getAttendeedText(){
    var attendeesList = sessionList.map((session) => {
      return session.person;
    })
    var uniqueList = attendeesList.filter(function(item, pos) {
      return attendeesList.indexOf(item) == pos;
  })

    var attendeesListString = uniqueList.join("\n");
    attendeesListString = "Attendees:\n" + attendeesListString;
    return attendeesListString;

  }

