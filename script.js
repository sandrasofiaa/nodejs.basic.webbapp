// Funktion för att hämta data från data.json och visa den i en tabell
async function getDataJSON() {
  let jsonPath = await fetch ("data.json");

  let jsonObject = await jsonPath.json();
  let output = "<table><tr><th>Nyligen tillagda Drömmar:</th><th>Nyligen tillagda mål:</th>";
  
  // Loopa igenom varje objekt i json-objektet och skapa tabellrader
  for (var i=0; i<jsonObject.length; i++) {

      var counter = jsonObject[i];
      output += `<tr>`;
      output += `<td>${counter.goal}</td>`;
      output += `<td>${counter.wish}</td>`;
      output += `</tr>`;
  }
  output += "</table>"

  // Visa den genererade tabellen i elementet med id "output"
  document.getElementById("output").innerHTML = output;
};

document.addEventListener("DOMContentLoaded", () => {
  const userFrom = document.getElementById("wishform");

  // Lägg till en lyssnare för submit-händelse
  userFrom.addEventListener("submit", async (event) => {
      event.preventDefault(); // Förhindra standardbeteendet för submit-händelsen

      // Hämta värdena från input-fälten
      let wish = document.getElementById("wish");
      let goal = document.getElementById("goal");

      // Skapa ett nytt användarobjekt med input-värdena
      let newUser = {
          wish: wish.value,
          goal: goal.value
      };

      // Hämta befintliga data från data.json
      let response = await fetch("data.json");
      let data = await response.json();

      // Lägg till det nya användarobjektet i data-objektet
      data.push(newUser);
      
      // Skicka uppdaterade data till servern via en POST-förfrågan
      await fetch('index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  });
});






 







