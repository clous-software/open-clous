// pages/resume-roast.tsx
import ToolLanding from '@/components/landing/ToolLanding';

const ResumeRoast = () => {
  return (
    <ToolLanding
      namespace="Roast"
      apiEndpoint="/api/ai"
      ctaLink="https://x.com/cloushq"
    />
  );
};

export default ResumeRoast;
