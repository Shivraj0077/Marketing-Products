// ========================
// CORE ENTITIES
// ========================

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  plan_type: 'free' | 'pro' | 'agency';
  credits_used: number;
  created_at: string;
}

export interface Product {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  url?: string;
  status: 'draft' | 'analyzed' | 'live';
  created_at: string;
}

export interface USP {
  id: string;
  product_id: string;
  usp_text: string;
  confidence_score: number;
  created_at: string;
}

export interface Competitor {
  id: string;
  product_id: string;
  name: string;
  website?: string;
  swot_analysis?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  positioning?: string;
  pricing?: string;
  created_at: string;
}

export interface BuyerPersona {
  id: string;
  product_id: string;
  name: string;
  demographics: {
    age_range: string;
    gender: string;
    location: string;
    income_level: string;
    education: string;
  };
  psychographics: {
    values: string[];
    interests: string[];
    lifestyle: string;
    pain_points: string[];
  };
  behavior: {
    media_habits: string[];
    purchase_triggers: string[];
    preferred_channels: string[];
  };
  created_at: string;
}

export interface MarketingStrategy {
  id: string;
  product_id: string;
  strategy_doc: {
    executive_summary: string;
    brand_voice: string;
    positioning_statement: string;
    campaign_ideas: Array<{
      title: string;
      description: string;
      rationale: string;
    }>;
  };
  channels: string[];
  budget_split: Record<string, number>;
  kpis: Array<{
    name: string;
    target: string;
    benchmark: string;
  }>;
  roadmap: {
    day30: string[];
    day60: string[];
    day90: string[];
  };
  created_at: string;
}

// ========================
// CAMPAIGN ENTITIES
// ========================

export interface EmailCampaign {
  id: string;
  user_id: string;
  name: string;
  subject?: string;
  content?: string;
  status: 'draft' | 'scheduled' | 'sent';
  sent_at?: string;
  mailjet_campaign_id?: string;
  created_at: string;
}

export interface EmailMetrics {
  id: string;
  campaign_id: string;
  opens: number;
  clicks: number;
  bounces: number;
  complaints: number;
  tracked_at: string;
}

export interface GeneratedImage {
  id: string;
  user_id: string;
  product_id?: string;
  prompt: string;
  image_url: string;
  created_at: string;
}

export interface ScheduledPost {
  id: string;
  user_id: string;
  product_id?: string;
  caption: string;
  hashtags: string[];
  image_url?: string;
  platform: 'instagram' | 'twitter' | 'linkedin';
  scheduled_at: string;
  status: 'pending' | 'posted';
  created_at: string;
}

// ========================
// INFLUENCER ENTITIES
// ========================

export interface Influencer {
  id: string;
  user_id: string;
  instagram_username: string;
  follower_count: number;
  engagement_rate: number;
  bio?: string;
  email?: string;
  apify_data?: Record<string, unknown>;
  created_at: string;
}

export interface InfluencerRecommendation {
  id: string;
  product_id: string;
  influencer_id: string;
  influencer?: Influencer;
  rank: number;
  fit_reason: string;
  ad_script: string;
  audience_match_score: number;
  content_relevance_score: number;
  created_at: string;
}

// ========================
// NEGOTIATION ENTITIES
// ========================

export interface NegotiationSession {
  id: string;
  influencer_id: string;
  product_id: string;
  user_id: string;
  status: 'active' | 'completed' | 'failed';
  brand_budget?: number;
  started_at: string;
  completed_at?: string;
  influencer?: Influencer;
  messages?: NegotiationMessage[];
  final_deal?: FinalDeal;
}

export interface NegotiationMessage {
  id: string;
  session_id: string;
  sender: 'brand' | 'influencer';
  message_text: string;
  offer_amount?: number;
  round_number: number;
  created_at: string;
}

export interface FinalDeal {
  id: string;
  session_id: string;
  accepted: boolean;
  final_price?: number;
  deliverables?: string[];
  terms?: {
    usage_rights: string;
    exclusivity: boolean;
    timeline: string;
  };
  confidence_score: number;
  outreach_dm?: string;
  outreach_email?: string;
  created_at: string;
}

// ========================
// ANALYTICS ENTITIES
// ========================

export interface Insight {
  id: string;
  user_id: string;
  insight_text: string;
  suggestion?: string;
  data_sources?: Array<{
    label: string;
    description: string;
  }>;
  confidence_score: number;
  created_at: string;
}

export interface UsageMetrics {
  id: string;
  user_id: string;
  api_calls: number;
  emails_sent: number;
  images_generated: number;
  month: string;
}

// ========================
// API RESPONSE TYPES
// ========================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface NegotiationResult {
  messages: NegotiationMessage[];
  final_deal: FinalDeal;
  summary: {
    outcome: 'accepted' | 'rejected' | 'compromised';
    key_points: string[];
    lessons: string[];
  };
}

export interface AnalysisResult {
  usps: USP[];
  competitors: Competitor[];
  personas: BuyerPersona[];
  strategy: MarketingStrategy;
}
