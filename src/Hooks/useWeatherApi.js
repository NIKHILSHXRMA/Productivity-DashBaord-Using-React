import { useEffect, useState } from "react";

const useWeatherApi = () => {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const data = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=f239a014135c4bd38ab104323262505&q=Delhi,India",
      );

      const json = await data.json();

      setWeather(json);
    } catch (error) {
      console.error("Weather API Error:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getWeather();
  }, []);

  return weather;
};

export default useWeatherApi;
