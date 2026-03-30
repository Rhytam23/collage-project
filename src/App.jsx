import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Share2, 
  Database, 
  Settings, 
  Zap, 
  CircleCheck, 
  Play, 
  Lock, 
  Bell, 
  ArrowRight,
  Cpu,
  Brain
} from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen bg-[#F0F2F5] text-[#1A1C21] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[280px] min-w-[280px] bg-[#0F1116] text-white flex flex-col p-8 shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <Cpu size={26} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Neural</h2>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Rank: Elite</p>
          </div>
        </div>

        <nav className="flex-grow space-y-3">
          {[
            { id: 'overview', icon: <LayoutDashboard size={22} />, label: 'OVERVIEW', active: true },
            { id: 'links', icon: <Share2 size={22} />, label: 'NEURAL LINKS' },
            { id: 'kb', icon: <Database size={22} />, label: 'KNOWLEDGE BASE' },
            { id: 'settings', icon: <Settings size={22} />, label: 'SETTINGS' },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[11px] tracking-widest transition-all ${
                item.active 
                ? 'bg-indigo-600/10 text-indigo-400 border-r-4 border-indigo-600' 
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-5 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] font-black tracking-widest text-[#5D6069] uppercase mb-2">SYSTEM LOAD</p>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-indigo-500 rounded-full" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col relative overflow-hidden bg-[#F8F9FB]">
        
        {/* TOP NAVBAR */}
        <header className="h-[85px] bg-white border-b border-slate-200 flex items-center justify-between px-10 z-10 shrink-0">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-black tracking-tighter text-indigo-600">Level Up AI</h1>
            <nav className="flex items-center gap-10">
              {['Dashboard', 'Cognitive Path', 'Leaderboard', 'Arena'].map((tab, i) => (
                <button key={tab} className={`text-[13px] font-extrabold tracking-tight transition-colors py-8 ${i === 0 ? 'text-[#1A1C21] border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end mr-3">
              <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] mb-1">LEVEL 5</span>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.3)]" />
              </div>
            </div>
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Settings size={20} /></button>
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Bell size={20} /></button>
            <div className="w-11 h-11 rounded-full border-2 border-indigo-500 p-0.5 shadow-lg">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-full bg-white shadow-inner" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-grow p-10 overflow-y-auto">
          <div className="grid grid-cols-12 gap-10 max-w-[1400px] mx-auto">
            
            {/* LEFT COLUMN */}
            <div className="col-span-8 flex flex-col gap-10">
              
              {/* LEARNING MOMENTUM CARD */}
              <section className="bg-[#2D2F36] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-12 right-12 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:rotate-12 transition-transform duration-500">
                  <Zap size={36} className="text-indigo-400" />
                </div>
                <h3 className="text-[11px] font-black tracking-[0.4em] text-indigo-400 uppercase mb-4">CURRENT FOCUS</h3>
                <h2 className="text-5xl font-black tracking-tight mb-12 leading-tight">Learning Momentum</h2>
                
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: 'DAILY STREAK', val: '14', unit: 'DAYS' },
                    { label: 'CONCEPTS', val: '84', unit: 'NEW' },
                    { label: 'EFFICIENCY', val: '92', unit: '%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-black/20 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{stat.label}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-black">{stat.val}</span>
                        <span className="text-[10px] font-black text-slate-500">{stat.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* COGNITIVE PATH CARD */}
              <section className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-indigo-50 flex items-center justify-center rounded-2xl text-indigo-600 font-black text-3xl shadow-sm italic">Σ</div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-[#1A1C21]">Cognitive Path: Mathematics</h3>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Neural Synthesis Stage 4</p>
                    </div>
                  </div>
                  <button className="text-[11px] font-black text-indigo-600 tracking-widest uppercase hover:underline">VIEW ALL NODES</button>
                </div>

                <div className="space-y-4">
                  {[
                    { id: '01', title: 'Advanced Calculus Optimization', time: 'Completed 4 hours ago • +450 XP', status: 'done' },
                    { id: '02', title: 'Neural Network Weight Functions', time: 'CURRENT OBJECTIVE', status: 'active' },
                    { id: '03', title: 'Quantum Probability Theory', time: 'Locked: Requires Level 6', status: 'locked' },
                  ].map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 ${
                      item.status === 'active' ? 'bg-[#2D2F36] text-white border-transparent shadow-xl scale-[1.02]' : 
                      item.status === 'locked' ? 'bg-slate-50/50 text-slate-300 border-slate-100 opacity-60' : 
                      'bg-slate-50 text-[#1A1C21] border-slate-200 hover:border-indigo-200 cursor-pointer'
                    }`}>
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 flex items-center justify-center rounded-[1.25rem] font-black border text-sm ${
                          item.status === 'active' ? 'bg-indigo-600 border-transparent shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 
                          item.status === 'locked' ? 'bg-slate-100 border-slate-200 text-slate-200' : 
                          'bg-white border-slate-200'
                        }`}>
                          {item.status === 'active' ? <Play size={20} fill="currentColor" /> : 
                           item.status === 'locked' ? <Lock size={20} /> : 
                           item.id}
                        </div>
                        <div>
                          <h4 className="text-base font-black tracking-tight uppercase leading-none mb-1.5">{item.title}</h4>
                          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                            item.status === 'active' ? 'text-indigo-400' : 'text-slate-400'
                          }`}>{item.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {item.status === 'done' && <CircleCheck className="text-pink-500" size={24} />}
                        {item.status === 'active' && (
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest leading-none mb-1">BOOST ACTIVE</span>
                            <span className="text-[10px] font-bold italic opacity-60">2.5x MULTIPLIER</span>
                          </div>
                        )}
                        {item.status !== 'locked' && <ArrowRight size={20} className={item.status === 'active' ? 'text-white/20' : 'text-slate-200'} />}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-4 flex flex-col gap-10">
              <section className="bg-[#5D6069] rounded-[3rem] p-10 text-white shadow-2xl flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black tracking-tight">Leaderboard</h3>
                  <span className="text-[10px] font-black bg-black/40 px-3 py-1.5 rounded-lg uppercase tracking-widest italic">GLOBAL</span>
                </div>

                <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { rank: 1, name: 'Neural_Entity_01', xp: '24.8K', role: 'Architect', color: 'border-yellow-400' },
                    { rank: 2, name: 'QuantumLeap', xp: '21.2K', role: 'Pulse', color: 'border-pink-500' },
                    { rank: 3, name: 'Bio_System', xp: '18.5K', role: 'Weaver', color: 'border-indigo-400' },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center justify-between bg-black/20 p-5 rounded-[2rem] border border-white/5 group hover:bg-black/30 transition-all">
                      <div className="flex items-center gap-4 h-full">
                        <div className={`w-12 h-12 rounded-[1.25rem] border-2 p-0.5 relative shrink-0 ${user.color}`}>
                          <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-white/10">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-full h-full object-cover" alt={user.name} />
                          </div>
                          <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-black border-2 border-white flex items-center justify-center text-[10px] font-black">{user.rank}</span>
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-black tracking-wide uppercase truncate group-hover:text-indigo-400 transition-colors">{user.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 truncate">{user.role}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-indigo-400 italic tracking-tighter shrink-0">{user.xp}</span>
                    </div>
                  ))}

                  <div className="pt-8 mt-4 border-t border-white/10 shrink-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">YOUR STANDING</p>
                    <div className="bg-white/10 p-6 rounded-[2.5rem] border-2 border-white/10 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-4 h-full">
                        <div className="w-14 h-14 rounded-[1.25rem] bg-black flex items-center justify-center relative border-2 border-indigo-400 shadow-2xl shrink-0 p-0.5">
                          <div className="w-full h-full rounded-[1.1rem] overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full object-cover" alt="You" />
                          </div>
                          <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-indigo-600 border border-white flex items-center justify-center text-[9px] font-black italic">42</span>
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[13px] font-black tracking-wider text-white truncate">You (User_402)</p>
                          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Top 4% Global</p>
                        </div>
                      </div>
                      <span className="text-sm font-black italic text-white shrink-0">12.4K</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-10 py-5 bg-[#0F1116] rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-white hover:bg-black transition-all border border-white/5 active:scale-[0.98]">
                  ENTER TOURNAMENT HUB
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* INITIALIZE BUTTON */}
        <div className="h-[140px] flex items-center justify-center shrink-0">
           <button className="flex items-center gap-5 px-14 py-7 bg-[#0F1116] text-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all group border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-2.5 bg-white/10 rounded-xl group-hover:rotate-12 transition-transform relative z-10">
                <Brain size={28} className="text-indigo-400" />
              </div>
              <span className="text-2xl font-black tracking-tight uppercase relative z-10">INITIALIZE TEST ARENA</span>
              <ArrowRight size={28} className="text-pink-500 group-hover:translate-x-3 transition-transform relative z-10" />
           </button>
        </div>

        {/* STATUS BAR */}
        <footer className="h-[45px] bg-[#0F1116] flex items-center justify-between px-10 border-t border-white/5 shrink-0 z-20">
          <div className="flex items-center gap-12">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,1)]" />
               <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] italic">NEURAL LINK ONLINE</span>
             </div>
             {[
               { label: 'SYSTEM STATUS', val: 'OPTIMAL' },
               { label: 'ENCRYPTION', val: 'ACTIVE' },
               { label: 'LATENCY', val: '12MS' },
             ].map((item) => (
               <div key={item.label} className="hidden lg:flex gap-2">
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.label}:</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.val}</span>
               </div>
             ))}
          </div>
          <p className="text-[10px] font-black text-slate-600 tracking-[0.3em] uppercase hidden md:block">© 2024 NEURAL SECT ARCHITECTURE</p>
        </footer>

      </main>
    </div>
  );
}
