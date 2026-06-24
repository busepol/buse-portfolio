'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import ModeSelector from '@/components/DevToggle';
import { SetStateAction, useEffect, useState } from 'react';
import ItalianQuiz from '@/components/ItalianQuiz';
import Terminal from '../components/Terminal';
import CommSystem from '../components/CommSystem';

export default function Home() {
  // 🚨 Added setTheme here so the boot screen buttons can change the mode
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // 🚨 Added the state to control the boot screen
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
        if (sessionStorage.getItem('buse_booted') === 'true') {
      setShowSplash(false);
    }
  }, []);
  if (!mounted) return null;

  // 🚨 Function to handle when a user picks an option on the boot screen
  const handleBootSelection = (selectedTheme: SetStateAction<string>) => {
    setTheme(selectedTheme);
    sessionStorage.setItem('buse_booted', 'true');
    setShowSplash(false);
  };

  const currentTheme = theme?.toLowerCase() || 'light';

  return (
    <>
      {/* =========================================
          THE CINEMATIC BOOT SEQUENCE (SPLASH SCREEN)
          ========================================= */}
      {showSplash && (
        <div className="fixed inset-0 z-[100] bg-[#020617] text-green-500 font-mono flex flex-col items-center justify-center p-6 selection:bg-green-900">
          <div className="max-w-2xl w-full border border-green-900/50 p-8 shadow-[0_0_30px_rgba(34,197,94,0.1)] rounded-lg bg-black/50 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-700">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-widest text-white">BUSE_OS <span className="text-green-500">v2.0</span></h1>
            
            <div className="space-y-2 mb-8 text-sm md:text-base text-green-400/80">
              <p>{'>'} Booting core systems...</p>
              <p>{'>'} Initializing network protocols [OK]</p>
              <p>{'>'} Loading Master Candidate Profile [OK]</p>
              <p className="animate-pulse text-amber-400 mt-4">{'>'} PLEASE SELECT INTERFACE PARADIGM:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option 1: The HR / Recruiter */}
              <button onClick={() => handleBootSelection('light')} className="text-left p-4 border border-green-900 hover:border-green-400 hover:bg-green-950/30 transition-all group">
                <div className="text-white font-bold mb-1 group-hover:text-green-400">[1] THE_RECRUITER</div>
                <div className="text-xs text-green-600">"I am from HR. Dark mode scares me. Please just show me a normal, beautifully formatted resume so I can hire you."</div>
              </button>

              {/* Option 2: The Software Engineer */}
              <button onClick={() => handleBootSelection('terminal')} className="text-left p-4 border border-fuchsia-900 hover:border-fuchsia-400 hover:bg-fuchsia-950/30 transition-all group">
                <div className="text-white font-bold mb-1 group-hover:text-fuchsia-400">[2] KEYBOARD_WARRIOR</div>
                <div className="text-xs text-fuchsia-600/70">"I haven't used a mouse since 2018. GUIs offend my religion. Let me just type commands to fetch your data."</div>
              </button>

              {/* Option 3: The Network Architect */}
              <button onClick={() => handleBootSelection('comm')} className="text-left p-4 border border-blue-900 hover:border-blue-400 hover:bg-blue-950/30 transition-all group">
                <div className="text-white font-bold mb-1 group-hover:text-blue-400">[3] PACKET_SNIFFER</div>
                <div className="text-xs text-blue-600/70">"I dream in IP addresses. I trust OSPF more than I trust most people. Skip the fluff and just show me the live topology, HSRP fallbacks, and node telemetry."</div>              </button>

              {/* Option 4: The Local / Italian Speaker */}
              <button onClick={() => handleBootSelection('italian')} className="text-left p-4 border border-orange-900 hover:border-orange-400 hover:bg-orange-950/30 transition-all group">
                <div className="text-white font-bold mb-1 group-hover:text-orange-400">[4] QUESTURA_SIMULATOR</div>
                <div className="text-xs text-orange-600/70">"Sei italiano? Vuoi giudicare la mia grammatica (A2) mentre cerco di sopravvivere alla burocrazia? Entra qui."</div>
              </button>

            </div>
          </div>
        </div>
      )}

      {/* =========================================
          YOUR EXACT ORIGINAL WEBSITE CODE BELOW
          ========================================= */}
      <main className={`min-h-screen p-8 transition-colors duration-500 ${
        currentTheme === 'dark' ? 'bg-[#0a0a0a]' : 
        currentTheme === 'comm' ? 'bg-[#0a192f] text-blue-300' : 
        currentTheme === 'italian' ? 'bg-[#FFF5EE] text-gray-800' :
        currentTheme === 'terminal' ? 'bg-black text-green-500' : // Terminal gets a black background!
        'bg-white'
      }`}>
        
        {/* Navigation */}
        <nav className="flex justify-between items-center w-full max-w-5xl mx-auto mb-16 pt-4">
          
          {/* 🚨 THE FIX: Changed div to a button that clears memory and reloads to the Splash Screen */}
          <button 
            onClick={() => {
              sessionStorage.removeItem('buse_booted');
              window.location.href = '/';
            }}
            className="font-mono font-bold text-2xl tracking-tighter hover:scale-105 transition-transform cursor-pointer text-left focus:outline-none"
            title="Reboot System"
          >
            
            {/* 1. SURFACE: Clean JSON Object */}
            {currentTheme === 'light' && (
              <span className="text-gray-900 flex items-center gap-1">
                <span className="text-gray-400">{`{`}</span>
                  Buse
                <span className="text-gray-400">{`}`}</span>
              </span>
            )}
            
            {/* 2. TERMINAL: Unix Home Directory */}
            {currentTheme === 'terminal' && (
              <span className="text-green-500 flex items-center">
                <span className="text-green-700 mr-1">~/</span>buse
                <span className="animate-pulse w-3 h-5 bg-green-500 ml-1 inline-block"></span>
              </span>
            )}
            
            {/* 3. COMM SYS: Localhost IP Address */}
            {currentTheme === 'comm' && (
              <span className="text-cyan-400 flex items-center gap-2">
                <span className="text-blue-700 text-sm">eth0:</span>
                127.0.0.B
              </span>
            )}

            {/* 4. ITALIANO: Questura Ticket Counter */}
            {currentTheme === 'italian' && (
              <span className="text-[#D2691E] flex items-center gap-2 font-sans tracking-normal font-black">
                <span className="bg-[#D2691E] text-white px-2 py-0.5 rounded-sm text-sm shadow-sm animate-pulse">
                  N° 404
                </span>
                Sportello B.
              </span>
            )}

          </button>
          
          <ModeSelector />
        </nav>

        <div className="max-w-5xl mx-auto mt-20">
          
          {/* =========================================
              MODE 1: SURFACE (Light/Minimal) 
              ========================================= */}
          {currentTheme === 'light' && (
            <div className="animate-in fade-in duration-500">
              <div className="max-w-3xl mt-12 mb-20">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                  Computer Engineer.
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light leading-relaxed">
                  I build automated data pipelines, design resilient networks, and develop responsive web platforms.
                </p>
                
                <button 
                  onClick={() => setShowPopup(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-mono rounded-lg hover:bg-gray-800 transition shadow-lg"
                >
                  <span>MSc Internet Engineering Candidate 🎓</span>
                </button>
              </div>
              
              <h2 className="text-2xl font-medium text-gray-900 mb-8 mt-20">Selected Work</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/projects/drink-automation" className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition cursor-pointer flex flex-col justify-between hover:border-blue-500">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Drink Int. Automation</h3>
                    <p className="text-gray-500 mt-2 text-sm">B2B order processing pipeline using Gemini LLMs and JavaScript.</p>
                  </div>
                </Link>

                <Link href="/projects/dart-platform" className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition cursor-pointer flex flex-col justify-between hover:border-blue-500">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">D.A.R.T. Web Platform</h3>
                    <p className="text-gray-500 mt-2 text-sm">Responsive digital art research platform, co-led to production.</p>
                  </div>
                </Link>

                {/* 3. Drink Network (Cisco/Architecture) - REPLACED VILLA GUELFA */}
                <Link href="/projects/drink-international-network" className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition cursor-pointer flex flex-col justify-between hover:border-blue-500 bg-white">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Drink Int. Network</h3>
                    <p className="text-gray-500 mt-2 text-sm">High-availability enterprise L2/L3 topology with OSPF & HSRP.</p>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* =========================================
              DIAGNOSTIC MODAL (The Pop-up)
              ========================================= */}
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-gray-900 border border-blue-500/30 p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full flex items-center justify-center animate-[spin_4s_linear_infinite]">
                      <div className="w-10 h-10 border-4 border-blue-500/40 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <h3 className="text-white text-2xl font-bold text-center mb-2">MSc Candidate Status</h3>
                <p className="text-blue-300/70 text-center text-sm mb-8 font-mono">NET_WORK_STATUS: PENDING_ADMISSION</p>

                <div className="space-y-4">
                  <div className="flex justify-between text-white text-sm bg-gray-800/50 p-3 rounded-lg">
                    <span>Application:</span>
                    <span className="text-green-400 font-bold">SUBMITTED</span>
                  </div>
                  <div className="flex justify-between text-white text-sm bg-gray-800/50 p-3 rounded-lg">
                    <span>Results:</span>
                    <span className="text-yellow-400 font-bold animate-pulse">WAITING...</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPopup(false)}
                  className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition"
                >
                  Close Diagnostics
                </button>
              </div>
            </div>
          )}

          {/* =========================================
              MODE 2: TERMINAL 
              ========================================= */}
          {currentTheme === 'terminal' && (
            <div className="mt-10 relative z-10">
              
              <div className="mb-8 border-b border-green-900/50 pb-6">
                <h1 className="text-3xl font-bold text-green-400 mb-2 font-mono flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  System Terminal
                </h1>
                <p className="text-green-600/80 font-mono text-sm">
                  Interactive command-line interface initialized. Try typing "help".
                </p>
              </div>
              
              {/* Your interactive CLI component */}
              <div className="relative z-20 w-full">
                <Terminal />
              </div>

              {/* QUICK_LINKS (Bypasses CLI) */}
              <div className="mt-8 p-4 border border-green-900/30 bg-green-950/10 font-mono text-sm relative z-20">
                <p className="text-green-600 mb-4">// QUICK_LINKS (Bypasses CLI)</p>
                <div className="flex gap-6">
                  <Link href="/projects/drink-automation" className="text-green-400 hover:text-white transition-colors">
                    ./drink-automation.sh
                  </Link>
                  <Link href="/projects/dart-platform" className="text-green-400 hover:text-white transition-colors">
                    ./dart-platform.sh
                  </Link>
                  <Link href="/projects/drink-international-network" className="text-green-400 hover:text-white transition-colors">
                    ./drink_intl_network.pkt
                  </Link>
                </div>
              </div>

            </div>
          )}

          {/* =========================================
              MODE 3: COMM SYSTEM (Network Topology) 
              ========================================= */}
          {currentTheme === 'comm' && (
            <div className="mt-10 relative">
              
              {/* Blueprint Grid Background (Subtle) */}
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
              </div>

              {/* The Alive Network Interface */}
              <CommSystem />

            </div>
          )}

          {/* =========================================
              MODE 4: ITALIANO (Questura Simulator A2)
              ========================================= */}
          {currentTheme === 'italian' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-orange-200 mt-10 text-gray-800">
              
              {/* Header Questura */}
              <div className="flex flex-col items-center justify-center gap-4 mb-10 border-b-4 border-orange-100 pb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-orange-900 tracking-tight uppercase">
                  Ufficio Portfolio
                </h1>
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold text-lg animate-pulse">
                  IL TUO NUMERO È: 404 (Attendi il tuo turno)
                </div>
              </div>
              {/* --- THE FUNNY/INTELLIGENT RECRUITER WARNING --- */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 mb-10 rounded-r-2xl shadow-sm transform rotate-1">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 text-lg">
                  <span>⚠️</span> AVVISO DELLA DIREZIONE (Per i Recruiter)
                </h3>
                <p className="text-yellow-900 mt-2 text-base leading-relaxed">
                  Tutta questa sezione è scritta <strong>intenzionalmente a livello A2</strong> per fare uno scherzo sulla burocrazia e dimostrare la mia sopravvivenza in Italia. 
                  Se sei un Engineering Manager e vuoi valutare la mia <em>vera</em> architettura software... <strong>usa i bottoni in alto e cambia modalità!</strong> 
                  Qui troverai solo parole semplici, ironia e tanto stress da permesso di soggiorno. 
                </p>
                <p className="mt-4 font-medium italic text-red-800">
                  Inoltre, se vuoi testare te stesso con un quiz costruito malissimo, alla fine di questa pagina trovi il mio test. Fallo e mandami un messaggio con le tue opinioni e i tuoi consigli su come migliorare il mio italiano! 🙏
                </p>
              </div>

              {/* Presentazione A2 */}
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700 mb-12">
                <p>
                  <strong>Buongiorno!</strong> Mi presento. Studio Ingegneria Informatica al Politecnico di Torino (PoliTo).
                </p>
                <p>
                  Sono uno studente internazionale in Italia. Mi piacciono i computer e i codici. Ma c'è una cosa che conosco meglio dell'Informatica: <strong>la fila in Questura per il permesso di soggiorno!</strong>
                </p>
                
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 shadow-sm">
                  <h2 className="text-xl font-bold text-orange-900 mb-2">Cosa trovi in questo sito?</h2>
                  <p>Qui puoi vedere i miei progetti. Non serve prendere un appuntamento. Non serve la marca da bollo. È tutto gratis e veloce!</p>
                </div>
              </div>

              {/* Progetti (I "Maledetti" Moduli) */}
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-100 pb-2">I Miei Moduli (Progetti)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Link href="/projects/drink-automation" className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                  <span className="text-3xl mb-4 block">🍕</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">Automazione Drink</h3>
                  <p className="text-gray-600 text-base">Un programma intelligente per leggere le email. Veloce e senza stress (non come gli uffici pubblici).</p>
                </Link>

                <Link href="/projects/dart-platform" className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                  <span className="text-3xl mb-4 block">🏎️</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">Team D.A.R.T.</h3>
                  <p className="text-gray-600 text-base">Il mio lavoro di squadra al PoliTo. Siti web, codice e tanti amici.</p>
                </Link>

                {/* NEW ITALIAN CARD FOR NETWORK */}
                <Link href="/projects/drink-international-network" className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all">
                  <span className="text-3xl mb-4 block">🔌</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">Rete Drink Int.</h3>
                  <p className="text-gray-600 text-sm">Ho costruito una rete aziendale. Tanti cavi, molta sicurezza. Non si rompe mai.</p>
                </Link>
              </div>

              {/* The Quiz Section you already built */}
              <div className="bg-white/50 p-8 rounded-3xl border border-orange-200 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pensi che il mio italiano sia brutto?</h3>
                <p className="text-gray-600 mb-6">Vediamo se tu sei più bravo di me con l'italiano della burocrazia.</p>
                
                {!showQuiz ? (
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="px-8 py-3 bg-[#FF7F50] text-white font-bold rounded-full hover:bg-[#FF6347] transition shadow-md"
                  >
                    Fai il Test di Italiano!
                  </button>
                ) : (
                  <div className="mt-8 text-left max-w-lg mx-auto">
                    <ItalianQuiz />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================
              DYNAMIC FOOTER & CONTACT INFO
              ========================================= */}
          <footer className={`mt-32 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-sm pb-10 ${
            currentTheme === 'terminal' ? 'border-green-900/50 text-green-700 font-mono' :
            currentTheme === 'comm' ? 'border-blue-900/50 text-blue-500 font-mono' :
            currentTheme === 'italian' ? 'border-orange-200 text-orange-800/70' :
            'border-gray-200 text-gray-500'
          }`}>
            
            {/* Copyright Statement */}
            <div className="text-center md:text-left">
              {currentTheme === 'terminal' ? '> EOF. (c) 2026 Buse_OS. All rights reserved.' :
               currentTheme === 'comm' ? 'END_OF_TRANSMISSION // © 2026 BUSE_NET. ALL_RIGHTS_RESERVED.' :
               currentTheme === 'italian' ? '© 2026 Buse. Tutti i diritti riservati.' :
               '© 2026 Buse. All rights reserved.'}
            </div>

            {/* Links and CV Button */}
            <div className="flex flex-wrap justify-center items-center gap-6">
              <a href="mailto:busetasdemir174@gmail.com" className="hover:opacity-70 transition-opacity">Email</a>
              <a href="https://www.linkedin.com/in/buse-tasdemir-b731222a3/" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">LinkedIn</a>
              <a href="https://github.com/busepol" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">GitHub</a>

              {/* THE SHAPE-SHIFTING CV BUTTON */}
              <a 
                href="/Buse_CV.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className={`px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2 hover:-translate-y-0.5 ${
                  currentTheme === 'terminal' ? 'bg-green-950/80 text-green-400 border border-green-800 hover:bg-green-900' :
                  currentTheme === 'comm' ? 'bg-blue-900/50 text-cyan-300 border border-blue-700 hover:bg-blue-800/80' :
                  currentTheme === 'italian' ? 'bg-[#FF7F50] text-white hover:bg-[#FF6347] border-b-4 border-[#D2691E] active:border-b-0 active:translate-y-1' :
                  'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {currentTheme === 'terminal' ? './download_cv.sh' :
                 currentTheme === 'comm' ? '[PULL_CV_DATA]' :
                 currentTheme === 'italian' ? '📄 Scarica CV' :
                 'Download CV'}
              </a>
            </div>
          </footer>

        </div> {/* <-- This should be your existing closing div for the max-w-5xl container */}
      </main> {/* <-- This should be your existing closing main tag */}
    </>
  );
}