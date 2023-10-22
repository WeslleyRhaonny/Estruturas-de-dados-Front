const Stack = () => {
    const data = [];
    let top = -1;

    const push = (value) => {
        top++;
        data[top] = value;
        console.log(data);
        renderVisualStack();
    };

    const pop = () => {
        if (top < 0) {
            return false;
        } else {
            const itemToReturn = data[top];
            delete data[top];
            top--;
            renderVisualStack();
            return itemToReturn;
        }
    };

    const getTop = () => {
        if (top < 0) {
            return false;
        }else{
            return data[top]
        }   
    };

    const renderVisualStack = () => {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = ""; // Limpa a lista visual antes de atualizar

        for (let i = 0; i <= top; i++) {
            const square = document.createElement("div");
            square.classList.add("quadrado-animado");
            square.innerText = data[i];
            visualList.appendChild(square);
        }

        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${top + 1}`;
    };

    return {
        push,
        pop,
        getTop
    };
};

const stack = Stack();

function insert() {
    const numberInput = document.getElementById("numberInput");
    const value = parseInt(numberInput.value);
    if (!isNaN(value)) {
        stack.push(value);
    }
    numberInput.value = "";
}

function remove() {
    stack.pop();
}

function searchTop(){
    const topValue = stack.getTop(); // Invoca a função getTop e armazena o valor retornado em topValue
    if(!topValue){
        alert('A pilha está vazia. :(')
    }else{
        alert(`O número ${topValue} está no topo da pilha!`);
    }
}