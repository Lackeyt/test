import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import {exchangeRateCall} from 'exchangeRateCall.js'

async function exchangeRateResponse() {
  const responseObject = await exchangeRateCall(); // blocking // api call
  if(!wordArray) {
    return 'There has been an error processing your request';
  } else {
    if (responseObject.result === "error"){
      return responseObject.error-type
    } else if (responseObject.result === "success") {
      let conversionRates = responseObject.conversion_rates
      return conversionRates
    }
  }
}

$(document).ready(function() {
  //User Interface
});

