'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Sparkles, Loader2, Target, Brain, TrendingUp, Bot, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLaunch = async () => {
    if (!productName || !description) return toast.error('Please fill in all fields');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // 1. Create product
      const { data: product, error: pError } = await supabase
        .from('products')
        .insert([{ 
          name: productName, 
          description, 
          user_id: user.id,
          status: 'pending'
        }])
        .select()
        .single();

      if (pError) throw pError;

      toast.success('Product created. Redirecting to dashboard...');
      router.push('/products');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { label: 'Market Context', desc: 'Extract USPs & competitor analysis', icon: Target },
    { label: 'Identity Mapping', desc: 'Build 3-5 detailed buyer personas', icon: Brain },
    { label: 'Growth Plan', desc: 'Generate full 90-day marketing roadmap', icon: TrendingUp },
    { label: 'Network Scan', desc: 'Queue influencer discovery', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F172A] flex flex-col items-center justify-center p-12">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Left - Context (High Visibility) */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="px-3 py-1 rounded-full bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 text-[10px] font-black text-[#5E6AD2] uppercase tracking-[0.2em] inline-block shadow-sm">
               Initialization Phase
            </div>
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              Let's map your <br /><span className="text-[#5E6AD2]">Market Vector.</span>
            </h1>
            <p className="text-[#475569] text-lg leading-relaxed font-medium">
              Our AI engine needs the core DNA of your product to begin generating autonomous strategies and finding your ideal network.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-6 group">
                 <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:text-[#5E6AD2] group-hover:bg-white group-hover:border-[#5E6AD2]/30 transition-all shadow-sm">
                    <s.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs font-black text-[#0F172A] uppercase tracking-widest">{s.label}</p>
                    <p className="text-sm font-semibold text-[#64748B] mt-1">{s.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form (txtb focus) */}
        <div className="dashboard-surface p-10 space-y-10 bg-[#F8FAFC] shadow-lifted">
          <div className="space-y-8">
             <div className="space-y-3">
                <label className="label-meta text-[#0F172A]">Production Name</label>
                <input 
                  placeholder="e.g. Aura Coffee" 
                  className="w-full h-14 bg-white"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
             </div>
             <div className="space-y-3">
                <label className="label-meta text-[#0F172A]">Core Product Intel</label>
                <textarea 
                  placeholder="Describe your product - what it does, who it's for, what makes it unique, price range..."
                  className="w-full min-h-[220px] bg-white text-base leading-relaxed p-6"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
             </div>
          </div>

          <button 
            onClick={handleLaunch}
            disabled={loading}
            className="btn-primary w-full h-14"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Analyzing...</> : 'Launch AI Analysis ->'}
          </button>
        </div>

      </div>
    </div>
  );
}
