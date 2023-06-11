const router = require("express").Router();
const axios = require("axios");

const makeRequest = async (prompt) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      max_tokens: 250,
      messages: [{ role: "user", content: prompt + 'please make sure the res is complete' }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  return response.data.choices[0];
};

router.post("/send-prompt", async (req, res) => { 
  try {
    let completeResponse = ""
    let finishedReason = ""
    let prompt = req.body.prompt
    let maxLimit = 5
    do {
      const response = await makeRequest(prompt);
      finishedReason = response.finish_reason

      completeResponse += response.message.content
      prompt = `please complete this response: ${completeResponse}`

      if(maxLimit == 0 || finishedReason == 'stop') {
        break;           
      }
      maxLimit -= 1
     
    } while(maxLimit > 0);

    res.send({status: 'success', data: completeResponse});
  } catch (err) { 
    res.send({ status: "error", message: err.message });
  }
});

module.exports = router;
