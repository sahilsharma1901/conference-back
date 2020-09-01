const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", async (req, res, next) => {
  try {
    let confArray = [];
    let copyCount = 0;
    const data = await fetch(
      "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
    );
    const jsonData = await data.json();
    const allConferences = jsonData.paid.concat(jsonData.free);

    allConferences.forEach((conference) => {
      const conferenceObject = {
        name: conference.confName,
        city: conference.city,
        country: conference.country,
        venue: conference.venue,
        url: conference.confUrl,
        start: conference.confStartDate,
        end: conference.confEndDate,
        entry: conference.entryType,
      };

      console.group("Conference Information\n---------------------");

      console.log("Name: " + conferenceObject.name);
      console.log("City: " + conferenceObject.city);
      console.log("Venue: " + conferenceObject.venue);
      console.log("Country: " + conferenceObject.country);
      console.log("Entry Fee: " + conferenceObject.entry);
      console.log("Start Date: " + conferenceObject.start);
      console.log("End Date: " + conferenceObject.end);
      console.log("URL: " + conferenceObject.url);

      console.groupEnd();
      console.log("\n");

      if(!confArray.includes(conferenceObject)){
        confArray.push(conferenceObject);
      }
      else{
          copyCount++;
      }

    });
    console.log(copyCount + " duplicates found!");
    res.end();
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});
