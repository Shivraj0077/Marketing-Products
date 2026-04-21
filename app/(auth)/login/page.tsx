'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Sparkles, Loader2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      window.location.href = '/dashboard';
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        <div className="space-y-8">
          <h1 className="text-5xl font-bold leading-tight max-w-lg">
            Access your <br /><span className="text-[#5E6AD2]">Marketing Intelligence.</span>
          </h1>
          <p className="text-xl text-[#64748B] font-medium leading-relaxed max-w-md">
            Sign in to manage your autonomous strategies and creator negotiations.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-black text-[#94A3B8] uppercase tracking-[0.2em]">
           <Zap className="w-4 h-4 text-[#38BDF8]" /> SECURE ACCESS
           <span className="opacity-20 text-[#E2E8F0]">|</span>
           V3 CORE
        </div>
      </div>

      {/* Right - Form (Text Box focus) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-lg text-[#64748B] font-medium">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="label-meta text-[#0F172A]">Account Email</label>
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
              <div className="flex justify-between items-center">
                <label className="label-meta text-[#0F172A]">Security Code</label>
                <Link href="#" className="text-xs font-bold text-[#5E6AD2] hover:underline uppercase tracking-wide">Forgot?</Link>
              </div>
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
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Command Center'}
            </button>
          </form>

          <p className="text-center text-base font-medium text-[#64748B]">
            New to the platform?{' '}
            <Link href="/signup" className="text-[#5E6AD2] font-bold hover:underline">
              Initialize Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
