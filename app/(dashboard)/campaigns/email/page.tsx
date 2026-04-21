'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/dashboard/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail, Sparkles, Wand2, Send, Loader2, ArrowRight } from 'lucide-react';

export default function EmailCampaignsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState('');
  
  // AI Form state
  const [goal, setGoal] = useState('drive sales');
  const [generating, setGenerating] = useState(false);
  const [generatedOptions, setGeneratedOptions] = useState<any[]>([]);
  
  // Email send state
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient();
      const { data } = await supabase.from('products').select('*').eq('status', 'analyzed');
      if (data) setProducts(data);
      if (data && data.length > 0) setSelectedProductId(data[0].id);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const generateCopy = async () => {
    if (!selectedProductId) return toast.error('Please select an analyzed product');
    setGenerating(true);
    setGeneratedOptions([]);
    
    try {
      const res = await fetch('/api/groq/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductId,
          type: 'email',
          campaignGoal: goal
        })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Generation failed');
      
      const copyArray = json.data.email_copy || (json.data.options ? json.data.options : [json.data]);
      setGeneratedOptions(Array.isArray(copyArray) ? copyArray : [copyArray]);
      toast.success('Email copy variants generated!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const useVariant = (idx: number) => {
    const opt = generatedOptions[idx];
    setSubject(opt.subject_line || opt.subject || '');
    setBody((opt.body_copy || opt.body || '').replace(/\\n/g, '\n'));
  };

  const sendCampaign = async () => {
    if (!subject || !body || !recipients) return toast.error('Fill in all email fields');
    
    const emails = recipients.split(',').map(e => ({ Email: e.trim(), Name: 'Customer' }));
    
    setSending(true);
    try {
      const res = await fetch('/api/mailjet/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductId,
          campaignName: subject,
          subject,
          bodyHtml: body.replace(/\n/g, '<br />'),
          bodyText: body,
          recipients: emails
        })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Send failed');
      
      toast.success('Campaign sent successfully!');
      setSubject('');
      setBody('');
      setRecipients('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div><Header title="Email Campaigns" /><div className="p-6 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-violet-400" /></div></div>;

  return (
    <div>
      <Header title="Email Campaigns" subtitle="AI Copywriter + Mailjet Sender" />
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: AI Copywriter */}
        <div className="space-y-6">
          <Card className="border border-white/5 bg-white/[0.02]">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-violet-400" /> AI Email Copywriter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.length === 0 ? (
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm">
                  You need to analyze at least one product before generating copy.
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="text-white/70">Select Product</Label>
                    <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-white/10 text-white">
                        {products.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white/70">Campaign Goal</Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-white/10 text-white">
                        <SelectItem value="drive sales">Drive Sales (Conversion)</SelectItem>
                        <SelectItem value="newsletter update">Newsletter Update (Nurture)</SelectItem>
                        <SelectItem value="product launch">Product Launch (Awareness)</SelectItem>
                        <SelectItem value="re_engagement">Re-engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={generateCopy} 
                    disabled={generating}
                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0"
                  >
                    {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Generate A/B Variants
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
          
          {generatedOptions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Generated Variants</h3>
              {generatedOptions.map((opt, i) => (
                <Card key={i} className="border border-white/5 bg-white/[0.02]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-violet-400 text-sm">Variant {i + 1}</p>
                      <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs h-7" onClick={() => useVariant(i)}>
                        Use This <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                    <p className="text-white font-medium text-sm mb-2"><span className="text-white/40">Subj: </span>{opt.subject_line || opt.subject}</p>
                    <p className="text-white/60 text-xs whitespace-pre-wrap mt-2 p-2 bg-white/5 rounded-md">
                      {(opt.body_copy || opt.body || '').replace(/\\n/g, '\n')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Sending */}
        <div>
          <Card className="border border-white/5 bg-white/[0.02] sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" /> Setup & Send
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/70">To: (Recipients, comma separated)</Label>
                <Input 
                  placeholder="customer1@example.com, customer2@example.com" 
                  value={recipients}
                  onChange={e => setRecipients(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Subject Line</Label>
                <Input 
                  placeholder="Email subject line" 
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Body Content</Label>
                <Textarea 
                  placeholder="Email body text..." 
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={10}
                  className="bg-white/5 border-white/10 text-white font-mono text-sm resize-none"
                />
              </div>
              
              <Button 
                onClick={sendCampaign} 
                disabled={sending || !subject || !body || !recipients}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 mt-4"
              >
                {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Send via Mailjet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
