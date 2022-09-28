/**
 * author: Ralph Varjabedian
 */
import { SimpleRunningCosts } from "./lib/implementations/SimpleRunningCosts";
import { ProcessShortestPath } from "./lib/implementations/ProcessShortestPath";
import { GraphPlantUMLPrinter } from "./lib/GraphPlantUMLPrinter";
import * as fs from "fs";
import { Graph } from "./lib/implementations/Graph";
import {HeapRunningCosts} from "./lib/implementations/HeapRunningCosts";

(async () => {
    console.log(`Running the algorithm with a saved input Graph`);

    const graphLoader = new Graph<void>(false);
    const graph = await graphLoader.load("./sample-graphs/graph1.json");
    const firstNode = graph.getNodes()[0];

    // Create a data structure for running costs
    console.log(`Using ${process.env.USE_HEAP_STRUCTURE ? "Heap structure" : "Linear structure"}`);
    const runningCosts = process.env.USE_HEAP_STRUCTURE ? new HeapRunningCosts() : new SimpleRunningCosts();

    // Create the algorithm
    const algorithm = new ProcessShortestPath();

    // Generate
    const shortestPathTree = algorithm.process(firstNode, graph, runningCosts);

    fs.writeFileSync(
        "./graphs/appPrimLoad-input-graph.puml",
        GraphPlantUMLPrinter.generateContents(firstNode, graph, false),
    );
    fs.writeFileSync(
        "./graphs/appPrimLoad-min-spanning-tree.puml",
        GraphPlantUMLPrinter.generateContents(firstNode, shortestPathTree, true),
    );
})();
