const dummyGeneralData = {items: [
    {
      update_timestamp: "2018-07-26T23:21:15+08:00",
      timestamp: "2018-07-26T23:01:00+08:00",
      valid_period: {
        start: "2018-07-27T00:00:00+08:00",
        end: "2018-07-27T00:00:00+08:00"
      },
      general: {
        forecast: "Thundery Showers",
        relative_humidity: {
          low: 55,
          high: 95
        },
        temperature: {
          low: 25,
          high: 33
        },
        wind: {
          speed: {
            low: 15,
            high: 25
          },
          direction: "SSE"
        }
      },
      periods: [
        {
          time: {
            start: "2018-07-27T00:00:00+08:00",
            end: "2018-07-27T06:00:00+08:00"
          },
          regions: {
            west: "Partly Cloudy (Night)",
            east: "Partly Cloudy (Night)",
            central: "Partly Cloudy (Night)",
            south: "Partly Cloudy (Night)",
            north: "Partly Cloudy (Night)"
          }
        },
        {
          time: {
            start: "2018-07-27T06:00:00+08:00",
            end: "2018-07-27T12:00:00+08:00"
          },
          regions: {
            west: "Thundery Showers",
            east: "Partly Cloudy (Day)",
            central: "Partly Cloudy (Day)",
            south: "Partly Cloudy (Day)",
            north: "Thundery Showers"
          }
        },
        {
          time: {
            start: "2018-07-27T12:00:00+08:00",
            end: "2018-07-27T18:00:00+08:00"
          },
          regions: {
            west: "Thundery Showers",
            east: "Partly Cloudy (Day)",
            central: "Partly Cloudy (Day)",
            south: "Partly Cloudy (Day)",
            north: "Thundery Showers"
          }
        },
        {
          time: {
            start: "2018-07-27T18:00:00+08:00",
            end: "2018-07-28T00:00:00+08:00"
          },
          regions: {
            west: "Fair (Night)",
            east: "Fair (Night)",
            central: "Fair (Night)",
            south: "Fair (Night)",
            north: "Fair (Night)"
          }
        }
      ]
    }
  ]}

  export default dummyGeneralData