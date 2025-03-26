// Step 1: seleziono tutti gli elementi del DOM che mi interessano
const inputField = document.getElementById("input-temp");
const fromUnitField = document.getElementById("input-unit");
const toUnitField = document.getElementById("output-unit");
const outputField = document.getElementById("output-temp");
const form = document.getElementById("converter");

// Step 2: implementare la logica della conversione
function convertTemp(value, fromUnit, toUnit) {

  // "c" è celsius, "f" è fahrenheit, "k" è kelvin
  if (fromUnit === "c") {
    if (toUnit === "f") {
      return value * 9 / 5 + 32;
    } else if (toUnit === "k") {
      return value + 273.15;
    }
    return value;
  }

  if (fromUnit === "f") {
    if (toUnit === "c") {
      return (value - 32) * 5 / 9;
    } else if (toUnit === "k") {
      return (value + 459.67) * 5 / 9;
    }
    return value;
  }

  if (fromUnit === "k") {
    if (toUnit === "c") {
      return (value - 273.15);
    } else if (toUnit === "f") {
      return value * 9 / 5 - 459.67;
    }
    return value;
  }

  throw new Error("Invalid unit");
}

form.addEventListener("input", () => {
  console.log("Input detected");
  // ottiene il valore da inputField; parseFloat fa parte della lib core di JavaScript
  // è necessario poiché inputField.value è una stringa
  const inputTemp = parseFloat(inputField.value);
  // ottiene il valore scelto nel primo select
  const fromUnit = fromUnitField.value;
  // ottiene il valore scelto nel secondo select
  const toUnit = toUnitField.value;
  // invoco la funzione per la conversione
  const outputTemp = convertTemp(inputTemp, fromUnit, toUnit);
  // scrivo il valore ottenuto nel outputField
  outputField.value = inputField.value.trim() !== '' ? (Math.round(outputTemp * 100) / 100) + " " + toUnit.toUpperCase() : "--";
});
