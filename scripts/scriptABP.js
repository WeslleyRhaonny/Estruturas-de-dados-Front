class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.svgElement = null; // Adicione este atributo
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.tamanho = 0;
    }   

    isEmpty() {
        return this.root === null;
    }

    atualizaArvoreVisual() {
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.tamanho}`;
    }
    
    search(node, value) {
        if (node === null) {
            return null;
        }

        if (node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this.search(node.left, value);
        } else {
            return this.search(node.right, value);
        }
    }

    searchValue(value) {
        return this.search(this.root, value);
    }

    searchValueIterative(value) {
        if (this.isEmpty()) {
            return null;
        }

        let current = this.root;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }

            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    inOrder(node, callback) {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node);
            this.inOrder(node.right, callback);
        }
    }

    displayInOrder(callback) {
        if (this.isEmpty()) {
            console.log("Árvore vazia");
        } else {
            this.inOrder(this.root, callback);
        }
    }

    displayInOrderReverse(callback) {
        if (this.isEmpty()) {
            console.log("Árvore vazia");
        } else {
            this.inOrderReverse(this.root, callback);
        }
    }

    inOrderReverse(node, callback) {
        if (node !== null) {
            this.inOrderReverse(node.right, callback);
            callback(node);
            this.inOrderReverse(node.left, callback);
        }
    }

    insert() {
        const value = parseInt(document.getElementById("numberInput").value); // Obtenha o valor do campo de entrada
        if (!isNaN(value)) { // Verifique se é um número válido
            const newNode = new Node(value);

            if (this.root === null) {
                this.root = newNode;
                this.tamanho++;
            } else {
                let current = this.root;
                let parent = null;

                while (current !== null) {
                    parent = current;

                    if (value === current.value) {
                        alert("Valor já existe na árvore.");
                        return;
                    }

                    if (value < current.value) {
                        current = current.left;
                    } else {
                        current = current.right;
                    }
                }

                if (value < parent.value) {
                    parent.left = newNode;
                    this.tamanho++;
                } else {
                    parent.right = newNode;
                    this.tamanho++;
                }
            }

            this.atualizaArvoreVisual();
        }
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, key) {
        if (node === null) {
            return null;
        }

        if (key < node.value) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.value) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                this.tamanho--;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                this.tamanho--;
                return node;
            } else if (node.right === null) {
                node = node.left;
                this.tamanho--;
                return node;
            }
            else{
                const minValueNode = this.findMinNode(node.right);
                node.value = minValueNode.value;
                node.right = this.removeNode(node.right, minValueNode.value);
                return node;
            }
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        }
        return this.findMinNode(node.left);
    }
        
}

// ===== Função de animação =====
function animateSearchResult(nodeElement) {
    let count = 0;

    function blink() {
        if (count < 6) { // Piscar 3 vezes (Muda para original - Muda para outra cor)
            if (count % 2 === 0) {
                nodeElement.style.fill = "black";
            } else {
                nodeElement.style.fill = "#FFA500";
                nodeElement.nextElementSibling.style.fill = "#FFF";
            }
            count++;
            setTimeout(blink, 500); // Pisca a cada 500ms
        } else {
            // Restaura os padrões originais
            nodeElement.style.fill = "black";
            nodeElement.nextElementSibling.style.fill = "#FFA500";
        }
    }
    blink(); // Chama a animação.
}


function animateSearchResultInOrdem(nodeElement) {
    function blink(count) {
        if (count < 2) { // Piscar uma vez (Muda para original - Muda para outra cor)
            nodeElement.style.fill = "black";
            nodeElement.style.fill = "#FFA500";
            nodeElement.nextElementSibling.style.fill = "#FFF";
            setTimeout(() => {
                blink(count + 1);
            }, 500); // Pisca a cada 500ms
        } else {
            // Restaura os padrões originais
            nodeElement.style.fill = "black";
            nodeElement.nextElementSibling.style.fill = "#FFA500";
        }
    }
    blink(0); // Chama a animação pela primeira vez.
}

function exibeInOrdem_(nodeList, index) {
    if (index < nodeList.length) {
        const node = nodeList[index];
        animateSearchResultInOrdem(node.svgElement); // Chama a animação
        setTimeout(function () {
            //animateSearchResultInOrdem(node.svgElement); // Reverte a animação
            exibeInOrdem_(nodeList, index + 1); // Chama a próxima animação
        }, 2000); // Atraso de 2 segundos entre cada nó em milissegundos
    }
}

function exibeInOrdem() {
    if (tree.isEmpty()) {
        console.log("Árvore vazia");
    } else {
        const nodeList = [];
        tree.inOrder(tree.root, (node) => {
            nodeList.push(node);
        });
        exibeInOrdem_(nodeList, 0); // Inicia a animação a partir do primeiro nó
    }
}

const tree = new BinarySearchTree();
const treeContainer = document.getElementById("tree-container");
const insertButton = document.getElementById("insertNode");
const removeButton = document.getElementById("removeNodeButton");
const searchButton = document.getElementById("searchNodeButton");
const walkButton = document.getElementById("walkNodeButton");
const nodeValueInput = document.getElementById("numberInput");
const removeNodeInput = document.getElementById("removeNode");

insertButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        tree.insert(value);
        renderTree();
    }
    nodeValueInput.value = "";
});

removeButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        tree.remove(value);
        renderTree();
    }
    tree.atualizaArvoreVisual();
    nodeValueInput.value = "";
});

searchButton.addEventListener("click", () => {
    
    const valor = parseInt(document.getElementById("numberInput").value);
    if(!isNaN(valor)){
        const resultadoBusca = tree.searchValueIterative(valor);

        if (resultadoBusca === null) {
            alert("Nenhum elemento na lista com o valor: " + valor);
        } else {
            animateSearchResult(resultadoBusca.svgElement); // Chama a animação

            const valorEsq = resultadoBusca.left ? resultadoBusca.left.value : "não possui";
            const valorDir = resultadoBusca.right ? resultadoBusca.right.value : "não possui";

            // !!!!!!!!!!!!!!! Perguntar ao pessoal se é melhor só a animação ou se é bom ter o alert !!!!!!!!!!!!!!!
            //alert("O elemento de valor " + valor + " está na lista. Filho da esquerda: " + valorEsq + ". Filho da direita: " + valorDir);
        }
    }
    nodeValueInput.value = "";
});

walkButton.addEventListener("click", () => {
    if (tree.isEmpty()) {
        console.log("Árvore vazia");
    } else {
        const nodeList = [];
        tree.inOrder(tree.root, (node) => {
            nodeList.push(node);
        });
        exibeInOrdem_(nodeList, 0); // Inicia a animação a partir do primeiro nó
    }
    removeNodeInput.value = "";
});

function renderTree() {
    // Limpar o conteúdo do contêiner da árvore
    treeContainer.innerHTML = "";

    // Construir e renderizar a árvore usando SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "1200");
    svg.setAttribute("height", "600");

    if (tree.root) {
        renderNode(tree.root, 600, 50, 600);
    }

    treeContainer.appendChild(svg);
}

function renderNode(node, x, y, xOffset) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 20);
    circle.setAttribute("stroke", "#FFA500"); // Cor do contorno do círculo
    circle.setAttribute("fill", "black");    // Cor do preenchimento do círculo
    treeContainer.appendChild(circle);

    // Defina a referência ao elemento SVG no objeto de nó
    node.svgElement = circle;

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.textContent = node.value;
    text.setAttribute("fill", "#FFA500");  // Cor do texto (laranja)
    treeContainer.appendChild(text);

    if (node.left) {
        // Desenhar uma linha para o nó esquerdo
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", y + 20);
        line.setAttribute("x2", x - xOffset / 2);
        line.setAttribute("y2", y + 70);
        line.setAttribute("stroke", "#FFA500");
        treeContainer.appendChild(line);

        renderNode(node.left, x - xOffset / 2, y + 70, xOffset / 2);
    }

    if (node.right) {
        // Desenhar uma linha para o nó direito
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", y + 20);
        line.setAttribute("x2", x + xOffset / 2);
        line.setAttribute("y2", y + 70);
        line.setAttribute("stroke", "#FFA500");
        treeContainer.appendChild(line);

        renderNode(node.right, x + xOffset / 2, y + 70, xOffset / 2);
    }
}


renderTree();