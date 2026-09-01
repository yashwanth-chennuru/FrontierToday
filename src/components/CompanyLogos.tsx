import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const AnthropicLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/anthropic.png?v=2"
    alt="Anthropic Claude"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const OpenAILogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/openai.png"
    alt="OpenAI"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const GeminiLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/gemini.png"
    alt="Google Gemini"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const MetaLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/meta.png"
    alt="Meta"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const XAILogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/grok.png"
    alt="xAI Grok"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const DeepSeekLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/deepseek.png"
    alt="DeepSeek"
    className={`${className} object-contain scale-125 select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const MiniMaxLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/minimax.png"
    alt="MiniMax"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const ZhipuLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/zhipu.png"
    alt="Z.ai"
    className={`${className} object-contain rounded select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const QwenLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/qwen.png"
    alt="Alibaba Qwen"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const XiaomiLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/xiaomi.png"
    alt="Xiaomi MiMo"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const KimiLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/kimi.webp"
    alt="Moonshot Kimi"
    className={`${className} object-contain rounded select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const GenericLabLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-label="Generic AI Lab"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

export const CohereLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/cohere.png"
    alt="Cohere"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const SarvamLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/sarvam.png"
    alt="Sarvam AI"
    className={`${className} object-contain scale-[1.6] select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const NvidiaLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/nvidia.png"
    alt="NVIDIA"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const MistralLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/mistral.png"
    alt="Mistral AI"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const PerplexityLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/perplexity.png"
    alt="Perplexity"
    className={`${className} object-contain select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const ThinkingMachinesLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/thinking-machines.png"
    alt="Thinking Machines"
    className={`${className} object-contain scale-[1.65] select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const WorldLabsLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size }) => (
  <img
    src="/logos/world-labs.png"
    alt="World Labs"
    className={`${className} object-contain dark:invert select-none`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    draggable={false}
  />
);

export const CompanyLogo: React.FC<{ logoKey: string; className?: string; size?: number }> = ({
  logoKey,
  className,
  size,
}) => {
  switch (logoKey.toLowerCase()) {
    case 'anthropic':
    case 'claude':
      return <AnthropicLogo className={className} size={size} />;
    case 'openai':
    case 'chatgpt':
      return <OpenAILogo className={className} size={size} />;
    case 'gemini':
    case 'google':
    case 'deepmind':
      return <GeminiLogo className={className} size={size} />;
    case 'meta':
    case 'llama':
    case 'muse':
      return <MetaLogo className={className} size={size} />;
    case 'xai':
    case 'grok':
    case 'cursor':
      return <XAILogo className={className} size={size} />;
    case 'deepseek':
      return <DeepSeekLogo className={className} size={size} />;
    case 'minimax':
      return <MiniMaxLogo className={className} size={size} />;
    case 'zhipu':
    case 'z.ai':
    case 'glm':
      return <ZhipuLogo className={className} size={size} />;
    case 'qwen':
    case 'alibaba':
      return <QwenLogo className={className} size={size} />;
    case 'xiaomi':
    case 'mimo':
      return <XiaomiLogo className={className} size={size} />;
    case 'kimi':
    case 'moonshot':
      return <KimiLogo className={className} size={size} />;
    case 'cohere':
      return <CohereLogo className={className} size={size} />;
    case 'sarvam':
    case 'sarvam ai':
      return <SarvamLogo className={className} size={size} />;
    case 'nvidia':
    case 'nemotron':
      return <NvidiaLogo className={className} size={size} />;
    case 'mistral':
    case 'mistral ai':
      return <MistralLogo className={className} size={size} />;
    case 'perplexity':
      return <PerplexityLogo className={className} size={size} />;
    case 'thinking-machines':
    case 'thinking machines':
      return <ThinkingMachinesLogo className={className} size={size} />;
    case 'world-labs':
    case 'worldlabs':
    case 'world labs':
      return <WorldLabsLogo className={className} size={size} />;
    default:
      return <GenericLabLogo className={className} size={size} />;
  }
};
