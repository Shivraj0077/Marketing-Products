'use client';

import Link from 'next/link';
import { 
  Sparkles, ArrowRight, BarChart3, MessageSquare, Camera, Brain,
  PlayCircle, TrendingUp, Users, Rocket, Award, Clock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900/10 selection:text-gray-900">
      
      {/* 1. HEADER SECTION - Refined Premium */}
      <header className="px-8 lg:px-24 pt-12 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-light tracking-tight">Marke<span className="font-semibold">tica</span></h1>
            </div>
            <div className="flex items-center gap-10">
              <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
              <Link href="/signup" className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full mb-8 border border-gray-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-600">AI-powered marketing suite</span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Marketing intelligence,
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                automated.
              </span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
              Deploy autonomous agents for market analysis, content creation, and influencer negotiations. Scale your campaigns with data-driven precision.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/signup" className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                Start free trial
              </Link>
              <button className="px-8 py-3 border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-all flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Watch demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. FEATURE GRID - Sophisticated Layout */}
      <main className="px-8 lg:px-24 py-24 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full mb-6 border border-gray-100 shadow-sm">
              <Award className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Platform capabilities</span>
            </div>
            <h3 className="text-4xl font-bold tracking-tight mb-4">Everything you need to scale</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">Enterprise-grade tools designed for modern marketing teams</p>
          </div>

          {/* Main Grid - 12 columns */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Card 1: Intelligence Core - Large Featured */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-gray-400">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>
                  Active
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-3">Intelligence Core</h4>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                Llama 3.1-powered market analysis. Real-time SWOT, competitor tracking, and predictive trajectory modeling.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <p className="text-2xl font-bold text-gray-900">0.24s</p>
                  <p className="text-xs text-gray-400 font-medium">Avg. analysis</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-xs text-gray-400 font-medium">Accuracy rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-xs text-gray-400 font-medium">Monitoring</p>
                </div>
              </div>
            </div>

            {/* Card 2: Negotiation Engine */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8">
                  <MessageSquare className="w-6 h-6 text-gray-700" />
                </div>
                <h4 className="text-xl font-bold mb-3">Negotiation Engine</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  AI-powered deal simulation with influencer profiles. Predict acceptance rates before outreach.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Fashion Insider', prob: 84, price: '₹12,000' },
                  { name: 'Tech Daily', prob: 76, price: '₹8,500' },
                  { name: 'Luxury Edit', prob: 92, price: '₹25,000' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-700 rounded-full" style={{ width: `${item.prob}%` }} />
                        </div>
                        <span className="text-xs font-mono text-gray-500">{item.prob}%</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 ml-4">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Content Studio */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8">
                <Camera className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="text-xl font-bold mb-3">Content Studio</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Generate high-resolution marketing assets. Custom templates for every platform.
              </p>
              <div className="flex gap-2 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex-1 aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Analytics Dashboard */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8">
                <BarChart3 className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="text-xl font-bold mb-3">Analytics Dashboard</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Real-time metrics with source attribution. Data-backed recommendations.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Open rate</span>
                  <span className="text-sm font-semibold text-gray-900">34%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[34%] bg-gray-700 rounded-full" />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">Click rate</span>
                  <span className="text-sm font-semibold text-gray-900">12%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[12%] bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>

            {/* Card 5: Influencer Discovery */}
            <div className="col-span-12 lg:col-span-4 bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-8">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">Influencer Discovery</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Apify-powered search across 50M+ creators. Filter by engagement, niche, and audience.
                </p>
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <span>2,542 matches</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Active users', value: '2,542', icon: Users },
              { label: 'Campaigns run', value: '18,234', icon: Rocket },
              { label: 'Avg. ROI', value: '248%', icon: TrendingUp },
              { label: 'Response rate', value: '94%', icon: Clock }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <stat.icon className="w-5 h-5 text-gray-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 3. CTA SECTION */}
      <footer className="px-8 lg:px-24 py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h5 className="text-3xl font-bold tracking-tight mb-4">Ready to transform your marketing?</h5>
            <p className="text-gray-500 mb-8">Join thousands of brands scaling with autonomous AI agents.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/signup" className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all">
                Start free trial
              </Link>
              <Link href="/demo" className="px-8 py-3 border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-all">
                Request demo
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-8">No credit card required • Free tier available</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        ::selection {
          background-color: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}