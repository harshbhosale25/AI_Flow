export default function InputNode({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-64 border">
      <h3 className="font-semibold mb-2 text-gray-700">Input</h3>
      <textarea
        className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your prompt..."
        value={data.prompt}
        onChange={(e) => data.setPrompt(e.target.value)}
      />
    </div>
  );
}
