import express from 'express';
import {GoogleGenAI} from '@google/genai';

const app = express();
const port = process.env.PORT || 8080;

// static hosting
app.use(express.static('public'))

// json middleware
app.use(express.json());

// create google gen ai object
const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.PROJECT_ID,
  location: process.env.REGION,
  httpOptions: {
    baseUrl: process.env.APIGEE_ENDPOINT + "/v1/vertexai",
    headers: {
      "EnableModelArmor": "true"
    }
  }
});

app.post('/chat', async function(request, response){
  const geminiResponse = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: request.body.prompt,
  });
  let responseBody = request.body;
  responseBody.response = geminiResponse.text;

  response.send(responseBody);
});

app.listen(port, () => {
  console.log(`ChatLLM app listening on port ${port}`)
});