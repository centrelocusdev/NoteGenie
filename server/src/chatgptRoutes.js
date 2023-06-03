const router = require('express').Router()
const axios = require('axios')

router.post('/send-prompt', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: [
        {role: "user", content: req.body.prompt}
      ]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
      }
    })

    res.send(response.data.choices)
  /**
    res.send([
      {
          "message": {
              "role": "assistant",
              "content": "Page 1 – Introduction and Background Information\n\nPatient Information:\n\nName: John Smith\nDate of Birth: 01/01/1970\nGender: Male\nDiagnosis: Major Depressive Disorder\n\nBackground:\n\nJohn Smith is a 50-year"
          },
          "finish_reason": "length",
          "index": 0
      }
    ])
   */
  } catch (err) {
    res.send({err: err.message})
  }
})

module.exports = router