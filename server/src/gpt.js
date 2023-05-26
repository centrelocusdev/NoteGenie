require('dotenv').config()
const axios = require('axios');

console.log(process.env.API_KEY)

async function getChatGPTResponse(prompt) {
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.API_KEY; // Replace with your actual API key
  const maxTokens = 50; // Maximum number of tokens in the response

  try {
    const response = await axios.post(apiEndpoint, {
      prompt: prompt,
      max_tokens: maxTokens,
      model: "gpt-3.5-turbo"
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error.response.data);
    return null;
  }
}

// Example usage
const prompt = 'Hello, ChatGPT!';
getChatGPTResponse(prompt)
  .then(response => {
    console.log('ChatGPT response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
