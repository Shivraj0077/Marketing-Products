import { Header } from '@/components/dashboard/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/server';
import { Package, Plus, Brain, Sparkles, ArrowRight, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import AddProductDialog from '@/components/products/AddProductDialog';
import { cn } from '@/lib/utils';

import { DEMO_PRODUCTS } from '@/lib/demo-data';

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: dbProducts } = await supabase
    .from('products')
    .select('*, usps(*), competitors(*), buyer_personas(*), marketing_strategies(*)')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false });

  const products = (dbProducts && dbProducts.length > 0) ? dbProducts : DEMO_PRODUCTS;
  const isDemo = !dbProducts || dbProducts.length === 0;

  const statusColor: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-500 border-slate-200',
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    analyzed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    live: 'bg-[#5E6AD2]/10 text-[#5E6AD2] border-[#5E6AD2]/20',
  };

  return (
    <div className="bg-white min-h-screen">
      <Header title="My Products" subtitle="Manage and analyze your products with AI" />

      <div className="p-10 space-y-12">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-10">
          <div>
            <p className="text-[#0F172A] text-2xl font-bold tracking-tight">
              Inventory Systems
            </p>
            <p className="text-[#64748B] text-xs font-black uppercase tracking-[0.2em] mt-1">
              {products.length} Active Vectors {isDemo && '/ DEMO MODE'}
            </p>
          </div>
          <AddProductDialog />
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
          {products.map(product => (
            <div key={product.id} className="group dashboard-surface bg-white hover:bg-[#F8FAFC] p-8 space-y-8 flex flex-col justify-between h-[500px] shadow-premium hover:shadow-lifted transition-all border-b-4 border-b-[#E2E8F0] hover:border-b-[#5E6AD2]">
                <div className="space-y-6">
                   <div className="flex items-start justify-between">
                     <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
                       <Package className="w-7 h-7 text-[#64748B] group-hover:text-[#5E6AD2]" />
                     </div>
                     <div className={cn("px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm", statusColor[product.status] ?? statusColor.draft)}>
                       {product.status}
                     </div>
                   </div>

                <div className="space-y-2">
                   <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">{product.name}</h3>
                   <p className="text-sm text-[#64748B] font-medium leading-relaxed line-clamp-2">{product.description}</p>
                </div>

                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#5E6AD2] hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {product.url.replace('https://', '')}
                  </a>
                )}

                {/* AI analysis summary */}
                {product.status === 'analyzed' && (
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-center shadow-sm">
                      <p className="text-base font-black text-[#5E6AD2]">{product.usps?.length ?? 0}</p>
                      <p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-tighter">USPs</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-center shadow-sm">
                      <p className="text-base font-black text-[#38BDF8]">{product.competitors?.length ?? 0}</p>
                      <p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-tighter">Rivals</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-center shadow-sm">
                      <p className="text-base font-black text-emerald-500">{product.buyer_personas?.length ?? 0}</p>
                      <p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-tighter">Segments</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center gap-4">
                  <Link href={`/strategy/${product.id}`} className="flex-1">
                    <button className={cn(
                      "w-full h-11 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                      product.status === 'analyzed' ? "btn-secondary" : "btn-primary"
                    )}>
                      {product.status === 'analyzed' ? 'Access Core Intel' : 'Launch AI Audit'}
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </button>
                  </Link>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      {new Date(product.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-black text-[#94A3B8] uppercase">Sync Complete</span>
                   </div>
                </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

