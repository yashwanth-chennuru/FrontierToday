import { Company, LaunchUpdate } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    shortName: 'Anthropic',
    tagline: 'Creators of Claude & Constitutional AI',
    brandColor: '#D97706',
    accentColor: '#B45309',
    country: 'USA',
    website: 'https://anthropic.com',
    logoKey: 'anthropic',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    shortName: 'OpenAI',
    tagline: 'Creators of GPT-4o, o1, Sora & ChatGPT',
    brandColor: '#10A37F',
    accentColor: '#059669',
    country: 'USA',
    website: 'https://openai.com',
    logoKey: 'openai',
  },
  {
    id: 'gemini',
    name: 'Google DeepMind',
    shortName: 'Gemini',
    tagline: 'Gemini, Astra & DeepMind Frontier Research',
    brandColor: '#4F46E5',
    accentColor: '#4338CA',
    country: 'USA / UK',
    website: 'https://deepmind.google',
    logoKey: 'gemini',
  },
  {
    id: 'meta',
    name: 'Meta AI',
    shortName: 'Meta',
    tagline: 'Llama Open Source, Muse & FAIR Research',
    brandColor: '#0081FB',
    accentColor: '#0064E0',
    country: 'USA',
    website: 'https://ai.meta.com',
    logoKey: 'meta',
  },
  {
    id: 'xai',
    name: 'xAI / Grok',
    shortName: 'xAI',
    tagline: 'Grok, Colossus Cluster & Frontier Reasoning',
    brandColor: '#000000',
    accentColor: '#27272A',
    country: 'USA',
    website: 'https://x.ai',
    logoKey: 'xai',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    shortName: 'DeepSeek',
    tagline: 'DeepSeek-V3, R1 Reasoning & Open Weights',
    brandColor: '#0284C7',
    accentColor: '#0369A1',
    country: 'China',
    website: 'https://deepseek.com',
    logoKey: 'deepseek',
  },
  {
    id: 'kimi',
    name: 'Moonshot AI / Kimi',
    shortName: 'Kimi',
    tagline: 'Kimi k1.5 Long Context & Deep Reasoning',
    brandColor: '#0D9488',
    accentColor: '#0F766E',
    country: 'China',
    website: 'https://moonshot.cn',
    logoKey: 'kimi',
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI (z.ai)',
    shortName: 'Zhipu GLM',
    tagline: 'GLM-4-Voice, CogVideoX & AutoGLM Agents',
    brandColor: '#7C3AED',
    accentColor: '#6D28D9',
    country: 'China',
    website: 'https://z.ai',
    logoKey: 'zhipu',
  },
  {
    id: 'qwen',
    name: 'Qwen / Alibaba',
    shortName: 'Qwen',
    tagline: 'Qwen 2.5 Max, QwQ Reasoning & VL Models',
    brandColor: '#F59E0B',
    accentColor: '#D97706',
    country: 'China',
    website: 'https://qwenlm.github.io',
    logoKey: 'qwen',
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    shortName: 'MiniMax',
    tagline: 'Hailuo Video, abab Multi-modal & Audio AI',
    brandColor: '#E11D48',
    accentColor: '#BE123C',
    country: 'China',
    website: 'https://minimaxi.com',
    logoKey: 'minimax',
    section: 'frontier',
  },
  // Thinking Machines & Labs
  {
    id: 'thinking-machines',
    name: 'Thinking Machines',
    shortName: 'Thinking Machines',
    tagline: 'Parallel AI Architectures, Next-Gen Reasoning & Compute',
    brandColor: '#18181B',
    accentColor: '#27272A',
    country: 'USA',
    website: 'https://thinkingmachines.ai',
    logoKey: 'thinking-machines',
    section: 'thinking-machines',
  },
  {
    id: 'cohere',
    name: 'Cohere',
    shortName: 'Cohere',
    tagline: 'Command R+, Aya Multilingual & Enterprise Frontier AI',
    brandColor: '#39594C',
    accentColor: '#D17B61',
    country: 'Canada',
    website: 'https://cohere.com',
    logoKey: 'cohere',
    section: 'thinking-machines',
  },
  {
    id: 'sarvam',
    name: 'Sarvam AI',
    shortName: 'Sarvam',
    tagline: 'Indic Frontier AI, Sarvam-2B & Voice Intelligence',
    brandColor: '#FF9933',
    accentColor: '#138808',
    country: 'India',
    website: 'https://sarvam.ai',
    logoKey: 'sarvam',
    section: 'thinking-machines',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Nemotron',
    shortName: 'Nvidia Nemotron',
    tagline: 'Llama-3.1-Nemotron, Reward Models & GPU Scaling',
    brandColor: '#76B900',
    accentColor: '#5B8F00',
    country: 'USA',
    website: 'https://nvidia.com/ai',
    logoKey: 'nvidia',
    section: 'thinking-machines',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    shortName: 'Mistral',
    tagline: 'Mistral Large 2, Pixtral, Codestral & Le Chat',
    brandColor: '#FF7000',
    accentColor: '#D63031',
    country: 'France',
    website: 'https://mistral.ai',
    logoKey: 'mistral',
    section: 'thinking-machines',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    shortName: 'Perplexity',
    tagline: 'Sonar Reasoning, Deep Research & Search Orchestration',
    brandColor: '#20808D',
    accentColor: '#135058',
    country: 'USA',
    website: 'https://perplexity.ai',
    logoKey: 'perplexity',
    section: 'thinking-machines',
  },
  {
    id: 'world-labs',
    name: 'World Labs',
    shortName: 'World Labs',
    tagline: 'Spatial Intelligence & Large World Models (LWMs)',
    brandColor: '#000000',
    accentColor: '#18181B',
    country: 'USA',
    website: 'https://worldlabs.ai',
    logoKey: 'world-labs',
    section: 'thinking-machines',
  }
];

export const INITIAL_LAUNCHES: LaunchUpdate[] = [
  {
    id: 'launch-anthropic-fable-5-1',
    companyId: 'anthropic',
    date: '2026-09-01',
    title: 'Fable 5.1',
    summary: 'Anthropic deploys Fable 5.1 multimodal interactive narrative and advanced frontier agent capabilities for Claude.',
    category: 'Agentic AI',
    links: [
      { label: 'Anthropic Announcement', url: 'https://anthropic.com/news' }
    ],
    tags: ['Fable 5.1', 'Claude', 'Agentic'],
    isHighlight: true,
    createdAt: '2026-09-01T09:00:00Z'
  },
  {
    id: 'launch-gemini-agentic-video',
    companyId: 'gemini',
    date: '2026-09-01',
    title: 'Agentic Video',
    summary: 'Google DeepMind introduces Gemini Agentic Video with real-time frame manipulation and multi-step reasoning tools over live streams.',
    category: 'Vision & Video',
    links: [
      { label: 'DeepMind Blog', url: 'https://deepmind.google/technologies/gemini/' }
    ],
    tags: ['Video', 'Astra', 'Multimodal'],
    isHighlight: true,
    createdAt: '2026-09-01T10:30:00Z'
  },
  {
    id: 'launch-meta-muse',
    companyId: 'meta',
    date: '2026-09-01',
    title: 'Muse Architecture Update',
    summary: 'Meta releases open weights and architecture technical report for Muse generative media & spatial generation engine.',
    category: 'Research & Benchmark',
    links: [
      { label: 'Meta AI Research', url: 'https://ai.meta.com/research/' }
    ],
    tags: ['Muse', 'OpenWeights', 'Generative'],
    isHighlight: true,
    createdAt: '2026-09-01T11:15:00Z'
  },
  {
    id: 'launch-xai-grok-vision',
    companyId: 'xai',
    date: '2026-09-01',
    title: 'Grok 3 Fast Inference',
    summary: 'xAI announces Grok 3 high-throughput inference API with enhanced reasoning traces and code telemetry.',
    category: 'Code & Reasoning',
    links: [
      { label: 'xAI Announcements', url: 'https://x.ai' }
    ],
    tags: ['Grok', 'FastInference'],
    isHighlight: false,
    createdAt: '2026-09-01T14:00:00Z'
  },
  {
    id: 'launch-kimi-k1-5',
    companyId: 'kimi',
    date: '2026-09-02',
    title: 'Kimi k1.5 Reasoning',
    summary: 'Moonshot AI opens public testing for Kimi k1.5 multimodal reasoning with reinforcement learning on complex STEM tasks.',
    category: 'Foundation Model',
    links: [
      { label: 'Kimi Platform', url: 'https://kimi.ai' }
    ],
    tags: ['Kimi', 'STEM', 'Reasoning'],
    isHighlight: true,
    createdAt: '2026-09-02T08:00:00Z'
  },
  {
    id: 'launch-openai-operator-preview',
    companyId: 'openai',
    date: '2026-09-03',
    title: 'Operator 2.0 Web Agent',
    summary: 'OpenAI rolls out Operator 2.0 autonomous browser orchestration agent for Pro and Team subscriptions.',
    category: 'Agentic AI',
    links: [
      { label: 'OpenAI Operator', url: 'https://openai.com' }
    ],
    tags: ['Operator', 'Agents', 'Web'],
    isHighlight: true,
    createdAt: '2026-09-03T09:00:00Z'
  },
  {
    id: 'launch-deepseek-v3-distill',
    companyId: 'deepseek',
    date: '2026-09-04',
    title: 'DeepSeek-V3.5 Flash',
    summary: 'DeepSeek releases new distilled architecture with sub-millisecond time-to-first-token and ultra-low cost per million tokens.',
    category: 'Code & Reasoning',
    links: [
      { label: 'DeepSeek GitHub', url: 'https://github.com/deepseek-ai' }
    ],
    tags: ['DeepSeek', 'OpenSource', 'Inference'],
    isHighlight: false,
    createdAt: '2026-09-04T10:00:00Z'
  },
  {
    id: 'launch-mistral-pixtral-large',
    companyId: 'mistral',
    date: '2026-09-01',
    title: 'Pixtral Large & Le Chat Canvas',
    summary: 'Mistral AI releases Pixtral Large 123B multimodal open-weights model alongside interactive Le Chat Canvas workspace.',
    category: 'Foundation Model',
    links: [
      { label: 'Mistral Blog', url: 'https://mistral.ai/news' }
    ],
    tags: ['Pixtral', 'OpenWeights', 'Vision'],
    isHighlight: true,
    createdAt: '2026-09-01T12:00:00Z'
  },
  {
    id: 'launch-cohere-command-r-plus-v2',
    companyId: 'cohere',
    date: '2026-09-02',
    title: 'Command R+ v2 Enterprise',
    summary: 'Cohere announces Command R+ v2 fine-tuned for complex enterprise RAG and multi-step tool use in 23 languages.',
    category: 'Agentic AI',
    links: [
      { label: 'Cohere News', url: 'https://cohere.com/blog' }
    ],
    tags: ['CommandR', 'RAG', 'Enterprise'],
    isHighlight: false,
    createdAt: '2026-09-02T13:00:00Z'
  },
  {
    id: 'launch-perplexity-sonar-reasoning',
    companyId: 'perplexity',
    date: '2026-09-03',
    title: 'Sonar Deep Research Pro',
    summary: 'Perplexity debuts Sonar Deep Research Pro running exhaustive recursive web exploration with cross-verified citation graphs.',
    category: 'Code & Reasoning',
    links: [
      { label: 'Perplexity Blog', url: 'https://perplexity.ai/blog' }
    ],
    tags: ['Sonar', 'DeepResearch', 'Search'],
    isHighlight: true,
    createdAt: '2026-09-03T15:00:00Z'
  },
  {
    id: 'launch-sarvam-indic-voice',
    companyId: 'sarvam',
    date: '2026-09-01',
    title: 'Sarvam 2B & Voice Frontier',
    summary: 'Sarvam AI deploys real-time streaming voice models across 10 Indian languages with sub-200ms latency.',
    category: 'Voice & Audio',
    links: [
      { label: 'Sarvam Announcements', url: 'https://sarvam.ai' }
    ],
    tags: ['Indic', 'Voice', 'Sarvam2B'],
    isHighlight: true,
    createdAt: '2026-09-01T16:00:00Z'
  },
  {
    id: 'launch-thinking-machines-parallel-reasoning',
    companyId: 'thinking-machines',
    date: '2026-09-01',
    title: 'Nexus-1 Massive Parallel Reasoner',
    summary: 'Thinking Machines introduces Nexus-1, a massively parallel frontier reasoning system optimized for complex verification and search-based inference.',
    category: 'Code & Reasoning',
    links: [
      { label: 'Thinking Machines Research', url: 'https://thinkingmachines.ai' }
    ],
    tags: ['Nexus1', 'ParallelReasoning', 'Frontier'],
    isHighlight: true,
    createdAt: '2026-09-01T17:00:00Z'
  }
];

export const CATEGORIES_LIST = [
  'All',
  'Foundation Model',
  'Agentic AI',
  'Vision & Video',
  'Code & Reasoning',
  'Voice & Audio',
  'Infrastructure & Tooling',
  'Research & Benchmark',
  'N/A'
] as const;
