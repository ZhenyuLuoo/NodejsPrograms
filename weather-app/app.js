console.log('Starting')

setTimeout(() => {
    console.log('2 Second Timer')
}, 2000)

setTimeout(() => {
    console.log('0 second Time')
}, 0)

console.log('Stopping')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const url = 'http://api.weatherstack.com/current?access_key=07c3a07182527de7cc017d3435eb37fa&query=37.8267,-122.4233'

request({ url: url, json: true }, (error, response) => {
    /*const data = JSON.parse(response.body)
    console.log(data.current)*/
    //console.log(response.body.current)
    console.log('It is cureently ' + response.body.current.temperature + ' degrees out, but it feels like ' + response.body.current.feelslike + ' degrees.')
})

//Geocoding Challenge
const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWNvdm9scyIsImEiOiJja2V3cmNlZHYwOHhmMzBwOGV5N3Z0YjRpIn0.2yML1JsUibU2bwoz1Qko6w&limit=1'

request({ url: geourl, json: true }, (error, response) => {
    const latitude = response.body.features[0].center[1]
    const longtitude = response.body.features[0].center[0]
    if (error) {
        console.log('Unable to connect to weather service!')
    }

    else if (response.body.features.length === 0) {
        console.log('Unable to find location!')
    }

    else {
        console.log(latitude, longtitude)
    }
})

//error handling
request({ url: url, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service!')
    }

    else if (response.body.error) {
        console.log(response.body.error)
    }

    else {
        console.log('It is cureently ' + response.body.current.temperature + ' degrees out, but it feels like ' + response.body.current.feelslike + ' degrees.')
    }
})

//Callback abstraction
const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWNvdm9scyIsImEiOiJja2V3cmNlZHYwOHhmMzBwOGV5N3Z0YjRpIn0.2yML1JsUibU2bwoz1Qko6w&limit=1'

request({ url: geourl, json: true }, (error, response) => {

    if (error) {
        console.log('Unable to connect to weather service!')
    }

    else if (response.body.features.length === 0) {
        console.log('Unable to find location!')
    }

    else {
        const latitude = response.body.features[0].center[1]
        const longtitude = response.body.features[0].center[0]
        console.log(latitude, longtitude)
    }
})

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWNvdm9scyIsImEiOiJja2V3cmNlZHYwOHhmMzBwOGV5N3Z0YjRpIn0.2yML1JsUibU2bwoz1Qko6w&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longtitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

geocode('Boston', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

//Chanllenge
forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

//Callback Chaining
const address = process.argv[2]
geocode(address, (error, data) => {
    if (error) {
        return console.log(error)
    }

    console.log(data.latitude)
    console.log(data.longtitude)
    forecast(data.latitude, data.longtitude, (error, forecastData) => {
        if (error) {
            console.log(error)
        }

        console.log(data.location)
        console.log(forecastData)

    })
})