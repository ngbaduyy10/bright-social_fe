import SponsorCard from "@/components/molecules/SponsorCard";
import TrendingCard from "@/components/molecules/TrendingCard";
import OnlineUsersCard from "@/components/molecules/OnlineUsersCard";

export default function RightSidebar() {
  return (
    <div className="h-full flex flex-col gap-3 bg-background py-2 md:py-4 px-2 overflow-y-auto scrollbar-hide">
      <SponsorCard />
      <OnlineUsersCard />
      <TrendingCard />
    </div>
  )
}