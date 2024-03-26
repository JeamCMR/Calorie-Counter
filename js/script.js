// Varibles

const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output"); 

let isError = false;

/**FUNCIONES */ 

function cleanInputString(str){
    // const strArray  = str.split(''); 
     // El método split() divide una cadena en una matriz de subcadenas y devuelve la nueva matriz.
    // const cleanStrArray = []; //Se guardaran los numeros obtenidos en el anterior array
    // for (let i = 0; i < strArray.length; i++) {
    //     if (!["+","-"," "].includes(strArray[i])){
    //         cleanStrArray.push(strArray[i]);
    //     }
    // }
/**Es mejor utilizar expresiones regulares regex para la busqueda y filtado de caracteres en una cadena
 * esto nos brinda mayor optimizacion y menor uso de recursos
 */
 /**para que el patron actual funciones se debe convertir en una clase de personaje esto ahra que el patron realice
    //la busqueda con cada caracteres individualmente se debe meter el patron en unos []*/
    //la flag g en el patron significa global esto le indica al patron que siga buscando despues de haber encontrado una coincidencia
    const regex = /[+-\s]/g; 
    return str.replace(regex,"");
}

function isInvalidInput (str){
    //la flag i en patron indica que sera insensible a mayusculas y minusculas
  const regex = /\d+e\d+/i; // el dijito \d indica cualquier digito que esten al lado izquierdo o derecho del patron 
  return str.match(regex);
}

function addEntry(){

    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">
    `;
    targetInputContainer.innerHTML += HTMLString;
}

addEntryButton.addEventListener("click",addEntry);