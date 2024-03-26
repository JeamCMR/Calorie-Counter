// Varibles

const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output"); 

let isError = false;

// FUNCIONES
function cleanInputString(str){
    const strArray  = str.split(''); 
    // El método split() divide una cadena en una matriz de subcadenas y devuelve la nueva matriz.
    const cleanStrArray = []; //Se guardaran los numeros obtenidos en el anterior array
    for (let i = 0; i < strArray.length; i++) {
        if (!["+","-"," "].includes(strArray[i])){
            cleanStrArray.push(strArray[i]);
        }
    }
}