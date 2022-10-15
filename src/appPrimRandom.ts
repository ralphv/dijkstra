/**
 * author: Ralph Varjabedian
 */
import { LinearRunningCosts } from "./lib/implementations/LinearRunningCosts";
import { ProcessShortestPath } from "./lib/implementations/ProcessShortestPath";
import { GraphPlantUMLPrinter } from "./lib/GraphPlantUMLPrinter";
import * as fs from "fs";
import { GraphGenerator } from "./lib/GraphGenerator";
import { HeapRunningCosts } from "./lib/implementations/HeapRunningCosts";

console.log(`Running the algorithm with a randomly generated input Graph`);

// generate a random graph
const graph = GraphGenerator.generate(5, 15, 2, 10, 0.7);
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

(async () => {
    await graph.save("./graphs/appPrimRandom-graph.json");
    fs.writeFileSync(
        "./graphs/appPrimRandom-input-graph.puml",
        GraphPlantUMLPrinter.generateContents(firstNode, graph, false, (edge) => `${edge.cost}`),
    );
    fs.writeFileSync(
        `./graphs/appPrimRandom-${findLongestPath ? "max" : "min"}-spanning-tree.puml`,
        GraphPlantUMLPrinter.generateContents(
            firstNode,
            shortestPathTree,
            true,
            (edge) => `${edge.cost} (Σ=${edge.toMeta.runningCost})`,
        ),
    );
})();
