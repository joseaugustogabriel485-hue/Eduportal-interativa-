import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { LESSONS } from '../data/lessons';
import { ChevronLeft, Share2, Bookmark, CheckCircle } from 'lucide-react';

export default function LessonContent() {
  const { lessonId } = useParams<{ lessonId: string }>();
  
  // Find lesson in memory
  let lessonData = null;
  for (const subjectId in LESSONS) {
    const found = LESSONS[subjectId as keyof typeof LESSONS].find(l => l.id === lessonId);
    if (found) {
      lessonData = found;
      break;
    }
  }

  if (!lessonData) return <div>Lição não encontrada.</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link to={`/subjects`} className="text-sm font-bold text-slate-400 hover:text-indigo-600 inline-flex items-center gap-2">
          <ChevronLeft size={16} />
          Voltar
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
      >
        <header className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4 block">
            Ensino {lessonData.level}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6">
            {lessonData.title}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {lessonData.description}
          </p>
        </header>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-indigo-600 prose-img:rounded-3xl">
          <ReactMarkdown>{lessonData.content}</ReactMarkdown>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
          <h4 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Concluiu esta lição?</h4>
          <button className="group relative flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-xl shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all active:translate-y-0">
            <CheckCircle size={24} className="transition-transform group-hover:scale-110" />
            Marcar como Concluída
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:animate-ping pointer-events-none" />
          </button>
          <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
            + 150 EXP • + 10 MOEDAS
          </p>
        </footer>
      </motion.article>

      <div className="mt-12">
        <h4 className="text-xl font-extrabold text-slate-800 mb-6 tracking-tight">Recursos Relacionados</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-lg group-hover:bg-orange-500 group-hover:text-white transition-all">
              PDF
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Guia de Estudo</p>
              <p className="text-xs text-slate-400 font-medium">Resumo em PDF para baixar</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg group-hover:bg-blue-500 group-hover:text-white transition-all">
              VID
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Videoaula</p>
              <p className="text-xs text-slate-400 font-medium">Explicação detalhada em vídeo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
