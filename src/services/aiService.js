import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// We initialize lazily to avoid crashing if the key is missing initially
let ai = null;

const getAI = () => {
  if (!ai) {
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.warn("Gemini API key is not set or is the default placeholder. Using mock data.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const analyzePlantImage = async (base64Image) => {
  const aiClient = getAI();
  if (!aiClient) {
    // Return mock data if API key isn't set
    return new Promise(resolve => setTimeout(() => resolve({
      name: 'Monstera Deliciosa (Mock)',
      species: 'Monstera',
      health: 85,
      waterLevel: 40,
      sunlight: 'Bright Indirect',
      diseases: 'None Detected',
      suggestion: 'Your plant looks healthy, but remember to water it soon!'
    }), 2000));
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Analyze this image of a plant. Return a JSON object ONLY, with the following keys and appropriate values based on the image:
              - name (string: common name)
              - species (string: scientific name)
              - health (number: 0-100 estimating health)
              - waterLevel (number: 0-100 estimating moisture based on soil/leaves if visible, else guess 50)
              - sunlight (string: suggested sunlight)
              - diseases (string: name of disease if any, else "None Detected")
              - suggestion (string: short 1-2 sentence care tip based on its current state)` },
            { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } }
          ]
        }
      ]
    });

    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
};

export const chatWithAssistant = async (message, history) => {
  const aiClient = getAI();
  if (!aiClient) {
    return new Promise(resolve => setTimeout(() => resolve("This is a mock AI response. Please add your Gemini API key to .env.local to enable real AI!"), 1000));
  }

  try {
    // Format history for Gemini
    const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      systemInstruction: { parts: [{ text: "You are PlantPal AI, a helpful, friendly, and expert plant care assistant. Keep answers concise, helpful, and use emojis." }] }
    });

    return response.text();
  } catch (error) {
    console.error("AI Chat failed:", error);
    return "I'm having trouble connecting to my servers right now. Please try again later!";
  }
};
