export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    
    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const newNode = { value: item, next: this.head } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error('Out ouf bounds');
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        const newNode = { value: item } as Node<T>;
        this.length++;
        let current = this.head;
        for (let i = 0; current && i < idx; i++) {
            current = current.next;
        }
        current = current as Node<T>;
        newNode.next = current;
        newNode.prev = current.prev;
        if (current.prev) {
            current.prev.next = newNode;
        }
        current.prev = newNode;
    }

    append(item: T): void {
        const newNode = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
    }

    remove(item: T): T | undefined {
        let current = this.head;
        for (let i = 0; current && i < this.length; i++) {
            if (current.value === item) {
                break;
            }
            current = current.next;
        }

        if (!current) {
            return undefined;
        }

        return this.removeNode(current);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (node) {
            return this.removeNode(node);;
        }
        return undefined;
    }

    private getAt(idx: number): Node<T> | undefined {
        let current = this.head;
        for (let i = 0; current && i < idx; i++) {
            current = current.next;
        }
        return current;
    }
    
    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const value = this.head?.value;
            this.head = this.tail = undefined;
            return value;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node=== this.head) {
            this.head = node.next;
        }
        if (node=== this.tail) {
            this.tail = node.prev;
        }
        node.prev = node.next = undefined;
        return node.value;
    }
}

type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}
