import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Terminal,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

const CodeExercise: React.FC = () => {
  const [code, setCode] = useState(`/**
 * @param {number[]} arr
 * @return {number|null}
 */
function findMaxElement(arr) {
  if (arr.length === 0) {
    return null;
  }
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  return max;
}`);

  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([
    { id: 1, text: "Test Case 1 Passed:", expected: "9", got: "9", status: "pass" },
    { id: 2, text: "Test Case 2 Passed:", expected: "-5", got: "-5", status: "pass" }
  ]);

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate execution
    setTimeout(() => {
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-[#1e1e1e] overflow-hidden">
      {/* Left Pane: Instructions */}
      <div className="w-[450px] bg-white border-r border-outline-variant flex flex-col h-full overflow-y-auto">
        <div className="p-10 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-on-surface-variant font-bold text-[11px] uppercase tracking-widest">
              <span className="text-[#f28633]">■</span> Exercise 4.2
            </div>
            <h1 className="text-display-sm font-bold text-primary leading-tight">
              Maximum Element Detection
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Systematic innovation in algorithms often requires efficient traversal of data structures. Your task is to implement a robust function that identifies the largest numerical value within an unsorted array.
            </p>
          </div>

          {/* Problem Statement Card */}
          <div className="bg-[#f8f9fa] border-l-4 border-primary p-6 rounded-r-xl">
            <h3 className="text-title-sm font-bold text-primary mb-3">Problem Statement</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed italic">
              Write a function <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-primary font-bold">findMaxElement(arr)</code> that takes an array of integers and returns the maximum element. The solution must handle empty arrays by returning <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-primary font-bold">null</code>.
            </p>
          </div>

          {/* Constraints */}
          <div className="space-y-4">
            <h3 className="text-title-sm font-bold text-primary flex items-center gap-2">
              Constraints
            </h3>
            <ul className="space-y-2 list-disc pl-5 text-body-md text-on-surface-variant font-medium">
              <li>0 ≤ arr.length ≤ 10^5</li>
              <li>-10^9 ≤ arr[i] ≤ 10^9</li>
              <li>Time Complexity requirement: O(n)</li>
            </ul>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-title-sm font-bold text-primary">Examples</h3>
            
            <div className="bg-[#001c3d] rounded-xl p-5 space-y-3 shadow-md">
              <div className="space-y-1">
                <p className="text-[#89b4fa] text-[11px] font-mono font-bold uppercase tracking-widest">// Example 1</p>
                <p className="text-white font-mono text-body-sm">
                  <span className="text-[#f28633]">Input:</span> [3, 7, 2, 9, 1]
                </p>
                <p className="text-white font-mono text-body-sm">
                  <span className="text-[#f28633]">Output:</span> 9
                </p>
              </div>
            </div>

            <div className="bg-[#001c3d] rounded-xl p-5 space-y-3 shadow-md">
              <div className="space-y-1">
                <p className="text-[#89b4fa] text-[11px] font-mono font-bold uppercase tracking-widest">// Example 2</p>
                <p className="text-white font-mono text-body-sm">
                  <span className="text-[#f28633]">Input:</span> [-10, -5, -20]
                </p>
                <p className="text-white font-mono text-body-sm">
                  <span className="text-[#f28633]">Output:</span> -5
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="pt-6">
            <img 
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop" 
              alt="Coding" 
              className="w-full h-48 object-cover rounded-xl shadow-lg brightness-75"
            />
          </div>
        </div>
      </div>

      {/* Right Pane: Code Editor & Console */}
      <div className="flex-1 flex flex-col h-full ring-1 ring-white/10">
        {/* Editor Area */}
        <div className="flex-1 min-h-0 bg-[#1e1e1e]">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 20 },
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Console Area */}
        <div className="h-[220px] bg-[#0d1117] border-t border-white/10 flex flex-col shadow-2xl z-10">
          <div className="h-10 border-b border-white/10 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/60">
              <Terminal size={14} />
              <span className="text-[11px] font-bold uppercase tracking-widest">Console / Output</span>
            </div>
            <button className="text-white/40 hover:text-white/80 transition-colors">
              <XCircle size={16} />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-3 overflow-y-auto font-mono">
            {testResults.map(res => (
              <div key={res.id} className="flex items-center gap-3 text-body-sm">
                <CheckCircle2 size={16} className="text-[#4ade80]" strokeWidth={3} />
                <span className="text-[#4ade80] font-bold">{res.text}</span>
                <span className="text-white/50">Expected</span>
                <span className="text-white">{res.expected},</span>
                <span className="text-white/50">Got</span>
                <span className="text-[#f28633]">{res.got}</span>
              </div>
            ))}
            {isRunning && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/40 italic flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Running performance benchmarks...
              </motion.div>
            )}
          </div>

          <div className="h-16 border-t border-white/5 px-6 flex items-center justify-end gap-4 bg-[#161b22]">
            <button 
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-6 py-2 rounded font-bold text-body-sm border border-white/20 text-white hover:bg-white/5 transition-all active:translate-y-px disabled:opacity-50"
            >
              Run Code
            </button>
            <button className="px-6 py-2 rounded font-bold text-body-sm bg-[#f28633] text-white hover:bg-[#d97220] transition-all active:translate-y-px shadow-lg shadow-orange-900/20">
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExercise;
