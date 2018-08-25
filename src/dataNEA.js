import dummyGeneralData from './dummy24HourData'

export const getNowCastData = async () => {
    try {
        const nowCastResponse = await fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast', { mode: 'cors' })
        console.log(nowCastResponse.ok)

        const dataNowCast = await nowCastResponse.json()
        const forecastArea = dataNowCast.area_metadata
        const forecastValues = dataNowCast.items[0].forecasts
        
        return forecastArea.map(area => {
            const forecastValue = forecastValues.find(valuesForEachArea => {
                return valuesForEachArea.area === area.name
            })
            area.forecast = forecastValue.forecast
            return area
        })
    }
    catch (error) {
        console.log(error)
        console.log("refreshing app")
        setInterval(getNowCastData(), 10000)
    }
}

export const getAirTempData = async () => {
    try {
        const airTempResponse = await fetch('https://api.data.gov.sg/v1/environment/air-temperature', { mode: 'cors' })
        const dataAirTemp = await airTempResponse.json()

        const airTempStation = dataAirTemp.metadata.stations
        const airTempValues = dataAirTemp.items[0].readings

        return airTempStation.map((station) => {
            const airTempValueToAppend = airTempValues.find((airTempMeasuringStation) => {
                return airTempMeasuringStation.station_id === station.id
            })
            station.airTemp = airTempValueToAppend.value
            return station
        })
    }
    catch (error) {
        console.log(error)
        console.log("refreshing app")
        setInterval(getNowCastData(), 10000)
    }
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
    try {
        const generalForecastResponse = await fetch('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast', { mode: 'cors' })

        let dataGeneralForecast = await generalForecastResponse.json()
        if (generalForecastResponse.status !== 200) {
            dataGeneralForecast = dummyGeneralData
        }
        const generalWeather = dataGeneralForecast.items[0]
        // When NEA dataset is not blank
        if (Object.keys(generalWeather).length > 0) {
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

    }
    catch (error) {
        console.log(error)
        // console.log("restarting app...")
        setInterval(await getGeneralData(), 10000)
        return "Error"
    }



}
