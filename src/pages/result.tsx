export default function Result (data : {}) {

    if(Object.keys(data).length !== 0) {
        const imgSrc = `https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`;

        return(
            <div className="flex w-full h-auto justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                    <img src={imgSrc} alt="Ícone de tempo" />
                    <span className="capitalize font-semibold text-lg">{data.data.weather[0].description}</span>
                </div>
                <div className="flex flex-col justify-center gap-0.5">
                    <h4 className="text-lg font-bold">{data.data.name}</h4>
                    <div>
                        <span className="font-bold">Temperatura: </span>
                        <span className="font-light">{data.data.main.temp}º</span>
                    </div>
                    <div>
                        <span className="font-bold">Sensação térmica: </span>
                        <span className="font-light">{data.data.main.feels_like}º</span>
                    </div>
                    <div>
                        <span className="font-bold">Temperatura Mínima: </span>
                        <span className="font-light">{data.data.main.temp_min}º</span>
                    </div>
                    <div>
                        <span className="font-bold">Temperatura Máxima: </span>
                        <span className="font-light">{data.data.main.temp_max}º</span>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div></div>
        )
    }
}