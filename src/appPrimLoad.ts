/**
 * author: Ralph Varjabedian
 */
import { LinearRunningCosts } from "./lib/implementations/LinearRunningCosts";
import { ProcessShortestPath } from "./lib/implementations/ProcessShortestPath";
import { GraphPlantUMLPrinter } from "./lib/GraphPlantUMLPrinter";
import * as fs from "fs";
import { Graph } from "./lib/implementations/Graph";
import { HeapRunningCosts } from "./lib/implementations/HeapRunningCosts";

(async () => {
    console.log(`Running the algorithm with a saved input Graph`);

    const graphLoader = new Graph<void>(false);
    const graph = await graphLoader.load("./sample-graphs/graph-1/graph.json");
    const firstNode = graph.getNodes()[0];

    // Create a data structure for running costs
    const useHeap = process.env.USE_HEAP_STRUCTURE === "TRUE";
    const findLongestPath = useHeap && process.env.FIND_LONGEST_PATH === "TRUE";
    console.log(`Using ${useHeap ? "Heap structure" : "Linear structure"}`);
    const runningCosts = useHeap ? new HeapRunningCosts(!findLongestPath) : new LinearRunningCosts();

    // Create the algorithm
    const algorithm = new ProcessShortestPath();

    // Generate
    const shortestPathTree = algorithm.process(firstNode, graph, runningCosts);

    fs.writeFileSync(
        "./graphs/appPrimLoad-input-graph.puml",
        GraphPlantUMLPrinter.generateContents(firstNode, graph, false),
    );
    fs.writeFileSync(
        `./graphs/appPrimLoad-${findLongestPath ? "max" : "min"}-spanning-tree.puml`,
        GraphPlantUMLPrinter.generateContents(firstNode, shortestPathTree, true),
    );
})();
