'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

// The ultimate, fully expanded data representing EVERY node
const NODE_DATA = {
  trigger: { icon: "📧", title: "New Email with Attachment", tech: "Gmail Trigger", desc: "Polls the designated supplier inbox. Initiates the workflow whenever a new B2B order email arrives." },
  check: { icon: "🔀", title: "Check if Attachment Exists", tech: "IF Node", desc: "Evaluates the payload. Routes to file separation if true, or body extraction if false." },
  separate: { icon: "✂️", title: "Separate Multiple Files", tech: "Item Lists", desc: "Breaks down arrays if an email contains multiple distinct order attachments." },
  iterate: { icon: "🔁", title: "Iterate Each File", tech: "Loop Node", desc: "Processes each separated file one by one to ensure no attachments are skipped." },
  route: { icon: "🔀", title: "Route by File Type", tech: "Switch Node", desc: "Evaluates MIME type (XLSX, XLS, PDF, DOC, etc.) and acts as the master traffic controller." },
  
  // Excel Template Verification
  check_xlsx: { icon: "🔀", title: "Check Template Type: If Our Template", tech: "IF Node", desc: "Verifies if the XLSX file is the internal Smart-Template (generated via the custom Python/Database tool)." },
  check_xls: { icon: "🔀", title: "Check Template Type: If Our Template1", tech: "IF Node", desc: "Verifies if a legacy XLS file matches the database-backed internal template format." },
  
  // Excel Read Branches
  read_xlsx_t: { icon: "📄", title: "Read Excel Rows XLSX", tech: "Spreadsheet", desc: "Fast-Track: Extracts data from the verified XLSX Smart-Template. Since inputs were restricted by database formulas, AI is bypassed." },
  read_xlsx_f: { icon: "📄", title: "Read Excel Rows XLSX1", tech: "Spreadsheet", desc: "AI-Track: Extracts raw data from unstructured 3rd-party XLSX files, preparing the array for Gemini parsing." },
  read_xls_t: { icon: "📄", title: "Read Excel Rows XLS", tech: "Spreadsheet", desc: "Fast-Track: Extracts data from the verified legacy XLS Smart-Template." },
  read_xls_f: { icon: "📄", title: "Read Excel Rows XLS1", tech: "Spreadsheet", desc: "AI-Track: Extracts raw data from unknown 3rd-party XLS files for AI processing." },
  
  gotenberg: { icon: "🌐", title: "Gotenberg: Convert DOCX to PDF", tech: "API Request", desc: "Sends DOC/DOCX files to Gotenberg to convert them into readable PDFs before AI extraction." },
  discard_un: { icon: "🗑️", title: "Discard: Unsupported File", tech: "NoOp", desc: "Ends the workflow branch safely for unsupported or corrupted file types." },
  is_body: { icon: "🔀", title: "Is Body-Only Order", tech: "IF Node", desc: "Checks if the email body actually contains order text when no attachment exists." },
  discard_no: { icon: "🗑️", title: "Discard: No Order Found", tech: "NoOp", desc: "Ends workflow if no actionable data is found in the body." },
  
  // Excel Formatting
  group_rows: { icon: "⚙️", title: "Group Rows into Separate Orders", tech: "Code Node", desc: "Consolidates the perfectly mapped native template rows into structured JSON order objects." },
  build_html_excel: { icon: "⚙️", title: "Build HTML Document for our excel template", tech: "Code Node", desc: "Takes the validated fast-track data straight into HTML layout, skipping AI verification." },
  clean_excel: { icon: "⚙️", title: "Clean/Prepare Excel Data", tech: "Code Node", desc: "Sanitizes raw, non-standard Excel data to reduce token usage before sending it to the LLM." },
  gemini_excel: { icon: "🤖", title: "Gemini: Extract Excel Data", tech: "Google Gemini", desc: "Extracts structured data from messy, arbitrary third-party Excel formats." },
  format_excel: { icon: "⚙️", title: "Format Excel Output", tech: "Code Node", desc: "Structures the JSON output from Gemini into the standard ERP schema." },
  
  // PDF Nodes
  gemini_pdf: { icon: "🤖", title: "Gemini: Extract PDF Data", tech: "Google Gemini", desc: "Visually analyzes PDF layouts to extract data from complex, tiered discount tables." },
  parse_pdf: { icon: "⚙️", title: "Parse: If different orders in one file", tech: "Code Node", desc: "Splits a single PDF order extraction into multiple discrete payloads if multiple deliveries are detected." },
  
  // Text Nodes
  gemini_text: { icon: "🤖", title: "Gemini: Extract Email Text Order", tech: "Google Gemini", desc: "Extracts quantities, SKUs, and delivery dates from conversational email bodies." },
  format_email: { icon: "⚙️", title: "Format Email Output", tech: "Code Node", desc: "Sanitizes and formats the extracted email JSON to match the strict Panthera database schema." },
  
  // Convergence & Delivery
  html: { icon: "⚙️", title: "Build HTML Document", tech: "Code Node", desc: "Injects standardized JSON into a strict HTML/CSS template to mirror the Panthera ERP format." },
  railway: { icon: "🌐", title: "RAILWAY-PDF", tech: "Gotenberg API", desc: "Renders the standardized HTML into a final, high-fidelity PDF document." },
  format_pdf: { icon: "⚙️", title: "Format/Rename Output PDF", tech: "Code Node", desc: "Generates the standardized filename and prepares the binary buffer." },
  upload_drive: { icon: "📁", title: "Upload file", tech: "Google Drive", desc: "Archives the final, standardized PDF securely in the company's Google Drive." },
  send_iungo: { icon: "📧", title: "Send to drink-iungo", tech: "Gmail", desc: "Transmits the finalized payload directly to the Iungo platform." },
  aggregate: { icon: "📚", title: "Aggregate", tech: "Item Lists", desc: "Waits for file upload to finish before proceeding to notifications." },
  mark_read: { icon: "📧", title: "Mark a message as read", tech: "Gmail", desc: "Updates the inbox state to prevent duplicate processing." },
  send_confirm: { icon: "📧", title: "Send a confirmation message", tech: "Gmail", desc: "Replies to the original sender to confirm the order was successfully parsed and ingested." }
};


export default function DrinkAutomationProject() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Keep your existing activeNode state
  const [activeNode, setActiveNode] = useState<keyof typeof NODE_DATA>('check_xlsx');

  if (!mounted) return null;
  const currentTheme = theme?.toLowerCase();

  // THE MAGIC SWITCH
  // --- THE MAGIC SWITCH ---
  if (currentTheme === 'terminal') return <TerminalView />;
  if (currentTheme === 'comm') return <CommEngineerView activeNode={activeNode} />;
  if (currentTheme === 'italian') return <ItalianView />; 
  // surface view
  const NodeCard = ({ id, x, y }: { id: keyof typeof NODE_DATA, x: number, y: number }) => {
    const isActive = activeNode === id;
    const data = NODE_DATA[id];
    
    return (
      <button 
        onClick={() => setActiveNode(id)} 
        style={{ left: `${x}px`, top: `${y}px` }}
        className={`absolute z-20 flex flex-col items-start p-3 w-[180px] min-h-[80px] bg-white rounded-xl transition-all text-left shadow-sm
          ${isActive ? 'border-2 border-blue-500 ring-4 ring-blue-50 shadow-md scale-105' : 'border border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
      >
        <div className="text-xl mb-1">{data.icon}</div>
        <div className="text-[10px] font-bold text-gray-800 leading-tight">{data.title}</div>
      </button>
    );
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-[#fafaf9] text-gray-900 p-8 md:p-16 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-blue-600 transition-colors mb-12">
          ← Return to Surface
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Drink Int. Automation</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl">
            A highly complex B2B order processing pipeline. I engineered a multi-modal n8n architecture utilizing Gemini LLMs to parse highly varied, unstructured email data into strict ERP schemas.
          </p>
        </header>

        {/* Project Meta Data Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-200 mb-16">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role</h4>
            <p className="font-medium text-gray-800">Automation Engineer</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Context</h4>
            <p className="font-medium text-gray-800">B2B Pipeline & ERP</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-100 shadow-sm">n8n</span>
              <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-100 shadow-sm">Gemini LLM</span>
              <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-100 shadow-sm">JavaScript/HTML</span>
              <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-100 shadow-sm">Python</span>
              <span className="px-2 py-1 bg-white text-gray-600 text-xs rounded-md border border-gray-200 shadow-sm">Gotenberg API</span>
              <span className="px-2 py-1 bg-white text-gray-600 text-xs rounded-md border border-gray-200 shadow-sm">Panthera ERP</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            MASSIVE INTERACTIVE PIPELINE ARCHITECTURE 
            ========================================== */}
        <section className="mb-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Interactive Pipeline Architecture</h2>
            <p className="text-lg text-gray-600">
              Explore the full routing logic. Click any node in the canvas below to view its specific engineering rules.
            </p>
          </div>
          
          <div className="rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
            
            {/* Live Inspector Panel */}
            <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start shrink-0 border-b border-slate-700">
              <div className="text-6xl bg-slate-800 p-6 rounded-3xl shadow-inner border border-slate-700">
                {NODE_DATA[activeNode].icon}
              </div>
              <div className="flex-1">
                <div className="text-blue-400 font-mono text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live Inspector
                </div>
                <h3 className="text-2xl font-bold mb-2">{NODE_DATA[activeNode].title}</h3>
                <div className="inline-block px-3 py-1 bg-slate-800 border border-slate-600 text-blue-300 text-[10px] font-bold rounded-md mb-3">
                  {NODE_DATA[activeNode].tech}
                </div>
                <p className="text-slate-300 leading-relaxed max-w-4xl">
                  {NODE_DATA[activeNode].desc}
                </p>
              </div>
            </div>

            {/* The SVG & Node Canvas */}
            <div className="bg-[#fdfdfd] overflow-auto custom-scrollbar relative shadow-inner h-[600px]">
              <div className="w-[4200px] h-[850px] relative" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                
                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <style>{`.wire { fill: none; stroke: #cbd5e1; stroke-width: 2px; }`}</style>
                  
                  {/* Initial Routing */}
                  <path className="wire" d="M 220 400 L 280 400" />
                  <path className="wire" d="M 460 400 C 500 400, 500 240, 520 240" />
                  <path className="wire" d="M 460 400 C 500 400, 500 560, 520 560" />
                  
                  {/* Top Branches */}
                  <path className="wire" d="M 700 240 L 760 240" />
                  <path className="wire" d="M 940 240 L 1000 240" />
                  <path className="wire" d="M 1180 240 C 1220 240, 1220 80, 1240 80" />
                  <path className="wire" d="M 1180 240 C 1220 240, 1220 200, 1240 200" />
                  <path className="wire" d="M 1180 240 C 1220 240, 1220 360, 1240 360" />
                  <path className="wire" d="M 1180 240 C 1220 240, 1220 480, 1240 480" />

                  {/* Excel Read Split Logic */}
                  <path className="wire" d="M 1420 80 C 1450 80, 1450 40, 1480 40" />
                  <path className="wire" d="M 1420 80 C 1450 80, 1450 120, 1480 120" />
                  <path className="wire" d="M 1420 200 C 1450 200, 1450 200, 1480 200" />
                  <path className="wire" d="M 1420 200 C 1450 200, 1450 280, 1480 280" />

                  {/* Excel Convergence to Group/Clean */}
                  <path className="wire" d="M 1660 40 C 1690 40, 1690 80, 1720 80" />
                  <path className="wire" d="M 1660 200 C 1690 200, 1690 80, 1720 80" />
                  <path className="wire" d="M 1660 120 C 1690 120, 1690 240, 1720 240" />
                  <path className="wire" d="M 1660 280 C 1690 280, 1690 240, 1720 240" />

                  {/* Excel Final Formatting */}
                  <path className="wire" d="M 1900 80 L 1960 80" />
                  <path className="wire" d="M 1900 240 L 1960 240" />
                  <path className="wire" d="M 2140 240 L 2200 240" />

                  {/* PDF Connections */}
                  <path className="wire" d="M 1420 360 L 1480 360" />
                  <path className="wire" d="M 1660 360 L 1720 360" />

                  {/* Text Connections */}
                  <path className="wire" d="M 700 560 L 1480 560" />
                  <path className="wire" d="M 1660 560 L 1720 560" />
                  <path className="wire" d="M 700 560 C 740 560, 740 680, 760 680" />

                  {/* Convergences to HTML */}
                  <path className="wire" d="M 2380 240 C 2410 240, 2410 320, 2440 320" />
                  <path className="wire" d="M 1900 360 C 2200 360, 2200 320, 2440 320" />
                  <path className="wire" d="M 1900 560 C 2200 560, 2200 320, 2440 320" />

                  {/* HTML to Railway */}
                  <path className="wire" d="M 2620 320 L 2680 320" />
                  <path className="wire" d="M 2140 80 C 2440 80, 2500 320, 2680 320" /> {/* Fast Track route directly to Railway */}
                  
                  {/* Railway -> PDF -> Split */}
                  <path className="wire" d="M 2860 320 L 2920 320" />
                  <path className="wire" d="M 3100 320 C 3130 320, 3130 240, 3160 240" />
                  <path className="wire" d="M 3100 320 C 3130 320, 3130 440, 3160 440" />

                  {/* Drive Track -> Confirm */}
                  <path className="wire" d="M 3340 240 L 3400 240" />
                  <path className="wire" d="M 3580 240 L 3640 240" />
                  <path className="wire" d="M 3820 240 L 3880 240" />
                </svg>

                {/* Node Placement */}
                <NodeCard id="trigger" x={40} y={360} />
                <NodeCard id="check" x={280} y={360} />
                
                <NodeCard id="separate" x={520} y={200} />
                <NodeCard id="iterate" x={760} y={200} />
                <NodeCard id="route" x={1000} y={200} />
                
                {/* Check Templates */}
                <NodeCard id="check_xlsx" x={1240} y={40} />
                <NodeCard id="check_xls" x={1240} y={160} />
                
                {/* 4 Read Branches */}
                <NodeCard id="read_xlsx_t" x={1480} y={0} />
                <NodeCard id="read_xlsx_f" x={1480} y={80} />
                <NodeCard id="read_xls_t" x={1480} y={160} />
                <NodeCard id="read_xls_f" x={1480} y={240} />

                <NodeCard id="gotenberg" x={1240} y={320} />
                <NodeCard id="discard_un" x={1240} y={440} />

                <NodeCard id="is_body" x={520} y={520} />
                <NodeCard id="discard_no" x={760} y={640} />

                {/* Excel Formatting */}
                <NodeCard id="group_rows" x={1720} y={40} />
                <NodeCard id="clean_excel" x={1720} y={200} />
                <NodeCard id="build_html_excel" x={1960} y={40} />
                <NodeCard id="gemini_excel" x={1960} y={200} />
                <NodeCard id="format_excel" x={2200} y={200} />

                {/* PDF Formatting */}
                <NodeCard id="gemini_pdf" x={1480} y={320} />
                <NodeCard id="parse_pdf" x={1720} y={320} />

                {/* Text Formatting */}
                <NodeCard id="gemini_text" x={1480} y={520} />
                <NodeCard id="format_email" x={1720} y={520} />

                {/* Final Merge & Delivery */}
                <NodeCard id="html" x={2440} y={280} />
                <NodeCard id="railway" x={2680} y={280} />
                <NodeCard id="format_pdf" x={2920} y={280} />

                <NodeCard id="upload_drive" x={3160} y={200} />
                <NodeCard id="aggregate" x={3400} y={200} />
                <NodeCard id="mark_read" x={3640} y={200} />
                <NodeCard id="send_confirm" x={3880} y={200} />

                <NodeCard id="send_iungo" x={3160} y={400} />

              </div>
            </div>
          </div>
        </section>

        {/* 3. Challenges & Tools */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-red-500">⚡</span> Challenges Overcome
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-0.5">■</span>
                  <span><strong>MIME-Type Processing:</strong> Encountered and resolved a binary PDF recognition error in n8n’s HTTP Request node when interfacing with Gotenberg.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-0.5">■</span>
                  <span><strong>API Rate Limiting:</strong> Heavy order traffic caused Gemini API timeouts, which was mitigated by programming exponential backoff retry logic.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-0.5">■</span>
                  <span><strong>Complex Logistics:</strong> Parsing legacy orders with multiple conflicting delivery dates required the integration of specific detection rules (<em>Spedizione Complessa</em>).</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-gray-400">⚙️</span> Tools & Technologies
              </h3>
              <div className="space-y-6 text-gray-600">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wider">Platforms</h4>
                  <p>Panthera ERP, Iungo Platform</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wider">Automation</h4>
                  <p>n8n (hosted on Railway.app)</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wider">Scripting</h4>
                  <p>Python (openpyxl, pandas), JavaScript/HTML</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wider">AI & APIs</h4>
                  <p>Gemini LLM, Gmail API, Gotenberg (PDF rendering)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Extra Magic (Python Scripting) */}
        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-10 rounded-3xl border border-blue-800 shadow-2xl relative overflow-hidden mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
            <span>✨</span> Python Data Manipulation & Smart Excel Logic
          </h3>
          <p className="text-blue-100 leading-relaxed text-lg mb-6 relative z-10 max-w-3xl">
            For scenarios requiring manual agent input, a custom Python tool was developed using the <code>openpyxl</code> library to generate highly restricted "Smart-Templates." 
          </p>
          <div className="bg-black/30 p-6 rounded-xl border border-white/10 relative z-10">
            <p className="text-blue-50 leading-relaxed">
              By embedding <strong>ANAGRAFICA CLIENTI</strong> and <strong>CATALOGO</strong> data directly from the Panthera ERP into hidden backend sheets, the tool uses dynamic Excel <code>FILTER()</code> and <code>VLOOKUP()</code> formulas. This radically reduces human errors by strictly restricting frontend inputs to valid SKUs and allowed quantities, ensuring 100% ERP compatibility before the file even touches the ingestion pipeline.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

function CommEngineerView({ activeNode }: { activeNode: string }) {
  return (
    <main className="min-h-screen bg-[#020617] text-blue-300 p-4 md:p-12 font-mono relative overflow-hidden animate-in fade-in duration-500">
      {/* Blueprint Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border border-blue-500/30 bg-blue-950/20 p-4 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500"></div>
              <div className="w-2 h-2 bg-green-500"></div>
            </div>
            <span className="text-white font-bold tracking-widest text-sm">DRINK_INT :: AUTO_PIPELINE_MONITOR</span>
          </div>
          <div className="text-[10px] text-blue-400 flex gap-6 mt-4 md:mt-0">
            <span>UPLINK: <span className="text-green-400">ENCRYPTED</span></span>
            <span>LLM_API: <span className="text-green-400">ONLINE</span></span>
            <span>ERP_SYNC: <span className="text-white">ACTIVE</span></span>
            <span>PROCESSED: <span className="text-white">1,402</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Column 1: System Telemetry */}
          <div className="space-y-6">
            <div className="border border-blue-900 bg-black/40 p-5 rounded-sm">
              <h4 className="text-blue-500 text-[10px] font-bold mb-4 uppercase tracking-tighter">System_Architecture</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                A highly complex B2B order processing pipeline. Multi-modal n8n architecture utilizing Gemini LLMs to parse unstructured email data into strict ERP schemas.
              </p>
              <div className="space-y-2 text-xs border-t border-blue-900/50 pt-4">
                <div className="flex justify-between"><span>N8N_WORKER</span><span className="text-green-400">RUNNING</span></div>
                <div className="flex justify-between"><span>GEMINI_QUOTA</span><span className="text-white">88%</span></div>
                <div className="flex justify-between"><span>MEM_BUFFER</span><span className="text-white">440MB</span></div>
                <div className="w-full bg-blue-900/30 h-1 mt-2">
                  <div className="bg-blue-500 h-full w-[88%]"></div>
                </div>
              </div>
            </div>

            <div className="border border-cyan-900 bg-black/40 p-5 rounded-sm">
              <h4 className="text-cyan-500 text-[10px] font-bold mb-4 uppercase tracking-tighter">Protocol_Stack</h4>
              <ul className="text-[10px] space-y-1 text-cyan-300/70 italic">
                <li>{">"} n8n Automation Engine</li>
                <li>{">"} Gemini LLM (AI Parsing)</li>
                <li>{">"} Python (openpyxl, pandas)</li>
                <li>{">"} Gotenberg (PDF Render)</li>
                <li>{">"} Panthera ERP Gateway</li>
              </ul>
            </div>
          </div>

          {/* Column 2 & 3: Main Flow Logic */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-white/10 bg-slate-900/50 p-8 rounded-lg relative">
              <div className="absolute top-0 right-0 p-2 text-[10px] text-white/20">ARC_REF: N8N-PIPE-V2</div>
              <h2 className="text-2xl text-white font-bold mb-6 tracking-tighter">Active Pipeline Routing Logic</h2>
              
              <div className="flex flex-col gap-6">
                {[
                  { label: "INGRESS & ROUTING", detail: "Email listener separates files. IF Smart-Template (XLSX) -> direct route. IF DOCX -> Gotenberg API conversion to PDF.", color: "blue" },
                  { label: "AI EXTRACTION (GEMINI)", detail: "LLM extracts unstructured data from PDFs/Email Bodies into Panthera JSON ERP schema.", color: "fuchsia" },
                  { label: "FORMATTING & LOGIC", detail: "Group rows, parse complex multi-orders, format output, and build HTML document for records.", color: "cyan" },
                  { label: "EGRESS (PANTHERA ERP)", overlay: "Upload to drink-iungo, mark read, dispatch confirmation email.", color: "emerald" }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-6 group">
                    <div className={`w-12 h-12 border border-${step.color}-500 flex items-center justify-center shrink-0 group-hover:bg-${step.color}-500 transition-colors`}>
                      <span className="text-white text-xs font-bold">0{index+1}</span>
                    </div>
                    <div className="flex-1 border-b border-white/5 pb-3">
                      <div className={`text-${step.color}-400 font-bold text-xs`}>{step.label}</div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">{step.detail || step.overlay}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-blue-500/20 bg-[#040d21] p-5">
              <h4 className="text-blue-500 text-[10px] font-bold mb-3 uppercase tracking-tighter">MODULE :: Python_Smart_Templates</h4>
              <p className="text-xs text-emerald-400/80 leading-relaxed font-mono">
                For manual agent input scenarios, developed a custom Python tool using <span className="text-white">openpyxl</span>. 
                Embeds ANAGRAFICA CLIENTI and CATALOGO data directly from Panthera ERP into hidden backend sheets. 
                Utilizes dynamic Excel FILTER() and VLOOKUP() formulas to strictly restrict frontend inputs to valid SKUs and allowed quantities, ensuring 100% ERP compatibility prior to ingestion.
              </p>
            </div>
          </div>

          {/* Column 4: Logic Gates & Challenges */}
          <div className="space-y-6">
            <div className="border border-fuchsia-900 bg-black/40 p-5">
              <h4 className="text-fuchsia-500 text-[10px] font-bold mb-4 uppercase tracking-tighter">Incident_Mitigation</h4>
              <div className="space-y-4">
                <div className="p-2 border border-fuchsia-900/30">
                  <div className="text-[10px] text-white font-bold mb-1">ERR: API_RATE_LIMITS</div>
                  <div className="text-[9px] text-slate-400">Gemini API timeouts under heavy load mitigated via exponential backoff retry logic.</div>
                </div>
                <div className="p-2 border border-fuchsia-900/30">
                  <div className="text-[10px] text-white font-bold mb-1">ERR: MIME_PROCESSING</div>
                  <div className="text-[9px] text-slate-400">Resolved binary PDF recognition failure in n8n HTTP nodes for Gotenberg API.</div>
                </div>
                <div className="p-2 border border-fuchsia-900/30">
                  <div className="text-[10px] text-white font-bold mb-1">LOGIC: SPEDIZIONE COMPLESSA</div>
                  <div className="text-[9px] text-slate-400">Specific detection rules deployed for legacy orders with multiple delivery dates.</div>
                </div>
              </div>
            </div>

            <Link href="/" className="flex items-center justify-center p-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
              [ Terminate_Link ]
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function TerminalView() {
  return (
    <main className="min-h-screen bg-[#050505] text-green-500 p-4 md:p-8 font-mono animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto border border-green-900/40 bg-[#0a0a0a] shadow-[0_0_80px_-20px_rgba(34,197,94,0.15)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#111] border-b border-green-900/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            {/* Changed from green-700 to a vibrant magenta for the user path */}
            <span className="ml-4 text-xs text-fuchsia-400 font-bold uppercase tracking-widest">admin@buse-os:~/b2b-pipeline/drink-int</span>
          </div>
          <div className="text-[10px] text-green-800">SYSTEM_UPTIME: 4421:12:05</div>
        </div>

        {/* ASCII Art Welcome Message */}
        <div className="px-6 pt-6 pb-2 hidden md:block">
          <pre className="text-emerald-400 font-bold text-[10px] md:text-xs leading-tight">
{`
 ____ ___  ____    ____  ___ ____  _____ _     ___ _   _ _____ 
| __ )__ \\| __ )  |  _ \\|_ _|  _ \\| ____| |   |_ _| \\ | | ____|
|  _ \\ / /|  _ \\  | |_) || || |_) |  _| | |    | ||  \\| |  _|  
| |_) / /_| |_) | |  __/ | ||  __/| |___| |___ | || |\\  | |___ 
|____/____|____/  |_|   |___|_|   |_____|_____|___|_| \\_|_____|
:: MULTI-MODAL AUTOMATION ENGINE & LLM PARSER ::
`}
          </pre>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Panel: Process Tree */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              {/* Changed header color to magenta to match reference */}
              <h2 className="text-[10px] text-fuchsia-400 font-bold tracking-widest border-b border-fuchsia-900/50 pb-2 mb-3">PROCESS_TREE</h2>
              <div className="text-[11px] space-y-1 text-green-500/70">
                <p>├─ b2b_pipeline_core <span className="text-white">[RUNNING]</span></p>
                <p>│  ├─ webhook_listener</p>
                <p>│  └─ router_node</p>
                <p>├─ gemini-llm-api <span className="text-white">[ACTIVE]</span></p>
                <p>├─ python-data-parser <span className="text-white">[IDLE]</span></p>
                <p>└─ gotenberg-api <span className="text-white">[READY]</span></p>
              </div>
            </div>
            
            <div>
              <h2 className="text-[10px] text-fuchsia-400 font-bold tracking-widest border-b border-fuchsia-900/50 pb-2 mb-3">ENV_VARIABLES</h2>
              <div className="text-[10px] grid grid-cols-2 gap-2 text-green-600">
                <span>PORT</span><span className="text-white">5678</span>
                <span>B2B_MODE</span><span className="text-white">TRUE</span>
                <span>LOG_LVL</span><span className="text-white">DEBUG</span>
                <span>AI_MDL</span><span className="text-white">GEMINI_1.5</span>
              </div>
            </div>
          </div>

          {/* Center Panel: Documentation & Live Logs */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Command Executions */}
            <div className="space-y-6 text-xs md:text-sm leading-relaxed">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-fuchsia-400">admin@buse-os:~$</span>
                  <span className="text-white">cat architecture_overview.md</span>
                </div>
                <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-1">
                  Engineered a highly complex B2B order processing pipeline. Multi-modal n8n architecture utilizing Gemini LLMs to parse highly varied, unstructured email data into strict Panthera ERP schemas.
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-fuchsia-400">admin@buse-os:~$</span>
                  <span className="text-white">cat python_smart_template.py --info</span>
                </div>
                <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-1">
                  Developed custom Python tool (openpyxl) for manual agent inputs. Embeds ANAGRAFICA CLIENTI and CATALOGO data directly from Panthera ERP into hidden backend sheets. Uses dynamic Excel FILTER() and VLOOKUP() formulas to strictly restrict frontend inputs to valid SKUs and quantities, ensuring 100% ERP compatibility.
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-fuchsia-400">admin@buse-os:~$</span>
                  <span className="text-white">show bug_reports --resolved</span>
                </div>
                <div className="pl-4 border-l-2 border-fuchsia-900 text-green-500/90 py-1 space-y-1">
                  {/* Using orange/amber for commit-style tags */}
                  <p><span className="text-amber-500 font-bold">[FIXED]</span> MIME-Type Errors: Resolved binary PDF recognition failure in Gotenberg HTTP requests.</p>
                  <p><span className="text-amber-500 font-bold">[FIXED]</span> API Rate Limiting: Mitigated Gemini timeouts via exponential backoff retry logic.</p>
                  <p><span className="text-amber-500 font-bold">[FIXED]</span> Complex Logistics: Built parsing rules for legacy B2B orders with multiple conflicting delivery dates.</p>
                </div>
              </div>
            </div>

            {/* Live System Diagnostics */}
            <div>
              <h2 className="text-[10px] text-fuchsia-400 font-bold tracking-widest border-b border-fuchsia-900/50 pb-2 mb-4">SYSTEM_DIAGNOSTICS // B2B_PIPELINE_TAIL</h2>
              
              <div className="bg-black p-4 border border-fuchsia-900/30 h-56 overflow-y-auto text-[11px] mb-6 shadow-inner flex flex-col justify-end">
                <p className="text-cyan-400">{'>>'} Fetching ingestion logs for Drink Int B2B Pipeline...</p>
                <p className="text-green-400">2026-06-22 18:40:01 | INGEST :: Gmail Trigger [RCV_OK]</p>
                <p className="text-green-400">2026-06-22 18:40:02 | ROUTER :: File format identified: MS Word. Initiating Gotenberg...</p>
                <p className="text-emerald-400">2026-06-22 18:40:04 | GOTENBERG :: Converting DOCX to PDF [STATUS: 200 OK]</p>
                <p className="text-green-400">2026-06-22 18:40:05 | AI_MOD :: Gemini-1.5 analysis [EXTRACTING JSON_SCHEMA]</p>
                <p className="text-amber-400">2026-06-22 18:40:10 | LOGIC :: Multiple delivery dates detected. Spedizione Complessa rules applied.</p>
                <p className="text-green-400">2026-06-22 18:40:12 | FORMAT :: Mapping JSON to Panthera ERP</p>
                <p className="text-emerald-400 font-bold">2026-06-22 18:40:14 | IUNGO_GATEWAY :: Order pushed successfully. Confirmation email dispatched.</p>
                <p className="text-white animate-pulse mt-2">2026-06-22 18:40:15 | B2B_PIPELINE :: STANDBY_FOR_INCOMING_WEBHOOK<span className="inline-block w-2 h-3 bg-white ml-1 align-middle"></span></p>
              </div>

              {/* Status Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-fuchsia-900/30 p-3">
                  <div className="text-[9px] text-fuchsia-400">TOKEN_USAGE</div>
                  <div className="text-lg text-white">12.4k</div>
                </div>
                <div className="border border-fuchsia-900/30 p-3">
                  <div className="text-[9px] text-fuchsia-400">B2B_SYNC</div>
                  <div className="text-lg text-white">440ms</div>
                </div>
                <div className="border border-fuchsia-900/30 p-3">
                  <div className="text-[9px] text-fuchsia-400">STATUS</div>
                  <div className="text-lg text-emerald-400 animate-pulse">ONLINE</div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-fuchsia-900/20 pt-6">
                <Link href="/" className="text-[10px] px-4 py-2 border border-fuchsia-700 hover:bg-fuchsia-900 text-fuchsia-400 transition-all uppercase tracking-widest">
                  [ cd .. Return to Root ]
                </Link>
                <div className="text-[10px] text-green-900 font-mono">
                  BuseOS Terminal v2.4 | Powered by Python/n8n
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




// 🇮🇹 ITALIAN VIEW (QUESTURA SIMULATOR)
function ItalianView() {
  return (
    <main className="min-h-screen bg-[#FFF5EE] p-8 md:p-16 font-sans text-gray-900 selection:bg-orange-200">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-orange-200">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b-2 border-orange-100 pb-6">
          <span className="text-4xl md:text-5xl">🍕</span>
          <h1 className="text-3xl md:text-4xl font-black text-orange-900 tracking-tight">Progetto: Automazione Drink</h1>
        </div>

        {/* A2 Level Italian Content */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700">
          <p>
            <strong>Ciao!</strong> Ti spiego il mio progetto in italiano semplice.
          </p>

          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100 my-6 shadow-sm">
            <h2 className="text-2xl font-bold text-red-800 mb-3 flex items-center gap-2">
              <span>🤌</span> Il Problema (Come la Questura)
            </h2>
            <p>
              Prima, c'era molta confusione. I clienti mandavano tante email con documenti diversi (PDF, Excel). 
              Era un disastro! Era esattamente come la Questura di Torino: 
              tante persone, tanti fogli, e molta fila. Gli impiegati dovevano leggere tutti i documenti a mano. Molto lento e molto stress!
            </p>
          </div>

          <div className="bg-green-50 p-6 md:p-8 rounded-2xl border border-green-100 my-6 shadow-sm">
            <h2 className="text-2xl font-bold text-green-800 mb-3 flex items-center gap-2">
              <span>💡</span> La Mia Soluzione
            </h2>
            <p>
              Ho creato un sistema intelligente per risolvere questo problema. Ho usato l'Intelligenza Artificiale (Gemini AI). 
              Il mio programma fa tre cose importanti:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-3 font-medium text-green-900">
              <li>Prende la email (come prendere il numero per la fila).</li>
              <li>L'Intelligenza Artificiale legge il documento subito. Niente frasi come <em>"Manca la fotocopia!"</em>.</li>
              <li>Scrive le informazioni corrette nel computer centrale dell'azienda.</li>
            </ul>
          </div>

          <div className="mt-10 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
            <p className="font-bold text-orange-800 text-xl text-center">
              Risultato? Tutto è veloce. Nessuno fa la fila. Zero stress. <br/>
              Forse posso vendere questo programma alla Polizia? 😉
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Link href="/" className="mt-12 inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg w-full md:w-auto justify-center">
          ← Torna Indietro (Non serve il passaporto)
        </Link>
        
      </div>
    </main>
  );
}
