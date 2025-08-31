import { prevUser } from "./utils/UserContext";

const API_KEY=import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export const generateResponse = async () => {
  const requestBody = {
    contents: [
      {
        parts: [
          { text: prevUser.prompt },
          ...(prevUser?.mime_type && prevUser?.data
            ? [
                {
                  inline_data: {
                    mime_type: prevUser.mime_type,
                    data: prevUser.data,
                  },
                },
              ]
            : []),
        ],
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // ✅ small 'h'
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(GEMINI_API_URL, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error("Request failed: " + response.status);
    }

    const data = await response.json(); // ✅ await
    const apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    return apiResponse;
  } catch (error) {
    console.error("API Error", error);
    return null;
  }
};
