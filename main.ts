import {ArrayList} from "./ArrayList.ts";
import {DoubleLinkedList} from "./DoubleLinkedList.ts";

const arrayList = new ArrayList()
arrayList.append("hello")
arrayList.append("world")
console.log(arrayList.length())
console.log(arrayList)


const doubleLinkedList = new DoubleLinkedList()
doubleLinkedList.append("hello")
doubleLinkedList.append("world")
console.log(doubleLinkedList.length())
console.log(doubleLinkedList)