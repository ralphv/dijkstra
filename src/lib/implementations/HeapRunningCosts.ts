/**
 * author: Ralph Varjabedian
 */
import {IRunningCostsDataStructure} from "../interfaces/IRunningCostsDataStructure";
import {RunningPathCost, Node} from "../typeDefs";
import {PriorityHeap} from "../PriorityHeap";

/**
 * A heap data structure that determines the cheapest path to take
 */
export class HeapRunningCosts implements IRunningCostsDataStructure {
    private heap: PriorityHeap<RunningPathCost>;
    private visited: { [key: string]: boolean } = {};

    constructor(minHeap = true) {
        if (minHeap) {
            this.heap = new PriorityHeap<RunningPathCost>((a, b) =>
                a.cost > b.cost
            );
        } else {
            // Create max heap. This will find the longest path now vs the shortest
            this.heap = new PriorityHeap<RunningPathCost>((a, b) =>
                a.cost < b.cost
            );
        }
    }

    add(instance: RunningPathCost): void {
        this.heap.push(instance);
    }

    getNextCheapestPathToTake(): RunningPathCost | undefined {
        // if two paths reach the same node, we would have the longer one still on our heap
        // we need to ignore that and go past it by the usage of a custom visited hash
        let peeked = this.heap.peek();
        if (peeked === undefined) {
            return undefined
        }
        while (this.visited[peeked.to]) {
            this.heap.pop();
            peeked = this.heap.peek();
            if (peeked === undefined) {
                return undefined
            }
        }
        return this.heap.peek();
    }

    markNodeVisited(visitedNode: Node): void {
        if (visitedNode != this.heap.peek()?.to) {
            throw new Error("Should only mark the cheapest node");
        }
        const node = this.heap.pop() as unknown as RunningPathCost;
        this.visited[node.to] = true;
    }
}
