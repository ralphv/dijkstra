import {IRunningCostsDataStructure} from "../interfaces/IRunningCostsDataStructure";
import {RunningPathCost, Node} from "../typeDefs";

export class SimpleRunningCosts implements IRunningCostsDataStructure {
    private data: RunningPathCost[];

    constructor() {
        this.data = [];
    }

    add(instance: RunningPathCost): void {
        this.data.push(instance);
    }

    getNextCheapestPathToTake(): RunningPathCost | undefined {
        const result = this.data.reduce((currentLowest: undefined | RunningPathCost, instance) => {
            if (currentLowest === undefined || instance.cost < currentLowest.cost) {
                currentLowest = instance;
            }
            return currentLowest;
        }, undefined);
        return result === undefined ? undefined : result;
    }

    markNodeVisited(visitedNode: Node): void {
        this.data = this.data.filter(a => a.to !== visitedNode);
    }
}