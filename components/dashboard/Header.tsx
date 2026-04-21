import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  title: string;
  subtitle?: string;
  userInitials?: string;
}

/**
 * White Theme Production-Grade Header
 * Implements high-reflectivity modular scale.
 */
export function Header({ title, subtitle, userInitials = 'U' }: HeaderProps) {
  return (
    <header className="h-16 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-30">
      <div className="space-y-0.5">
        <h1 className="text-sm font-semibold text-[#0F172A] tracking-tight">{title}</h1>
        {subtitle && <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] flex items-center justify-center transition-all shadow-sm">
          <Search className="w-3.5 h-3.5 text-[#64748B]" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] flex items-center justify-center transition-all relative shadow-sm">
          <Bell className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#5E6AD2] rounded-full ring-2 ring-white" />
        </button>
        <Avatar className="w-8 h-8 border border-[#E2E8F0] shadow-sm">
          <AvatarFallback className="bg-[#F1F5F9] text-[#0F172A] text-[10px] font-black uppercase">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
