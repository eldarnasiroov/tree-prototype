import React, { useState } from "react";
import "./App.css";

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

interface TreeProps {
  nodes: TreeNode[];
}

const colors: Record<string, string> = {
  "1": "red",
  "2": "green",
  "3": "blue",
  "4": "yellow",
  "5": "purple",
};

// Компонент для одного узла дерева
const TreeNode: React.FC<{
  node: TreeNode;
  depth: number;
  thirdChildOpened: boolean;
  setThirdChildOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setDepth: React.Dispatch<React.SetStateAction<number>>;
}> = ({ node, depth, thirdChildOpened, setThirdChildOpened, setDepth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    const isThirdChild = depth >= 3;

    setThirdChildOpened(isThirdChild ? true : false);
  };

  setDepth(depth);

  return (
    <div style={{ marginLeft: depth === 1 ? "0px" : "100px" }}>
      <div
        onClick={hasChildren ? toggleOpen : () => {}}
        style={{
          cursor: "pointer",
          width: "200px",
          height: "25px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors[depth],
        }}
      >
        {node.label}
        {hasChildren && <span>{isOpen ? "▼" : "▶"} </span>}
      </div>

      {hasChildren && isOpen && (
        <div>
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              setThirdChildOpened={setThirdChildOpened}
              thirdChildOpened={thirdChildOpened}
              setDepth={setDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Основной компонент Tree
const Tree: React.FC<TreeProps> = ({ nodes }) => {
  console.log("🚀 ~ nodes:", nodes);
  const [isThirdChildOpen, setIsThirdChildOpen] = useState(false);
  const [depth, setDepth] = useState(1);

  return (
    <div
      style={{
        height: "500px",
        border: "1px solid black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: isThirdChildOpen ? -((depth - 3) * 100) + "px" : "0px",
          top: isThirdChildOpen
            ? -((depth - 3) * 25 * (nodes[0]?.children?.length || 1)) + "px"
            : "0px",
        }}
      >
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={1}
            setThirdChildOpened={setIsThirdChildOpen}
            thirdChildOpened={isThirdChildOpen}
            setDepth={setDepth}
          />
        ))}
      </div>
    </div>
  );
};

// Пример использования
const treeData: TreeNode[] = [
  {
    id: 1,
    label: "Папка 1",
    children: [
      { id: 2, label: "Файл 1.1" },
      { id: 3, label: "Файл 1.2" },
      {
        id: 4,
        label: "Папка 1.3",
        children: [
          { id: 5, label: "Файл 1.3.1" },
          { id: 6, label: "Файл 1.3.2" },
          {
            id: 7,
            label: "Папка 1.3.1",
            children: [
              { id: 8, label: "Файл 1.3.1.1" },
              { id: 9, label: "Файл 1.3.2.2" },
              {
                id: 7,
                label: "Папка 1.3.1",
                children: [
                  { id: 8, label: "Файл 1.3.1.1" },
                  { id: 9, label: "Файл 1.3.2.2" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const App = () => {
  return <Tree nodes={treeData} />;
};

export default App;
