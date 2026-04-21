'use client';

import { useState } from 'react';
import { Plus, Loader2, Package, Globe, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AddProductDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) { toast.error('Name and description required'); return; }
    setLoading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please log in'); return; }

      const { error } = await supabase.from('products').insert({
        user_id: user.id,
        name,
        description,
        url: url || null,
        status: 'draft',
      });

      if (error) { toast.error(error.message); return; }

      toast.success(`"${name}" added! Click Analyze to run AI intelligence.`);
      setOpen(false);
      setName(''); setDescription(''); setUrl('');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="btn-primary h-11 px-6 text-xs font-black uppercase tracking-widest shadow-premium"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Inventory Item
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border-[#E2E8F0] shadow-lifted rounded-[24px] p-10 max-w-lg">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-[#0F172A]">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#5E6AD2]" />
            </div>
            Identification Unit
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="dlg-name" className="label-meta text-[#0F172A]">
              Item Designation *
            </Label>
            <input
              id="dlg-name"
              placeholder="e.g. BrewBox Specialty Coffee"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="dlg-desc" className="label-meta text-[#0F172A]">
              Strategic Description *
            </Label>
            <textarea
              id="dlg-desc"
              placeholder="Describe the product - what it does, USPs, target market..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full min-h-[120px] p-4 text-sm"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="dlg-url" className="label-meta text-[#0F172A]">
              Access Point (URL)
            </Label>
            <input
              id="dlg-url"
              type="url"
              placeholder="https://yourstore.com/product"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full h-12"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 btn-secondary h-12 text-xs font-black uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary h-12 text-xs font-black uppercase tracking-widest shadow-premium"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Register Item'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
