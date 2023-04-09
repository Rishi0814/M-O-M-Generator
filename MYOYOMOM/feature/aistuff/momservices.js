

async function generateMOM(data) {
  // data = {
  //   "inputs":data
  // };
  const response = await fetch(
    "https://api.cohere.ai/v1/summarize",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  const mom = result[0]["generated_text"];
  await saveStringToFile(JSON.stringify(mom));
  return mom;
}
async function generateAndReturnMOM(data) {
  console.log("generateAndReturnMOM"," ",data);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/tanviraumi/meeting-minute",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify({
        "inputs":data,
        "wait_for_model": "true"
      }),
    }
  );
  // const result = await response.json();
  // const response = await fetch(
  //   "https://api.cohere.ai/v1/summarize",
  //   {
  //     headers: {
  //       Authorization: "Bearer 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",
  //     },
  //     method: "POST",
  //     body:  JSON.stringify{
  //       "format" :"bullets",
  //       "length" : "auto",
  //       "model" : "summarize-xlarge",
  //       "temperature":1,
  //        "additional_command": '',
  //       "text" : data ,
  //     } ,
  //   }
  // );
  // const result = await response.json();
  // return result["summary"];
  const mom = result[0]["generated_text"];
  return mom;
}

async function generateAgenda(data) {
  console.log("generateAndReturnMOM"," ",data);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/knkarthick/meeting-summary-samsum",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body:
      // JSON.stringify(data),
       JSON.stringify({
        "inputs":data,
        // "wait_for_model": true.toString()
      }),
    }
  );
  const result = await response.json();
  const mom = result[0]["summary_text"];
  return mom;
}

async function saveStringToFile(text, filename) {
  window.open("data:text/txt;charset=utf-8," + escape(text));
  //   const now = new Date();
  //   const a = new File([s], getFileName(filename) + ".txt"),
  //     d = URL.createObjectURL(a);
  //   return;
  //   chrome.downloads.download({
  //     url: "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  //     filename: getFileName(filename) + ".txt",
  //     saveAs: true,
  //   });
}

function getFileName(filename) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return filename + "_" + currentDateTime;
}

// query({ inputs: "The answer to the universe is" }).then((response) => {
//   console.log(JSON.stringify(response));
// });
