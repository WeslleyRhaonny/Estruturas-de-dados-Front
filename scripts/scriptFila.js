class FilaSeq {
    constructor(){
        this.tamMax = 10;
    this.inicio = 0;
    this.fim = -1;
    this.nElementos = 0;
    this.dados = new Array (this.tamMax)
    }


    criaFilaVisualmente() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";

        for (let i = 0; i < this.tamMax; i++) {
            const quadrado = document.createElement("div");
            quadrado.className = "quadrado";
            visualList.appendChild(quadrado);
        }
    }

    atualizaFilaVisual() {
        const quadrados = document.querySelectorAll(".quadrado");
    
        if (this.dados[this.inicio] === undefined || this.dados[this.inicio] === null) {
            quadrados[0].textContent = "";
        }
    
        for (let i = 0; i < quadrados.length; i++) {
            if (this.dados[this.inicio + i] !== undefined) {
                quadrados[i].textContent = this.dados[this.inicio + i];
            } else {
                quadrados[i].textContent = "";
            }


            if (i === 0 && this.nElementos > 0) {
                const arrowInicio = document.createElement("div");
                arrowInicio.textContent = "↑"; // Caractere da seta para cima
                arrowInicio.className = "arrow";
                quadrados[i].appendChild(arrowInicio);
    
                const inicioLabel = document.createElement("span");
                inicioLabel.textContent = "Início";
                inicioLabel.className = "arrow-label";
                quadrados[i].appendChild(inicioLabel);
            }   
        }
        let ultimoIndice = this.nElementos -1;

        if (ultimoIndice > 0) {
            const arrowFim = document.createElement("div");
            arrowFim.textContent = "↑"; // Caractere da seta para baixo
            arrowFim.className = "arrow";
            quadrados[ultimoIndice].appendChild(arrowFim);
    
            const fimLabel = document.createElement("span");
            fimLabel.textContent = "Fim";
            fimLabel.className = "arrow-label";
            quadrados[ultimoIndice].appendChild(fimLabel);
    
            // Calcule a posição do último quadrado
            const lastSquare = quadrados[ultimoIndice];
            const lastSquareRect = lastSquare.getBoundingClientRect();
    
            // Ajuste a posição da seta para o centro do último quadrado
            arrowFim.style.position = "absolute";
            arrowFim.style.left = (lastSquareRect.left + lastSquareRect.width / 2 - 20) + "px";
            arrowFim.style.top = lastSquareRect.bottom + 5 + "px";
    
            // Ajuste a posição da label "Fim" abaixo da seta
            fimLabel.style.position = "absolute";
            fimLabel.style.left = (lastSquareRect.left + lastSquareRect.width / 2 - 10) + "px";
            fimLabel.style.top = lastSquareRect.bottom + 47 + "px"; // Ajuste conforme necessário
        }
    
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.nElementos}`;
    }

    atualizaFilaVisualRemocao() {
        const quadrados = document.querySelectorAll(".quadrado");
        if (this.dados[this.inicio] !== 0) {
            quadrados[0].textContent = "";
        }
    
        for (let i = 1; i < quadrados.length; i++) {
            if (i - 1 < this.nElementos) {
                quadrados[i - 1].textContent = quadrados[i].textContent;

            }
            
        }
    
        if (this.nElementos < this.tamMax) {
            quadrados[this.nElementos].textContent = "";
        }

        let ultimoIndice = this.nElementos-1;

        if (ultimoIndice > 0) {
            const arrowFim = document.createElement("div");
            arrowFim.textContent = "↑"; // Caractere da seta para baixo
            arrowFim.className = "arrow";
            quadrados[ultimoIndice].appendChild(arrowFim);
    
            const fimLabel = document.createElement("span");
            fimLabel.textContent = "Fim";
            fimLabel.className = "arrow-label";
            quadrados[ultimoIndice].appendChild(fimLabel);
    
            // Calcule a posição do último quadrado
            const lastSquare = quadrados[ultimoIndice];
            const lastSquareRect = lastSquare.getBoundingClientRect();
    
            // Ajuste a posição da seta para o centro do último quadrado
            arrowFim.style.position = "absolute";
            arrowFim.style.left = (lastSquareRect.left + lastSquareRect.width / 2 - 20) + "px";
            arrowFim.style.top = lastSquareRect.bottom + 5 + "px";
    
            // Ajuste a posição da label "Fim" abaixo da seta
            fimLabel.style.position = "absolute";
            fimLabel.style.left = (lastSquareRect.left + lastSquareRect.width / 2 - 10) + "px";
            fimLabel.style.top = lastSquareRect.bottom + 47 + "px"; // Ajuste conforme necessário
        }

        this.atualizaFilaVisual();
    
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.nElementos}`;
    }



    vazia(){
        return this.nElementos === 0;
    }
    

    cheia() {
        return this.nElementos === this.tamMax;
    }

    tamanho() {
        return this.nElementos;
    }

    primeiro() {
        if (this.vazia()) {
            return false; // Erro: Fila vazia
        } else {
            return this.dados[this.inicio];
        }
    }

    insere(valor) {
        if (this.cheia()) {
            alert("Fila cheia!");
            return false;
        }

        if (isNaN(valor)) {
            alert("O campo 'Insira um número' não pode estar vazio.");
            return false;
        }

        this.fim = (this.fim + 1) % this.tamMax; // Circularidade
        this.dados[this.fim] = valor;
    
        this.nElementos++;
        this.atualizaFilaVisual();
        return true;
    }

    remove() {
        if (this.vazia()) {
            return false; // Erro: Fila vazia
        }
    
        const res = this.primeiro();
        this.inicio = (this.inicio + 1) % this.tamMax; // Circularidade
        this.nElementos--;
        this.atualizaFilaVisualRemocao();
        return res;
    }

}

const fila = new FilaSeq(); // Cria uma instância da classe FilaSeq
fila.criaFilaVisualmente();

function insert() {
    let numberInput = parseInt(document.getElementById("numberInput").value);
    fila.insere(numberInput); // Chama o método insere da instância criada
}

function remove() {
    fila.remove();
}

function primeiro() {
    const inicio = fila.primeiro(); 
    if(!inicio){
        alert('A fila está vazia. :(')
    }else{
        alert(`O número ${inicio} está no início da fila!`);
    }
}


