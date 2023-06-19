class DoubleLinkedNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.length = 0
        this.tail = null;
    }

    get contents() {
        let content = []
        let currentNode = this.head;
        while (currentNode) {
            content.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return content;
    }

    prepend(data) {
        let newNode = new DoubleLinkedNode(data);
        newNode.next = this.head;
        this.head = newNode;
        if (this.length == 0) {
            this.tail = newNode
        }
        else {
            newNode.next.prev = newNode;
        }
        this.length++;

        return newNode;
    }

    remove(node) {
        prev = node.prev ?? null;
        next = node.next ?? null;

        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        this.length--;
    }

    pop() {
        let tailData = this.tail.data;
        let prev = this.tail.prev ?? null;

        if (prev) {
            this.tail = prev;
            this.tail.next = null;
        }
        this.length--;
        return tailData;
    }
}

export class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cacheNodeMap = new Map();
        this.dataList = new DoubleLinkedList();
    }

    access(data) {
        let dataStore = null;

        let key = data;
        console.log(cacheKy)
        if (this.cacheNodeMap.has(data)) {
            // Reset the most recently accessed value
            this.dataList.remove(this.cacheNodeMap[data]);
            this.dataList.prepend(data);
        }
        else {
            let newNode = this.dataList.prepend(data);
            this.cacheNodeMap[data] = newNode;
        }

        dataStore = this.cacheNodeMap[data].data;

        if (this.dataList.length > this.capacity) {
            this.cacheNodeMap.delete(this.dataList.pop());
        }
        return dataStore;
    }
}