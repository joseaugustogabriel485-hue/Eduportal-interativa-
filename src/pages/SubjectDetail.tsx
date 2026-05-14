import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SUBJECTS, LESSONS } from '../data/lessons';
import { Play, CheckCircle2, ChevronRight, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const subjectLessons = LESSONS[subjectId as keyof typeof LESSONS] || [];

  if (!subject) return <div>Matéria não encontrada.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-sm font-bold text-slate-400 hover:text-indigo-600 mb-6 inline-flex items-center gap-2">
        <ChevronRight size={16} className="rotate-180" />
        Voltar para o Dashboard
      </Link>

      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-100", subject.color)}>
            <subject.icon size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">{subject.name}</h2>
            <p className="text-slate-500 font-medium">{subject.description}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center gap-2">
            Lições Disponíveis
            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{subjectLessons.length}</span>
          </h3>
          
          <div className="space-y-4">
            {subjectLessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/lessons/${lesson.id}`}>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:border-indigo-200 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Play size={20} fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                          lesson.level === 'Fundamental' ? "bg-emerald-50 text-emerald-600" : "bg-purple-50 text-purple-600"
                        )}>
                          Ensino {lesson.level}
                        </span>
                        <h4 className="text-base font-bold text-slate-800">{lesson.title}</h4>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1">{lesson.description}</p>
                    </div>
                    <CheckCircle2 size={24} className="text-slate-100 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Gamepad2 size={20} className="text-indigo-600" />
              Jogos Educativos
            </h3>
            <p className="text-sm text-slate-500 mb-6">Pratique o que você aprendeu com desafios interativos.</p>
            <Link to={`/games/${subjectId}`}>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all">
                Jogar Agora
              </button>
            </Link>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Seu Progresso</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-widest">Matéria</span>
                    <span>35%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '35%' }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  Você está indo bem! Continue assim para desbloquear o próximo nível.
                </p>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
