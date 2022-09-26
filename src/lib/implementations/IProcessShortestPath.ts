import {IGraph} from "../interfaces/IGraph";
import {IRunningCostsDataStructure} from "../interfaces/IRunningCostsDataStructure";
import {Node} from "../typeDefs";

export interface IProcessShortestPath<MetaType> {
    /**
     * Takes in a Graph, a running costs ds and returns the graph with the shortest path
     * @param start The start node
     * @param graph The graph structure
     * @param runningCosts The data structure
     */
    process(start: Node, graph: IGraph<MetaType>, runningCosts: IRunningCostsDataStructure): IGraph<MetaType>;
}