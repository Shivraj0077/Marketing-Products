'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Megaphone, Mail, Camera,
  Users, MessageSquare, BarChart3, Settings, Sparkles,
  LogOut, ChevronRight, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const navItems = [
  {
    group: 'Platform',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Engine',
    items: [
      { href: '/products', label: 'My Products', icon: Package },
      { href: '/strategy', label: 'Strategy', icon: Megaphone },
    ],
  },
  {
    group: 'Content',
    items: [
      { href: '/campaigns/social', label: 'Social Studio', icon: Camera },
    ],
  },
  {
    group: 'Creators',
    items: [
      { href: '/influencers/discover', label: 'Discovery', icon: Users },
      { href: '/influencers/negotiate', label: 'Negotiation Lab', icon: MessageSquare },
    ],
  },
  {
    group: 'Intelligence',
    items: [
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success('Signed out');
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-[#E2E8F0] flex flex-col z-40 transition-all duration-300">
      {/* Brand Header - Enlarged Logo/Text */}
      <div className="h-24 px-10 flex items-center gap-4 border-b border-[#E2E8F0]/50 bg-[#F8FAFC]">
        <div className="w-12 h-12 rounded-2xl bg-[#5E6AD2] flex items-center justify-center flex-shrink-0 shadow-premium">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-0.5">
          <p className="font-bold text-lg text-[#0F172A] tracking-tight">Insta_Marketer</p>
          <p className="text-[10px] font-black text-[#5E6AD2] uppercase tracking-[0.2em]">V3 Autonomous</p>
        </div>
      </div>

      {/* Nav with Density Control & Larger Text */}
      <nav className="flex-1 overflow-y-auto pt-10 px-8 space-y-12 scrollbar-hide">
        {navItems.map((group) => (
          <div key={group.group} className="space-y-3">
            <p className="text-[11px] font-black text-[#94A3B8] px-4 mb-6 uppercase tracking-[0.2em]">
              {group.group}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-[12px] text-sm font-bold transition-all duration-200 ease-out border border-transparent',
                    isActive
                      ? 'bg-white text-[#0F172A] border-[#E2E8F0] shadow-premium'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  )}
                >
                  <Icon className={cn('w-5 h-5 transition-colors', isActive ? 'text-[#5E6AD2]' : 'text-[#94A3B8]')} />
                  <span className="flex-1 tracking-tight">{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shadow-[0_0_8px_rgba(94,106,210,0.5)]" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Profile/Settings */}
      <div className="p-8 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-[12px] text-xs font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-all border border-transparent hover:border-[#E2E8F0] hover:shadow-sm"
        >
          <Settings className="w-5 h-5 text-[#94A3B8]" />
          Admin Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-[12px] text-xs font-bold text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent"
        >
          <LogOut className="w-5 h-5 text-[#94A3B8]" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
