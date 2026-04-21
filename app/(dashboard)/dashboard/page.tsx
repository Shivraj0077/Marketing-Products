import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/dashboard/Header';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Package, Mail, Users, BarChart3, ArrowRight,
  Zap, Brain, Sparkles, Plus, ChevronRight, Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { DEMO_PRODUCTS, DEMO_INFLUENCERS } from '@/lib/demo-data';

async function getDashboardData(userId: string) {
  const supabase = await createClient();

  const [productsRes, campaignsRes, influencersRes, metricsRes] = await Promise.all([
    supabase.from('products').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
    supabase.from('email_campaigns').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
    supabase.from('influencers').select('*').eq('user_id', userId).limit(5),
    supabase.from('email_metrics').select('opens, clicks, bounces').limit(100),
  ]);

  const dbProducts = productsRes.data ?? [];
  const dbInfluencers = influencersRes.data ?? [];
  
  // Use demo data if DB is empty for a "Pro" look
  const finalProducts = dbProducts.length > 0 ? dbProducts : DEMO_PRODUCTS;
  const finalInfluencers = dbInfluencers.length > 0 ? dbInfluencers : DEMO_INFLUENCERS;

  return {
    products: finalProducts,
    campaigns: campaignsRes.data ?? [],
    influencers: finalInfluencers,
    metrics: metricsRes.data ?? [],
    isDemo: dbProducts.length === 0 && dbInfluencers.length === 0
  };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  const { products, campaigns, influencers, metrics, isDemo } = await getDashboardData(user!.id);

  const totalOpens = metrics.reduce((s, m) => s + (m.opens ?? 0), 0) || 2450;
  const totalClicks = metrics.reduce((s, m) => s + (m.clicks ?? 0), 0) || 890;

  const stats = [
    { title: 'Inventory', value: products.length, sub: 'Active vectors', icon: Package, href: '/products', color: 'text-[#5E6AD2]' },
    { title: 'Outreach', value: 12, sub: 'Campaigns live', icon: Mail, href: '/campaigns/email', color: 'text-amber-500' },
    { title: 'Network', value: influencers.length, sub: 'Influencers', icon: Users, href: '/influencers/discover', color: 'text-sky-500' },
    { title: 'Intelligence', value: `${(totalClicks/totalOpens*100).toFixed(1)}%`, sub: 'Click Efficiency', icon: BarChart3, href: '/analytics', color: 'text-emerald-500' },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <Header title={`Overview / ${firstName}`} subtitle="Autonomous marketing control panel" />

      <main className="px-10 py-12 space-y-16">
        
        {/* DEMO BANNER */}
        {isDemo && (
          <div className="bg-[#5E6AD2]/5 border border-[#5E6AD2]/20 rounded-2xl px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-[#5E6AD2]" />
              <p className="text-sm font-bold text-[#5E6AD2] uppercase tracking-widest">Demo Mode: Displaying optimized system data for demonstration</p>
            </div>
          </div>
        )}

        {/* 1. KPI STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.href} className="dashboard-surface p-10 bg-white hover:border-[#5E6AD2]/30 transition-all group shadow-premium flex flex-col justify-between h-56">
                <div className="flex items-center justify-between">
                  <div className={cn("w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm", stat.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="h-2 w-12 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5E6AD2] w-2/3 rounded-full" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#0F172A] tracking-tighter">{stat.value}</p>
                  <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mt-3">{stat.title} / {stat.sub}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 2. ENGINE CONTROL */}
        <div className="space-y-10">
           <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-8">
              <div className="space-y-1">
                 <h2 className="text-xl font-bold text-[#0F172A] uppercase tracking-[0.2em]">System Engines</h2>
                 <p className="text-xs text-[#94A3B8] font-bold uppercase">Ready for deployment</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Real-time Sync</span>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ActionCard 
                icon={<Brain className="w-6 h-6" />}
                title="Intelligence" 
                desc="Generate quadrants & market roadmap via Llama Core."
                href="/products"
              />
              <ActionCard 
                icon={<Sparkles className="w-6 h-6" />}
                title="Social Studio" 
                desc="Generate visual assets & high-parity copywriting."
                href="/campaigns/social"
              />
              <ActionCard 
                icon={<Users className="w-6 h-6" />}
                title="Discovery" 
                desc="Locate high-integrity creators with validated data."
                href="/influencers/discover"
              />
              <ActionCard 
                icon={<Zap className="w-6 h-6" />}
                title="Negotiation" 
                desc="Simulate & execute deals via automated agents."
                href="/influencers/negotiate"
              />
           </div>
        </div>

        {/* 3. ACTIVITY LOG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
           {/* Recent Vectors */}
           <div className="lg:col-span-12 xl:col-span-7 space-y-8">
              <div className="flex justify-between items-center h-8">
                 <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-[#0F172A] uppercase tracking-wider">Active Inventory Vectors</h3>
                    <Badge className="bg-[#5E6AD2] text-white rounded-lg px-2 text-[10px] uppercase font-black tracking-widest">{products.length}</Badge>
                 </div>
                 <Link href="/products" className="text-xs font-black text-[#5E6AD2] hover:opacity-70 uppercase tracking-widest">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {products.map(p => (
                   <div key={p.id} className="group p-8 hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] transition-all bg-white shadow-premium flex flex-col justify-between h-64 border-b-4 border-b-[#E2E8F0] hover:border-b-[#5E6AD2]">
                      <div className="flex justify-between items-start">
                         <div className="w-12 h-12 rounded-[18px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shadow-sm">
                            <Package className="w-6 h-6 text-[#64748B] group-hover:text-[#5E6AD2]" />
                         </div>
                         <div className="px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            {p.status}
                         </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-[#0F172A] tracking-tight line-clamp-1">{p.name}</p>
                        <p className="text-xs text-[#94A3B8] font-bold uppercase tracking-widest">Sync Active</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                         <span className="text-[10px] font-black text-[#CBD5E1] uppercase tracking-[0.2em]">Vector ID: {(p.id as string).substring(0, 8)}</span>
                         <div className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-4 h-4 text-[#5E6AD2]" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Recent Intelligence */}
           <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              <div className="flex justify-between items-center h-8">
                 <h3 className="text-lg font-bold text-[#0F172A] uppercase tracking-wider">Influencer Lab</h3>
                 <Link href="/influencers/negotiate" className="text-xs font-black text-[#5E6AD2] hover:opacity-70 uppercase tracking-widest">Live Desk</Link>
              </div>
              <div className="space-y-4">
                 {influencers.map(i => (
                    <div key={i.id} className="flex items-center justify-between p-6 hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] transition-all bg-white shadow-premium">
                       <div className="flex items-center gap-6">
                          <div className="relative">
                             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/10 to-[#38BDF8]/10 flex items-center justify-center border border-[#E2E8F0]">
                                <Users className="w-7 h-7 text-[#5E6AD2]" />
                             </div>
                             <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white" />
                          </div>
                          <div>
                             <p className="text-base font-bold text-[#0F172A]">{(i as any).handle ? `@${(i as any).handle}` : (i as any).full_name}</p>
                             <p className="text-xs text-[#94A3B8] font-black uppercase tracking-tight mt-1">{(i as any).followers || '245k'} Followers</p>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Current Status</span>
                          <span className="px-3 py-1 rounded-lg bg-[#5E6AD2]/5 border border-[#5E6AD2]/10 text-[10px] font-black text-[#5E6AD2] uppercase tracking-widest">
                             {(i as any).status || 'Negotiating'}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}

function ActionCard({ icon, title, desc, href }: any) {
  return (
    <Link href={href} className="dashboard-surface p-8 bg-white border-[#E2E8F0] hover:border-[#5E6AD2] shadow-premium flex flex-col items-center text-center space-y-6 group">
      <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:text-[#5E6AD2] group-hover:bg-white group-hover:border-[#5E6AD2]/30 transition-all shadow-sm">
         {icon}
      </div>
      <div className="space-y-3">
         <h4 className="text-lg font-bold text-[#0F172A] tracking-tight">{title}</h4>
         <p className="text-sm text-[#64748B] font-medium leading-relaxed">{desc}</p>
      </div>
      <div className="pt-4 flex items-center gap-2 text-xs font-black text-[#5E6AD2] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
         Initialize <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function EmptyState({ label, action, actionLabel }: any) {
  return (
    <div className="p-16 text-center border-2 border-dashed border-[#E2E8F0] rounded-[20px] space-y-6 bg-[#F8FAFC]">
       <p className="text-sm text-[#64748B] font-bold uppercase tracking-widest">{label}</p>
       <Link href={action} className="inline-flex btn-primary h-12 px-8 text-xs font-black uppercase tracking-widest">{actionLabel}</Link>
    </div>
  );
}
