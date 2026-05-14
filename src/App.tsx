import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Home, 
  Layers, 
  Menu, 
  MessageSquare, 
  Search, 
  Settings,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import Dashboard from './pages/Dashboard';
import SubjectDetail from './pages/SubjectDetail';
import LessonContent from './pages/LessonContent';
import QuizGame from './pages/QuizGame';
import AIAssistant from './components/AIAssistant';

function NavItem({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        active 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
          : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
      )}
    >
      <Icon size={20} className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-400 group-hover:text-indigo-600")} />
      <span className="font-semibold text-sm">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
        />
      )}
    </Link>
  );
}

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className={cn(
          "fixed top-0 left-0 bottom-0 w-72 bg-slate-50 border-r border-slate-200 z-50 transition-transform lg:translate-x-0 overflow-y-auto"
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
              EduPort<span className="text-indigo-600">al</span>
            </h1>
            <button onClick={onClose} className="ml-auto lg:hidden p-2 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Principal</p>
            <NavItem to="/" icon={Home} label="Início" active={location.pathname === "/"} />
            <NavItem to="/subjects" icon={Layers} label="Matérias" active={location.pathname.startsWith("/subjects")} />
            <NavItem to="/lessons" icon={BookOpen} label="Minhas Lições" active={location.pathname.startsWith("/lessons")} />
            <NavItem to="/games" icon={Gamepad2} label="Jogos" active={location.pathname.startsWith("/games")} />
            
            <div className="my-6 border-t border-slate-100" />
            
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Suporte</p>
            <NavItem to="/tutor" icon={MessageSquare} label="Tutor IA" active={location.pathname === "/tutor"} />
            <NavItem to="/settings" icon={Settings} label="Configurações" />
          </nav>

          <div className="mt-auto pt-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-2xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest mb-1">Dica do Dia</p>
                <p className="text-sm font-medium leading-relaxed">
                  "O conhecimento é a única coisa que ninguém pode tirar de você."
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar lições ou temas..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-sm font-bold text-slate-800">José Augusto</span>
              <span className="text-xs text-slate-500">Nível 12 • 2.450 XP</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 p-0.5 border-2 border-white shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=student`} 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
      
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Dashboard />} />
          <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
          <Route path="/lessons/:lessonId" element={<LessonContent />} />
          <Route path="/games/:subjectId" element={<QuizGame />} />
          <Route path="/tutor" element={<div>Tutor IA em breve...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
