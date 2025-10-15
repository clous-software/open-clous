// pages/quit-roast.tsx
import ToolLanding from '@/components/landing/ToolLanding';

const QuitRoast = () => {
  return (
    <ToolLanding
      namespace="Quit"
      apiEndpoint="/api/quit"
      ctaLink="https://x.com/cloushq"
    />
  );
};

export default QuitRoast;
