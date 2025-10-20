import { 
  Home, 
  MessageCircle, 
  Users, 
  Calendar,
  File,
  ChartPie,
  Bookmark,
  Bell,
  Heart,
  Share,
  UserPlus,
  UserCheck,
  UserSearch,
} from "lucide-react";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import { NotificationType } from "@/types";

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

export const feedbackData = [
  {
    name: "Mark Ramirez",
    location: "London, UK",
    feedback: "Their team took our wellness brand and elevated it to new heights with their thoughtful designs and strategic branding, they've helped us create a cohesive and compelling brand identity.",
  },
  {
    name: "Sarah Chen",
    location: "San Francisco, USA",
    feedback: "Absolutely game-changing! The platform's intuitive interface and powerful analytics have helped us triple our engagement rate within just three months. Highly recommended for any serious content creator.",
  },
  {
    name: "James Mitchell",
    location: "Toronto, Canada",
    feedback: "As a small business owner, I was struggling to manage multiple social accounts. This platform simplified everything and the scheduling features have saved me countless hours every week.",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    feedback: "The community features are outstanding! I've connected with like-minded creators and the collaboration tools have opened up so many new opportunities for my brand. Worth every penny!",
  },
  {
    name: "Lucas Silva",
    location: "São Paulo, Brazil",
    feedback: "What impressed me most was the customer support team. They were quick to respond and genuinely helpful. The platform itself is robust, reliable, and constantly improving with new features.",
  },
  {
    name: "Emma Thompson",
    location: "Sydney, Australia",
    feedback: "I've tried many social media management tools, but this one stands out. The content suggestions are spot-on, the posting queue is seamless, and the ROI tracking helps me justify every marketing dollar spent.",
  },
];

export const onlineUsers = [
  { id: 1, name: "Sarah Johnson", username: "sarahjohnson", avatar: DefaultAvatar },
  { id: 2, name: "Mike Chen", username: "mikechen", avatar: DefaultAvatar },
  { id: 3, name: "Emma Williams", username: "emmawilliams", avatar: DefaultAvatar },
  { id: 4, name: "Alex Rodriguez", username: "alexrodriguez", avatar: DefaultAvatar },
  { id: 5, name: "Lisa Anderson", username: "lisaanderson", avatar: DefaultAvatar },
];

export const trendingTopics = [
  { hashtag: "#TechTalk", posts: "1.2K posts" },
  { hashtag: "#WeekendVibes", posts: "856 posts" },
  { hashtag: "#FoodLover", posts: "634 posts" }
];

export const navigationItems = [
  { id: "home", href: "/home", label: "Home", icon: Home },
  { id: "messages", href: "/messages", label: "Messages", icon: MessageCircle },
  { id: "notifications", href: "/notifications", label: "Notifications", icon: Bell },
  { id: "connections", href: "/connections", label: "Connections", icon: Users },
  { id: "saved", href: "/saved", label: "Saved", icon: Bookmark },
];

export const homeNavItems = [
  { id: "home", href: "/", label: "Home" },
  { id: "feature", href: "/feature", label: "Feature" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export const postLimit = 5;
export const storyLimit = 8;
export const mediaLimit = 8;
export const friendLimit = 12;

export const profileTabs = [
  { id: "posts", label: "Posts" },
  { id: "media", label: "Media" },
];

export const connectionTabs = [
  { id: "friend", label: "Friends", icon: UserCheck },
  { id: "request", label: "Requests", icon: UserPlus },
  { id: "sent", label: "Sent", icon: Users },
  { id: "suggested", label: "Suggested", icon: UserSearch },
];

export const notifications = [
  {
    id: 1,
    type: NotificationType.LIKE,
    actor: {
      name: "Sarah Johnson",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 2,
    type: NotificationType.SHARE,
    actor: {
      name: "Mike Chen",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 3,
    type: NotificationType.COMMENT,
    actor: {
      name: "Emma Williams",
      avatar: DefaultAvatar.src,
    },
    content: "I've liked your post!",
  },
  {
    id: 4,
    type: NotificationType.ADD_FRIEND,
    actor: {
      name: "Alex Rodriguez",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 5,
    type: NotificationType.ACCEPT_FRIEND,
    actor: {
      name: "Lisa Anderson",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 6,
    type: NotificationType.LIKE,
    actor: {
      name: "David Kim",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 7,
    type: NotificationType.SHARE,
    actor: {
      name: "Maria Garcia",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 8,
    type: NotificationType.COMMENT,
    actor: {
      name: "John Smith",
      avatar: DefaultAvatar.src,
    },
    content: "Great post! Thanks for sharing.",
  },
  {
    id: 9,
    type: NotificationType.ADD_FRIEND,
    actor: {
      name: "Sophie Brown",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 10,
    type: NotificationType.LIKE,
    actor: {
      name: "Tom Wilson",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 11,
    type: NotificationType.ACCEPT_FRIEND,
    actor: {
      name: "Rachel Green",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 12,
    type: NotificationType.SHARE,
    actor: {
      name: "Kevin Lee",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 13,
    type: NotificationType.COMMENT,
    actor: {
      name: "Amanda Taylor",
      avatar: DefaultAvatar.src,
    },
    content: "This is amazing! Can't wait to see more.",
  },
  {
    id: 14,
    type: NotificationType.LIKE,
    actor: {
      name: "Chris Martin",
      avatar: DefaultAvatar.src,
    },
  },
  {
    id: 15,
    type: NotificationType.ADD_FRIEND,
    actor: {
      name: "Jessica White",
      avatar: DefaultAvatar.src,
    },
  },
];


export const notificationIcons = {
  [NotificationType.LIKE]: Heart,
  [NotificationType.SHARE]: Share,
  [NotificationType.COMMENT]: MessageCircle,
  [NotificationType.ADD_FRIEND]: UserPlus,
  [NotificationType.ACCEPT_FRIEND]: UserCheck,
};

export const notificationColors = {
  [NotificationType.LIKE]: "bg-red-100",
  [NotificationType.SHARE]: "bg-blue-100",
  [NotificationType.COMMENT]: "bg-yellow-100",
  [NotificationType.ADD_FRIEND]: "bg-purple-100",
  [NotificationType.ACCEPT_FRIEND]: "bg-green-100",
};