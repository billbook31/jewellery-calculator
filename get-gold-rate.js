// File: netlify/functions/get-gold-rate.js

exports.handler = async function(event, context) {
  // API Key को Netlify के सुरक्षित Environment Variable से पढ़ें
  // इसे आपके अनुरोध के अनुसार 'goldjewellerykey' कर दिया गया है
  const apiKey = process.env.goldjewellerykey;
  const apiUrl = 'https://www.goldapi.io/api/XAU/INR';

  // अगर API Key नहीं मिलती है तो एरर दें
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key is not set in Netlify environment variables.' })
    };
  }

  try {
    // Node.js में API कॉल करने के लिए 'node-fetch' का उपयोग करें
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(apiUrl, {
      headers: { 'x-access-token': apiKey }
    });

    if (!response.ok) {
      // अगर API से कोई एरर आता है
      const errorData = await response.json();
      console.error('Error from goldapi.io:', errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch gold rate from provider.', details: errorData })
      };
    }

    const data = await response.json();

    // API से मिले डेटा को फ्रंटएंड पर वापस भेजें
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error.' })
    };
  }
};