/**
 * author: Ralph Varjabedian
 */
import { Node, RunningPathCost } from "../typeDefs";

export interface IRunningCostsDataStructure {
    /**
     * Add a new [Start Node] -> [Node X] with it's current running cost
     * @param instance The data to add
     */
    add(instance: RunningPathCost): void;

    /**
     * Gets the next cheapest path to take of all the non visited nodes
     */
    getNextCheapestPathToTake(): RunningPathCost | undefined;

    /**
     * Mark node visited
     * @param visitedNode the visited node
     */
    markNodeVisited(visitedNode: Node): void;
}
