
const gemini = process.env.REACT_APP_API_GEMINI_URL;

export const callGeminiAPI = async (text) => {
    try {
      const response = await fetch(`${gemini}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error when call Gemini api:", error);
      return null;
    }
  };
  