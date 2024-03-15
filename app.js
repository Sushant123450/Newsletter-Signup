const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
// const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

// client.setConfig({
//     apiKey: "95024ceb5b92ba34ce6559651ef24a04-us22",
//     server: "us22",
// });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});



app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const Email = req.body.email;

    const data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us22.api.mailchimp.com/3.0/lists/4e46dcc435"
    const options = {
        method: "POST",
        auth: "Sushant123:95024ceb5b92ba34ce6559651ef24a04-us22"
    }

    const request = https.request(url, options, function (response) {

        const status = response.statusCode;
        if (status === 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function (data) {
            // console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure",(req,res)=>{
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on 3000");
});

// API_ID = 95024ceb5b92ba34ce6559651ef24a04-us22
// Audience_Id = 4e46dcc435