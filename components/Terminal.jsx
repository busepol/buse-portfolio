'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Updated with the correct paths and new Network project
const PROJECTS = [
  {
    id: 1,
    name: 'D.A.R.T. Web Platform',
    role: 'Frontend Co-Lead',
    url: '/projects/dart-platform',  
  },
  {
    id: 2,
    name: 'Drink Int. Automation Pipeline',
    role: 'Automation Engineer',
    url: '/projects/drink-automation',  
  },
  {
    id: 3,
    name: 'Drink Int. Network Topology',
    role: 'L2/L3 Architecture',
    url: '/projects/drink-international-network',  
  },
];

export default function Terminal() {
  const router = useRouter();
  
  const [history, setHistory] = useState([
    {
      cmd: '',
      output: (
        <div>
          <p className="text-slate-200">Welcome to <span className="text-fuchsia-400 font-bold tracking-wider">BuseOS v2.0.0</span>.</p>
          <p className="text-slate-500 mt-1">Type <span className="text-cyan-400 font-semibold">"help"</span> to see available commands.</p>
        </div>
      )
    }
  ]);

  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = (
          <ul className="list-none space-y-1 text-slate-300">
            <li><span className="text-cyan-400">whoami</span>   <span className="text-slate-600">-</span> Display user information</li>
            <li><span className="text-cyan-400">skills</span>   <span className="text-slate-600">-</span> List technical competencies</li>
            <li><span className="text-cyan-400">projects</span> <span className="text-slate-600">-</span> View current deployments</li>
            <li><span className="text-cyan-400">cat conf</span> <span className="text-slate-600">-</span> Read network configuration file</li>
            <li><span className="text-cyan-400">clear</span>    <span className="text-slate-600">-</span> Clear terminal history</li>
          </ul>
        );
        break;
      case 'whoami':
        output = 'Buse. Computer Engineering Graduate (Politecnico di Torino). Incoming Master Candidate (Internet Engineering @ PoliMi).';
        break;
      case 'skills':
        output = (
          <div className="text-slate-300 space-y-1">
            <p><span className="text-indigo-400 font-semibold">Networking:</span> CCNA, OSPF, VLANs, EtherChannel</p>
            <p><span className="text-indigo-400 font-semibold">Software:</span> Python, Java, JavaScript, HTML/CSS</p>
            <p><span className="text-indigo-400 font-semibold">Automation:</span> n8n, Make.com, Gemini LLM, JSON ERP mapping</p>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="text-slate-300 space-y-2">
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-slate-600 font-bold">[{p.id}]</span>
                <button
                  onClick={() => router.push(p.url)}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 hover:decoration-emerald-300 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
                <span className="text-slate-500 text-xs italic">— {p.role}</span>
              </div>
            ))}
            <p className="text-slate-500 text-xs pt-2 border-t border-slate-800/50 mt-2 inline-block">
              <span className="text-fuchsia-400">tip:</span> click a project name, or type "open 1", "open 2", "open 3"
            </p>
          </div>
        );
        break;
      case 'cat conf':
        output = (
          <div className="text-slate-400">
            <p className="italic">Loading core-switch-config.txt...</p>
            <p className="text-emerald-400 mt-2 font-semibold">[OK] STP Root Guard configured successfully on core switches.</p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        output = <span className="text-rose-400">Nice try. This incident will be reported.</span>;
        break;
        
      // --- DIRECT SCRIPT EXECUTION COMMANDS ---
      case './drink_intl_network.pkt':
        router.push('/projects/drink-international-network');
        output = <span className="text-emerald-400">Loading Network Topology...</span>;
        break;
      case './drink-automation.sh':
        router.push('/projects/drink-automation');
        output = <span className="text-emerald-400">Executing Automation Pipeline...</span>;
        break;
      case './dart-platform.sh':
        router.push('/projects/dart-platform');
        output = <span className="text-emerald-400">Booting D.A.R.T. Platform...</span>;
        break;

      case '':
        output = '';
        break;
      default: {
        // support "open 1", "open 2", "open 3" as a shortcut to launch a project link
        const openMatch = cmd.match(/^open\s+(\d+)$/);
        const project = openMatch ? PROJECTS.find((p) => p.id === Number(openMatch[1])) : null;

        if (project) {
          router.push(project.url); // Uses internal routing to preserve theme!
          output = (
            <p className="text-slate-400">
              Opening <span className="text-emerald-400">{project.name}</span>...
            </p>
          );
        } else {
          output = <span className="text-rose-400">command not found: {cmd}</span>;
        }
      }
    }

    setHistory((prev) => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto bg-slate-950 rounded-xl border border-slate-800 shadow-[0_20px_50px_-12px_rgba(192,132,252,0.15)] overflow-hidden font-mono text-sm sm:text-base h-[500px] flex flex-col mt-8 selection:bg-fuchsia-500/30"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Custom Mac-style Window Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
        <div className="ml-4 text-slate-500 text-xs tracking-widest font-semibold">guest@buse-portfolio:~</div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 overflow-y-auto p-6 text-slate-300 custom-scrollbar relative leading-relaxed">
        {history.map((entry, i) => (
          <div key={i} className="mb-5">
            {entry.cmd && (
              <div className="flex gap-3 mb-1">
                <span className="text-fuchsia-500 font-bold shrink-0 tracking-wide">visitor@buse:~$</span>
                <span className="text-cyan-300">{entry.cmd}</span>
              </div>
            )}
            <div className="pl-0">{entry.output}</div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleCommand} className="flex gap-3 mt-2">
          <span className="text-fuchsia-500 font-bold shrink-0 tracking-wide">visitor@buse:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-cyan-300 outline-none border-none focus:ring-0 p-0 caret-fuchsia-500"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}