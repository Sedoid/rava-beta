import BetaGuide from "@/components/BetaGuide";
import ReviewDashboard from "@/components/ReviewDashboard";

export const metadata = {
  title: "RAVA — Beta Testing Guide",
  description:
    "Step-by-step beta testing guide for RAVA. Help us test automatic MoMo and Orange Money transaction capture.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ review?: string }>;
}) {
  const { review } = await searchParams;
  if (review === "true") return <ReviewDashboard />;
  return <BetaGuide />;
}
