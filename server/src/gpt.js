require('dotenv').config()
const axios = require('axios');

async function getChatGPTResponse(prompt) {
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.API_KEY; 
  try {
    const response = await axios.post(apiEndpoint, {
      model: "gpt-3.5-turbo",
      prompt,
      max_tokens: 7,
      temprature: 0,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error.response.data); 
    return null;
  }
}

const prompt = 'name the colors of rainbow';
getChatGPTResponse(prompt)
  .then(response => {
    console.log('ChatGPT:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
