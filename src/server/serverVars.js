let keyNumber = 1;
const primaryObject = {};
const fetch = require('node-fetch');
const servReply = {
    error: false
}; //server reply as an object
const millisecOf16Days = 16 * 24 * 60 * 60 * 1000;
const millisecondsInADay = 86400000;
const calcDays = function (sntdate)
{
    nowIs = new Date();
    year = parseInt(sntdate.split('-')[0]);
    month = parseInt(sntdate.split('-')[1]);
    day = parseInt(sntdate.split('-')[2]);
    travlDate = new Date(year,month-1,day); // JavaScript counts months from 0 to 11
    value = ( travlDate.getTime() - nowIs.getTime() ) / millisecondsInADay;
    if(value <= 0){
        alert(`Your travel date must be in the future\
        so it was set to tommorow as a correction`);
        return 1;
    }
    else if (value >= 1 && value <= 16)
        return (Math.ceil(value) <= 16)? Math.ceil(value) : 16;
    else
    {
        alert('Your travelling day is so far you will the forecast\
        that is after 16 days');
        return 16;
    }
};
const API_KEYS = {
    pixabay: process.env.pixabay,
    geonames: process.env.geonames,
    weatherbit: process.env.weatherbit
};
const baseUrls = {
    pixabay: "https://pixabay.com/api/?image_type=photo&key=",
    geonames: "http://api.geonames.org/search?type=json&maxRows=1&username=",
    weatherbit: "https://api.weatherbit.io/v2.0/forecast/daily?key="
};

module.exports = {
    primaryObject,
    fetch,
    servReply,
    millisecOf16Days,
    millisecondsInADay,
    calcDays,
    API_KEYS,
    baseUrls,
    keyNumber
};