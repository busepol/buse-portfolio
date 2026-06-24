'use client';
import { useState, useEffect } from 'react';
import { sendFeedback } from '@/app/actions/sendFeedback';

const questionBank = {
  A1: [
    { q: "Scegli il saluto corretto per la mattina:", options: ["Buongiorno", "Buonanotte", "Arrivederci"], answer: "Buongiorno" },
    { q: "Come si dice 'Apple' in italiano?", options: ["Mela", "Pera", "Banana"], answer: "Mela" },
    { q: "Completa: Di dove ___?", options: ["sei", "stai", "fai"], answer: "sei" },
    { q: "Come ___ chiami?", options: ["ti", "mi", "si"], answer: "ti" },
    { q: "Io ___ in Italia da due mesi.", options: ["abito", "abitiamo", "abiti"], answer: "abito" },
    { q: "Il plurale di 'gatto' è ___.", options: ["gatti", "gatta", "gatte"], answer: "gatti" },
    { q: "Scegli l'articolo corretto: ___ cane.", options: ["Il", "Lo", "La"], answer: "Il" },
    { q: "Oggi ___ molto caldo.", options: ["fa", "è", "ha"], answer: "fa" },
    { q: "Io voglio ___ una pizza.", options: ["mangiare", "mangio", "mangiato"], answer: "mangiare" },
    { q: "Che ore ___?", options: ["sono", "è", "fanno"], answer: "sono" }
  ],
  A2: [
    { q: "Completa: Io ___ al cinema ieri sera.", options: ["vado", "sono andato", "andavo"], answer: "sono andato" },
    { q: "Non posso venire alla festa, ___ studiare.", options: ["devo", "voglio", "posso"], answer: "devo" },
    { q: "Il mio computer è ___ del tuo.", options: ["più grande", "molto grande", "il più grande"], answer: "più grande" },
    { q: "Quando ero piccolo, ___ sempre a calcio.", options: ["giocavo", "ho giocato", "gioco"], answer: "giocavo" },
    { q: "Domani vado ___ Roma in treno.", options: ["a", "in", "da"], answer: "a" },
    { q: "Mi piace ___ musica rock.", options: ["la", "il", "di"], answer: "la" },
    { q: "Hai ___ il mio libro di Java?", options: ["visto", "veduto", "vede"], answer: "visto" },
    { q: "Sbrigati, ___ ora di andare!", options: ["È", "Ha", "Fa"], answer: "È" },
    { q: "Il treno per Milano parte ___ 10:00.", options: ["alle", "nelle", "dalle"], answer: "alle" },
    { q: "Scusa, non ___ niente di questa storia.", options: ["so", "conosco", "sacco"], answer: "so" }
  ],
  B1: [
    { q: "Credo che Luigi ___ a casa oggi.", options: ["è", "sia", "sarebbe"], answer: "sia" },
    { q: "Mentre andavo al lavoro, ___ un incidente.", options: ["vedo", "ho visto", "vedevo"], answer: "ho visto" },
    { q: "Ti telefono non appena ___ a Torino.", options: ["arriverò", "arrivo", "sono arrivato"], answer: "arriverò" },
    { q: "___ un caffè macchiato, per favore.", options: ["Vorrei", "Voglio", "Volevo"], answer: "Vorrei" },
    { q: "Hai visto Marco? Sì, ___ ho visto ieri.", options: ["lo", "gli", "il"], answer: "lo" },
    { q: "___ piace molto la torta al cioccolato.", options: ["Mi", "Io", "Me"], answer: "Mi" },
    { q: "Se piove, noi ___ a casa a studiare.", options: ["resteremo", "restiamo", "restassimo"], answer: "resteremo" },
    { q: "Penso che lui ___ ragione sul codice.", options: ["abbia", "ha", "avrebbe"], answer: "abbia" },
    { q: "Prima di ___ , ricordati di salvare il file.", options: ["uscire", "esci", "uscito"], answer: "uscire" },
    { q: "Sono molto stanco ___ lavorare davanti al PC.", options: ["di", "per", "a"], answer: "di" }
  ],
  B2: [
    { q: "Qual è un sinonimo di 'Tuttavia'?", options: ["Inoltre", "Nonostante ciò", "Quindi"], answer: "Nonostante ciò" },
    { q: "Se l'avessi saputo prima, non ___ venuto.", options: ["ero", "sarei", "fossi"], answer: "sarei" },
    { q: "Mi dà fastidio che la gente non ___ in orario.", options: ["arriva", "arrivi", "arrivasse"], answer: "arrivi" },
    { q: "Se io ___ ricco, comprerei un'azienda di software.", options: ["fossi", "sarei", "ero"], answer: "fossi" },
    { q: "Sebbene ___ tardi, ho continuato a programmare.", options: ["fosse", "era", "sarebbe"], answer: "fosse" },
    { q: "È il bug più difficile che io ___ mai risolto.", options: ["abbia", "ho", "avessi"], answer: "abbia" },
    { q: "Gliel'ho spiegato affinché lui lo ___.", options: ["sapesse", "sapeva", "sa"], answer: "sapesse" },
    { q: "Vorrei che tu ___ più attenzione ai dettagli.", options: ["facessi", "fai", "faresti"], answer: "facessi" },
    { q: "___ te, non accetterei quel contratto.", options: ["Fossi in", "Se ero", "Sarei come"], answer: "Fossi in" },
    { q: "Non c'è alcun dubbio che ___ la scelta giusta.", options: ["sia", "è", "sarebbe"], answer: "sia" }
  ],
  C1: [
    { q: "Completa il modo di dire: Piove sul ___.", options: ["bagnato", "tetto", "mondo"], answer: "bagnato" },
    { q: "È necessario che la pratica ___ entro domani.", options: ["viene evasa", "venga evasa", "verrà evasa"], answer: "venga evasa" },
    { q: "Non aveva capito nulla, ___ faceva finta di sì.", options: ["eppure", "affinché", "poiché"], answer: "eppure" },
    { q: "Si ___ che l'azienda stia per fallire.", options: ["mormora", "dice", "parla"], answer: "mormora" },
    { q: "Farò in modo che tutto ___ pronto per il lancio.", options: ["sia", "sarà", "è"], answer: "sia" },
    { q: "È andato via senza che nessuno se ne ___.", options: ["accorgesse", "accorgeva", "è accorto"], answer: "accorgesse" },
    { q: "Completa l'idioma: Essere al ___ (essere senza soldi).", options: ["verde", "rosso", "secco"], answer: "verde" },
    { q: "Qualunque cosa ___, io sarò dalla tua parte.", options: ["succeda", "succede", "succederà"], answer: "succeda" },
    { q: "Ha parlato del progetto ___ averlo studiato a fondo.", options: ["pur non", "anche se non", "nonostante"], answer: "pur non" },
    { q: "Il server è ___ di collassare per il traffico.", options: ["sull'orlo", "al limite", "sul punto"], answer: "sull'orlo" }
  ],
  C2: [
    { q: "Quale frase contiene un anacoluto (errore intenzionale)?", options: ["Io, speriamo che me la cavo.", "Penso che lui sia partito.", "Se potessi, lo farei."], answer: "Io, speriamo che me la cavo." },
    { q: "Completa: A caval donato non si guarda in ___", options: ["bocca", "faccia", "occhi"], answer: "bocca" },
    { q: "Scegli il congiuntivo passivo corretto:", options: ["Credo che la porta è chiusa.", "Penso che la decisione sia stata presa.", "Spero che loro hanno mangiato."], answer: "Penso che la decisione sia stata presa." },
    { q: "___ le cose stiano così, non possiamo procedere.", options: ["Stando", "Essendo", "Visto che"], answer: "Stando" },
    { q: "Si è comportato in modo tale che io mi ___ offeso.", options: ["risentissi", "risentivo", "sono risentito"], answer: "risentissi" },
    { q: "Completa l'idioma: Fare orecchie da ___.", options: ["mercante", "sordo", "elefante"], answer: "mercante" },
    { q: "Che io ___ , non ci sono altre soluzioni al problema.", options: ["sappia", "so", "sapevo"], answer: "sappia" },
    { q: "___ detto questo, passiamo al prossimo argomento.", options: ["Ciò", "Questo", "Quello"], answer: "Ciò" },
    { q: "Qual è un sinonimo del termine letterario 'Lapalissiano'?", options: ["Ovvio", "Complesso", "Antico"], answer: "Ovvio" },
    { q: "Se vi avessi ascoltato, a quest'ora non mi ___ in questo guaio.", options: ["troverei", "trovassi", "trovavo"], answer: "troverei" }
  ]
};

export default function ItalianQuiz() {
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [assignedLevel, setAssignedLevel] = useState('A0');
  const [submitStatus, setSubmitStatus] = useState('idle'); // <-- Add this state

  // Function to generate a fresh 6-question quiz
  const generateNewQuiz = () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    return levels.map(level => {
      const questions = questionBank[level];
      // Pick a random question from the current level's array
      const randomIndex = Math.floor(Math.random() * questions.length);
      return { level, ...questions[randomIndex] };
    });
  };

  // Generate the first quiz when the component loads
  useEffect(() => {
    setCurrentQuiz(generateNewQuiz());
  }, []);

  const handleAnswer = (selected) => {
    const isCorrect = selected === currentQuiz[currentIndex].answer;
    
    if (isCorrect) {
      if (currentIndex === currentQuiz.length - 1) {
        setAssignedLevel('C2 (Sei Praticamente Italiano!)');
        setFinished(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setAssignedLevel(currentIndex === 0 ? 'A0 (Devi studiare...)' : currentQuiz[currentIndex - 1].level);
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrentQuiz(generateNewQuiz()); // Generate totally new questions!
    setCurrentIndex(0);
    setFinished(false);
    setAssignedLevel('A0');
  };

  // Prevent rendering before the random quiz is generated on the client
  if (currentQuiz.length === 0) return null;

  if (finished) {
    return (
      <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl text-center shadow-inner">
        <h3 className="text-xl font-bold text-red-900 mb-2">Test Completato!</h3>
        <p className="text-red-700 mb-4">Il tuo livello calcolato è:</p>
        <div className="text-4xl font-black text-red-600 mb-8">{assignedLevel}</div>
        
        <button 
          onClick={reset} 
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md w-full sm:w-auto mb-10"
        >
          Riprova con nuove domande
        </button>

        {/* --- NEW FEEDBACK SECTION --- */}
        <div className="mt-8 pt-8 border-t border-red-200 text-left">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Hai suggerimenti o lamentele?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Hai trovato un errore grammaticale? Il test è troppo facile? Scrivimi qui sotto (in italiano o in inglese).
          </p>
          
          {/* --- NATIVE NEXT.JS FORM --- */}
          {submitStatus === 'success' ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg border border-green-200 mt-6 font-bold">
              Messaggio inviato con successo! Grazie per il feedback.
            </div>
          ) : (
            <form 
              action={async (formData) => {
                setSubmitStatus('sending');
                const result = await sendFeedback(formData);
                setSubmitStatus(result.success ? 'success' : 'error');
              }}
              className="flex flex-col gap-4 mt-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" name="name" placeholder="Il tuo nome (Opzionale)" className="w-full p-3 rounded-lg border border-red-100 outline-none" />
                <input type="email" name="email" placeholder="La tua email (Opzionale)" className="w-full p-3 rounded-lg border border-red-100 outline-none" />
              </div>
              
              <textarea name="message" required placeholder="Scrivi qui il tuo messaggio..." rows="4" className="w-full p-3 rounded-lg border border-red-100 outline-none resize-none"></textarea>
              
              {submitStatus === 'error' && <p className="text-red-600 text-sm">Errore di rete. Riprova più tardi.</p>}
              
              <button 
                type="submit" 
                disabled={submitStatus === 'sending'}
                className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition shadow-md self-end disabled:opacity-50"
              >
                {submitStatus === 'sending' ? 'Invio in corso...' : 'Invia Feedback'}
              </button>
            </form>
          )}
        </div>

      </div>
    );
  }

  return (
    <div className="p-6 bg-white border-2 border-red-100 rounded-xl shadow-md">
      <div className="flex justify-between text-xs font-bold text-red-400 mb-4 tracking-widest uppercase border-b border-red-50 pb-2">
        <span>Domanda {currentIndex + 1} di 6</span>
        <span>Livello: {currentQuiz[currentIndex].level}</span>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-6 leading-relaxed">
        {currentQuiz[currentIndex].q}
      </h3>
      <div className="flex flex-col gap-3">
        {currentQuiz[currentIndex].options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(opt)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-100 hover:border-red-400 hover:bg-red-50 transition text-gray-800 font-medium"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}