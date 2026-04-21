export const DEMO_PRODUCTS = [
  {
    id: 'demo-1',
    name: 'BrewBox Specialty Coffee',
    description: 'Direct-to-consumer premium coffee subscription delivering ethically sourced single-origin beans.',
    status: 'analyzed',
    url: 'https://brewbox.coffee',
    created_at: new Date().toISOString(),
    uspsCount: 5,
    competitorsCount: 3,
    personasCount: 4,
  },
  {
    id: 'demo-2',
    name: 'Lumix Skin Care',
    description: 'Dermatologist-grade skincare products using proprietary bioluminescent enzymes for natural radiance.',
    status: 'analyzed',
    url: 'https://lumixskin.com',
    created_at: new Date().toISOString(),
    uspsCount: 7,
    competitorsCount: 5,
    personasCount: 3,
  },
  {
    id: 'demo-3',
    name: 'Zenith Workspace',
    description: 'AI-powered standing desks that adjust automatically based on posture and fatigue sensors.',
    status: 'live',
    url: 'https://zenithwork.io',
    created_at: new Date().toISOString(),
    uspsCount: 4,
    competitorsCount: 2,
    personasCount: 6,
  }
];

export const DEMO_INFLUENCERS = [
  {
    id: 'inf-1',
    handle: 'tech_minimalist',
    fullName: 'Alex Rivera',
    followers: '245k',
    engagement: '4.2%',
    category: 'Lifestyle',
    status: 'Negotiating',
  },
  {
    id: 'inf-2',
    handle: 'sara_wellness',
    fullName: 'Sara Chen',
    followers: '1.2M',
    engagement: '3.8%',
    category: 'Heath & Beauty',
    status: 'Deal Signed',
  },
  {
    id: 'inf-3',
    handle: 'product_guru',
    fullName: 'Marcus Thorne',
    followers: '850k',
    engagement: '5.1%',
    category: 'Productivity',
    status: 'Outreach Sent',
  }
];

export const DEMO_METRICS = [
  { opens: 450, clicks: 120, date: '2026-04-18' },
  { opens: 620, clicks: 180, date: '2026-04-19' },
  { opens: 580, clicks: 165, date: '2026-04-20' },
  { opens: 710, clicks: 230, date: '2026-04-21' },
];
