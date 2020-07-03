//user interface
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
      if (isNaN(parseInt(amount))){
        $("#output").html(`Please enter a number for currency amount`);
      } else {
        let conversionRate = responseObject.conversion_rates[currencyTo] / responseObject.conversion_rates[currencyFrom];
        let convertedCurrency = (amount * conversionRate).toFixed(2);
        $("#output").html(`${amount} ${currencyFrom} = ${convertedCurrency} ${currencyTo}`);
      }
    }
  }
}

$(document).ready(function() {
  $("#usdEntry").submit(async function(event){
    event.preventDefault();
    let amount = $("#amount").val();
    let currencyFrom = $("#curListFrom").val();
    let currencyTo = $("#curListTo").val();
    exchangeRateResponse(amount, currencyFrom, currencyTo);
  });
});

