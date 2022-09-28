# dijkstra TS

A glorified dijkstra implementation(s) using TypeScript with multiple approaches.

### Setup

```bash
    npm install
```

### The entry points

* `appPrim.ts` creates a predetermined graph and generates the minimum spanning graph and then traverses several use
  cases with the shortest path
* `appPrimLoad.ts` This variant loads `./sample-graphs/graph1.json` as the input graph.
* `appPrimRandom.ts` This variant generates a random input graph.

All outputs of the runs go under the temp folder `graphs`. Use the IDE plugin to open plantuml files or copy/paste the
result of `.puml` into their website.

### Graphing support

* I use [PlantUM](https://plantuml.com/download) to enable drawing graphs easily. You need to
  have [GraphViz](https://plantuml.com/graphviz-dot)