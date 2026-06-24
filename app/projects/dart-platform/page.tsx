'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function DartPlatformProject() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme?.toLowerCase() || 'light';

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      currentTheme === 'dark' ? 'bg-[#0a0a0a] text-gray-200 p-8 md:p-16' : 
      currentTheme === 'comm' ? 'bg-[#0a192f] text-blue-300 p-8 md:p-16' : 
      currentTheme === 'italian' ? 'bg-[#FFF5EE] text-gray-800 p-8 md:p-16' :
      currentTheme === 'terminal' ? 'bg-[#020617] text-green-500 p-8 md:p-16' : 
      // YOUR EXACT LIGHT MODE BACKGROUND & PADDING:
      'bg-[#fafaf9] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/50 via-white to-[#fafaf9] text-gray-900 p-8 md:p-16 selection:bg-teal-100'
    }`}>
      
      {/* =========================================
          MODE 2: TERMINAL 
          ========================================= */}
      {currentTheme === 'terminal' && (
        <div className="max-w-5xl mx-auto">
          <nav className="w-full mb-12">
            <Link href="/" className="font-mono text-sm text-fuchsia-500 hover:text-fuchsia-400 transition-colors">
              $ cd ..
            </Link>
          </nav>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 font-mono shadow-[0_20px_50px_-12px_rgba(192,132,252,0.15)]">
            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
              <span className="text-fuchsia-500 font-bold">admin@buse-os:~$</span>
              <span className="text-cyan-300">cat /deployments/dart_platform/README.md</span>
            </div>
            
            <div className="text-slate-300 space-y-6">
              <h1 className="text-2xl font-bold text-emerald-400 uppercase"># D.A.R.T. Web Platform</h1>
              
              <div>
                <span className="text-fuchsia-400">## META_DATA</span>
                <ul className="mt-2 text-cyan-200/70">
                  <li><span className="text-slate-500">ROLE:</span> Frontend Co-Lead</li>
                  <li><span className="text-slate-500">TYPE:</span> Academic Production Deployment</li>
                </ul>
              </div>

              <div>
                <span className="text-fuchsia-400">## DESCRIPTION</span>
                <p className="mt-2 text-slate-400">
                  A responsive digital art research platform built from the ground up. Co-led a multidisciplinary student team through the entire software lifecycle, from initial UI/UX concepts to final production deployment.
                </p>
              </div>

              <div>
                <span className="text-fuchsia-400">## TECH_STACK</span>
                <div className="mt-2 flex gap-3 text-sm text-emerald-300/80">
                  <span className="border border-emerald-900 bg-emerald-950/30 px-2 py-1">[HTML5]</span>
                  <span className="border border-emerald-900 bg-emerald-950/30 px-2 py-1">[CSS3]</span>
                  <span className="border border-emerald-900 bg-emerald-950/30 px-2 py-1">[Vanilla JS (ES6+)]</span>
                  <span className="border border-slate-800 bg-slate-900 px-2 py-1 text-slate-400">[Git]</span>
                </div>
              </div>

              <div>
                <span className="text-fuchsia-400">## GIT_LOG</span>
                <div className="mt-2 bg-black/50 p-4 rounded border border-slate-800 text-xs text-slate-500 space-y-1">
                  <div><span className="text-amber-500">commit 8f3a9b2</span> - Initialize responsive UI architecture w/ semantic tags</div>
                  <div><span className="text-amber-500">commit 2c4d1e0</span> - Implement dynamic DOM manipulation for UI events</div>
                  <div><span className="text-amber-500">commit 9a1f4c3</span> - Optimize cross-device pixel perfection</div>
                  <div className="text-emerald-500 font-bold mt-2">➜ HEAD detached at deployment/production</div>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <a href="https://busepol.github.io/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-900 text-cyan-400 border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-colors animate-pulse">
                  ./launch_live_site.sh
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODE 3: COMM SYSTEM (Network Architect) 
          ========================================= */}
      {currentTheme === 'comm' && (
        <div className="max-w-5xl mx-auto font-mono text-sm relative">
          <nav className="w-full mb-12">
            <Link href="/" className="text-cyan-500 hover:text-cyan-400 transition-colors flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span>
              [TERMINATE_UPLINK :: RETURN_TO_NOC]
            </Link>
          </nav>

          <div className="border-b border-emerald-500/30 pb-3 mb-8 flex justify-between items-end">
            <div className="text-emerald-400 font-bold tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></span>
              NODE_DRILLDOWN :: [03] CLIENT_UI
            </div>
            <div className="text-emerald-500/50 text-xs">STATUS: <span className="text-green-400">ONLINE</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-emerald-900 bg-[#040d21] p-6 relative group hover:border-emerald-500 transition-all">
              <div className="text-[10px] text-emerald-600 mb-4 tracking-widest">LAYER_01 :: STRUCTURE</div>
              <div className="text-2xl text-white font-bold mb-2">Semantic HTML</div>
              <p className="text-xs text-emerald-300/60 leading-relaxed">
                Lightweight, framework-free architecture ensuring rapid DOM parsing and strict accessibility compliance.
              </p>
            </div>

            <div className="border border-cyan-900 bg-[#040d21] p-6 relative group hover:border-cyan-500 transition-all">
              <div className="text-[10px] text-cyan-600 mb-4 tracking-widest">LAYER_02 :: PAINT</div>
              <div className="text-2xl text-white font-bold mb-2">Custom CSS3</div>
              <p className="text-xs text-cyan-300/60 leading-relaxed">
                Engineered responsive layout breakpoints for pixel-perfect rendering across all client device viewports.
              </p>
            </div>

            <div className="border border-fuchsia-900 bg-[#040d21] p-6 relative group hover:border-fuchsia-500 transition-all">
              <div className="text-[10px] text-fuchsia-600 mb-4 tracking-widest">LAYER_03 :: LOGIC</div>
              <div className="text-2xl text-white font-bold mb-2">Vanilla JS</div>
              <p className="text-xs text-fuchsia-300/60 leading-relaxed">
                Direct DOM manipulation and event delegation utilizing ES6+ for zero-dependency interactivity.
              </p>
            </div>
          </div>

          <div className="w-full bg-[#020617] border border-emerald-900/50 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="text-emerald-500">$ curl -I https://busepol.github.io/</div>
              <a href="https://busepol.github.io/" target="_blank" rel="noopener noreferrer" className="text-xs bg-emerald-900/40 text-emerald-400 border border-emerald-800 px-3 py-1 hover:bg-emerald-800/60 transition-colors">
                [INITIATE_LIVE_CONNECTION]
              </a>
            </div>
            <pre className="text-emerald-400/80 text-xs overflow-x-auto space-y-1">
              <div>HTTP/2 200 OK</div>
              <div>content-type: text/html; charset=utf-8</div>
              <div>server: GitHub.com</div>
              <div>cache-control: max-age=600</div>
              <div className="text-cyan-400 mt-2">{'>>>'} Resolving assets...</div>
              <div className="text-slate-400">GET /style.css [200 OK] (12ms)</div>
              <div className="text-slate-400">GET /app.js [200 OK] (15ms)</div>
              <div className="text-fuchsia-400 mt-2">{'>>>'} DOMContentLoaded event fired. Client UI ready.</div>
            </pre>
          </div>
        </div>
      )}

      {/* =========================================
          MODE 1: SURFACE (YOUR EXACT PROVIDED CODE) 
          ========================================= */}
      {currentTheme === 'light' && (
        <div className="max-w-4xl mx-auto">
          
          {/* Navigation */}
          <Link href="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-teal-600 transition-colors mb-12">
            ← Return to Surface
          </Link>

          {/* Project Header with Live Button */}
          <header className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">D.A.R.T. Web Platform</h1>
              
              <a 
                href="https://busepol.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition shadow-md hover:shadow-lg w-fit"
              >
                Visit Live Site 🚀
              </a>
            </div>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl">
              A responsive digital art research platform built from the ground up. I co-led a multidisciplinary student team through the entire software lifecycle, from initial UI/UX concepts to final production deployment.
            </p>
          </header>

          {/* Project Meta Data Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-200 mb-16">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role</h4>
              <p className="font-medium text-gray-800">Frontend Co-Lead</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Context</h4>
              <p className="font-medium text-gray-800">Academic Project</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white text-teal-700 text-xs rounded-md border border-teal-100 shadow-sm">HTML5 / CSS3</span>
                <span className="px-2 py-1 bg-white text-teal-700 text-xs rounded-md border border-teal-100 shadow-sm">JavaScript (ES6+)</span>
                <span className="px-2 py-1 bg-white text-gray-600 text-xs rounded-md border border-gray-200 shadow-sm">Git</span>
              </div>
            </div>
          </div>

          {/* Core Architecture Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Development & Collaboration</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-6">
                The challenge was not just writing the code, but coordinating a team of students with varying technical backgrounds. We needed a lightweight, highly responsive platform to showcase digital art research without relying on heavy frameworks.
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-sm my-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Contributions:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">●</span>
                    <span><strong>Responsive UI Architecture:</strong> Engineered the frontend using semantic HTML and custom CSS, ensuring the platform delivered a seamless, pixel-perfect experience across desktop, tablet, and mobile devices.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">●</span>
                    <span><strong>Dynamic DOM Manipulation:</strong> Implemented vanilla JavaScript logic to handle interactive elements, user navigation, and dynamic content rendering.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Fallback for Italian Mode */}
      {currentTheme === 'italian' && (
        <div className="max-w-4xl mx-auto bg-[#FFDAB9] p-10 rounded-3xl border border-[#FFCC99] shadow-xl mt-12">
          <Link href="/" className="inline-block text-[#D2691E] font-bold mb-8 hover:opacity-70">← Torna Indietro</Link>
          <h1 className="text-4xl font-black text-gray-900 mb-6">Piattaforma Web D.A.R.T.</h1>
          <p className="text-lg text-gray-800 mb-8">Un sito web per l'arte digitale. L'ho costruito usando HTML, CSS, e JavaScript senza aiuti (nessun framework!). Funziona perfettamente sul telefono e sul computer.</p>
          <a href="https://busepol.github.io/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#FF7F50] text-white font-bold rounded-full hover:bg-[#FF6347] transition">
            Guarda il sito!
          </a>
        </div>
      )}

    </main>
  );
}