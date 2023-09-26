class No {
    constructor() {
        this.ant = null;
        this.conteudo = null;
        this.prox = null;
    }
}

class LDE {
    constructor() {
        this.inicio = null;
        this.fim = null;
        this.tamanho = 0;
    }

    vazia() {
        return this.tamanho === 0;
    }

    tamanho() {
        return this.tamanho;
    }

    elemento(pos) {
        let aux = this.inicio;
        let cont = 1;

        if (this.vazia() || pos < 1 || pos > this.tamanho) {
            return -1; // Consulta falhou
        }

        while (cont < pos) {
            aux = aux.prox;
            cont++;
        }

        return aux.conteudo;
    }

    criaListaVisualmente() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";
    
        let aux = lista.inicio;
        const posInsercao = isNaN(parseInt(document.getElementById("posInput").value)) ? this.tamanho : parseInt(document.getElementById("posInput").value);
        let posicaoAtual = 1; // Variável para rastrear a posição atual
    
        while (aux) {
            if (aux.ant === null) {
                const nullBox = document.createElement("div");
                nullBox.className = "quadrado";
                nullBox.textContent = "Null";
                visualList.appendChild(nullBox);
                this.addArrowInver();
            }
    
            const quadrado = document.createElement("div");
            quadrado.textContent = aux.conteudo;
    
            if (posicaoAtual === posInsercao) {
                quadrado.className = "quadrado-animado";
            } else {
                quadrado.className = "quadrado";
            }
    
            visualList.appendChild(quadrado);
    
            if (aux.prox != null) {
                this.addDoubleArrow();
            }
    
            if (aux.prox === null) {
                this.addArrow();
                const nullBox2 = document.createElement("div");
                nullBox2.className = "quadrado";
                nullBox2.textContent = "Null";
                visualList.appendChild(nullBox2);
            }
    
            aux = aux.prox;
            posicaoAtual++;
        }
    }    

    criaListaVisualmenteRemocao() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";
    
        let aux = lista.inicio;
    
        while (aux) {
            if (aux.ant === null) {
                const nullBox = document.createElement("div");
                nullBox.className = "quadrado"; 
                nullBox.textContent = "Null";
                visualList.appendChild(nullBox);
                this.addArrowInver();
            }

            const quadrado = document.createElement("div");
            quadrado.className = "quadrado";
            quadrado.textContent = aux.conteudo;
            visualList.appendChild(quadrado);
            if (aux.prox != null) {
                this.addDoubleArrow();
            }
            if (aux.prox === null) {
                this.addArrow();
                const nullBox2 = document.createElement("div");
                nullBox2.className = "quadrado"; 
                nullBox2.textContent = "Null";
                visualList.appendChild(nullBox2);
            }
            aux = aux.prox;
        }
    }

    atualizaListaVisual() {
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.tamanho}`;
    }

    addDoubleArrow() {
        const arrowContainer = document.createElement("div");
        arrowContainer.innerHTML = "&#8594;<br/>&#8592;";
        arrowContainer.className = "double-arrow";
        visualList.appendChild(arrowContainer);
    }

    addArrow() {
        const arrow = document.createElement("div");
        arrow.textContent = "→"; 
        arrow.className = "arrow";
        visualList.appendChild(arrow);
    }

    addArrowInver() {
        const arrowInver = document.createElement("div");
        arrowInver.textContent = "←"; 
        arrowInver.className = "arrow-inver";
        visualList.appendChild(arrowInver);
    }

    posicao(dado) {
        let aux = this.inicio;
        let cont = 1;

        if (this.vazia()) {
            return -1;
        }

        while (aux !== null) {
            if (aux.conteudo === dado) {
                return cont;
            }
            aux = aux.prox;
            cont++;
        }

        return -1;
    }

    insereInicioLista(valor) {
        let novoNo = new No();
        novoNo.conteudo = valor;

        novoNo.prox = this.inicio;
        novoNo.ant = null;

        if (this.vazia()) {
            this.fim = novoNo;
        } else {
            this.inicio.ant = novoNo;
        }

        this.inicio = novoNo;
        this.tamanho++;
        this.criaListaVisualmente();
        this.atualizaListaVisual();
        return true;
    }

    insereFimLista(valor) {
        let novoNo = new No();
        novoNo.conteudo = valor;

        novoNo.prox = null;
        novoNo.ant = this.fim;

        if (this.vazia()) {
            this.inicio = novoNo;
        } else {
            this.fim.prox = novoNo;
        }

        this.fim = novoNo;
        this.tamanho++;
        this.criaListaVisualmente();
        this.atualizaListaVisual();
        return true;
    }

    insereMeioLista(pos, valor) {
        let novoNo = new No();
        novoNo.conteudo = valor;

        let aux = this.inicio;
        let cont = 1;

        while (cont < pos - 1) {
            aux = aux.prox;
            cont++;
        }

        novoNo.prox = aux.prox;
        novoNo.ant = aux;
        if (aux.prox !== null) {
            aux.prox.ant = novoNo;
        }
        aux.prox = novoNo;

        this.tamanho++;
        this.criaListaVisualmente();
        this.atualizaListaVisual();
        return true;
    }

    insere(pos, valor) {
        
        const auxPos = isNaN(parseInt(pos)) ? this.tamanho + 1 : parseInt(pos);

        if(auxPos<=0){
            alert("Posição inválida!");
        }

        if (auxPos === 1) {
            return this.insereInicioLista(valor);
            
        } else if (auxPos === this.tamanho + 1) {
            return this.insereFimLista(valor);
        } else {
            return this.insereMeioLista(auxPos, valor);
        }
    }

    removeInicioLista() {
        if (this.vazia()) {
            return -1;
        }

        let dado = this.inicio.conteudo;
        this.inicio = this.inicio.prox;
        if (this.inicio !== null) {
            this.inicio.ant = null;
        } else {
            this.fim = null;
        }
        this.tamanho--;
        this.criaListaVisualmenteRemocao();
        this.atualizaListaVisual();

        return dado;
    }

    removeFimLista() {
        if (this.vazia()) {
            return -1;
        }

        let dado = this.fim.conteudo;
        this.fim = this.fim.ant;
        if (this.fim !== null) {
            this.fim.prox = null;
        } else {
            this.inicio = null;
        }
        this.tamanho--;
        this.criaListaVisualmenteRemocao();
        this.atualizaListaVisual();

        return dado;
    }

    removeMeioLista(pos) {
        let aux = this.inicio;
        let cont = 1;

        while (cont < pos) {
            aux = aux.prox;
            cont++;
        }

        let dado = aux.conteudo;
        aux.ant.prox = aux.prox;
        if (aux.prox !== null) {
            aux.prox.ant = aux.ant;
        }
        this.tamanho--;
        this.criaListaVisualmenteRemocao();
        this.atualizaListaVisual();

        return dado;
    }

    remove(pos) {
        if (this.vazia() || pos < 1 || pos > this.tamanho) {
            return -1;
        }

        if (pos === 1) {
            return this.removeInicioLista();
        } else if (pos === this.tamanho) {
            return this.removeFimLista();
        } else {
            return this.removeMeioLista(pos);
        }
    }

    buscaPorValor(valor) {
        let aux = this.inicio;
        let pos = 1;
        const posicoes = [];
    
        while (aux !== null) {
            if (aux.conteudo === valor) {
                posicoes.push(pos);
            }
            aux = aux.prox;
            pos++;
        }
    
        if (posicoes.length > 0) {
            return posicoes;
        }
        return -1; // Retorna -1 se o valor não for encontrado na lista
    }
    

    buscaPorPosicao(posicao) {
        if (posicao < 1 || posicao > this.nElementos) {
            return -1; // Posição inválida
        }

        let aux = this.inicio;
        let contador = 1;

        while (contador < posicao) {
            aux = aux.prox;
            contador++;
        }

        return aux.conteudo; // Retorna o valor na posição desejada
    }
}

const lista = new LDE(); // Crie uma instância da classe LDE

function insert() {
    let numIns = parseInt(document.getElementById("numberInput").value);
    let posIns = parseInt(document.getElementById("posInput").value);
    lista.insere(posIns, numIns); // Chama o método insere da instância criada
}

function remove() {
    let posIns = parseInt(document.getElementById("posInput").value);
    lista.remove(posIns);
}

function buscaNumero() {
    const valorProcurado = parseInt(document.getElementById("numberInput").value);
    const posicao = lista.buscaPorValor(valorProcurado);

    if (posicao !== -1) {
        alert(`O número ${valorProcurado} está na posição ${posicao}.`);
    } else {
        alert("O valor não foi encontrado na lista.");
    }
}

function buscaNumeroPosicao() {
    const posicaoDesejada = parseInt(document.getElementById("posInput").value);
    const valorEncontrado = lista.buscaPorPosicao(posicaoDesejada);

    if (valorEncontrado !== -1) {
        alert(`O valor na posição ${posicaoDesejada} é ${valorEncontrado}.`);
    } else {
        alert("Posição inválida.");
    }
}