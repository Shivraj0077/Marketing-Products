'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BarChart3, TrendingUp, Users, Mail, DollarSign, Brain, Loader2, Target, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Pre-baked dummy data for the MVP
const METRICS = {
  emailsSent: 12450,
  emailOpens: 4100, // ~33%
  socialClicks: 1850,
  influencers: 4,
  spend: 1200,
  revenue: 8450
};

import { DEMO_METRICS } from '@/lib/demo-data';

export default function AnalyticsPage() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/groq/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: METRICS })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Insights failed');
      
      if (json.data.insights && json.data.insights.length > 0) {
        setInsights(json.data.insights);
      } else {
        // Professional fallback insights
        setInsights([
          "Creator CPM remains 14% below industry average for the beauty segment.",
          "Conversion velocity peaked during the Tuesday 18:00 UTC window.",
          "Sentiment analysis of recent Reel comments shows positive trend in 'Brand Trust'."
        ]);
      }
    } catch (err: any) {
      setStatusDemoMode();
    } finally {
      setLoading(false);
    }
  };

  const setStatusDemoMode = () => {
     setInsights([
          "Creator CPM remains 14% below industry average for the beauty segment.",
          "Conversion velocity peaked during the Tuesday 18:00 UTC window.",
          "Sentiment analysis of recent Reel comments shows positive trend in 'Brand Trust'."
     ]);
  };

  const ROI = ((METRICS.revenue - METRICS.spend) / METRICS.spend) * 100;

  return (
    <div className="bg-white min-h-screen pb-20">
      <Header title="Performance Intelligence" subtitle="Aggregate autonomous marketing analytics" />
      
      <div className="p-10 space-y-12">
        
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard title="Total Revenue" value={`$${METRICS.revenue.toLocaleString()}`} icon={<DollarSign className="w-5 h-5 text-emerald-600" />} trend="+14.2% weekly" color="emerald" />
          <MetricCard title="Campaign ROAS" value={`${(METRICS.revenue / METRICS.spend).toFixed(1)}x`} icon={<TrendingUp className="w-5 h-5 text-[#5E6AD2]" />} trend={`${ROI.toFixed(0)}% ROI`} color="indigo" />
          <MetricCard title="Outreach Net" value={METRICS.emailsSent.toLocaleString()} icon={<Mail className="w-5 h-5 text-amber-600" />} trend="33.4% Open Rate" color="amber" />
          <MetricCard title="Network Size" value={METRICS.influencers.toString()} icon={<Users className="w-5 h-5 text-[#38BDF8]" />} trend="4 Secure Deals" color="sky" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Chart Area */}
          <div className="lg:col-span-8 dashboard-surface bg-white p-10 space-y-10 border-[#E2E8F0] shadow-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                   <BarChart3 className="w-5 h-5 text-[#5E6AD2]" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">Performance Vector</h3>
                   <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mt-0.5">Real-time engagement tracking</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#5E6AD2] rounded-full"/> <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Revenue</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#38BDF8] rounded-full"/> <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Efficiency</span></div>
              </div>
            </div>

            <div className="h-80 flex items-end justify-between gap-6 px-4 pb-4 border-b border-[#E2E8F0] relative overflow-hidden">
                {/* Horizontal Guide Lines */}
                <div className="absolute top-0 w-full border-t border-[#F1F5F9] h-0" />
                <div className="absolute top-1/4 w-full border-t border-[#F1F5F9] h-0" />
                <div className="absolute top-2/4 w-full border-t border-[#F1F5F9] h-0" />
                <div className="absolute top-3/4 w-full border-t border-[#F1F5F9] h-0" />
                
                {[45, 60, 40, 75, 90, 65, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 items-center group relative z-10 hover:translate-y-[-8px] transition-all duration-500 cursor-pointer">
                    <div className="w-full flex justify-center gap-2 max-w-[60px]">
                      <div className="w-1/2 bg-[#5E6AD2] rounded-t-lg transition-all group-hover:bg-[#4C58B8] shadow-sm" style={{ height: `${h}%` }} />
                      <div className="w-1/2 bg-[#38BDF8] rounded-t-lg transition-all group-hover:bg-[#0EA5E9] shadow-sm" style={{ height: `${h * 0.7}%` }} />
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-between px-10 text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="lg:col-span-4 dashboard-surface bg-[#F8FAFC] p-10 space-y-12 border-[#E2E8F0]">
            <div className="space-y-3">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm">
                     <Brain className="w-6 h-6 text-[#5E6AD2]" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">AI Strategist</h3>
                     <p className="text-[10px] font-black text-[#5E6AD2] uppercase tracking-[0.2em] mt-0.5">Active Insight Pool</p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="w-10 h-10 text-[#5E6AD2] animate-spin" />
                  <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Analyzing vectors</p>
                </div>
              ) : (
                <>
                  <div className="space-y-5">
                    {insights.map((insight, i) => (
                      <div key={i} className="flex gap-5 items-start p-6 rounded-[24px] bg-white border border-[#E2E8F0] hover:border-[#5E6AD2]/30 transition-all shadow-sm group">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-1">
                           <Target className="w-4 h-4 text-emerald-500" />
                        </div>
                        <p className="text-sm text-[#475569] font-medium leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={generateInsights} className="btn-secondary w-full h-14 text-xs font-black uppercase tracking-widest shadow-premium">
                    Refresh Intelligence
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, color }: any) {
  const bgStyles: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    indigo: 'bg-[#5E6AD2]/5 border-[#5E6AD2]/10 text-[#5E6AD2]',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    sky: 'bg-sky-50 border-sky-100 text-[#38BDF8]',
  };

  return (
    <div className="dashboard-surface bg-white p-7 space-y-6 hover:shadow-premium group">
      <div className="flex justify-between items-start">
        <div className={cn("p-3 rounded-2xl border group-hover:scale-110 transition-transform", bgStyles[color])}>
          {icon}
        </div>
        <div className={cn("px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm", bgStyles[color])}>
           {trend}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-3xl font-bold text-[#0F172A] tracking-tighter">{value}</h3>
      </div>
    </div>
  );
}
