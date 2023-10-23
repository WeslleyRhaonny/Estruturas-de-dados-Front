class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    criaListaVisualmente() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";

        this.displayInOrder(this.root, (node) => {
            const quadrado = document.createElement("div");
            quadrado.className = "quadrado";
            quadrado.textContent = node.value;
            visualList.appendChild(quadrado);
        });
    }    

    isEmpty() {
        return this.root === null;
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
                alert("Árvore criada");
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
                    alert("Inserção bem-sucedida a esquerda");
                } else {
                    parent.right = newNode;
                    alert("Inserção bem-sucedida a direita");
                }
            }

            this.criaListaVisualmente(); // Atualize a visualização após a inserção
        }
    }

    findMinValue(node) {
        if (node.left === null) {
            return node.value;
        }
        return this.findMinValue(node.left);
    }

    remove(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.remove(node.left, value);
        } else if (value > node.value) {
            node.right = this.remove(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                const minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.remove(node.right, minValue);
            }
        }

        return node;
    }

    removeValue(value) {
        this.root = this.remove(this.root, value);
    }
}

const bst = new BinarySearchTree();

function insert() {
    bst.insert(); // Chama o método insere da instância criada
}