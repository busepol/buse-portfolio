'use client';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DrinkNetworkProject() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme?.toLowerCase() || 'light';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      currentTheme === 'light' ? 'bg-white text-gray-900' : 
      currentTheme === 'terminal' ? 'bg-[#050505] text-green-500' :
      currentTheme === 'comm' ? 'bg-[#020617] text-cyan-400' :
      currentTheme === 'italian' ? 'bg-orange-50 text-gray-900' : // 🚨 THE FIX: Beautiful light orange background
      'bg-white text-gray-900'
    }`}>
      
      {/* =========================================
          MODE 1: SURFACE (HR / RECRUITER VIEW)
          ========================================= */}
      {currentTheme === 'light' && (
        <main className="max-w-4xl mx-auto p-8 py-16 animate-in fade-in duration-500">
          
          {/* Failsafe Back Button */}
          <nav className="mb-12">
            <button 
              onClick={() => {
                localStorage.setItem('theme', 'light');
                window.location.href = '/';
              }} 
              className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Surface
            </button>
          </nav>

          {/* Header Section */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Drink International Network Topology
            </h1>
            <p className="text-xl text-blue-600 font-medium">
              High-Availability Multi-Service Enterprise Network
            </p>
          </header>

          {/* Hero Image - Blueprint Styled */}
          <div className="mb-16 rounded-2xl overflow-hidden border-2 border-blue-100 bg-blue-50 shadow-xl p-4 md:p-8">
            <div className="relative rounded-xl overflow-hidden border border-blue-200/50 bg-white shadow-inner">
              
              {/* Optional Overlay to make it look like a schematic */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-20" 
                   style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              </div>

              <img 
                src="/topology.png" 
                alt="Network Topology Diagram" 
                className="w-full h-auto object-cover opacity-90 contrast-125 saturate-50 hover:saturate-100 hover:opacity-100 transition-all duration-700 mix-blend-multiply"
              />
            </div>
            <p className="text-center text-xs font-mono text-blue-400 mt-4 uppercase tracking-widest">Fig 1.0 - Core Aggregation Topology [Exported from Packet Tracer]</p>
          </div>

          {/* Executive Summary */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">🏗️ Project Origins & Context</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              This infrastructure design is modeled closely after a production enterprise campus network observed during an industry internship. 
              While experiencing the day-to-day operations of a corporate environment, I analyzed and reverse-engineered the core networking topology 
              to study how modern mid-sized enterprises balance <strong>high-availability, scalability, and strict security segmentation.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mt-4">
              The design implements a highly available triangle topology at the distribution and core layers to ensure near-zero downtime. It is split into distinct, functional departments, an isolated server farm infrastructure, and a secure edge WAN connection.
            </p>
          </section>

          {/* Tech Stack Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">🔑 Technical Stack & Protocols</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Layer 3 Routing (OSPF)</h3>
                <p className="text-gray-600 text-sm">Single-Area OSPF (Area 0) for sub-second route convergence and optimal path selection.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Gateway Redundancy (HSRP)</h3>
                <p className="text-gray-600 text-sm">Seamless first-hop virtual gateway redundancy across all end-user subnets.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Link Aggregation (LACP)</h3>
                <p className="text-gray-600 text-sm">EtherChannel for backbone bandwidth aggregation and link-level failover.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Logical Segmentation</h3>
                <p className="text-gray-600 text-sm">IEEE 802.1Q VLAN tagging and auxiliary Voice VLAN mapping to separate deterministic traffic.</p>
              </div>
            </div>
          </section>

          {/* VLAN Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">📂 Network Segmentation (VLAN Design)</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-bold">
                  <tr>
                    <th className="p-4 border-b">VLAN ID</th>
                    <th className="p-4 border-b">Department / Segment</th>
                    <th className="p-4 border-b">Primary Elements</th>
                    <th className="p-4 border-b">Gateway / HSRP VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-blue-600">10</td>
                    <td className="p-4">Corporate Office / Data</td>
                    <td className="p-4">PC1, Laptop2, Network Printer</td>
                    <td className="p-4 font-mono bg-gray-100 rounded px-2">192.168.10.1</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-blue-600">20</td>
                    <td className="p-4">Engineering & Workstations</td>
                    <td className="p-4">PC2, PC3, Laptops, Mobile</td>
                    <td className="p-4 font-mono bg-gray-100 rounded px-2">192.168.20.1</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-blue-600">30</td>
                    <td className="p-4">Centralized Server Farm</td>
                    <td className="p-4">App & Storage Servers</td>
                    <td className="p-4 font-mono bg-gray-100 rounded px-2">192.168.30.1</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-blue-600">60</td>
                    <td className="p-4">IoT & Smart Infrastructure</td>
                    <td className="p-4">RFID, Smart Doors, WAPs</td>
                    <td className="p-4 font-mono bg-gray-100 rounded px-2">192.168.60.1</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-blue-600">70</td>
                    <td className="p-4">IP Voice Infrastructure</td>
                    <td className="p-4">Cisco 7960 IP Phones</td>
                    <td className="p-4 font-mono bg-gray-100 rounded px-2">192.168.70.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Verification & Validation */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-6">✅ Verification & Validation</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✔</span>
                <div>
                  <strong className="text-gray-900 block">Neighbor Adjacencies</strong>
                  <span className="text-gray-600 text-sm">Validated full DR/BDR synchronization between L3 switches and the perimeter router.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✔</span>
                <div>
                  <strong className="text-gray-900 block">HSRP State Management</strong>
                  <span className="text-gray-600 text-sm">Monitored active/standby designations and verified preempt operations during link failure simulations.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✔</span>
                <div>
                  <strong className="text-gray-900 block">Link Bundling (EtherChannel)</strong>
                  <span className="text-gray-600 text-sm">Ensured logical interfaces display a Layer 2 'In Use' state with ports successfully bundled.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✔</span>
                <div>
                  <strong className="text-gray-900 block">End-to-End Connectivity</strong>
                  <span className="text-gray-600 text-sm">Executed extended ping and traceroute tests validating data plane reachability up to the simulated ISP edge.</span>
                </div>
              </li>
            </ul>
          </section>

        </main>
      )}

      {/* Placeholders for Terminal, Comm, and Italian modes will go below here... */}
    
    
{/* =========================================
    MODE 2: TERMINAL (CLI / Developer View)
    ========================================= */}
{currentTheme === 'terminal' && (
  <main className="max-w-4xl mx-auto p-6 md:p-12 py-16 animate-in fade-in zoom-in-95 duration-500 font-mono text-green-500 bg-[#050505] min-h-screen shadow-2xl border border-fuchsia-900/30">
    
    {/* CLI Header & Back Command */}
    <div className="mb-12 border-b border-fuchsia-900/50 pb-4">
      <div className="flex justify-between items-end mb-4">
        <div className="text-xs text-fuchsia-400">Session ID: 8943-TX // Secure Connection Established</div>
        <button 
          onClick={() => window.location.href = '/'}
          className="text-xs border border-fuchsia-700 bg-fuchsia-950/30 hover:bg-fuchsia-900/50 text-fuchsia-400 px-3 py-1 transition-all"
        >
          $ cd ..
        </button>
      </div>
      <pre className="text-emerald-400 font-bold text-[10px] md:text-sm leading-tight hidden sm:block">
{`
 ____       _       _      ___       _     
|  _ \\ _ __(_)_ __ | | __ |_ _|_ __ | |_   
| | | | '__| | '_ \\| |/ /  | || '_ \\| __|  
| |_| | |  | | | | |   <   | || | | | |_   
|____/|_|  |_|_| |_|_|\\_\\ |___|_| |_|\\__|  
:: ENTERPRISE CAMPUS NETWORK ARCHITECTURE ::
`}
      </pre>
    </div>

    <div className="space-y-8 text-sm md:text-base leading-relaxed">
      
      {/* Context Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-fuchsia-400">admin@buse-os:~/projects/drink-intl$</span>
          <span className="text-white typing-animation">cat project_origins.md</span>
        </div>
        <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-2 space-y-4">
          <p>
            This infrastructure design is modeled closely after a production enterprise campus network observed during an industry internship. While experiencing the day-to-day operations of a corporate environment, I analyzed and reverse-engineered the core networking topology to study how modern mid-sized enterprises balance high-availability, scalability, and strict security segmentation.
          </p>
          <p>
            The design implements a highly available triangle topology at the distribution and core layers to ensure near-zero downtime. It is split into distinct, functional departments, an isolated server farm infrastructure, and a secure edge WAN connection.
          </p>
        </div>
      </div>

      {/* Technical Stack Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-fuchsia-400">admin@buse-os:~/projects/drink-intl$</span>
          <span className="text-white">./extract_protocols.sh</span>
        </div>
        <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-2 space-y-4">
          <div>
            <span className="font-bold text-cyan-400">{'>>'} Layer 3 Routing (OSPF):</span> Single-Area OSPF (Area 0) for sub-second route convergence and optimal path selection.
          </div>
          <div>
            <span className="font-bold text-cyan-400">{'>>'} Gateway Redundancy (HSRP):</span> Seamless first-hop virtual gateway redundancy across all end-user subnets.
          </div>
          <div>
            <span className="font-bold text-cyan-400">{'>>'} Link Aggregation (LACP):</span> EtherChannel for backbone bandwidth aggregation and link-level failover.
          </div>
          <div>
            <span className="font-bold text-cyan-400">{'>>'} Logical Segmentation:</span> IEEE 802.1Q VLAN tagging and auxiliary Voice VLAN mapping to separate deterministic traffic.
          </div>
        </div>
      </div>

      {/* VLAN Table Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-fuchsia-400">admin@buse-os:~/projects/drink-intl$</span>
          <span className="text-white">show vlan brief</span>
        </div>
        <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-2 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-fuchsia-900 text-cyan-400">
                <th className="py-2 pr-4">VLAN</th>
                <th className="py-2 pr-4">NAME</th>
                <th className="py-2 pr-4 hidden sm:table-cell">PRIMARY_ELEMENTS</th>
                <th className="py-2">GATEWAY_IP</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-fuchsia-900/30">
                <td className="py-2 pr-4 font-bold text-emerald-400">10</td>
                <td className="py-2 pr-4">Corporate_Data</td>
                <td className="py-2 pr-4 hidden sm:table-cell text-green-600">PC1, Laptop2, Printers</td>
                <td className="py-2 text-white">192.168.10.1</td>
              </tr>
              <tr className="border-b border-fuchsia-900/30">
                <td className="py-2 pr-4 font-bold text-emerald-400">20</td>
                <td className="py-2 pr-4">Eng_Workstations</td>
                <td className="py-2 pr-4 hidden sm:table-cell text-green-600">PC2, PC3, Laptops</td>
                <td className="py-2 text-white">192.168.20.1</td>
              </tr>
              <tr className="border-b border-fuchsia-900/30">
                <td className="py-2 pr-4 font-bold text-emerald-400">30</td>
                <td className="py-2 pr-4">Server_Farm</td>
                <td className="py-2 pr-4 hidden sm:table-cell text-green-600">App & Storage Servers</td>
                <td className="py-2 text-white">192.168.30.1</td>
              </tr>
              <tr className="border-b border-fuchsia-900/30">
                <td className="py-2 pr-4 font-bold text-emerald-400">60</td>
                <td className="py-2 pr-4">IoT_Smart_Infra</td>
                <td className="py-2 pr-4 hidden sm:table-cell text-green-600">RFID, WAPs, Sensors</td>
                <td className="py-2 text-white">192.168.60.1</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-emerald-400">70</td>
                <td className="py-2 pr-4 text-cyan-300">Voice_IP [QoS]</td>
                <td className="py-2 pr-4 hidden sm:table-cell text-green-600">Cisco 7960 IP Phones</td>
                <td className="py-2 text-white">192.168.70.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-fuchsia-400">admin@buse-os:~/projects/drink-intl$</span>
          <span className="text-white">make run-tests</span>
        </div>
        <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-2 space-y-2">
          <div className="flex gap-2">
            <span className="text-amber-500 font-bold">[PASS]</span>
            <span><strong className="text-emerald-400">OSPF Adjacencies:</strong> Validated full DR/BDR synchronization between L3 switches and the perimeter router.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-500 font-bold">[PASS]</span>
            <span><strong className="text-emerald-400">HSRP State Management:</strong> Monitored active/standby designations and verified preempt operations during link failure simulations.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-500 font-bold">[PASS]</span>
            <span><strong className="text-emerald-400">LACP EtherChannel:</strong> Ensured logical interfaces display a Layer 2 'In Use' state with ports successfully bundled.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-500 font-bold">[PASS]</span>
            <span><strong className="text-emerald-400">Data Plane Reachability:</strong> Executed extended ping and traceroute tests validating connectivity up to the simulated ISP edge.</span>
          </div>
        </div>
      </div>

      {/* Active Prompt */}
      <div className="pt-8 flex items-center gap-2">
        <span className="font-bold text-fuchsia-400">admin@buse-os:~/projects/drink-intl$</span>
        <span className="w-2.5 h-5 bg-white animate-pulse inline-block"></span>
      </div>

    </div>
  </main>
)}

        
      {/* =========================================
            MODE 3: COMM_SYS (NOC Dashboard)
            ========================================= */}
        {currentTheme === 'comm' && (
          <main className="max-w-6xl mx-auto p-4 md:p-8 py-16 animate-in fade-in zoom-in-95 duration-500 font-mono text-cyan-400">
            {/* Blueprint Grid Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Navigation */}
            <nav className="mb-8">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-xs font-bold text-blue-500 hover:text-cyan-300 transition-colors border border-blue-900/50 bg-blue-950/20 px-4 py-2 hover:bg-blue-900/40"
              >
                [TERMINATE_SESSION]
              </button>
            </nav>

            <div className="flex flex-col gap-6">
              
              {/* HEADER PANEL */}
              <div className="border border-blue-800 bg-[#040d21] p-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/30 animate-scan hidden md:block"></div>
                <div>
                  <h1 className="text-3xl font-bold text-cyan-400 tracking-wider mb-2">DRINK_INTL // CAMPUS_TOPOLOGY</h1>
                  <p className="text-blue-500 text-sm">L3 Core Aggregation & Enterprise Services</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-xs text-blue-500 mb-1">SYSTEM_STATUS</div>
                  <div className="text-emerald-400 font-bold tracking-widest flex items-center gap-2 justify-end">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    OPTIMAL (HA_ACTIVE)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT COLUMN: Context & Protocols */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  
                  {/* CONTEXT LOG */}
                  <div className="border border-blue-900/50 bg-[#040d21] p-5">
                    <div className="text-xs text-blue-500 mb-4 border-b border-blue-900/50 pb-2">[SYS_ORIGIN] // REVERSE_ENGINEERING_LOG</div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Infrastructure design modeled closely after a production enterprise campus network observed during an industry internship. 
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Analyzed and reverse-engineered the core topology to study how modern mid-sized enterprises balance high availability, scalability, and strict security. Implements a triangle topology at distribution/core layers for near-zero downtime.
                    </p>
                  </div>

                  {/* PROTOCOL STACK */}
                  <div className="border border-blue-900/50 bg-[#040d21] p-5">
                    <div className="text-xs text-blue-500 mb-4 border-b border-blue-900/50 pb-2">[PROTOCOL_STACK]</div>
                    <ul className="space-y-4 text-xs">
                      <li>
                        <span className="text-cyan-400 font-bold block mb-1">{'>>'} L3_ROUTING (OSPF)</span>
                        <span className="text-slate-400">Single-Area OSPF (Area 0) for sub-second convergence. Process IDs configured exclusively as local-significance identifiers.</span>
                      </li>
                      <li>
                        <span className="text-cyan-400 font-bold block mb-1">{'>>'} GATEWAY_HA (HSRP)</span>
                        <span className="text-slate-400">Seamless first-hop virtual gateway redundancy across all end-user subnets.</span>
                      </li>
                      <li>
                        <span className="text-cyan-400 font-bold block mb-1">{'>>'} LINK_AGG (LACP)</span>
                        <span className="text-slate-400">EtherChannel deployed for backbone bandwidth aggregation and link-level failover.</span>
                      </li>
                      <li>
                        <span className="text-cyan-400 font-bold block mb-1">{'>>'} SEGMENTATION (802.1Q)</span>
                        <span className="text-slate-400">VLAN tagging and auxiliary Voice VLAN mapping for deterministic traffic.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* RIGHT COLUMN: Matrix & Diagnostics */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* SEGMENTATION MATRIX */}
                  <div className="border border-blue-900/50 bg-[#040d21] p-5 overflow-x-auto">
                    <div className="text-xs text-blue-500 mb-4 border-b border-blue-900/50 pb-2">SEGMENTATION_MATRIX (802.1Q)</div>
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="text-blue-500/70 border-b border-blue-900/30">
                          <th className="pb-2 font-normal">VID</th>
                          <th className="pb-2 font-normal">DEPARTMENT</th>
                          <th className="pb-2 font-normal hidden sm:table-cell">PRIMARY_ELEMENTS</th>
                          <th className="pb-2 font-normal">HSRP_VIP</th>
                          <th className="pb-2 font-normal text-right">STATE</th>
                        </tr>
                      </thead>
                      <tbody className="text-cyan-300">
                        <tr className="border-b border-blue-900/20 hover:bg-blue-900/10 transition-colors">
                          <td className="py-3 text-emerald-400">V10</td>
                          <td>CORP_DATA</td>
                          <td className="text-slate-400 hidden sm:table-cell">PC1, Laptop2, Printer</td>
                          <td className="font-mono">192.168.10.1</td>
                          <td className="text-right text-emerald-500">[UP]</td>
                        </tr>
                        <tr className="border-b border-blue-900/20 hover:bg-blue-900/10 transition-colors">
                          <td className="py-3 text-emerald-400">V20</td>
                          <td>ENG_WORKSTN</td>
                          <td className="text-slate-400 hidden sm:table-cell">PC2, PC3, Mobile</td>
                          <td className="font-mono">192.168.20.1</td>
                          <td className="text-right text-emerald-500">[UP]</td>
                        </tr>
                        <tr className="border-b border-blue-900/20 hover:bg-blue-900/10 transition-colors">
                          <td className="py-3 text-emerald-400">V30</td>
                          <td>SERVER_FARM</td>
                          <td className="text-slate-400 hidden sm:table-cell">App & Storage Srv</td>
                          <td className="font-mono">192.168.30.1</td>
                          <td className="text-right text-emerald-500">[UP]</td>
                        </tr>
                        <tr className="border-b border-blue-900/20 hover:bg-blue-900/10 transition-colors">
                          <td className="py-3 text-emerald-400">V60</td>
                          <td>IOT_INFRA</td>
                          <td className="text-slate-400 hidden sm:table-cell">RFID, Doors, WAPs</td>
                          <td className="font-mono">192.168.60.1</td>
                          <td className="text-right text-emerald-500">[UP]</td>
                        </tr>
                        <tr className="hover:bg-blue-900/10 transition-colors">
                          <td className="py-3 text-emerald-400">V70</td>
                          <td>VOICE_IP</td>
                          <td className="text-slate-400 hidden sm:table-cell">Cisco 7960 Phones</td>
                          <td className="font-mono">192.168.70.1</td>
                          <td className="text-right text-fuchsia-400">[QOS_PRIORITY]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* DIAGNOSTICS CONSOLE */}
                  <div className="border border-blue-900/50 bg-[#020617] p-0 overflow-hidden flex flex-col h-full min-h-[250px]">
                    <div className="bg-[#0f172a] px-4 py-2 border-b border-blue-900/50 flex justify-between items-center text-xs">
                      <span className="text-blue-400">SYS_VERIFICATION_LOGS</span>
                      <span className="text-slate-500">AUTO_SCROLL: ON</span>
                    </div>
                    <div className="p-4 text-xs font-mono space-y-2 text-slate-300 h-full">
                      <div><span className="text-blue-500">root@noc:~#</span> ./run_diagnostics.sh --target=campus_core</div>
                      <div className="text-emerald-400">[OK] OSPF_ADJACENCIES: Full DR/BDR synchronization validated between L3 switches & perimeter.</div>
                      <div className="text-emerald-400">[OK] HSRP_STATE: Active/Standby designated. Preempt operations verified during link failure sim.</div>
                      <div className="text-emerald-400">[OK] LACP_BUNDLE: Logical interfaces display L2 'In Use' state. Ports bundled successfully.</div>
                      <div className="text-emerald-400">[OK] DATA_PLANE: Extended ping & traceroute validating reachability to simulated ISP edge.</div>
                      <div className="text-amber-400 mt-2">{'>>'} System operations nominal. Awaiting commands... <span className="animate-pulse">_</span></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            </div>
          </main>
        )}
      

      {/* =========================================
          MODE 4: ITALIANO (Questura Simulator A2)
          ========================================= */}
      {currentTheme === 'italian' && (
        <main className="max-w-4xl mx-auto p-8 py-16 animate-in fade-in zoom-in-95 duration-500 text-gray-800">
          
          {/* Failsafe Back Button */}
          <nav className="mb-12">
            <button 
              onClick={() => {
                localStorage.setItem('theme', 'italian');
                window.location.href = '/';
              }} 
              className="group flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-800 transition-colors bg-orange-100 px-4 py-2 rounded-lg border border-orange-200"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Torna alla Fila (Home)
            </button>
          </nav>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-orange-200">
            
            {/* Header Questura */}
            <div className="flex flex-col items-center justify-center gap-4 mb-10 border-b-4 border-orange-100 pb-8 text-center">
              <span className="text-6xl mb-2">🏢</span>
              <h1 className="text-4xl font-black text-orange-900 tracking-tight uppercase">
                Modulo 3: La Rete Aziendale
              </h1>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-lg">
                Esito: APPROVATO (Senza Marca da Bollo!)
              </div>
            </div>

            {/* Presentazione A2 */}
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 mb-12">
              <p>
                <strong>Ciao!</strong> In questo progetto ho costruito la rete internet di una grande azienda.
              </p>
              <p>
                Una rete aziendale deve essere veloce e sicura. Soprattutto, <strong>non deve cadere mai</strong>. Se un filo si rompe, internet deve funzionare lo stesso. È un po' come quando un impiegato va a prendere il caffè: un altro impiegato deve prendere il suo posto!
              </p>
            </div>

            {/* Metaphors Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-100 pb-2">Come funziona la mia rete? (Spiegazione Facile)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* OSPF Metaphor */}
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <div className="text-3xl mb-3">🗺️</div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Il Navigatore (OSPF)</h3>
                  <p className="text-gray-700">
                    I computer devono trovare la strada per inviare i messaggi. Uso una cosa che si chiama <strong>OSPF</strong>. È come Google Maps: trova sempre la strada senza traffico.
                  </p>
                </div>

                {/* HSRP Metaphor */}
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <div className="text-3xl mb-3">☕</div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Il Sostituto (HSRP)</h3>
                  <p className="text-gray-700">
                    Se il router principale "si ammala", la rete si ferma? No! Con <strong>HSRP</strong>, c'è un secondo router sempre pronto. Nessuno aspetta!
                  </p>
                </div>

                {/* VLAN Metaphor */}
                <div className="md:col-span-2 bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                  <div className="text-3xl mb-3">🎟️</div>
                  <h3 className="text-xl font-bold text-yellow-900 mb-2">Le File Separate (VLAN)</h3>
                  <p className="text-gray-700 mb-4">
                    In Posta, c'è la fila per pagare i bollettini e la fila per prendere i pacchi. Nella mia rete è uguale! Uso le <strong>VLAN</strong> per separare il traffico:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium ml-2">
                    <li><span className="text-blue-600">Fila 10:</span> Solo per i computer dell'ufficio.</li>
                    <li><span className="text-purple-600">Fila 20:</span> Solo per gli ingegneri (Workstation).</li>
                    <li><span className="text-green-600">Fila 30:</span> Solo per i Server importanti.</li>
                    <li><span className="text-cyan-600">Fila 60:</span> Solo per le "cose intelligenti" (Sensori, Wi-Fi, Porte).</li>
                    <li><span className="text-red-600">Fila 70:</span> Solo per i telefoni aziendali (hanno la priorità!).</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Conclusion */}
            <div className="mt-12 bg-white/50 p-6 rounded-3xl border-2 border-dashed border-orange-300 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">I Controlli</h3>
              <p className="text-gray-600">
                Ho provato tutti i computer. Ho staccato i cavi per vedere se si rompeva. <strong>Funziona tutto!</strong> Niente Errori 404 oggi.
              </p>
            </div>

          </div>
        </main>
      )}
    
    </div>
  );
}