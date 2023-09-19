function createVisualList() {
    const visualList = document.getElementById("visualList");
    visualList.innerHTML = "";

    const square = document.createElement("div");
    square.className = "square";
    visualList.appendChild(square);
}

let nElementos = 0;

class No {
    constructor(valor){
        this.valor = valor;
        this.proximo = null;
    }
}

class LSE{
    constructor(){
        this.cabeca = null;
    }
}

function insertNumber(){
    const numberInput = document.getElementById("numberInput");
    const number = parseInt(numberInput.value);
    const posInput = document.getElementById("posInput");
    const position = parseInt(posInput.value);

    const novoNo = new No(number);
    
    if (nElementos == 0) {
        this.cabeca = novoNo;
        nElementos++;
    } 
    else if(position > nElementos){
        let atual = this.cabeca; // Atual começa da cabeça
        
        while (atual.proximo != null) { // Pega o próximo até chegar no
            atual = atual.proximo;
        }
        atual.proximo = novoNo;
        nElementos++;
    } 
    else {
        let atual = this.cabeca;
        let positianAtual = 0;
        
        while(positianAtual < position){
            positianAtual++;
            atual = atual.proximo;
        }
        atual.proximo = novoNo;

    }

    const LSE = new LSE();

}
