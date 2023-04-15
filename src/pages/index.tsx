import getCoords from "@/libs/getCoords";
import getWeather from "@/libs/getWeather";
import { Inter } from "next/font/google";
import { FormEvent, useEffect, useRef, useState } from "react";
import Result from "./result";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);
  const [city, setCity] = useState("Brazil");
  const [weatherData, setWeatherData] = useState({});

  async function getCurrentWeater(event : FormEvent) {
    event.preventDefault();

    if(!city) {
      alert("Preencha os campos")
    } else {
      await getWeather
      .get("", {
        params: {
          q:city,
          appid: process.env.WEATHER_API_KEY,
          lang: "pt_br",
          units: "metric",
        },
      })
      .then((res) => setWeatherData(res.data));
    }
  }

  useEffect(() => {
    if(effectRan.current === false) {
      getWeather
      .get("", {
        params: {
          q:city,
          appid: process.env.WEATHER_API_KEY,
          lang: "pt_br",
          units: "metric",
        },
      })
      .then((res) => {
        setWeatherData(res.data);
        setIsLoading(false)
      });
    }
    effectRan.current = true;
  })

  if(isLoading) {
    return <div className="App">Loading...</div>
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-turquese to-water flex items-center justify-center">
      <div className="flex flex-col w-[32rem] h-auto min-h-[32rem] bg-white p-2 rounded justify-evenly">
        <h1 className="flex justify-center text-lg">CLIMA TEMPO</h1>
        <form id="city-get" method="get">
          <div className="flex flex-col items-start gap-2 min-w-full">
            <label htmlFor="city">Local</label>
            <input
              name="city"
              type="text"
              className="min-w-full text-sm p-1 border rounded"
              id="input-city"
              placeholder="Insira o local"
              required
              onChange={(e) => setCity(e.currentTarget.value)}
            />
          </div>
        </form>

        <Result data={weatherData}/>

        <input
          type="submit"
          form="city-get"
          value="Pesquisar"
          className="min-w-full bg-turquese h-fit rounded text-white-text hover:opacity-75 cursor-pointer p-2 uppercase font-bold"
          onClick={getCurrentWeater}
        />
      </div>
    </div>
  );
}
