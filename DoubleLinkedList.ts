import { List } from './List.ts';

class Node {
    constructor(
        public value: string,
        public prev: Node | null = null,
        public next: Node | null = null
    ) {}
}

export class DoubleLinkedList implements List {
    private head: Node | null = null;
    private tail: Node | null = null;
    private _length = 0;

    length(): number {
        return this._length;
    }

    append(element: string): void {
        const node = new Node(element);
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this._length++;
    }

    insert(element: string, index: number): void {
        if (index < 0 || index > this._length) {
            throw new Error('Index out of range');
        }
        const node = new Node(element);
        if (index === 0) {
            node.next = this.head;
            if (this.head) this.head.prev = node;
            this.head = node;
            if (!this.tail) this.tail = node;
        } else if (index === this._length) {
            this.append(element);
            return;
        } else {
            let curr = this.head!;
            for (let i = 0; i < index; i++) curr = curr.next!;
            node.prev = curr.prev;
            node.next = curr;
            curr.prev!.next = node;
            curr.prev = node;
        }
        this._length++;
    }

    delete(index: number): string {
        if (index < 0 || index >= this._length) {
            throw new Error('Index out of range');
        }
        let curr = this.head!;
        for (let i = 0; i < index; i++) curr = curr.next!;
        const val = curr.value;
        if (curr.prev) curr.prev.next = curr.next;
        else this.head = curr.next;
        if (curr.next) curr.next.prev = curr.prev;
        else this.tail = curr.prev;
        this._length--;
        return val;
    }

    deleteAll(element: string): void {
        let curr = this.head;
        while (curr) {
            const next = curr.next;
            if (curr.value === element) {
                if (curr.prev) curr.prev.next = curr.next;
                else this.head = curr.next;
                if (curr.next) curr.next.prev = curr.prev;
                else this.tail = curr.prev;
                this._length--;
            }
            curr = next;
        }
    }

    get(index: number): string {
        if (index < 0 || index >= this._length) {
            throw new Error('Index out of range');
        }
        let curr = this.head!;
        for (let i = 0; i < index; i++) curr = curr.next!;
        return curr.value;
    }

    clone(): List {
        const copy = new DoubleLinkedList();
        let curr = this.head;
        while (curr) {
            copy.append(curr.value);
            curr = curr.next;
        }
        return copy;
    }

    reverse(): void {
        let curr = this.head;
        [this.head, this.tail] = [this.tail, this.head];
        while (curr) {
            [curr.next, curr.prev] = [curr.prev, curr.next];
            curr = curr.prev;
        }
    }

    findFirst(element: string): number {
        let curr = this.head, idx = 0;
        while (curr) {
            if (curr.value === element) return idx;
            curr = curr.next; idx++;
        }
        return -1;
    }

    findLast(element: string): number {
        let curr = this.tail, idx = this._length - 1;
        while (curr) {
            if (curr.value === element) return idx;
            curr = curr.prev; idx--;
        }
        return -1;
    }

    clear(): void {
        this.head = this.tail = null;
        this._length = 0;
    }

    extend(other: List): void {
        const temp = other.clone();
        for (let i = 0; i < temp.length(); i++) {
            this.append(temp.get(i));
        }
    }
}
