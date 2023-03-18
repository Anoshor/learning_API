const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/02b3c6e698";
    
    const options = {
        method: "POST",
        auth: "anoshor:3b4897dabe49cfbcf254b298a46f9132-us11"
    }
    
    const request = https.request(url, options, function(response){
        

        if ((response.statusCode) === 200) {
            res.sendFile(__dirname+"/success.html");
        }            
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data", function(data) {
            userdata=(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    

});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("server running on port 3000");
});

// 3b4897dabe49cfbcf254b298a46f9132-us11

// 02b3c6e698
