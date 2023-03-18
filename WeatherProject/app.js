const { response } = require("express");
const express = require("express");
const https = require("https");
const { dirname } = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res){
    // console.log("post request received");
    city=(req.body.cityName);
    // city="Bengaluru";
    key="5197bcb1eeee19d0a0f5ec924b33052d";
    unit="metric";
    url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+unit+"";
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            // console.log(weatherData);
            // console.log(data) will give hexadecimal return 
            // const object = {
            //     name: "Anoshor",
            //     favfood: "Omelette"
            // };
            // console.log(JSON.stringify(object));
            var temp = weatherData.main.temp;
            console.log(desc=weatherData.weather[0].description); //copy path
            var icon = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<h1>The temperature in "+city+" is " + temp + " degree celcius</h1>");
            res.write("<p>The weather description is "+ desc +"</p>");
            res.write("<p><img src="+icon+"></p>");
            res.send();
        });
    }); 
    // res.send("Server is running");
})
    


app.listen(3000, function() {
    console.log("server running");
});