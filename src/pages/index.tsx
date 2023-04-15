import getCoords from "@/libs/getCoords";
import getWeather from "@/libs/getWeather";
import { Inter } from "next/font/google";
import { FormEvent, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [city, setCity] = useState("");
  let cityCoords = [] as Array<Object>;

  let lat = 0
  let lon = 0

  async function getCurrentWeater() {
    await getWeather
      .get("", {
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.WEATHER_API_KEY,
          lang: "pt_br",
          units: "metric"
        },
      })
      .then((res) => console.log(res.data));
  }

  async function getCoordsByCityName(event: FormEvent) {
    event.preventDefault();

    const inputCity = document.getElementById("input-city") as HTMLInputElement;

    console.log(city);

    if (!city || city === "") {
      inputCity.style.border = "1px solid red";
    } else {
      console.log(city);
      await getCoords
        .get("", {
          params: {
            q: city,
            appid: process.env.WEATHER_API_KEY,
          },
        })
        .then((res) => {
          // console.log(res.data[0]);
          cityCoords = res.data[0];
          console.log(cityCoords);
          lat = cityCoords.lat;
          lon = cityCoords.lon;
        });
    }
    getCurrentWeater();
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-turquese to-water flex items-center justify-center">
      <div className="flex flex-col w-[32rem] h-auto min-h-[32rem] bg-white p-2 rounded justify-evenly">
        <h1 className="flex justify-center text-lg">CLIMA TEMPO</h1>
        <form id="city-get" method="get">
          <div className="flex flex-col items-start gap-2 min-w-full">
            <label htmlFor="city">Cidade</label>
            <input
              name="city"
              type="text"
              className="min-w-full text-sm p-1 border rounded"
              id="input-city"
              onChange={(e) => setCity(e.currentTarget.value)}
            />
          </div>
        </form>
        <div className="w-full h-auto"></div>
        <input
          type="submit"
          form="city-get"
          value="Pesquisar"
          className="min-w-full bg-turquese h-fit rounded text-white-text hover:opacity-75 cursor-pointer p-2 uppercase font-bold"
          onClick={getCoordsByCityName}
        />
      </div>
    </div>
  );
}
