'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Camera, Sparkles, Wand2, Loader2, Download, Image as ImageIcon, Copy } from 'lucide-react';
import Image from 'next/image';

import { DEMO_PRODUCTS } from '@/lib/demo-data';

export default function SocialMediaPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState('');
  
  // Controls
  const [tone, setTone] = useState('energetic');
  const [platform, setPlatform] = useState('Instagram');
  const [imagePrompt, setImagePrompt] = useState('');
  
  // Generated content
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState('');
  
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient();
      const { data } = await supabase.from('products').select('*').eq('status', 'analyzed');
      const finalProducts = (data && data.length > 0) ? data : DEMO_PRODUCTS;
      setProducts(finalProducts);
      setSelectedProductId(finalProducts[0].id);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const generateCaption = async () => {
    if (!selectedProductId) return toast.error('Please select a product');
    setGeneratingCaption(true);
    
    try {
      const res = await fetch('/api/groq/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductId,
          type: 'social',
          platform,
          tone
        })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Generation failed');
      
      setGeneratedCaption(json.data.caption || json.data.content || JSON.stringify(json.data));
      
      // Auto-suggest an image prompt
      if (json.data.suggested_image_prompt) {
        setImagePrompt(json.data.suggested_image_prompt);
      }
      toast.success('Caption generated!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setGeneratingCaption(false);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt) return toast.error('Please provide an image generation prompt');
    setGeneratingImage(true);
    
    try {
      const res = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductId,
          prompt: imagePrompt,
          width: 1080,
          height: 1080
        })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Generation failed');
      
      setGeneratedImage(json.data.image_url);
      toast.success('Image generated!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setGeneratingImage(false);
    }
  };

  const dashboardLoading = (
    <div className="bg-white min-h-screen">
      <Header title="Social Media Studio" />
      <div className="p-6 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#5E6AD2]" />
      </div>
    </div>
  );

  if (loading) return dashboardLoading;

  return (
    <div className="bg-white min-h-screen">
      <Header title="Social Media Studio" subtitle="Generate Captions and Pollinations AI Images" />
      
      <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Caption Studio */}
        <div className="space-y-6">
          <div className="dashboard-surface p-8 space-y-8 bg-[#F8FAFC]">
             <div className="flex items-center gap-3 mb-4">
                <Wand2 className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Content and Copy</h3>
             </div>

              {products.length === 0 ? (
                <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">
                  Initialize product profile first to begin generating assets.
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="label-meta">Product Identity</Label>
                      <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                        <SelectTrigger className="bg-white border-[#E2E8F0] h-11 text-[#0F172A] font-medium shadow-sm">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#E2E8F0] text-[#0F172A]">
                          {products.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                       <Label className="label-meta">Channel Target</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="bg-white border-[#E2E8F0] h-11 text-[#0F172A] font-medium shadow-sm">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#E2E8F0] text-[#0F172A]">
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="X (Twitter)">X (Twitter)</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="label-meta">Creative Direction</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-white border-[#E2E8F0] h-11 text-[#0F172A] font-medium shadow-sm">
                        <SelectValue placeholder="Tone" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#E2E8F0] text-[#0F172A]">
                        <SelectItem value="energetic">Energetic and Elevated</SelectItem>
                        <SelectItem value="professional">Professional and Clinical</SelectItem>
                        <SelectItem value="humorous">Humorous and Direct</SelectItem>
                        <SelectItem value="educational">Informative and Structured</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <button 
                    onClick={generateCaption} 
                    disabled={generatingCaption}
                    className="btn-primary w-full h-11 text-xs font-bold"
                  >
                    {generatingCaption ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Generate Strategy Copy
                  </button>
                </div>
              )}
          </div>

          {generatedCaption && (
            <div className="dashboard-surface p-8 bg-white shadow-lifted">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="label-meta text-[#0F172A]">Intelligence Output</h3>
                  <button className="text-[10px] font-black text-[#5E6AD2] hover:underline uppercase tracking-widest" onClick={() => { navigator.clipboard.writeText(generatedCaption); toast.success('Copied!'); }}>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy Selection
                  </button>
                </div>
                <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
                  <p className="text-sm font-medium text-[#0F172A]/80 whitespace-pre-wrap leading-relaxed">
                    {generatedCaption.replace(/\\n/g, '\n')}
                  </p>
                </div>
            </div>
          )}
        </div>

        {/* Image Studio */}
        <div className="space-y-6">
          <div className="dashboard-surface p-8 space-y-8 bg-[#F8FAFC]">
             <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-5 h-5 text-[#5E6AD2]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Asset Synthesis</h3>
             </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="label-meta">Generation Prompt</Label>
                  <Input 
                    value={imagePrompt}
                    onChange={e => setImagePrompt(e.target.value)}
                    placeholder="e.g. Minimalist product photography on stone surface"
                    className="bg-white border-[#E2E8F0] h-11 text-[#0F172A] font-medium shadow-sm"
                  />
                </div>

                <button 
                  onClick={generateImage} 
                  disabled={generatingImage || !imagePrompt}
                  className="btn-primary w-full h-11 text-xs font-bold"
                >
                  {generatingImage ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Camera className="w-4 h-4 mr-2" />}
                  Synthesize Visual
                </button>
              </div>
          </div>

          {generatedImage && (
            <div className="dashboard-surface overflow-hidden bg-white p-0 border-[#E2E8F0] shadow-lifted">
                <div className="relative aspect-square w-full">
                  <Image 
                    src={generatedImage} 
                    alt={imagePrompt} 
                    fill 
                    className="object-cover"
                    unoptimized 
                  />
                  <div className="absolute bottom-6 right-6 flex gap-2">
                    <button 
                      className="btn-secondary bg-white/90 backdrop-blur-md h-9 text-xs font-bold shadow-lifted"
                      onClick={() => window.open(generatedImage, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" /> Download High-Res
                    </button>
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
