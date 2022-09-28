/**
 * author: Ralph Varjabedian
 */
import {EOL} from "os";
import {IPriorityHeap} from "./PriorityHeap";

export class HeapPlantUMLPrinter {
    public static generateContents(heap: IPriorityHeap<number>) {
        const steps = heap.describeHeapStructure().map((edge) => {
            return `${edge.from} -> ${edge.to};`;
        });
        return `@startdot
digraph a {
    fontname="Helvetica,Arial,sans-serif"
    node [fontname="Helvetica,Arial,sans-serif"]
    edge [fontname="Helvetica,Arial,sans-serif"]
    rankdir=TB;
    node [shape = circle];
    edge[arrowhead="normal"];
${steps.map((a) => `    ${a}`).join(EOL)}
}
@enddot
`;
    }
}
