import { expect } from "jsr:@std/expect";
import { DoubleLinkedList } from "./DoubleLinkedList.ts";

Deno.test("append", () => {
    const list = new DoubleLinkedList();
    list.append("A");
    list.append("B");
    expect(list.length()).toBe(2);
    expect(list.get(0)).toBe("A");
    expect(list.get(1)).toBe("B");
});

Deno.test("insert at position", () => {
    const list = new DoubleLinkedList();
    list.append("A");
    list.append("C");
    list.insert("B", 1);
    expect(list.get(1)).toBe("B");
});

Deno.test("insert out of range index", () => {
    const list = new DoubleLinkedList();
    expect(() => list.insert("X", -1)).toThrow();
    expect(() => list.insert("X", 1)).toThrow();
});

Deno.test("delete", () => {
    const list = new DoubleLinkedList();
    ["A", "B", "C"].forEach((e) => list.append(e));
    const removed = list.delete(1);
    expect(removed).toBe("B");
    expect(list.get(1)).toBe("C");
});

Deno.test("delete out of range index", () => {
    const list = new DoubleLinkedList();
    expect(() => list.delete(-1)).toThrow();
});

Deno.test("deleteAll", () => {
    const list = new DoubleLinkedList();
    ["A", "B", "A", "C"].forEach((e) => list.append(e));
    list.deleteAll("A");
    expect(list.get(0)).toBe("B");
    expect(list.get(1)).toBe("C");
});

Deno.test("clone", () => {
    const list = new DoubleLinkedList();
    ["A", "B"].forEach((e) => list.append(e));
    const copy = list.clone();
    list.deleteAll("A");
    expect(copy.get(0)).toBe("A");
    expect(copy.get(1)).toBe("B");
});

Deno.test("reverse", () => {
    const list = new DoubleLinkedList();
    ["A", "B", "C"].forEach((e) => list.append(e));
    list.reverse();
    expect(list.get(0)).toBe("C");
    expect(list.get(1)).toBe("B");
    expect(list.get(2)).toBe("A");
});

Deno.test("findFirst", () => {
    const list = new DoubleLinkedList();
    ["A", "B", "A", "C"].forEach((e) => list.append(e));
    expect(list.findFirst("A")).toBe(0);
});

Deno.test("findLast", () => {
    const list = new DoubleLinkedList();
    ["A", "B", "A", "C"].forEach((e) => list.append(e));
    expect(list.findLast("A")).toBe(2);
});

Deno.test("clear", () => {
    const list = new DoubleLinkedList();
    list.append("A");
    list.clear();
    expect(list.length()).toBe(0);
});

Deno.test("extend", () => {
    const list1 = new DoubleLinkedList();
    const list2 = new DoubleLinkedList();
    ["A", "B"].forEach((e) => list1.append(e));
    ["C", "D"].forEach((e) => list2.append(e));
    list1.extend(list2);
    expect(list1.get(2)).toBe("C");
    expect(list1.get(3)).toBe("D");
});