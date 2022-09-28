import { IProcessShortestPath } from "./IProcessShortestPath";
import { IGraph } from "../interfaces/IGraph";
import { IRunningCostsDataStructure } from "../interfaces/IRunningCostsDataStructure";
import { Node } from "../typeDefs";
import { Graph } from "./Graph";

export type ShortestPathTreeMeta = { cost: number; runningCost: number };

export class ProcessShortestPath implements IProcessShortestPath<ShortestPathTreeMeta> {
    process(
        start: Node,
        graph: IGraph<unknown>,
        runningCosts: IRunningCostsDataStructure,
    ): IGraph<ShortestPathTreeMeta> {
        const shortestPathTree = new Graph<ShortestPathTreeMeta>(true);
        // add the initial node with zero to the running costs
        runningCosts.add({ from: start, to: start, cost: 0 });
        // keep track of the last node we visited
        while (true) {
            // pick the next travel path candidate (cheapest)
            const pathToTake = runningCosts.getNextCheapestPathToTake();
            if (pathToTake === undefined) {
                break;
            }

            // add new node destination (to) and the path we will travel to it (from -> to) with cost
            shortestPathTree.addNode(pathToTake.to, {
                cost: pathToTake.cost,
                runningCost:
                    pathToTake.cost +
                    (shortestPathTree.hasNode(pathToTake.from)
                        ? shortestPathTree.getNodeMeta(pathToTake.from).runningCost
                        : 0),
            });
            if (pathToTake.cost !== 0) {
                shortestPathTree.addPath(pathToTake.from, { to: pathToTake.to, cost: pathToTake.cost });
            }
            runningCosts.markNodeVisited(pathToTake.to);

            // fill the possible candidates into the running costs data
            graph
                .getPathsOfNode(pathToTake.to)
                .filter((a) => !shortestPathTree.hasNode(a.to))
                .map((a) => ({ from: pathToTake.to, to: a.to, cost: a.cost }))
                .forEach((a) => {
                    runningCosts.add(a);
                });
        }

        return shortestPathTree;
    }
}
