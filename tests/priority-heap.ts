/**
 * author: Ralph Varjabedian
 */

import {PriorityHeap} from "../src/lib/PriorityHeap";
import {expect} from "chai";
import {HeapPlantUMLPrinter} from "../src/lib/HeapPlantUMLPrinter";
import fs from "fs";
import {getRandomInt} from "../src/lib/utils";

describe('Priority Heap', () => {
    it('simple max heap, three nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => b > a);

        heap.push(10);
        expect(heap.peek()).to.equal(10);
        heap.push(2);
        expect(heap.peek()).to.equal(10);
        heap.push(15);
        expect(heap.peek()).to.equal(15);
    });
    it('simple min heap, three nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => a > b);

        heap.push(10);
        expect(heap.peek()).to.equal(10);
        heap.push(2);
        expect(heap.peek()).to.equal(2);
        heap.push(15);
        expect(heap.peek()).to.equal(2);
    });
    it('simple max heap, 10 nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => b > a);

        heap.push(10);
        expect(heap.peek()).to.equal(10);
        heap.push(2);
        expect(heap.peek()).to.equal(10);
        heap.push(15);
        expect(heap.peek()).to.equal(15);
        heap.push(20);
        expect(heap.peek()).to.equal(20);
        heap.push(21);
        expect(heap.peek()).to.equal(21);
        heap.push(3);
        expect(heap.peek()).to.equal(21);
        heap.push(4);
        expect(heap.peek()).to.equal(21);
        heap.push(11);
        expect(heap.peek()).to.equal(21);
        heap.push(19);
        expect(heap.peek()).to.equal(21);
        heap.push(22);
        expect(heap.peek()).to.equal(22);

        fs.writeFileSync("./graphs/heap-test-max.puml", HeapPlantUMLPrinter.generateContents(heap));

        // now remove them
        expect(heap.pop()).to.equal(22);
        expect(heap.pop()).to.equal(21);
        expect(heap.pop()).to.equal(20);
        expect(heap.pop()).to.equal(19);
        expect(heap.pop()).to.equal(15);
        expect(heap.pop()).to.equal(11);
        expect(heap.pop()).to.equal(10);
        expect(heap.pop()).to.equal(4);
        expect(heap.pop()).to.equal(3);
        expect(heap.pop()).to.equal(2);
        expect(heap.pop()).to.equal(undefined);
        expect(heap.isEmpty()).to.equal(true);
    });
    it('simple min heap, 10 nodes', async () => {
        const heap = new PriorityHeap<number>((a, b) => a > b);

        heap.push(10);
        expect(heap.peek()).to.equal(10);
        heap.push(9);
        expect(heap.peek()).to.equal(9);
        heap.push(15);
        expect(heap.peek()).to.equal(9);
        heap.push(20);
        expect(heap.peek()).to.equal(9);
        heap.push(8);
        expect(heap.peek()).to.equal(8);
        heap.push(21);
        expect(heap.peek()).to.equal(8);
        heap.push(7);
        expect(heap.peek()).to.equal(7);
        heap.push(6);
        expect(heap.peek()).to.equal(6);
        heap.push(5);
        expect(heap.peek()).to.equal(5);
        heap.push(25);
        expect(heap.peek()).to.equal(5);

        fs.writeFileSync("./graphs/heap-test-min.puml", HeapPlantUMLPrinter.generateContents(heap));

        // now remove them
        expect(heap.pop()).to.equal(5);
        expect(heap.pop()).to.equal(6);
        expect(heap.pop()).to.equal(7);
        expect(heap.pop()).to.equal(8);
        expect(heap.pop()).to.equal(9);
        expect(heap.pop()).to.equal(10);
        expect(heap.pop()).to.equal(15);
        expect(heap.pop()).to.equal(20);
        expect(heap.pop()).to.equal(21);
        expect(heap.pop()).to.equal(25);
        expect(heap.pop()).to.equal(undefined);
        expect(heap.isEmpty()).to.equal(true);
    });
    it('simple min heap, random 50 elements', async () => {
        const valuesOutOfOrder = Array.from({length: 50}, () => getRandomInt(1, 1000));
        const valuesInOrder = valuesOutOfOrder.sort((a, b) => a - b);

        const heap = new PriorityHeap<number>((a, b) => a > b);
        heap.describeHeapStructure();

        // push to heap
        valuesOutOfOrder.forEach(a => heap.push(a));
        fs.writeFileSync("./graphs/heap-test-min-random.puml", HeapPlantUMLPrinter.generateContents(heap));

        for (let i = 0; i < valuesInOrder.length; i++) {
            expect(heap.pop()).to.equal(valuesInOrder[i]);
        }

        expect(heap.isEmpty()).to.be.true;
    });
});
