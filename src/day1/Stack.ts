export default class Stack<T> {
    public length: number;
    private tail?: Node<T>;

    constructor() {
        this.tail = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const newNode = { value: item, prev: this.tail } as Node<T>;
        this.tail = newNode;
        this.length++;
    }

    pop(): T | undefined {
        if (!this.tail) {
            return undefined;
        }

        const node = this.tail;
        this.tail = node.prev;
        node.prev = undefined;
        this.length--;
        return node.value;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}

type Node<T> = {
    value: T,
    prev?: Node<T>,
}
