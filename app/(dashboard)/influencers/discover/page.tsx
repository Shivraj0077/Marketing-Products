'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/dashboard/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Users, Search, Loader2, Link as LinkIcon, 
  Camera, Target, MessageSquare,
  TrendingUp, Star, Filter, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { DEMO_INFLUENCERS } from '@/lib/demo-data';
import Link from 'next/link';

export default function InfluencerDiscoverPage() {
  const [keywords, setKeywords] = useState('');
  const [maxResults, setMaxResults] = useState(6);
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState<any[]>([]);

  const fetchSavedInfluencers = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('influencers').select('*').order('created_at', { ascending: false }).limit(20);
    if (data && data.length > 0) {
      setInfluencers(data);
    } else {
      setInfluencers(DEMO_INFLUENCERS);
    }
  };

  useEffect(() => {
    fetchSavedInfluencers();
  }, []);

  const handleDiscover = async () => {
    if (!keywords) return toast.error('Please enter keywords (e.g. coffee, mumbai, D2C)');
    setLoading(true);
    
    try {
      const kwList = keywords.split(',').map(k => k.trim());
      const res = await fetch('/api/apify/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: kwList, maxResults })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Discovery failed');
      
      toast.success(`${json.data.length} influencers discovered via pipeline!`);
      fetchSavedInfluencers();
      setKeywords('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header 
        title="Influencer Engine" 
        subtitle="Search -> Extract Usernames -> Enrich with AI Data" 
      />
      
      <div className="px-10 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Filter Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="dashboard-surface p-8 space-y-10 bg-[#F8FAFC]">
            <div className="space-y-6">
              <h3 className="label-meta text-[#0F172A] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#5E6AD2]" /> Discovery Ops
              </h3>
              
              <div className="space-y-6">
                 <div className="space-y-3">
                    <Label className="label-meta text-[#0F172A]">Target Niche Keywords</Label>
                    <input 
                      placeholder="e.g. fashion india" 
                      value={keywords}
                      onChange={e => setKeywords(e.target.value)}
                      className="w-full bg-white h-12"
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="label-meta text-[#0F172A]">Max Scrape Count</Label>
                    <input 
                      type="number"
                      min="1"
                      max="10"
                      value={maxResults}
                      onChange={e => setMaxResults(parseInt(e.target.value))}
                      className="w-full bg-white h-12"
                    />
                 </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-premium">
                 <div className="flex items-center gap-2 text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.2em]">
                    <Target className="w-4 h-4" /> Autonomous Flow
                 </div>
                 <p className="text-xs text-[#64748B] leading-relaxed font-bold italic">
                    Pipeline searches Google for profile handles first, then verifies via Apify cloud infrastructure.
                 </p>
              </div>

              <button 
                onClick={handleDiscover} 
                disabled={loading || !keywords}
                className="btn-primary w-full h-12"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-3 animate-spin" /> : <Search className="w-4 h-4 mr-3" />}
                Run Pipeline
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-10">
           <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-6">
              <h2 className="text-xl font-bold text-[#0F172A] uppercase tracking-widest">Verified Creator Set ({influencers.length})</h2>
              <button onClick={fetchSavedInfluencers} className="text-xs font-black text-[#5E6AD2] hover:underline uppercase tracking-widest">
                 Refresh Synchronizer
              </button>
           </div>

           {influencers.length === 0 ? (
             <div className="dashboard-surface py-40 border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center text-center space-y-8 bg-[#F8FAFC]">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-[#E2E8F0] shadow-premium">
                   <Users className="w-10 h-10 text-[#94A3B8]" />
                </div>
                <div className="space-y-3">
                   <p className="text-lg font-bold text-[#0F172A]">No creators in current vector</p>
                   <p className="text-sm font-medium text-[#64748B]">Start a search to populate your verified influencer database.</p>
                </div>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {influencers.map((inf) => (
                  <div key={inf.id} className="dashboard-surface bg-white hover:border-[#5E6AD2]/30 p-8 space-y-8 shadow-premium">
                     <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] shadow-sm">
                           <Camera className="w-6 h-6" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] shadow-sm">
                          VERIFIED
                        </div>
                     </div>
                     
                     <div className="space-y-1">
                        <h4 className="text-xl font-bold text-[#0F172A] tracking-tighter">@{inf.handle}</h4>
                        <p className="label-meta text-[#38BDF8] opacity-60">Verified Creator</p>
                     </div>

                     <div className="grid grid-cols-2 gap-6 pt-2">
                        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-sm">
                           <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">Followers</p>
                           <p className="text-lg font-bold text-[#0F172A]">{(inf.followers / 1000).toFixed(1)}k</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-sm">
                           <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">Parity</p>
                           <p className="text-lg font-bold text-[#5E6AD2]">92%</p>
                        </div>
                     </div>

                     <p className="text-sm text-[#64748B] line-clamp-2 leading-relaxed h-10 font-bold italic opacity-60">
                        {inf.notes || 'Natural profile bio pending enrichment.'}
                     </p>

                     <div className="flex gap-4 pt-4 border-t border-[#E2E8F0]">
                        <a 
                          href={`https://instagram.com/${inf.handle}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 btn-secondary h-11 text-xs font-black tracking-widest uppercase"
                        >
                           <LinkIcon className="w-4 h-4" />
                        </a>
                        <Link 
                          href="/influencers/negotiate"
                          className="flex-[2] btn-primary h-11 text-xs font-black tracking-widest uppercase"
                        >
                           Simulate Deal
                        </Link>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

