'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// 🚨 THE FIX: Fully spelled-out Tailwind classes so the production build doesn't delete your colors!
const NODES = [
  {
    id: 'infra',
    title: 'Drink Int. Network',
    type: 'L2/L3_INFRA',
    ip: '10.0.10.254',
    status: 'OPTIMAL',
    desc: 'Redundant enterprise topology. Spanning Tree (STP), HSRP virtual gateways, and strict VLAN segregation.',
    tags: ['Cisco IOS', 'LAN/WAN', 'OSPF'],
    link: '/projects/drink-international-network', // 🚨 THE FIX: Corrected URL path!
    colors: {
      bgActive: 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-blue-950/20',
      bgInactive: 'border-blue-900 hover:border-blue-700 bg-[#040d21]',
      borderActive: 'border-blue-400',
      borderInactive: 'border-blue-900',
      textActive: 'text-blue-400',
      textInactive: 'text-blue-600',
      textTag: 'text-blue-300',
      button: 'border-blue-500/50 hover:bg-blue-500/10 text-blue-400'
    },
    logs: [
      'Pinging 10.0.10.254 with 32 bytes of data:',
      'Reply from 10.0.10.254: bytes=32 time=2ms TTL=64',
      '[SYS] STP Root Guard active. Topology stable.',
      '[SYS] HSRP Active Router is local. Standby is 10.0.10.253.',
      'Routing table synced.'
    ]
  },
  {
    id: 'logic',
    title: 'Drink Int. Automation',
    type: 'LOGIC_PIPELINE',
    ip: '172.16.5.10',
    status: 'PROCESSING',
    desc: 'B2B order pipeline. LLM APIs extract unstructured email data into strict JSON ERP schemas via Python.',
    tags: ['Python', 'n8n', 'Gemini AI'],
    link: '/projects/drink-automation',
    colors: {
      bgActive: 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-cyan-950/20',
      bgInactive: 'border-cyan-900 hover:border-cyan-700 bg-[#040d21]',
      borderActive: 'border-cyan-400',
      borderInactive: 'border-cyan-900',
      textActive: 'text-cyan-400',
      textInactive: 'text-cyan-600',
      textTag: 'text-cyan-300',
      button: 'border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400'
    },
    logs: [
      'Establishing secure TLS connection to API gateway...',
      '[OK] Handshake successful.',
      'Listening for incoming SMTP webhooks...',
      '-> Payload received: Order_5992.pdf (1.2MB)',
      '[AI_MODULE] JSON Schema validation passed.',
      'Data pushed to ERP database. Awaiting next payload.'
    ]
  },
  {
    id: 'client',
    title: 'D.A.R.T. Platform',
    type: 'CLIENT_UI',
    ip: '192.168.1.100',
    status: 'UP',
    desc: 'Responsive digital art research platform. Built with semantic HTML/CSS and deployed via GitHub Pages.',
    tags: ['HTML/CSS', 'JavaScript', 'Git'],
    link: '/projects/dart-platform',
    colors: {
      bgActive: 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] bg-emerald-950/20',
      bgInactive: 'border-emerald-900 hover:border-emerald-700 bg-[#040d21]',
      borderActive: 'border-emerald-400',
      borderInactive: 'border-emerald-900',
      textActive: 'text-emerald-400',
      textInactive: 'text-emerald-600',
      textTag: 'text-emerald-300',
      button: 'border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400'
    },
    logs: [
      'GET / HTTP/2.0',
      'Host: dart-platform.buse.dev',
      '[200 OK] text/html (24ms)',
      'Client connection established. DOM loaded.',
      'Listening for UI events...'
    ]
  }
];

export default function CommSystem() {
  const [activeNode, setActiveNode] = useState(NODES[0]);
  const [logLines, setLogLines] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setIsSimulating(true);
    setLogLines([]);
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (activeNode && currentLine < activeNode.logs.length) {
        const nextLog = activeNode.logs[currentLine];
        if (nextLog) setLogLines(prev => [...prev, nextLog]);
        currentLine++;
      } else {
        setIsSimulating(false);
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [activeNode]);

  return (
    <div className="w-full font-mono text-sm relative z-10 flex flex-col gap-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-blue-500/30 pb-3 gap-2">
        <div className="text-blue-400 font-bold tracking-widest flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          SYS_ARCH :: END_TO_END_PIPELINE
        </div>
        <div className="text-blue-500/60 text-xs flex items-center gap-2">
          <span>[ORIGIN: TORINO]</span>
          <span className="text-blue-400">→</span>
          <span>[TARGET: MILANO_2026]</span>
        </div>
      </div>

      <div className="relative w-full py-4">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-900/30 -z-10 overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[pulse_2s_ease-in-out_infinite] translate-x-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NODES.map((node) => {
            const isActive = activeNode.id === node.id;

            return (
              <div 
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`group relative p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[280px] ${isActive ? node.colors.bgActive : node.colors.bgInactive}`}
              >
                <div>
                  <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isActive ? node.colors.borderActive : node.colors.borderInactive}`}></div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isActive ? node.colors.borderActive : node.colors.borderInactive}`}></div>

                  <div className={`text-[10px] mb-4 tracking-widest flex justify-between ${isActive ? node.colors.textActive : node.colors.textInactive}`}>
                    <span>[{node.type}]</span>
                    <span className="text-green-400 font-bold">{node.status}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{node.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{node.desc}</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {node.tags.map(tag => (
                      <span key={tag} className={`px-2 py-1 text-[10px] rounded-sm bg-slate-900 ${isActive ? node.colors.textTag : 'text-slate-500'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* PROJECT LINK BUTTON */}
                  {isActive && node.link !== '#' && (
                    <Link href={node.link} className={`mt-2 text-center py-2 border ${node.colors.button} text-xs font-bold tracking-widest transition-colors`}>
                      [ ACCESS_DOCUMENTATION ]
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full bg-[#020617] border border-blue-900/50 rounded-lg overflow-hidden mt-4 shadow-xl">
        <div className="bg-[#0f172a] px-4 py-2 border-b border-blue-900/50 flex justify-between items-center">
          <div className="text-xs text-blue-400 font-bold tracking-wider">
            DIAGNOSTICS_TERMINAL :: {activeNode.ip}
          </div>
          <div className="text-[10px] text-slate-500 uppercase">
            {isSimulating ? 'Establishing Link...' : 'Link Stable'}
          </div>
        </div>
        <div className="p-4 h-48 overflow-y-auto text-sm text-slate-300 flex flex-col gap-1">
          <div className="text-blue-500 mb-2">$ connect {activeNode.ip} --verbose</div>
          {logLines.map((line, i) => (
            <div key={i} className={`${line?.includes('OK') || line?.includes('Reply') ? 'text-green-400' : line?.includes('SYS') || line?.includes('AI') ? 'text-amber-400' : 'text-slate-300'}`}>
              {line}
            </div>
          ))}
          {isSimulating && (
            <div className="w-2 h-4 bg-slate-400 animate-pulse mt-1"></div>
          )}
        </div>
      </div>

    </div>
  );
}