import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("Result will appear here...");
  const [loading, setLoading] = useState(false);

  const nodes = [
    {
      id: "1",
      position: { x: 100, y: 150 },
      data: {
        label: (
          <div className="w-72 p-4 rounded-xl border bg-white shadow">
            <h3 className="font-semibold mb-2">Input</h3>
            <textarea
              className="w-full h-24 border rounded p-2 resize-none"
              placeholder="Enter your prompt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )
      }
    },
    {
      id: "2",
      position: { x: 450, y: 150 },
      data: {
        label: (
          <div className="w-72 p-4 rounded-xl border border-green-500 bg-green-50 shadow">
            <h3 className="font-semibold text-green-700 mb-2">
              Result
            </h3>
            <p className="text-sm whitespace-pre-wrap">
              {result}
            </p>
          </div>
        )
      }
    }
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true
    }
  ];

  const runFlow = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("Thinking...");

    const res = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();
    setResult(data.answer);
    setLoading(false);
  };

  const saveData = async () => {
    if (!input || !result || result.includes("Thinking")) return;

    await fetch("http://localhost:5000/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        response: result
      })
    });

    alert("Saved to database");
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
  
   
      <header className=" text-center font-bold text-lg bg-white shadow">
       Future Blink Task
      </header>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className="p-4 bg-white shadow flex justify-center gap-4">
        <button
          onClick={runFlow}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Run Flow
        </button>

        <button
          onClick={saveData}
          disabled={!result || result.includes("Thinking")}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
