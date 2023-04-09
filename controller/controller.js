const meetingModel = require("../model/meetingModel");
exports.getMOM = async (req, res) => {
  try {
    const email = req.body.email;
    const meetings = await meetingModel.find({ emails: email });
    // const moms = meetings.map((meeting) => meeting.mom);
    res.status(200).json({ meetings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.newMOM = async (req, res) => {
  try {
    const fetch = await import("node-fetch").then((module) => module.default);
    const { Title, emails, content } = req.body;
    let url =
      "https://api.apyhub.com/generate/html-content/pdf-url?output=test-sample.pdf";

    let options = {
      method: "POST",
      headers: {
        "apy-token":
          "APY0jVaOsYU6KjXllixqEyt37n1iiP0RuzUDrFHcPKTDKaTruduv09jsHhLDd9ei6ZpFfsPZvLnkU",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content }),
    };

    var pdflink = "";
    const mom = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        pdflink = json.data;
        return console.log(json);
      })
      .catch((err) => console.error("error:" + err));
    // console.log(mom);

    const newmom = new meetingModel({
      Title,
      emails,
      pdflink,
    });
    await newmom.save();
    res.send(pdflink);
    console.log("saved");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
