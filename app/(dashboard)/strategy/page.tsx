import { Header } from '@/components/dashboard/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, ArrowRight, Package, Target, Star, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function StrategyPage() {
  const demoStrategies = [
    { title: 'Market DNA Mapping', desc: 'Llama 3.1 core analysis of niche parity and growth vectors.', status: 'Ready', icon: Target, color: 'text-[#38BDF8]' },
    { title: 'Persona Synthesis', desc: 'High-integrity buyer archetypes derived from social sentiment.', status: 'Active', icon: Star, color: 'text-amber-500' },
    { title: 'Tactical Deployment', desc: 'Secure campaign roadmaps with validated budget parity.', status: 'Locked', icon: ShieldCheck, color: 'text-emerald-500' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header title="Strategic Intelligence" subtitle="AI-generated roadmaps for your inventory" />
      <div className="p-10 space-y-12">
        
        {/* Module Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {demoStrategies.map((s, i) => {
              const Icon = s.icon;
              return (
                 <div key={i} className="dashboard-surface p-8 bg-[#F8FAFC] border-[#E2E8F0] space-y-6 hover:bg-white transition-all shadow-sm">
                    <div className="flex justify-between items-start">
                       <div className={`w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm ${s.color}`}>
                          <Icon className="w-6 h-6" />
                       </div>
                       <div className="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[9px] font-black uppercase tracking-widest text-[#94A3B8]">
                          {s.status}
                       </div>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-lg font-bold text-[#0F172A] tracking-tight">{s.title}</h4>
                       <p className="text-sm text-[#64748B] font-medium leading-relaxed">{s.desc}</p>
                    </div>
                 </div>
              );
           })}
        </div>

        {/* Core CTA */}
        <div className="dashboard-surface py-32 text-center bg-white border-[#E2E8F0] shadow-premium space-y-10">
            <div className="w-20 h-20 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto shadow-sm">
              <Zap className="w-10 h-10 text-[#5E6AD2]" />
            </div>
            <div className="space-y-4">
               <h3 className="text-3xl font-bold text-[#0F172A] tracking-tighter">Strategic Mapping Core</h3>
               <p className="text-[#64748B] text-base max-w-md mx-auto font-medium leading-relaxed">
                 To generate deep marketing intelligence, please select a verified inventory unit and initiate the system audit.
               </p>
            </div>
            <Link href="/products" className="inline-block">
              <button className="btn-primary h-14 px-12 text-xs font-black uppercase tracking-widest shadow-lifted">
                Initialize Product Audit <ArrowRight className="w-4 h-4 ml-3" />
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
