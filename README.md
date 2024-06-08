Menu Extractor and Visualization by by Asrat

An implementation of a node based Menu Extractor using react flow GIF Preview
Installation

To get started with this application, you will need to follow these steps:

    Clone the repository: git clone https://github.com/Asrat001/reactflow-menu-extraction
    Install dependencies: npm install
    Start the development server: npm run dev
    Open the application in your browser at http://localhost:5173

Usage

The application allows users to create flow diagrams from a meanu text . The user can create multiple nodes and connect them with edges. Each node can be customized with a label.
Directory Structure

├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── nodes
│   │   ├── panels
│   │   └── ui
│   │   └── index.ts
│   ├── config
│   │   ├── site.ts
│   │   └── store.ts
│   ├── lib
│   │   └── utils.ts
│   ├── styles
│   ├── App.tsx

Terminology

You can read about the terminology here but here is a quick summary:

    Node: A node is a single element in the flow diagram. It can be connected to other nodes with edges.
    Edge: An edge is a connection between two nodes. It can be used to connect two nodes together.
    Graph: A graph is a collection of nodes and edges. A graph can have multiple nodes and edges.
    Panel: A panel is a component that is used to change the settings of a node or add a new node to the graph.

Features

Some of the key features of the application include:

    Creating multiple Nodes.
    Creating Edges between Nodes.
    Creating Nodes from a list of available options.
    Change the settings of a Node.
    Validating Graph Integrity.
    Offline Functionality with PWA.

Styling

The application uses Tailwind CSS for styling.
Add a new Node

Currently, the application only supports a single type of Node (Text). To add a new Node, you will need to follow these steps:

    Create a new file in the src/components/nodes directory for a new type of node.
    Create a new file in the src/components/panel directory for a new setting panel.
    Add the new Node to the nodeTypes object in the src/config/site file.
    Add the new panel to the getPanel function in the src/components/panel file.
    Add the update logic for the new Node in the zustand store in src/config/store.

License: MIT
