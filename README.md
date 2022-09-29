# dijkstra TS

![Sample Graph](resources/img.png?raw=true "Sample Graph")

A glorified `dijkstra` implementation(s) using `TypeScript` with multiple data structures.

This repo is for educational purposes. Graphs can be easily visualized using [PlantUML](https://plantuml.com/). 

### Setup

```bash
    npm install
```

### The entry points

* `appPrim.ts` creates a predetermined graph and generates the minimum spanning graph and then traverses several use
  cases with the shortest path.
* `appPrimLoad.ts` This variant loads `./sample-graphs/graph1.json` as the input graph.
* `appPrimRandom.ts` This variant generates a random input graph.

All outputs of the runs go under the temp folder `graphs`. Use the IDE plugin to open plantuml files or copy/paste the
result of `.puml` into their website.

Each entry point, when run, generates it's input/mst graphs under `./graphs`.

### Figuring out the next cheapest path
* There are two data structures that can do that
  * `HeapRunningCosts`: Uses a heap structure to achieve O(Edge * Log(Vertex))
  * `LinearRunningCosts`: Uses an array structure to achieve O(Vertex²)

All entry points can be run using with the env variable `USE_HEAP_STRUCTURE=TRUE` to use the heap.

If using the heap, you can optionally use `FIND_LONGEST_PATH=TRUE` to use max heap. 
This will find the `longest path` instead of the `shortest path`

### Samples
* [Samples](docs/SAMPLES.md): Checkout the samples.

### Graphing support

* I use [PlantUM](https://plantuml.com/download) to enable drawing graphs easily. You need to
  have [GraphViz](https://plantuml.com/graphviz-dot).