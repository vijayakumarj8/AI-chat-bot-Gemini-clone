import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const API_KEY = "AIzaSyB_-p0SxrkjBobKJ9hAUkY23anJ_k1jp_g"; 
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;// Replace with your actual API key
const MODEL_NAME = "gemini-1.5-flash"; // lighter and faster model

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(userInput) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 512,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;

  console.log( response.text()); // ✅ Log response to console
  return response.text();
}

export default runChat;



