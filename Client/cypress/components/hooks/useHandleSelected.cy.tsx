import ReactFlow, { Edge, Node } from "reactflow";
import useHandleSelected from "@/hooks/useHandleSelected";

const Flowchart = ({
                     nodes,
                     edges,
                     setSelected
                   }: {
  nodes: Node[]
  edges: Edge[]
  setSelected: (selected: Node | Edge | null) => void
}) => {
  useHandleSelected(nodes, edges, setSelected);
  return <ReactFlow className="h-full grow" nodes={nodes} edges={edges} />;
};

describe("useHandleSelected", () => {
  it("should update selected node", () => {
    const nodes = [
      {
        id: "node1",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 10, y: 20 }
      },
      {
        id: "node2",
        selected: true,
        dragging: false,
        data: {},
        position: { x: 20, y: 80 }
      },
      {
        id: "node3",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 30, y: 120 }
      }
    ];
    const edges = [
      { id: "edge1", selected: false, source: "node1", target: "node2" },
      { id: "edge2", selected: true, source: "node2", target: "node3" }
    ];
    const setSelected = cy.stub().as("setSelected");
    cy.mount(
      <Flowchart nodes={nodes} edges={edges} setSelected={setSelected} />
    );
    cy.get("@setSelected").should("have.been.calledWith", nodes[1]);
  });

  it("should clear selected node", () => {
    const nodes = [
      {
        id: "node1",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 10, y: 20 }
      },
      {
        id: "node2",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 20, y: 80 }
      },
      {
        id: "node3",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 30, y: 120 }
      }
    ];
    const edges = [
      { id: "edge1", selected: false, source: "node1", target: "node2" },
      { id: "edge2", selected: false, source: "node2", target: "node3" }
    ];
    const setSelected = cy.stub().as("setSelected");
    cy.mount(
      <Flowchart nodes={nodes} edges={edges} setSelected={setSelected} />
    );
    cy.get("@setSelected").should("have.been.calledWith", null);
  });
  it("should update selected Edge", () => {
    const nodes = [
      {
        id: "node1",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 10, y: 20 }
      },
      {
        id: "node2",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 20, y: 80 }
      },
      {
        id: "node3",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 30, y: 120 }
      }
    ];
    const edges = [
      { id: "edge1", selected: true, source: "node1", target: "node2" },
      { id: "edge2", selected: false, source: "node2", target: "node3" }
    ];
    const setSelected = cy.stub().as("setSelected");
    cy.mount(
      <Flowchart nodes={nodes} edges={edges} setSelected={setSelected} />
    );
    cy.get("@setSelected").should("have.been.calledWith", edges[0]);
  });
  it("should clear selected Edge", () => {
    const nodes = [
      {
        id: "node1",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 10, y: 20 }
      },
      {
        id: "node2",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 20, y: 80 }
      },
      {
        id: "node3",
        selected: false,
        dragging: false,
        data: {},
        position: { x: 30, y: 120 }
      }
    ];
    const edges = [
      { id: "edge1", selected: false, source: "node1", target: "node2" },
      { id: "edge2", selected: false, source: "node2", target: "node3" }
    ];
    const setSelected = cy.stub().as("setSelected");
    cy.mount(
      <Flowchart nodes={nodes} edges={edges} setSelected={setSelected} />
    );
    cy.get("@setSelected").should("have.been.calledWith", null);
  });
});
