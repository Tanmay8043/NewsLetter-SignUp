const express = require("express");
const bdp = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bdp.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var first = req.body.FirstName;
  var last = req.body.LastName;
  var eml = req.body.Email;

  console.log(first, last, eml);


  var data = {
    members: [{
      email_address: eml,
      status: "subscribed",
      "merge_fields": {
        "FNAME": first,
        "LNAME": last
      },
    }]
  };

  var upddata = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/9b9038e193",
    method: "POST",
    headers: {
      "Authorization": "Tanmay1 de10092b72b4fceb3738e5d670da54ce-us20"
    },
    body: upddata
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
    } else {
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }

    }
  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});


// de10092b72b4fceb3738e5d670da54ce-us20
// 9b9038e193
