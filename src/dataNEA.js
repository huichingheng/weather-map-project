export const getNowCastData = async () => {
    console.log("called nowCast")
    const nowCastResponse = await fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast', { mode: 'cors' })
    console.log("nowCast health, HOW DO I FIX THESE FETCHINGS!:", nowCastResponse.ok)
    if (nowCastResponse.ok) {
        const dataNowCast = await nowCastResponse.json()
        const forecastLocation = dataNowCast.area_metadata
        const forecastValues = dataNowCast.items[0].forecasts

        return forecastLocation.map((location) => {
            const forecastValueToAppend = forecastValues.find((object) => {
                return object.area === location.name
            })
            location.forecast = forecastValueToAppend.forecast
            return location
        })
    } else return setInterval(getNowCastData(), 3000)
}

export const getWindStationData = async () => {

    // ====Wind Direction====
    const responseWindDirection = await fetch('https://api.data.gov.sg/v1/environment/wind-direction')
    const dataWindDirection = await responseWindDirection.json()
    const stationLocationsData = dataWindDirection.metadata.stations
    const windDirectionData = dataWindDirection.items[0].readings

    windDirectionData.map(windStation => {
        const associatedStations = stationLocationsData.find(station => {
            return station.id === windStation.station_id
        })
        associatedStations.windBearing = windStation.value
        return associatedStations
    })

    // ====Humidity====
    const responseHumidity = await fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    const dataHumidity = await responseHumidity.json()
    const humidity = dataHumidity.items[0].readings

    humidity.map(humidityStation => {
        const associatedStations =
            stationLocationsData.find(station => {
                return station.id === humidityStation.station_id
            })
        if (associatedStations !== undefined) {
            associatedStations.humidity = humidityStation.value
        }
        return associatedStations
    })

    // ====Wind Speed====
    const responseWindSpeed = await fetch('https://api.data.gov.sg/v1/environment/wind-speed')
    const dataWindSpeed = await responseWindSpeed.json()
    const windSpeedData = dataWindSpeed.items[0].readings

    const stationConsolidatedData =
        windSpeedData.map(windStation => {
            const associatedStations =
                stationLocationsData.find(station => {
                    return station.id === windStation.station_id
                })
            if (associatedStations !== undefined) {
                associatedStations.speed = windStation.value
            }
            return associatedStations
        })

    return stationConsolidatedData
}

// ====General 24 Hour Forecast ========
export const getGeneralData = async () => {
    console.log("called General Cast")
    const generalForecastResponse = await fetch('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast', { mode: 'cors' })
    console.log("General forecast health:", generalForecastResponse.ok)
    
    if (generalForecastResponse.ok) {
        const dataGeneralForecast = await generalForecastResponse.json()
        const generalWeather = dataGeneralForecast.items[0]
        // When NEA dataset is not blank
        if (generalWeather.length > 0){
            const period0 = generalWeather.periods[0]
            
            return {
                general: {
                    forecast: generalWeather.general.forecast,
                    humidity: generalWeather.general.relative_humidity,
                    temperature: generalWeather.general.temperature
                },
                period0: {
                    regions: period0.regions,
                    validityPeriod: period0.time
                }
            }
        }
        } else return setInterval(await getGeneralData(), 5000)
        
    }
