import { useState, useEffect } from "react";

const useQuotesApi = () => {
  const [quote, setQuote] = useState(null);

  const getQuotes = async () => {
    try {
      // ?category=... hata diya hai (yeh free tier par block hai)
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "Nbkh2fMDWrv7hShUB9IdBjO9NzS4o93EmFJlgtUZ",
        },
      });

      const json = await res.json();
      
      // Response check
      if (Array.isArray(json) && json.length > 0) {
        setQuote(json[0]);
      }
    } catch (error) {
      console.log("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getQuotes();
  }, []);

  return { quote, getQuotes };
};

export default useQuotesApi;