import { motion } from 'motion/react';
import { SUBJECTS } from '../data/lessons';
import { ArrowRight, Star, Clock, Trophy, GraduationCap, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2"
        >
          Olá, José Augusto! 👋
        </motion.h2>
        <p className="text-slate-500 font-medium">Continue de onde você parou ou explore novas matérias.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Lições Completas', value: '24', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Minutos Estudados', value: '120', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Pontuação Total', value: '2.450', icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Streak Atual', value: '5 dias', icon: Star, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", stat.bg)}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-extrabold text-slate-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Suas Matérias</h3>
          <Link to="/subjects" className="text-sm font-bold text-indigo-600 hover:underline">Ver todas</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/subjects/${subject.id}`}>
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-50 transition-all">
                  <div className={cn("w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg", subject.color)}>
                    <subject.icon size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2 truncate">{subject.name}</h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      12 Lições
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professor's Insight Section */}
      <section className="mt-16">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 p-1 rotate-3 flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                <GraduationCap size={64} className="text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-500 text-[10px] font-black px-2 py-1 rounded">INSIGHT DO PROFESSOR</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" className="text-amber-400" />)}
                </div>
              </div>
              <h3 className="text-3xl font-extrabold mb-4 tracking-tight leading-tight">
                Como dominar a Física em semanas?
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-2xl">
                "Não decore fórmulas. Entenda os conceitos por trás delas. A Física é a linguagem do universo, se você aprender a gramática, as frases (fórmulas) virão naturalmente."
              </p>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2">
                Ler Artigo Completo
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Atom size={200} />
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
        </div>
      </section>
    </div>
  );
}
