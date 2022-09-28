/**
 * author: Ralph Varjabedian
 */

import {PriorityHeap} from "../src/lib/PriorityHeap";
import {expect} from "chai";
import {HeapPlantUMLPrinter} from "../src/lib/HeapPlantUMLPrinter";
import fs from "fs";

describe('Priority Heap', () => {
    it('simple max heap, three nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => b > a);

        heap.push(10);
        expect(heap.peekPriorityNode()).to.equal(10);
        heap.push(2);
        expect(heap.peekPriorityNode()).to.equal(10);
        heap.push(15);
        expect(heap.peekPriorityNode()).to.equal(15);
    });
    it('simple min heap, three nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => a > b);

        heap.push(10);
        expect(heap.peekPriorityNode()).to.equal(10);
        heap.push(2);
        expect(heap.peekPriorityNode()).to.equal(2);
        heap.push(15);
        expect(heap.peekPriorityNode()).to.equal(2);
    });
    it('simple max heap, 10 nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => b > a);

        heap.push(10);
        expect(heap.peekPriorityNode()).to.equal(10);
        heap.push(2);
        expect(heap.peekPriorityNode()).to.equal(10);
        heap.push(15);
        expect(heap.peekPriorityNode()).to.equal(15);
        heap.push(20);
        expect(heap.peekPriorityNode()).to.equal(20);
        heap.push(21);
        expect(heap.peekPriorityNode()).to.equal(21);
        heap.push(3);
        expect(heap.peekPriorityNode()).to.equal(21);
        heap.push(4);
        expect(heap.peekPriorityNode()).to.equal(21);
        heap.push(11);
        expect(heap.peekPriorityNode()).to.equal(21);
        heap.push(19);
        expect(heap.peekPriorityNode()).to.equal(21);
        heap.push(22);
        expect(heap.peekPriorityNode()).to.equal(22);

        fs.writeFileSync("./graphs/heap-test-max.puml", HeapPlantUMLPrinter.generateContents(heap));
    });
    it('simple min heap, 10 nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => a > b);

        heap.push(10);
        expect(heap.peekPriorityNode()).to.equal(10);
        heap.push(9);
        expect(heap.peekPriorityNode()).to.equal(9);
        heap.push(15);
        expect(heap.peekPriorityNode()).to.equal(9);
        heap.push(20);
        expect(heap.peekPriorityNode()).to.equal(9);
        heap.push(8);
        expect(heap.peekPriorityNode()).to.equal(8);
        heap.push(21);
        expect(heap.peekPriorityNode()).to.equal(8);
        heap.push(7);
        expect(heap.peekPriorityNode()).to.equal(7);
        heap.push(6);
        expect(heap.peekPriorityNode()).to.equal(6);
        heap.push(5);
        expect(heap.peekPriorityNode()).to.equal(5);
        heap.push(25);
        expect(heap.peekPriorityNode()).to.equal(5);

        fs.writeFileSync("./graphs/heap-test-min.puml", HeapPlantUMLPrinter.generateContents(heap));
    });
});
