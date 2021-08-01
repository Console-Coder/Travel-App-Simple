const {
    primaryObject,
    fetch,
    servReply,
    millisecOf16Days,
    millisecondsInADay,
    calcDays,
    API_KEYS,
    baseUrls
} = require('./serverVars');

let {
    keyNumber
} = require('./serverVars');

const chainAndGet = async (req, res) => {
    destination = req.body.data.tripLocale;
    travelDate = req.body.data.travelDate;
    geoNamesFetchUrl = '';
    weatherbitFetchUrl = '';
    try {
        //Getting photo from Pixabay
        await (await fetch(baseUrls.pixabay + API_KEYS.pixabay + `&q=${destination}`)).json().then(
            (obj) => {
                if (obj.total > 0) servReply["imgUrl"] = obj.hits[0].webformatURL.replace('_640', '_180');
                else
                    servReply["imgUrl"] = false;
            }
        );
        //Getting weather data, Langitude and latitude
        await (await fetch(geoNamesFetchUrl = (baseUrls.geonames + API_KEYS.geonames + `&q=${destination}`))).json().then(
            (obj) => {
                tmpObj = {};
                if (obj.totalResultsCount > 0) {
                    tmpObj["lon"] = obj.geonames[0].lng;
                    tmpObj["lat"] = obj.geonames[0].lat;
                    return tmpObj;
                }
            }
        ).then(async (geoCord) => {
            console.log("geoCord chained:" + JSON.stringify(geoCord));
            weatherbitFetchUrl = (baseUrls.weatherbit + API_KEYS.weatherbit + `&lat=${geoCord.lat}&lon=${geoCord.lon}` +
                `&days=${calcDays(travelDate)}`);
            const wthr = await fetch(weatherbitFetchUrl);
            await wthr.json().then(
                (Obj) => {
                    servReply["weather"] = (
                        `Your trip is to: ${destination}<br>
                        you will travel after ${calcDays(travelDate)} days (${travelDate})<br>
                                The weather can be described as: ${Obj.data[0].weather.description}
                                maximum teprature ${Obj.data[0].max_temp} is and the minimum one is ${Obj.data[0].min_temp} (Celcius)`
                    );
                    servReply.error = false;

                }, () => {
                    console.log('error in final step');
                }
            );
        }, () => {
            console.log('\n\n\nweather fetch error\n\n\n');
        });
    } catch (e) {
        console.log("ERROR HAPPENED!");
        servReply.error = true;
        console.log(e);
        console.log("geoNamesFetchUrl: " + '\n' + geoNamesFetchUrl);
        console.log("weatherbitFetchUrl" + '\n' + weatherbitFetchUrl);
        console.log('\n\n' + JSON.stringify(servReply));
    } finally {
        Objdestination = req.body.data.tripLocale;
        ObjtravelDate = req.body.data.travelDate;
        // --
        //Adding a new key value to primary object
        primaryObject["destination" + keyNumber] = Objdestination;
        primaryObject["travelDate" + keyNumber++] = ObjtravelDate;
        // --
        console.log(`**\n\nThe contents of primary object are: ${JSON.stringify(primaryObject)}` +
            `number of keys added ${keyNumber-1}**\n\n`);
        res.send(servReply);
        res.end();
        console.log('\n\n' + JSON.stringify(servReply));
        console.log("geoNamesFetchUrl: " + '\n' + geoNamesFetchUrl);
        console.log("weatherbitFetchUrl" + '\n' + weatherbitFetchUrl);
    }
};

module.exports = {
    keyNumber,
    primaryObject,
    fetch,
    chainAndGet,
    servReply,
    millisecOf16Days,
    millisecondsInADay,
    calcDays,
    API_KEYS,
    baseUrls
};