import { GoogleGenAI } from "@google/genai";

class model {
  async generateContent(context, apiKey) {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    this.context = context;
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: context,
      config: {
        systemInstruction: `Response Format:
                Description Text
                `,
      },
    });
    return response.text;
  }
}
export default model;
