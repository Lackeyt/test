import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import {exchangeRateCall} from './exchangeRateCall.js';

async function exchangeRateResponse(amount, currencyFrom, currencyTo) {
  const responseObject = await exchangeRateCall(); // blocking // api call
  if(!responseObject) {
    $("#output").html(`There has been an error processing your request`);
  } else {
    if (responseObject.result === "error"){
      $("#output").html(`The request returned an error: ${responseObject["error-type"]}`);
    } else if (responseObject.result === "success") {
      let conversionRates = responseObject.conversion_rates;
      let convertedCurrency = amount * conversionRates[currencyTo]
      $("#output").html(`$${amount} = ${convertedCurrency} ${currencyTo}`);
    }
  }
}

$(document).ready(function() {
  //User Interface
  $("#usdEntry").submit(function(event){
    event.preventDefault();
    let USD = $("#usd").val();
    let currency = $("#curList").val();
    exchangeRateResponse(USD, currency);
  })
});

