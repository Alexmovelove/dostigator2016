const fetch = require('node-fetch');

// Replace {handle_name} with your actual SLM handle name and API_KEY with your valid API key
const API_URL = 'https://api.assisterr.ai/api/v1/slm/dostigator_2016/chat/';
const API_KEY = 'M75Kr69Ec-bqkIgA2-DhsZsVq8t-tMSzdCpDodVTKEM'; // Replace with your actual API key

// Sample query data
const queryData = {
  query: "Goal: Write a book\nDescription: Write a chapter daily"
};

async function testApi() {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY // Use X-Api-Key for authentication
      },
      body: JSON.stringify(queryData)
    });

    // Check if response is OK
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorData = await response.text();
      console.error('Error Response:', errorData);
      return;
    }

    // Parse and log the response
    const data = await response.json();
    console.log('API Response:', data);
  } catch (error) {
    console.error('Request Failed:', error.message);
  }
}

testApi();
