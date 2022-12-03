const express = require('express')

const path = require('path');
var http = require('http')
var request = require('request');
const axios = require('axios');
const fetch = require('node-fetch');
const port = process.env.PORT || 8080;

var bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", async (req, res, next) => {
  res.status(200)
  res.render("index")
})

app.post("/fetchevents", async (req, res) => {
  var urls = ""
  var finalcity = ""

  console.log("-------" + typeof req.body.eventCity);

  if (req.body.eventCity.length == 0) {
    req.body.eventCity = ""
  } else {

    var cityarray = req.body.eventCity.split(" ")


    for (var i = 0; i < cityarray.length; i++) {
      finalcity = finalcity + " " + cityarray[i][0].toUpperCase() + cityarray[i].slice(1, cityarray[i].length)
    }

    req.body.eventCity = finalcity.trim()

    //console.log("-> -> "+ finalcity);
    //  req.body.eventCity = req.body.eventCity[0].toUpperCase() + req.body.eventCity.slice(1,req.body.eventCity.length)

  }



  if (typeof req.body.state == "undefined") {
    req.body.state = ""
  }

  if (typeof req.body.eventtype == "undefined") {
    req.body.eventtype = ""
  }

  // if (req.body.eventCity == ""){
  //   req.body.eventCity = ""
  // }


  if ((req.body.eventCity.length > 0) && (req.body.state.length > 0) && (req.body.eventtype.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventState%3D'" + req.body.state + "').%0A%20%20FILTER(%3FeventCity%3D'" + req.body.eventCity + "').%0A%20%20FILTER(%3FeventCategory%3D'" + req.body.eventtype + "').%0A%20%20%0A%7DLIMIT%20500"
  }

  else if ((req.body.eventCity.length > 0) && (req.body.state.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventState%3D'" + req.body.state + "').%0A%20%20FILTER(%3FeventCity%3D'" + req.body.eventCity + "').%0A%0A%20%20%0A%7DLIMIT%20500"
  }

  else if ((req.body.state.length > 0) && (req.body.eventtype.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventState%3D'" + req.body.state + "').%0A%20%20FILTER(%3FeventCategory%3D'" + req.body.eventtype + "').%0A%0A%20%20%0A%7DLIMIT%20500"
  }

  else if ((req.body.eventCity.length > 0) && (req.body.eventtype.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventCity%3D'" + req.body.eventCity + "').%0A%20%20FILTER(%3FeventCategory%3D'" + req.body.eventtype + "').%0A%20%0A%0A%20%20%0A%7DLIMIT%20500"
  }

  else if ((req.body.eventCity.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventCity%3D'" + req.body.eventCity + "').%0A%20%0A%0A%20%20%0A%7DLIMIT%20500"
  }

  else if ((req.body.eventtype.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventCategory%3D'" + req.body.eventtype + "').%0A%20%0A%0A%20%20%0A%7DLIMIT%20500"
  }

  else if ((req.body.state.length > 0)) {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20FILTER(%3FeventState%3D'" + req.body.state + "').%0A%20%0A%0A%20%20%0A%7DLIMIT%20500"
  }

  else {
    urls = "http://54.215.205.233:3030/events/sparql?query=PREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%20%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20%0APREFIX%20event%3A%20%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fngarugu%2Fontologies%2F2022%2F10%2Fevent%23%3E%20%0ASELECT%20DISTINCT%20%3FeventID%20%3FeventName%20%3FeventCategory%20%3FeventDate%20%3FeventCity%20%3FeventState%20%3FeventZipCode%20%3FeventCountry%20%3FeventURL%20%0AWHERE%20%7B%20%0A%20%20%3Feventdata%20event%3AhasEventID%20%3FeventID.%20%0A%20%20%3Feventdata%20event%3AhasEventName%20%3FeventName.%20%0A%20%20%3Feventdata%20event%3AhasEventCategory%20%3FeventCategory.%20%0A%20%20%3Feventdata%20event%3AhasEventDate%20%3FeventDate.%20%0A%20%20%3Feventdata%20event%3AhasEventCity%20%3FeventCity.%20%0A%20%20%3Feventdata%20event%3AhasEventState%20%3FeventState.%20%0A%20%20%3Feventdata%20event%3AhasEventZipCode%20%3FeventZipCode.%20%0A%20%20%3Feventdata%20event%3AhasEventCountry%20%3FeventCountry.%20%0A%20%20%3Feventdata%20event%3AhasEventURL%20%3FeventURL.%20%0A%20%20%0A%7DLIMIT%20500"

  }


  console.log(urls);


  const response = await fetch(urls, { method: 'POST' });
  const data = await response.json();
  console.log("Final -- ");
  console.log(data.results.bindings);

  res.render("fetchevents", { result: data.results.bindings })
  //res.render("fetchevents")
})



app.get("/events", async (req, res) => {
  res.render("events")
})

app.listen(port, () => {
  console.log("Server started and listening on port")
})
