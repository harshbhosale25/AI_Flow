export default function ResultNode({ data }) {
  return (
    <div className="bg-green-50 p-4 rounded-xl shadow-md w-64 border border-green-400">
      <h3 className="font-semibold mb-2 text-green-700">Result</h3>
      <p className="text-sm text-gray-800">
        {data.result || "Waiting for AI response..."}
      </p>
    </div>
  );
}
