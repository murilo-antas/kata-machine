export default class SinglyLinkedList<T> {
    public length: number;

    private root?: Node<T>;    

    constructor() {
        this.root = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const newNode = { value: item, next: this.root } as Node<T>;
        this.root = newNode;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        let current = this.root;
        let currentIndex = 0;
        while (current) {
            if (currentIndex > idx) {
                return;
            }
            if (currentIndex === idx) {
                const newNode = { value: item, next: current.next } as Node<T>;
                current.next = newNode;
                this.length++;
            }
            current = current.next;
            currentIndex++;
        }
    }

    append(item: T): void {
        const newNode = { value: item, next: undefined } as Node<T>;
        this.length++;
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (current?.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    remove(item: T): T | undefined {
        if (!this.root) {
            return undefined;
        }

        if (this.root.value === item) {
            const value = this.root.value;
            this.root = this.root.next;
            this.length--;
            return value;
        }

        let node = this.root;
        while (node.next) {
            if (node.next.value  == item) {
                this.length--;
                const result = node.next;
                node.next = node.next.next;
                result.next = undefined;
                return result.value;
            }
            node = node.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        let current = this.root;
        let currentIndex = 0;
        while (current) {
            if (currentIndex > idx) {
                return undefined;
            }
            if (currentIndex === idx) {
                return current?.value;
            }
            current = current.next;
            currentIndex++;
        }

        return undefined;
    }

    removeAt(idx: number): T | undefined {
        if (!this.root) {
            return undefined;
        }

        if (idx === 0) {
            this.length--;
            const node = this.root;
            this.root = this.root.next;
            node.next = undefined;
            return node.value;
        }

        let node = this.root;
        let currentIndex = 1;
        while (node.next) {
            if (currentIndex > idx) {
                return undefined;
            }
            if (currentIndex == idx) {
                this.length--;
                const result = node.next;
                node.next = node.next.next;
                result.next = undefined;
                return result.value;
            }
            node = node.next;
            currentIndex++;
        }
        return undefined;
    }
}

type Node<T> = {
    value: T;
    next?: Node<T>;
}
