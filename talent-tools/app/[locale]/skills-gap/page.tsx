// pages/skills-gap.tsx
import ToolLanding from '@/components/landing/ToolLanding';

const SkillsGap = () => {
  return (
    <ToolLanding
      namespace="Skills"
      apiEndpoint="/api/skills"
      ctaLink="https://x.com/cloushq"
    />
  );
};

export default SkillsGap;
