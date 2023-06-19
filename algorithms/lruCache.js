class DoubleLinkedNode {
    constructor(data) {
        this.node_data = data;
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
            content.push(currentNode.node_data);
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
        let prev = node.prev ?? null;
        let next = node.next ?? null;
        if (node == this.tail) {
            this.tail = prev;
            this.tail.next = null;
        }

        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        this.length--;

    }

    pop() {
        let tailData = this.tail.node_data;
        this.remove(this.tail);
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
        if (this.cacheNodeMap.has(data)) {
            // Reset the most recently accessed value
            this.dataList.remove(this.cacheNodeMap.get(data));
            this.dataList.prepend(data);
        }
        else {
            let newNode = this.dataList.prepend(data);
            this.cacheNodeMap.set(data, newNode);
        }

        dataStore = this.cacheNodeMap.get(data).node_data;

        if (this.dataList.length > this.capacity) {
            // Pop the lru data from the back of the list.
            // Remove the mapped node from the map
            let tail_data = this.dataList.pop();
            this.cacheNodeMap.delete(tail_data);
        }
        return dataStore;
    }
}