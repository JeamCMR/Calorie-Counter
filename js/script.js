// Varibles

const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output"); 

let isError = false;

console.log(entryDropdown.value);
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
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    //En la variable HTMLString Ira la parte del html, agrega un label y un input con su nombre del tipo y el numero de cada input
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">
    `;
    targetInputContainer.insertAdjacentHTML("beforeend",HTMLString); //para que si visualice el contenido del variable en el html se debe usar el metodo .innerHTML
    /**pero el metodo .innerHTML actualiza los valores cada ves que se llama en este caso se debe usar el metodo insertAdjacentHTML() este
     * tiene dos argumentos, el primero es una cadena  que indica la posicion del elemento insertado y la segunda es es la cadena o variable
     * que contiene el html
    */
}

function getCaloriesFromInputs(list){
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);

    const invalidInputMatch  = isInvalidInput (currVal);

    if(invalidInputMatch){
        alert(`Invalid Input: ${invalidInputMatch[0]}`)
        isError = true;
        return null;
    }
    calories += Number(currVal);
  }
  return calories;
}


function calculateCalories (e){
    e.preventDefault();
    isError = false;

    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

    const budgetCalories = getCaloriesFromInputs ([budgetNumberInput]);
    
    if (isError) {
        return;
    }

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories   + exerciseCalories;

    let surplusOrDeficit = remainingCalories < 0? "Surplus":"Deficit";

    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>`;
    output.classList.remove('hide');
}

function clearForm (){
    const inputContainers = Array.from(document.querySelectorAll('.input-container')); // el metodo Array.from método que acepta un tipo de matriz y devuelve una matriz. Esto es útil cuando desea acceder a métodos de matriz más sólidos
    for (const container of inputContainers) {
        container.innerHTML="";
    }
    budgetNumberInput.value="";
    output.innerText=""; /**La diferencia entre InnerText e InnerHTML es que InnerText no representará elementos HTML, 
    sino que mostrará las etiquetas y el contenido como texto sin formato.*/
    output.classList.add('hide');
}


/**EVENTOS */
addEntryButton.addEventListener("click",addEntry);
calorieCounter.addEventListener("submit",calculateCalories);
clearButton.addEventListener("click", clearForm);