'use client';

import { useEffect, useState, use } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Target, 
  Sword, 
  ChevronRight,
  Brain,
  Download,
  Share2,
  ArrowRight,
  Circle
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default function StrategyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [data, setData] = useState<any>({
    strategy: null,
    usps: [],
    competitors: [],
    personas: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [resolvedParams.productId]);

  const fetchData = async () => {
    try {
      const supabase = createClient();
      const { data: prod } = await supabase.from('products').select('*').eq('id', resolvedParams.productId).single();
      if (!prod) return;
      setProduct(prod);

      const [strategy, usps, competitors, personas] = await Promise.all([
        supabase.from('marketing_strategies').select('*').eq('product_id', resolvedParams.productId).maybeSingle(),
        supabase.from('usps').select('*').eq('product_id', resolvedParams.productId),
        supabase.from('competitors').select('*').eq('product_id', resolvedParams.productId),
        supabase.from('buyer_personas').select('*').eq('product_id', resolvedParams.productId)
      ]);

      setData({
        strategy: strategy.data,
        usps: usps.data || [],
        competitors: competitors.data || [],
        personas: personas.data || []
      });
    } catch (err) {
      toast.error('Failed to load strategy details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <StrategySkeleton />;

  const roadmap = data.strategy?.roadmap as any || {};

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-40">
      {/* 1. COMPACT HEADER (Enlarged) */}
      <header className="px-12 py-12 flex justify-between items-center border-b border-[#E2E8F0] bg-[#F8FAFC] shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">{product?.name}</h1>
            <div className="px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.2em]">
              Autonomous Engine Active
            </div>
          </div>
          <p className="text-lg text-[#64748B] max-w-2xl leading-relaxed font-medium">
            AI-driven market intelligence command center. Synthesized via Llama pipeline to optimize high-scale D2C outcomes.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary h-12 px-6"><Share2 className="w-5 h-5" /></button>
          <button className="btn-primary h-12 px-8 text-sm font-bold uppercase tracking-widest">Generate Assets <ArrowRight className="w-4 h-4 ml-2" /></button>
        </div>
      </header>

      {/* 2. CORE DIFFERENTIATOR NAVIGATION */}
      <div className="px-12 mt-12">
        <Tabs defaultValue="insights" className="space-y-0">
          <TabsList className="bg-transparent h-16 border-b border-[#E2E8F0]/50 w-full justify-start rounded-none p-0 flex gap-12">
            <TabsTrigger value="insights" className="tab-trigger-v3 text-base uppercase tracking-widest">Market Intel</TabsTrigger>
            <TabsTrigger value="matrix" className="tab-trigger-v3 text-base uppercase tracking-widest">Quadrants</TabsTrigger>
            <TabsTrigger value="roadmap" className="tab-trigger-v3 text-base uppercase tracking-widest">Roadmap</TabsTrigger>
          </TabsList>

          {/* INSIGHTS TAB */}
          <TabsContent value="insights" className="pt-12 space-y-16 outline-none">
            {/* VALUE PROPS - Robust Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y md:divide-y-0 border border-[#E2E8F0] rounded-[20px] overflow-hidden bg-[#F8FAFC] shadow-premium">
              {data.usps.slice(0, 3).map((usp: any, i: number) => (
                <div key={i} className="p-10 space-y-6 hover:bg-white transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="label-meta text-[10px] tracking-[0.3em] font-black">Pillar 0{i+1}</span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm">
                      <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] leading-tight pr-6">{usp.usp_text}</h3>
                  <div className="pt-6 space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase text-[#64748B] tracking-widest">
                      <span>Confidence</span>
                      <span>Target: High Polarity</span>
                    </div>
                    <div className="confidence-pill h-3 p-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} className={cn("confidence-segment", s <= 4 && "active")} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* PERSONA AVATAR GROUPS */}
            <section className="space-y-8 pb-20">
              <h2 className="text-xl font-bold text-[#0F172A] uppercase tracking-widest">Validated Buyer Segments</h2>
              <div className="flex flex-wrap gap-10">
                {data.personas.map((persona: any, i: number) => (
                  <div key={i} className="flex items-center gap-6 p-6 pr-12 dashboard-surface bg-white border-[#E2E8F0] hover:border-[#5E6AD2] shadow-premium transition-all rounded-[24px]">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#F1F5F9] border-2 border-[#5E6AD2] flex items-center justify-center text-xl font-black text-[#0F172A] shadow-inner">
                        {persona.name?.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#38BDF8] border-2 border-white flex items-center justify-center shadow-sm">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-lg font-bold text-[#0F172A] tracking-tight">{persona.name}</p>
                      <p className="text-sm text-[#64748B] font-bold uppercase tracking-tight">{persona.demographics?.age || '25-35'} | {persona.psychographics?.goals}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* QUADRANT TAB */}
          <TabsContent value="matrix" className="pt-12 space-y-20 outline-none pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="aspect-square relative flex items-center justify-center p-12">
                  <div className="absolute inset-0 border border-[#E2E8F0] rounded-[24px] grid grid-cols-2 grid-rows-2 bg-[#F8FAFC] shadow-premium">
                     <div className="border-r border-b border-[#E2E8F0] p-10">
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Strengths</span>
                        <ul className="mt-6 space-y-4">
                           {['Model Precision', 'Clean Data Pipes', 'D2C Focus'].map(item => <li key={item} className="text-sm text-[#475569] flex gap-3 font-bold"><Circle className="w-1.5 h-1.5 fill-emerald-500 mt-2" /> {item}</li>)}
                        </ul>
                     </div>
                     <div className="border-b border-[#E2E8F0] p-10">
                        <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Weaknesses</span>
                        <ul className="mt-6 space-y-4">
                           {['New Profile Lack', 'Manual Approval', 'Limited Channels'].map(item => <li key={item} className="text-sm text-[#475569] flex gap-3 font-bold"><Circle className="w-1.5 h-1.5 fill-amber-500 mt-2" /> {item}</li>)}
                        </ul>
                     </div>
                     <div className="border-r border-[#E2E8F0] p-10">
                        <span className="text-xs font-black text-[#38BDF8] uppercase tracking-widest">Opportunities</span>
                        <ul className="mt-6 space-y-4">
                           {['Tier 2 expansion', 'Micro-influencers', 'ROI Analysis'].map(item => <li key={item} className="text-sm text-[#475569] flex gap-3 font-bold"><Circle className="w-1.5 h-1.5 fill-[#38BDF8] mt-2" /> {item}</li>)}
                        </ul>
                     </div>
                     <div className="p-10">
                        <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Threats</span>
                        <ul className="mt-6 space-y-4">
                           {['Platform Updates', 'Meta Pricing', 'Market clones'].map(item => <li key={item} className="text-sm text-[#475569] flex gap-3 font-bold"><Circle className="w-1.5 h-1.5 fill-rose-500 mt-2" /> {item}</li>)}
                        </ul>
                     </div>
                  </div>
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E2E8F0]" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E2E8F0]" />
                  <div className="w-14 h-14 rounded-full bg-[#5E6AD2] shadow-lifted flex items-center justify-center z-10 border-4 border-white">
                     <Brain className="w-7 h-7 text-white" />
                  </div>
               </div>

               <div className="space-y-8">
                  <h2 className="text-xl font-bold text-[#0F172A] uppercase tracking-widest">Organic Market Rivals</h2>
                  <div className="space-y-px rounded-[20px] border border-[#E2E8F0] bg-white overflow-hidden shadow-premium">
                     {data.competitors.length === 0 ? (
                        <div className="p-16 text-center text-xs font-black text-[#94A3B8] uppercase tracking-widest bg-[#F8FAFC]">Scanning landscape...</div>
                     ) : (
                        data.competitors.map((comp: any, i: number) => (
                           <div key={i} className="flex items-center justify-between p-8 hover:bg-[#F8FAFC] transition-all border-b last:border-0 border-[#E2E8F0]">
                              <div className="flex items-center gap-6">
                                 <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                                    <Sword className="w-5 h-5 text-[#94A3B8]" />
                                 </div>
                                 <div>
                                    <p className="text-lg font-bold text-[#0F172A]">{comp.name}</p>
                                    <p className="text-xs text-[#64748B] uppercase tracking-widest font-black mt-1">{comp.positioning}</p>
                                 </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#CBD5E1]" />
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>
          </TabsContent>

          {/* ROADMAP TAB */}
          <TabsContent value="roadmap" className="pt-24 pb-40 outline-none">
            <div className="relative">
               <div className="absolute top-[28px] left-0 right-0 h-[2px] bg-[#E2E8F0]" />
               <div className="flex justify-between relative z-10">
                  <RoadmapNode day="30" title="Initialization" items={roadmap?.day30 || []} active />
                  <RoadmapNode day="60" title="Vocal Scale" items={roadmap?.day60 || []} />
                  <RoadmapNode day="90" title="ROI Locked" items={roadmap?.day90 || []} />
               </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
        .tab-trigger-v3 {
          @apply relative h-full px-0 font-bold text-[#64748B] transition-all cursor-pointer;
        }
        .tab-trigger-v3[data-state="active"] {
          @apply text-[#0F172A];
        }
        .tab-trigger-v3[data-state="active"]::after {
          content: '';
          @apply absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#5E6AD2] shadow-sm;
        }
      `}</style>
    </div>
  );
}

function RoadmapNode({ day, title, items, active }: any) {
  return (
    <div className="flex flex-col items-center text-center w-[300px] space-y-8">
       <div className={cn(
         "w-14 h-14 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all shadow-premium",
         active ? "bg-white border-[#5E6AD2] text-[#0F172A]" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8]"
       )}>
          {day}
       </div>
       <div className="space-y-6">
          <h4 className={cn("text-lg font-bold uppercase tracking-widest", active ? "text-[#0F172A]" : "text-[#94A3B8]")}>{title}</h4>
          <div className="flex flex-wrap justify-center gap-2 px-4">
             {(items || []).slice(0, 4).map((item: string, i: number) => (
                <div key={i} className="px-3 py-1.5 bg-white border border-[#E2E8F0] text-[10px] text-[#0F172A] rounded-lg font-black uppercase tracking-wider shadow-sm">
                   {item}
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

function StrategySkeleton() {
  return (
    <div className="bg-white min-h-screen">
       <div className="h-24 border-b border-[#E2E8F0] bg-[#F8FAFC]" />
       <div className="p-16 space-y-16">
          <div className="h-14 w-64 loader-shimmer rounded-xl" />
          <div className="grid grid-cols-3 gap-10 h-80">
             {[1, 2, 3].map(i => <div key={i} className="loader-shimmer rounded-[24px]" />)}
          </div>
       </div>
    </div>
  );
}
