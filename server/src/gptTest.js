const router = require("express").Router();
const axios = require("axios");

const OPENAI_API_KEY = process.env.API_KEY;
const MAX_TOKENS = 100;

async function sendRequestToChatGPT(prompt) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };

  const requestBody = {
    model: "gpt-3.5-turbo",
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  };

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    requestBody,
    { headers }
  );

  const { choices } = response.data;
  const incompleteResponse = choices[0].message.content.trim();
  console.log(choices)
  const finishReason = choices[0].finish_reason;
  const responseLength = incompleteResponse.length;

  return { incompleteResponse, finishReason, responseLength };
}

router.post("/send-prompt", async (req, res) => {
  let completeResponse = "";
  let conversation = [{ role: "user", content: req.body.prompt }];

  for (const { role, content } of conversation) {
    completeResponse += `${role}: ${content}\n`;

    let incompleteResponse, finishReason, responseLength;

    do {
      const response = await sendRequestToChatGPT(completeResponse);
      incompleteResponse = response.incompleteResponse;
      finishReason = response.finishReason;
      responseLength = response.responseLength;

      if (finishReason === "stop" || responseLength === MAX_TOKENS) {
        // Complete response or response length matches max_tokens, no need for further requests
        break;
      }

      completeResponse += incompleteResponse;
    } while (finishReason !== "stop");

    if (finishReason === "stop") {
      break; // Exit the loop if the response is complete
    }
  }
  console.log(completeResponse)
  res.send(completeResponse);
});


module.exports = router;
