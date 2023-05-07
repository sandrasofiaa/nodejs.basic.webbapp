// Importera moduler
const express = require('express');
const app = express();
const port = 4000;
const fs = require("fs")
const bodyParser = require("body-parser");
const dataFilepath = "data.json"


// Använda Express för att hantera statiska filer
app.use(express.static(__dirname ));

// Hantera JSON-data från request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Hantera GET-förfrågan till "/index" endpoint
app.get("/index", (req, res) => {
    res.sendFile("index.html", {root: __dirname });
}); 

// Hantera fel i applikationen
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Något gick fel!');
});

// Lyssna på angiven port och logga en meddelande när servern startar
app.listen(port, () => {
    console.log("HEEEEJ MARCUS!!!!");
    console.log(`Servern körs på port ${port}`);
});

// Hantera POST-förfrågan till "/index" endpoint
app.post("/index", (req, res) => {
    
  const jsonData = JSON.stringify(req.body, null, 2);
  
  // Skriv JSON-strängen till en fil med namnet "data.json"
  fs.writeFileSync("data.json", jsonData, (err) => {
      // Om det uppstår ett fel, skriv ut felet
      if(err){
          console.log(err);
      }
  });
});




