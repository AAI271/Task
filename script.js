class Node {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
    }
}

class BTree {
    constructor(numbers) {
        numbers.forEach(n => this.add(n));
    }
    add(n) {
        const newbie = new Node(n);
        if (!this.root) {
            this.root = newbie;
            return;
        }

        function walk(node) {
            if(n < node.value) {
                if (!node.left) {
                    node.left = newbie;
                    return;
                } else {
                    walk(node.left);
                }
            } else {
                if (!node.right) {
                    node.right = newbie;
                    return;
                } else {
                    walk(node.right);
                }
            }
        }
        walk(this.root);
    }
    draw(el) {
        function walk(el, node) {
            let childrenEl;
            let a = document.getElementById('node'+node.value)
            if(!a) {
                const nodeEl = document.createElement('div');
                nodeEl.id = 'node' + node.value
                nodeEl.className = 'level'
                const container = document.createElement('div');
                container.className = 'container'
                const valueEl = document.createTextNode(node.value);
                childrenEl = document.createElement('div');
                childrenEl.id = 'children' + node.value
                childrenEl.className = 'children';
                container.appendChild(valueEl)
                nodeEl.appendChild(container);
                nodeEl.appendChild(childrenEl);
                el.appendChild(nodeEl);
            }
            else{
                childrenEl = document.getElementById('children'+node.value);
            }
                if (node.left) walk(childrenEl, node.left);
                if (node.right) walk(childrenEl, node.right);


        }
        walk(el, this.root);
    }
}


let index = [];


const addNum = () => {
    let x = Math.floor((Math.random() * 2000) -1000);
    if (!(index.includes(x))){
        notification(x,1)
        const newList = [...index,x]
        const tree = new BTree(newList)
        tree.draw(document.body)
        index = newList
    }
    else{
        notification(x,0)
        console.log(`${x} is exists`)
    }
}

const notification = (x,y) => {
    const text = document.getElementById('text')
    if(y){
        text.className = 'green'
        text.innerText = `${x} is added`
    }
    else{
        text.className = 'red'
        text.innerText = `${x} is already exists`
        console.log(index)
    }
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        addNum()
    }
})
