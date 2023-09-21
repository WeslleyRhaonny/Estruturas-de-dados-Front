let maxSize;

while (true) {
    maxSize = parseInt(prompt("Digite o tamanho da lista sequencial:"));
    if (maxSize > 0) {

        break; // Sai do loop se maxSize for diferente de 0 e não for NaN
    }
    alert("Tamanho inválido! O tamanho da lista não pode ser 0 ou indefinido.");
}

let list = new Array(maxSize);
let currentIndex = 0;

function initList() {
    createVisualList();
}

function createVisualList() {
    const visualList = document.getElementById("visualList");
    visualList.innerHTML = "";

    for (let i = 0; i < maxSize; i++) {
        const square = document.createElement("div");
        square.className = "square";
        visualList.appendChild(square);
    }
}

function updateVisualList() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
        if (list[index] !== undefined) {
            square.textContent = list[index];
        } else {
            square.textContent = "";
        }
    });

    const elementCount = document.getElementById("elementCount");
    elementCount.textContent = `Número de elementos: ${currentIndex}`;
}

function insertNumber() {
    if(currentIndex == maxSize){
        alert("A Lista está totalmente preenchida");
        return;
    }
    
    const numberInput = document.getElementById("numberInput");
    const posInput = document.getElementById("posInput");
    const number = parseInt(numberInput.value);
    const position = isNaN(parseInt(posInput.value)) ? -1 : parseInt(posInput.value);


    if (position === 0) {
        alert("A posição deve ser maior do que 0.");
    } else if (!isNaN(number) && position == -1) {
        list[currentIndex] = number;
        currentIndex++;
        updateVisualList();
    } else if (!isNaN(number) && position >= 0 && position <= maxSize && position <= currentIndex + 1) {
        let aux = currentIndex;
        for (let j = aux; j >= position - 1; j--) {
            list[j + 1] = list[j]; // Move o elemento à direita para a próxima posição
        }
        list[position - 1] = number;
        currentIndex++;
        updateVisualList();
    } else if (!isNaN(number) && position >= 0 && position <= maxSize && position == currentIndex + 1) {
        list[position - 1] = number;
        currentIndex++;
        updateVisualList();
    } else {
        alert("Insira um número válido ou uma posição válida.");
    }
}

function deleteNumberPosition() {
    const posInput = document.getElementById("posInput");
    const position = parseInt(posInput.value);
    for(let i = position; i<= currentIndex; i++){
        list[i-1] = list[i];
    }
    if (position >= 0 && position <= currentIndex && !isNaN(list[position-2])) {
        list[currentIndex] = undefined;
        currentIndex--;
        updateVisualList();
    } else {
        alert("Insira uma posição válida.");
    }
}

function searchNumber() {
    const numberInput = document.getElementById("numberInput");
    const number = parseInt(numberInput.value);
    const posicoes = [];

    for(let i = 0; i < maxSize; i++){
        if(list[i] == number){
            posicoes.push(i+1);
        }
    }

    if(posicoes.length!=0){
        alert(`O número ${number} está ocupando as posições ${posicoes}.`);
    }

    if(posicoes.length==0){
        alert("Ops, número não foi encontrado.");
        return;  
    } 
}

function searchNumberPosition() {
    const posInput = document.getElementById("posInput");
    const position = parseInt(posInput.value);

    if (position >= 0 && position < maxSize) {
        const number = list[position - 1];
        if (number !== undefined) {
            alert(`O número ${number} está ocupando a posição ${position}.`);
        } else {
            alert("A posição está vazia na lista.");
        }
    } else {
        alert("Insira uma posição válida.");
    }
}

function displayList() {
    const output = document.getElementById("output");
    output.innerHTML = "Lista: " + list.filter((num) => num !== undefined).join(", ");
}

initList();