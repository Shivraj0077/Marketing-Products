'use client';

import Link from 'next/link';
import { 
  Sparkles, ArrowRight, Bot, Target, ShieldCheck, 
  Zap, BarChart3, MessageSquare, Camera, Brain,
  ChevronRight, Globe, PlayCircle, Star, TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#5E6AD2]/10 selection:text-[#5E6AD2]">
      
      {/* 1. ULTRA-CLEAN NAV */}
      <nav className="h-20 px-8 md:px-20 flex items-center justify-between border-b border-[#E2E8F0]/60 sticky top-0 bg-white/70 backdrop-blur-md z-50 transition-all">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-[#5E6AD2] flex items-center justify-center shadow-premium group-hover:rotate-12 transition-transform duration-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-[#0F172A]">InstaMarketer.ai</span>
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {['Features', 'Intelligence', 'Network', 'Pricing'].map(item => (
            <Link key={item} href="#" className="text-sm font-bold text-[#475569] hover:text-[#0F172A] transition-colors uppercase tracking-widest">{item}</Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden sm:block text-sm font-bold text-[#0F172A] hover:opacity-70 transition-opacity">Login</Link>
          <Link href="/signup" className="btn-primary h-11 px-8 text-xs font-black uppercase tracking-widest shadow-lifted">
            Start Free <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </nav>

      {/* 2. HERO: BILLION DOLLAR LEVEL AESTHETIC */}
      <header className="relative pt-32 pb-60 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5E6AD2]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#38BDF8]/5 blur-[120px] rounded-full animate-pulse delay-700" />
        
        <div className="container mx-auto px-8 md:px-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm mb-10 group cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.25em]">V3 Autonomous Marketing Core</span>
            <ChevronRight className="w-3 h-3 text-[#CBD5E1] group-hover:translate-x-1 transition-transform" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] text-[#0F172A] max-w-5xl mx-auto">
            Marketing at the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E6AD2] via-[#38BDF8] to-[#5E6AD2] animate-gradient-x">Speed of thought.</span>
          </h1>

          <p className="mt-10 text-xl md:text-2xl text-[#475569] max-w-2xl mx-auto font-medium leading-relaxed">
            The world's first autonomous marketing command center. <br className="hidden md:block" /> 
            Strategy, Content, and Negotiation, all driven by Llama 3.1 Intel.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup" className="btn-primary h-16 px-12 text-sm font-black uppercase tracking-widest shadow-lifted rounded-[18px]">
              Deploy Intelligence Now <Zap className="w-5 h-5 ml-3" />
            </Link>
            <button className="btn-secondary h-16 px-12 text-sm font-black uppercase tracking-widest rounded-[18px]">
              <PlayCircle className="w-5 h-5 mr-3" /> Watch Demo
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-[11px] font-black text-[#CBD5E1] uppercase tracking-[0.3em]">
             <span className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.9/5 RATING</span>
             <span className="w-1 h-1 bg-[#E2E8F0] rounded-full" />
             <span>TRUSTED BY 2,500+ BRANDS</span>
          </div>
        </div>

        {/* HERO UI PREVIEW - "THE MONEY SHOT" */}
        <div className="mt-28 px-8 md:px-20 relative max-w-7xl mx-auto">
           <div className="relative group p-2 bg-gradient-to-br from-[#E2E8F0] via-white to-[#E2E8F0] rounded-[40px] shadow-lifted transition-all duration-700">
              <div className="bg-white rounded-[32px] overflow-hidden border border-[#E2E8F0] relative">
                 {/* Internal UI Mockup */}
                 <div className="aspect-video bg-[#F8FAFC] relative flex">
                    <aside className="w-56 border-r border-[#E2E8F0] p-8 space-y-10 bg-white/50 backdrop-blur-md">
                       <div className="w-10 h-10 rounded-xl bg-[#5E6AD2] shadow-premium" />
                       <div className="space-y-6">
                          {[1,2,3,4].map(i => (
                             <div key={i} className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded bg-[#E2E8F0]" />
                                <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full" />
                             </div>
                          ))}
                       </div>
                    </aside>
                    <main className="flex-1 p-12 space-y-10">
                       <div className="flex justify-between items-center">
                          <div className="space-y-2">
                             <div className="h-4 w-48 bg-[#0F172A] rounded-full" />
                             <div className="h-2 w-32 bg-[#CBD5E1] rounded-full" />
                          </div>
                          <div className="flex gap-2">
                             <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]" />
                             <div className="w-8 h-8 rounded-full bg-[#38BDF8] shadow-sm" />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-3 gap-8">
                          {[
                            { label: 'Conversion', val: '+24%', color: 'text-emerald-500' },
                            { label: 'Reach', val: '1.2M', color: 'text-[#5E6AD2]' },
                            { label: 'CPA', val: '$0.42', color: 'text-sky-500' }
                          ].map((item, i) => (
                            <div key={i} className="p-6 bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm space-y-3">
                               <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">{item.label}</p>
                               <p className={cn("text-2xl font-bold tracking-tighter", item.color)}>{item.val}</p>
                            </div>
                          ))}
                       </div>
                       
                       <div className="h-64 bg-white border border-[#E2E8F0] rounded-[24px] shadow-premium relative overflow-hidden p-8">
                          <div className="flex justify-between items-center mb-8">
                             <div className="h-3 w-40 bg-[#0F172A] rounded-full" />
                             <div className="flex gap-4">
                                <div className="h-2 w-12 bg-[#F1F5F9] rounded-full" />
                                <div className="h-2 w-12 bg-[#F1F5F9] rounded-full" />
                             </div>
                          </div>
                          <div className="flex items-end gap-3 h-32">
                             {[30, 45, 35, 60, 85, 40, 75, 55, 90, 65].map((h, i) => (
                                <div key={i} className="flex-1 bg-[#F8FAFC] rounded-t-lg relative">
                                   <div className="absolute bottom-0 inset-x-0 bg-[#5E6AD2] rounded-t-lg opacity-80" style={{ height: `${h}%` }} />
                                </div>
                             ))}
                          </div>
                       </div>
                    </main>
                 </div>
              </div>
              
              {/* Floating Intelligence Widgets */}
              <div className="absolute top-[-30px] right-[-30px] p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-bounce-slow">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-500" /></div>
                   <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Growth Vector</span>
                 </div>
                 <p className="text-xl font-bold text-[#0F172A] tracking-tighter">ROI: 248%</p>
              </div>

              <div className="absolute bottom-[20px] left-[-30px] p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-bounce-slow delay-500">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/5 border border-[#5E6AD2]/10 flex items-center justify-center"><Bot className="w-4 h-4 text-[#5E6AD2]" /></div>
                   <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Autonomous Sync</span>
                 </div>
                 <p className="text-sm font-bold text-[#0F172A]">Deal closed at $450/Unit</p>
              </div>
           </div>
        </div>
      </header>

      {/* 3. BENTO GRID FEATURES */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-8 md:px-20">
          <div className="mb-24 space-y-4">
             <span className="text-[11px] font-black text-[#5E6AD2] uppercase tracking-[0.4em]">Core Technology</span>
             <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#0F172A] leading-[1.1]">Everything you need to <br /> dominate your market.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Strategy Card */}
            <div className="md:col-span-8 group relative overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] rounded-[40px] p-16 transition-all hover:bg-white hover:shadow-premium">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
                  <div className="space-y-8">
                     <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#5E6AD2] shadow-sm"><Brain className="w-7 h-7" /></div>
                        <span className="px-2 py-1 text-[9px] bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 font-bold tracking-wide">
                          AI GENERATED
                        </span>
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#0F172A] tracking-tight">Intelligence Core</h3>
                        <p className="text-lg text-[#475569] font-medium leading-relaxed">Map your market DNA with Llama 3.1. Generate SWOT quadrants, competitive maps, and validated roadmaps in seconds.</p>
                     </div>
                     <div className="flex gap-6 pt-4">
                        <div className="flex flex-col">
                           <span className="text-2xl font-bold text-[#0F172A]">90-Day</span>
                           <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mt-1">Roadmaps</span>
                        </div>
                        <div className="w-px h-10 bg-[#E2E8F0]" />
                        <div className="flex flex-col">
                           <span className="text-2xl font-bold text-[#0F172A]">Instant</span>
                           <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mt-1">SWOT Audit</span>
                        </div>
                     </div>
                  </div>
                  <div className="relative h-full min-h-[300px] bg-white rounded-[32px] border border-[#E2E8F0] shadow-sm overflow-hidden p-8 backdrop-blur-[40px]">
                     <div className="absolute inset-x-0 top-1/2 h-px bg-[#E2E8F0]/60" />
                     <div className="absolute inset-y-0 left-1/2 w-px bg-[#E2E8F0]/60" />
                     <div className="grid grid-cols-2 grid-rows-2 h-full gap-4 relative z-10">
                        {['Strengths', 'Weaknesses', 'Threats', 'Opportunities'].map(label => (
                           <div key={label} className="flex flex-col justify-center items-start text-left p-4">
                              <span className="text-[9px] font-black text-[#94A3B8] uppercase tracking-widest mb-2">{label}</span>
                              <div className="space-y-1 text-[10px] text-[#475569]">
                                <div>• {label === 'Strengths' ? 'Strong brand recall' : label === 'Weaknesses' ? 'High acquisition cost' : label === 'Threats' ? 'New market entrants' : 'Market expansion'}</div>
                                <div>• {label === 'Strengths' ? 'High repeat purchase' : label === 'Weaknesses' ? 'Low mobile conv' : label === 'Threats' ? 'Platform policy shift' : 'Influencer scale'}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-[#5E6AD2] border-4 border-white shadow-premium flex items-center justify-center z-20">
                        <Sparkles className="w-5 h-5 text-white" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Negotiation Card */}
            <div className="md:col-span-4 group relative overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] rounded-[40px] p-12 transition-all hover:bg-white hover:shadow-premium flex flex-col justify-between h-auto gap-12">
               <div className="space-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-sky-500 shadow-sm"><MessageSquare className="w-7 h-7" /></div>
                  <div className="space-y-4">
                     <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">Negotiation Lab</h3>
                     <p className="text-base text-[#475569] font-medium leading-relaxed">Deploy AI agents to simulate and execute influencer deals on your behalf.</p>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-sm">
                     <div className="flex justify-between text-sm font-semibold">
                        <span className="text-[#0F172A]/80">Suggested Deal</span>
                        <span className="text-sky-600">₹7,500</span>
                     </div>
                     <div className="mt-2 h-1 bg-[#F1F5F9] rounded">
                        <div className="h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded" style={{ width: "72%" }} />
                     </div>
                  </div>

                  <div className="space-y-3">
                     {[1, 2].map(i => (
                        <div key={i} className="space-y-1">
                           <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#F1F5F9]" />
                              <div className="h-1.5 w-16 bg-[#E2E8F0] rounded-full" />
                           </div>
                           <div className="flex items-center justify-between text-[10px] text-[#64748B] ml-8">
                              <span>Offer: ₹{i === 1 ? '8,000' : '7,200'}</span>
                              <span className="text-emerald-600 font-bold">Accepted: {i === 1 ? '72%' : '88%'}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Content Card */}
            <div className="md:col-span-4 group relative overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] rounded-[40px] p-12 transition-all hover:bg-white hover:shadow-premium flex flex-col justify-between h-auto gap-12">
               <div className="space-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-emerald-500 shadow-sm"><Camera className="w-7 h-7" /></div>
                  <div className="space-y-4">
                     <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">Social Studio</h3>
                     <p className="text-base text-[#475569] font-medium leading-relaxed">Synthesize ultra high-fidelity visual assets with absolute zero friction.</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="relative p-2 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
                      <div className="text-[10px] text-[#94A3B8] mb-1">Instagram Post</div>
                      <div className={cn("aspect-square rounded-md mb-2", i === 1 ? "bg-gradient-to-br from-violet-500/10 to-cyan-500/10" : "bg-gradient-to-br from-emerald-500/10 to-sky-500/10")} />
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-[#F1F5F9] rounded" />
                        <div className="h-1.5 w-4/5 bg-[#F1F5F9] rounded" />
                      </div>
                      <div className="flex justify-between mt-2 text-[8px] text-[#CBD5E1]">
                        <span>#d2c #growth</span>
                        <span className="text-[#5E6AD2] font-bold">AI Generated</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Analytics Card */}
            <div className="md:col-span-8 group relative overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] rounded-[40px] p-16 transition-all hover:bg-white hover:shadow-premium">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
                  <div className="space-y-8">
                     <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-amber-500 shadow-sm"><BarChart3 className="w-7 h-7" /></div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#0F172A] tracking-tight">Growth Vector</h3>
                        <p className="text-lg text-[#475569] font-medium leading-relaxed">Absolute transparency into ROI, ROAS, and conversion metrics in real-time.</p>
                     </div>
                     <div className="flex gap-10">
                        <div className="flex flex-col">
                           <span className="text-3xl font-bold text-emerald-500">2.4x</span>
                           <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mt-1">Avg ROAS</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-3xl font-bold text-[#5E6AD2]">89%</span>
                           <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mt-1">Conversion</span>
                        </div>
                     </div>
                     <p className="text-sm text-[#64748B] mt-4 max-w-xs">
                        AI detected 3x improvement after influencer campaign optimization.
                     </p>
                  </div>
                  <div className="flex flex-col justify-end gap-3 h-full">
                     <div className="flex items-end gap-3 h-48">
                        {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                          <div key={i} className="group/bar flex-1 bg-[#F1F5F9] transition-all rounded-[12px] relative overflow-hidden h-full hover:bg-white cursor-pointer border border-[#E2E8F0]">
                             <div className="absolute bottom-0 inset-x-0 bg-[#5E6AD2] rounded-t-[12px] transition-all duration-1000" style={{ height: `${h}%` }} />
                             {/* Hover Tooltip */}
                             <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-[10px] bg-[#0F172A] text-white px-2 py-1 rounded shadow-premium opacity-0 group-hover/bar:opacity-100 transition whitespace-nowrap z-30">
                                {20 + i * 4}% ↑ CTR
                             </div>
                          </div>
                        ))}
                     </div>
                     <div className="flex justify-between px-2 text-[10px] text-[#94A3B8] mt-3 font-black uppercase tracking-widest">
                        <span>Week 1</span>
                        <span>Week 12</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER (Minimalist Premium) */}
      <footer className="py-40 bg-white px-8 md:px-20 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-8 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5E6AD2] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-[#0F172A]">InstaMarketer</span>
            </div>
            <p className="text-base text-[#64748B] font-medium leading-relaxed">Building the future of autonomous commerce for modern founders and digital-first brands.</p>
            <div className="flex gap-6 mt-10">
               {['𝕏', 'In', 'Ig'].map(social => <span key={social} className="text-sm font-black text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors uppercase tracking-widest">{social}</span>)}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-24">
             <FooterCol title="System" items={['Dashboard', 'Strategy', 'Content', 'Negotiate']} />
             <FooterCol title="Intelligence" items={['Llama 3.1', 'Apify Cloud', 'Image Engine', 'API Access']} />
             <FooterCol title="Legal" items={['Terms', 'Security', 'GDPR', 'Trust']} />
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-xs font-black text-[#94A3B8] uppercase tracking-[0.2em]">© 2026 INSTA_MARKETER SOLUTIONS INC. ALL RIGHTS RESERVED.</p>
           <div className="flex items-center gap-1.5 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black text-[#0F172A] tracking-widest">ENTERPRISE SECURE LEVEL 3</span>
           </div>
        </div>
      </footer>

      {/* Global CSS Inject */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

function FooterCol({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="space-y-8">
       <p className="text-[10px] font-black text-[#0F172A] uppercase tracking-[0.3em]">{title}</p>
       <ul className="space-y-4">
          {items.map(item => (
            <li key={item}><Link href="#" className="text-sm font-bold text-[#64748B] hover:text-[#5E6AD2] transition-colors">{item}</Link></li>
          ))}
       </ul>
    </div>
  );
}
