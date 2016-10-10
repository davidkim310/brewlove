const express = require('express')
const app = express();
const http = require('http');
// const bodyParser = require('body-parser')
const port = 4040 || process.env.PORT

app.use(express.static('./Client'));
app.get('/api/brewery', function(req, res){
  console.log('This is working') //This end point is working!
  console.log("this is our query", req.query.brewery);
  // //get rid of any spaces
  var brewery = req.query.brewery.replace(/\s/g, '');
  var url = {
    host:"http://api.brewerydb.com/v2/search?q="
    + req.query.brewery +
    "&type=brewery&key=fac5a6275ee18b2edce889344e63c2e9"
  };

  http.get(url.host, function(response){
    var bodyChunks = "";
    response.on('data', function(chunk){
      bodyChunks += chunk;
    })
    .on('end', function(){
      res.send(bodyChunks);
    });
  });
})
app.set("port", port)
app.listen(port)
console.log(`server listening on port ${port}`);
