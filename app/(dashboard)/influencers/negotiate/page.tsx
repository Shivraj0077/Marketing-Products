'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  MessageSquare, Loader2, Bot, Send, 
  ShieldCheck, Target, Sparkles, 
  ChevronLeft, ArrowRight, User, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NegotiatePage() {
  const [setup, setSetup] = useState({
    influencerName: '',
    followers: 50000,
    niche: 'Fashion/Lifestyle',
    ourBudget: 500,
    campaignGoal: '1 Reel + 2 Stories'
  });

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [simActive, setSimActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const startSim = async () => {
    if (!setup.influencerName || !setup.ourBudget) return toast.error('Configure setup first');
    setSimActive(true);
    setHistory([]);
    await proceedSim(null); 
  };

  const proceedSim = async (nextUserMessage: string | null) => {
    setLoading(true);
    try {
      const payloadHistory = [...history];
      if (nextUserMessage) {
        payloadHistory.push({ role: 'user', content: nextUserMessage });
        setHistory(payloadHistory);
      }
      setUserMsg('');

      const res = await fetch('/api/groq/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...setup, history: payloadHistory })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Simulation failed');
      
      const data = json.data;
      setHistory(prev => [...prev, { role: 'ai', content: data.reply, ...data }]);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const lastMsg = history.length > 0 ? history[history.length - 1] : null;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#FFFFFF] overflow-hidden">
      
      {/* 1. COLUMN: INFLUENCER BIO */}
      <aside className="w-80 bg-white border-r border-[#E2E8F0] flex flex-col p-8 space-y-10 group">
        <div className="space-y-4">
           <button className="flex items-center gap-2 text-[11px] font-black text-[#64748B] hover:text-[#0F172A] uppercase tracking-wider transition-colors" onClick={() => setSimActive(false)}>
              <ChevronLeft className="w-3.5 h-3.5" /> Back to discovery
           </button>
           <h1 className="text-lg font-bold text-[#0F172A] tracking-tight">Deal Strategy</h1>
        </div>

        {!simActive ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-500">
             <div className="space-y-4">
                <div className="space-y-2">
                   <p className="label-meta">Handle</p>
                   <input 
                     placeholder="@username" 
                     className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] focus:ring-1 focus:ring-[#5E6AD2]/20 focus:border-[#5E6AD2]"
                     value={setup.influencerName}
                     onChange={e => setSetup({...setup, influencerName: e.target.value})}
                   />
                </div>
                <div className="space-y-2">
                   <p className="label-meta">Primary Budget</p>
                   <input 
                     type="number"
                     className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] focus:ring-1 focus:ring-[#5E6AD2]/20 focus:border-[#5E6AD2]"
                     value={setup.ourBudget}
                     onChange={e => setSetup({...setup, ourBudget: parseInt(e.target.value)})}
                   />
                </div>
             </div>
             <button onClick={startSim} className="btn-primary w-full h-11 text-xs">
                Initialize Sim <Sparkles className="w-3.5 h-3.5 ml-2" />
             </button>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full border-2 border-[#5E6AD2]/30 p-1 shadow-sm">
                   <div className="w-full h-full rounded-full bg-[#F1F5F9] flex items-center justify-center text-2xl font-black text-[#0F172A]">
                      {setup.influencerName.charAt(1).toUpperCase()}
                   </div>
                </div>
                <div>
                   <p className="text-base font-bold text-[#0F172A]">{setup.influencerName}</p>
                   <p className="text-xs text-[#64748B] font-medium">{setup.followers.toLocaleString()} Followers</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex justify-between items-center text-[11px] font-black text-[#64748B] uppercase tracking-widest">
                   <span>Parity Vector</span>
                   <span className="text-emerald-600">Optimal</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 shadow-sm">
                      <p className="label-meta opacity-60">Offered</p>
                      <p className="text-sm font-bold text-[#0F172A]">${lastMsg?.offered_price || '0'}</p>
                   </div>
                   <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 shadow-sm">
                      <p className="label-meta opacity-60">Mood</p>
                      <p className="text-sm font-bold text-[#38BDF8] uppercase">{lastMsg?.internal_sentiment || 'Neutral'}</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </aside>

      {/* 2. COLUMN: CHAT THREAD */}
      <main className="flex-1 flex flex-col relative bg-[#F1F5F9]/30">
         <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-8 scroll-smooth scrollbar-hide pb-40">
           {!simActive ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-6">
                 <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#94A3B8]" />
                 </div>
                 <p className="text-sm font-bold text-[#64748B]">Configure deal parameters to launch</p>
              </div>
           ) : (
              <div className="max-w-2xl mx-auto space-y-10">
                 {/* Influencer Initial */}
                 <div className="flex justify-start">
                    <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl px-6 py-4 max-w-[420px] text-[13px] leading-relaxed text-[#0F172A] font-medium">
                       Hi! Thanks for reaching out. I'm definitely interested in collaborating with you. Usually for 1 Reel and 2 Stories my standard rate is $1,200. What's the budget you have in mind for this campaign?
                    </div>
                 </div>

                 {history.map((msg, i) => (
                    <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                       <div className={cn("rounded-2xl px-6 py-4 max-w-[420px] text-[13px] leading-relaxed font-medium shadow-sm", 
                         msg.role === 'user' 
                           ? "bg-[#5E6AD2] text-white" 
                           : "bg-white border border-[#E2E8F0] text-[#0F172A]")}>
                          {msg.content}
                       </div>
                    </div>
                 ))}

                 {loading && (
                    <div className="flex justify-start animate-pulse">
                       <div className="bg-white border border-[#E2E8F0] rounded-2xl px-8 py-3 text-xs font-bold text-[#94A3B8]">
                          Typing...
                       </div>
                    </div>
                 )}
              </div>
           )}
         </div>

         {/* Floating Active Dock */}
         <div className="absolute bottom-10 left-12 right-12">
            <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-2 flex items-center gap-2 shadow-lifted focus-within:border-[#5E6AD2]/50 transition-colors">
               <input 
                 disabled={!simActive || loading || (lastMsg?.deal_reached)}
                 placeholder="Message influencer..." 
                 className="flex-1 bg-transparent border-none text-sm text-[#0F172A] font-medium px-4 py-2 focus:ring-0 placeholder:text-[#94A3B8]"
                 value={userMsg}
                 onChange={e => setUserMsg(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && userMsg && proceedSim(userMsg)}
               />
               <button 
                 disabled={!simActive || loading || !userMsg || (lastMsg?.deal_reached)}
                 onClick={() => proceedSim(userMsg)}
                 className="w-10 h-10 bg-[#5E6AD2] hover:bg-[#4C58B8] rounded-xl flex items-center justify-center transition-all disabled:opacity-30 shadow-sm"
               >
                 <Send className="w-4 h-4 text-white" />
               </button>
            </div>
         </div>
      </main>

      {/* 3. COLUMN: AI COPILOT */}
      <aside className="w-80 bg-white border-l border-[#E2E8F0] flex flex-col p-8 space-y-10 group shadow-sm">
         <div className="space-y-4">
            <div className="flex items-center gap-2">
               <Bot className="w-4 h-4 text-[#38BDF8]" />
               <span className="label-meta text-[#38BDF8]">Strategist Lab</span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Copilot Intelligence</h3>
         </div>

         {simActive ? (
            <div className="space-y-8 animate-in fade-in duration-500">
               {lastMsg?.suggested_counter ? (
                  <div className="space-y-6">
                     <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#38BDF8]/10 text-[12px] leading-relaxed text-[#0F172A] font-bold italic shadow-sm">
                        "{lastMsg.suggested_counter}"
                     </div>
                     <div className="space-y-3">
                        <p className="label-meta tracking-widest text-center opacity-40">Confidence Meter</p>
                        <div className="confidence-pill px-8">
                           {[1, 2, 3, 4, 5].map(s => <div key={s} className={cn("confidence-segment", s <= 4 && "active")} />)}
                        </div>
                     </div>
                     <button 
                       className="w-full btn-secondary h-11 text-xs border-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#F8FAFC] font-bold"
                       onClick={() => setUserMsg(lastMsg.suggested_counter)}
                     >
                        Deploy Script <ArrowRight className="w-3.5 h-3.5 ml-2" />
                     </button>
                  </div>
               ) : (
                  <div className="pt-20 flex flex-col items-center text-center space-y-4 opacity-30">
                     <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#94A3B8]" />
                     </div>
                     <p className="text-xs font-bold text-[#64748B]">Monitoring channel...</p>
                  </div>
               )}
            </div>
         ) : (
            <div className="h-full flex items-center justify-center opacity-10">
               <Bot className="w-12 h-12 text-[#94A3B8]" />
            </div>
         )}
      </aside>
    </div>
  );
}
