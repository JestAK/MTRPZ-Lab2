import { List } from "./List.ts";

export class ArrayList implements List {
    private data: string[] = [];

    length(): number {
        return this.data.length;
    }

    append(element: string): void {
        this.data.push(element);
    }

    insert(element: string, index: number): void {
        if (index < 0 || index > this.data.length) {
            throw new Error('Index out of range');
        }
        this.data.splice(index, 0, element);
    }

    delete(index: number): string {
        if (index < 0 || index >= this.data.length) {
            throw new Error('Index out of range');
        }
        const deletedElement = this.data[index];
        this.data.splice(index, 1);
        return deletedElement;
    }

    deleteAll(element: string): void {
        this.data = this.data.filter(e => e !== element);
    }

    get(index: number): string {
        if (index < 0 || index >= this.data.length) {
            throw new Error('Index out of range');
        }
        return this.data[index];
    }

    clone(): List {
        const copy = new ArrayList();
        copy.data = [...this.data];
        return copy;
    }

    reverse(): void {
        this.data.reverse();
    }

    findFirst(element: string): number {
        return this.data.indexOf(element);
    }

    findLast(element: string): number {
        return this.data.lastIndexOf(element);
    }

    clear(): void {
        this.data = [];
    }

    extend(other: List): void {
        const temp = other.clone();
        for (let i = 0; i < temp.length(); i++) {
            this.append(temp.get(i));
        }
    }
}