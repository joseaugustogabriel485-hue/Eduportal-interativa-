import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, GraduationCap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou seu tutor virtual. Como posso te ajudar com seus estudos hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Você é o "Professor Senior Pro", um docente altamente qualificado e profissional. 
          Sua missão é resolver qualquer dúvida acadêmica de Matemática, Física, Química, História e Biologia em segundos. 
          Use um tom formal, autoritário e extremamente eficiente. 
          Ao resolver problemas:
          1. Vá direto ao ponto.
          2. Mostre a lógica matemática ou científica de forma impecável.
          3. Use formatação clara para fórmulas e datas.
          4. Não perca tempo com saudações excessivas; foque na eficácia do ensino.
          Se a pergunta fugir do escopo acadêmico, retorne o aluno imediatamente ao foco dos estudos com autoridade profissional.`
        }
      });

      const aiText = response.text || 'Erro no processamento da consulta lógica.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sistema indisponível. Verifique sua conexão com o servidor acadêmico.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl z-50 cursor-pointer border-2 border-slate-700"
      >
        {isOpen ? <X size={28} /> : <div className="relative"><Bot size={28} /><div className="absolute -top-4 -right-4 bg-indigo-500 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white">PRO</div></div>}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-48px)] h-[650px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col z-50 overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <GraduationCap size={28} className="text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg tracking-tight">Professor Pro</h3>
                    <span className="bg-indigo-500 text-[10px] px-1.5 py-0.5 rounded font-black tracking-tighter">AI AGENT</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Resolvendo em tempo real</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Latência: 0.4s</span>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-indigo-500 rounded-full" />)}
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex items-start gap-3", m.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    m.role === 'assistant' ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-600"
                  )}>
                    {m.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed max-w-[80%]",
                    m.role === 'assistant' 
                      ? "bg-white border border-slate-100 shadow-sm text-slate-800 rounded-tl-none" 
                      : "bg-indigo-600 text-white shadow-md shadow-indigo-100 rounded-tr-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                    <span className="text-sm text-slate-400 font-medium tracking-tight">Pensando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Peça uma explicação..."
                  className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-slate-800 placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-indigo-600 text-white rounded-xl disabled:bg-slate-300 disabled:shadow-none shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 uppercase tracking-widest font-bold">
                Powered by Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
