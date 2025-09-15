import { 
  Home, 
  MessageCircle, 
  Users, 
  Search, 
  User, 
  Calendar,
  File,
  ChartPie,
} from "lucide-react";


export const homeFeatures = [
  {
    icon: Calendar,
    variant: "bg-green-100",
    title: "Viewer Tracker",
    desc: "Our viewer tracker feature helps you understand your audience and track their engagement with your content."
  },
  {
    icon: File,
    variant: "bg-purple-100",
    title: "Audience Insights",
    desc: "Personalize your content with deep insights into your audience's interests, demographics, and behavior."
  },
  {
    icon: ChartPie,
    variant: "bg-orange-100",
    title: "Engagement Metrics",
    desc: "Measure your social media impact with detailed metrics on likes, comments, shares, and more."
  }
];

export const navigationItems = [
  { id: "news-feed", href: "/news-feed", label: "News Feed", icon: Home },
  { id: "messages", href: "/messages", label: "Messages", icon: MessageCircle },
  { id: "connection", href: "/connection", label: "Connection", icon: Users },
  { id: "search", href: "/search", label: "Search", icon: Search },
  { id: "profile", href: "/profile", label: "Profile", icon: User },
];