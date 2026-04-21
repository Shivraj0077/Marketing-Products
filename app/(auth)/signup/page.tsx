'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Sparkles, Loader2, ShieldCheck, Zap } from 'lucide-react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      toast.success('Registration successful. Please check your email for a verification link.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'AI product analysis in < 30 seconds',
    'Full 90-day marketing strategy',
    'Influencer discovery + negotiation',
    '200 emails/month on free plan',
    'Unlimited AI image generation',
  ];

  return (
    <div className="flex min-h-screen bg-white text-[#0F172A]">
      {/* Left - Branding High Contrast */}
      <div className="hidden lg:flex w-1/2 bg-[#F8FAFC] border-r border-[#E2E8F0] flex-col justify-between p-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#5E6AD2] flex items-center justify-center shadow-premium">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">InstaMarketer</span>
        </div>

        <div className="space-y-12">
          <h1 className="text-5xl font-bold leading-tight max-w-lg">
            Join the elite 1% using <br /><span className="text-[#5E6AD2]">Autonomous Intel.</span>
          </h1>
          <div className="space-y-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-4 text-bases font-semibold text-[#475569]">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">
          <Zap className="w-4 h-4 text-[#38BDF8]" /> Fast Setup
          <span className="mx-2 opacity-20 text-[#E2E8F0]">|</span>
          Enterprise Grade
        </div>
      </div>

      {/* Right - Form (Text Box focus) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="text-lg text-[#64748B] font-medium">Start marketing smarter - takes 30 seconds</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-3">
              <label className="label-meta text-[#0F172A]">Work Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full h-14"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="label-meta text-[#0F172A]">Secure Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-14"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-14 mt-10"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Started'}
            </button>
          </form>

          <p className="text-center text-base font-medium text-[#64748B]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#5E6AD2] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
