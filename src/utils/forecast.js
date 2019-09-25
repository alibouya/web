// const request=require('request')
// const forecast = (latitude,longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/b33b9c712ff9ecca4ba33367dc236968/' + latitude + ',' + longitude

    
//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather services!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined,'It is currently '+ response.body.currently.temperature + ' degree out. There is ' + response.body.currently.precipProbability + ' % chance of rain')

//         }
//     })
// }
// module.exports=forecast


/*

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast*/

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/30f9607506bd9b5c1e0a65e8a0130c90/" + latitude + ',' + longitude
    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high temperature today is ' + body.daily.data[0].temperatureHigh +' and the temperature low is :'+body.daily.data[0].temperatureLow+ '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast