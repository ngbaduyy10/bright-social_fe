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
  User,
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
  { id: "notifications", href: "/notifications", label: "Notifications", icon: Bell },
  { id: "connections", href: "/connections", label: "Connections", icon: Users },
  { id: "saved", href: "/saved", label: "Saved", icon: Bookmark },
];

export const homeNavItems = [
  { id: "home", href: "/", label: "Home" },
  { id: "features", href: "/features", label: "Features" },
  { id: "reviews", href: "/reviews", label: "Reviews" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export const postLimit = 5;
export const storyLimit = 8;
export const mediaLimit = 8;
export const friendLimit = 12;
export const userLimit = 12;

export const profileTabs = [
  { id: "posts", label: "Posts" },
  { id: "media", label: "Media" },
];

export const searchTabs = [
  { id: "users", label: "Users", icon: User },
  { id: "posts", label: "Posts", icon: File },
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

export const sampleChats = [
  {
    id: "3",
    name: "Jason Roy",
    lastMessage: "That's Great. I am Looking forward to having a great start.",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: "4",
    name: "Amy Frost",
    lastMessage: "Hi, will you start working on the chat app right now?",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: "1",
    name: "Lisa Roy",
    lastMessage: "Hi, are you Available Tomorrow?",
    timestamp: "10:35 AM",
    isRead: false,
  },
  {
    id: "2",
    name: "Jamie Taylor",
    lastMessage: "Nice One. Will Do it tomorrow",
    timestamp: "10:35 AM",
    isRead: false,
  },
  {
    id: "5",
    name: "Paul Wilson",
    lastMessage: "See you tomorrow champ",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: "6",
    name: "Ana Williams",
    lastMessage: "??",
    timestamp: "10:35 AM",
    isRead: false,
  },
  {
    id: "7",
    name: "Lisa Roy",
    lastMessage: "Hi, are you Available Tomorrow?",
    timestamp: "10:35 AM",
    isRead: false,
  },
  {
    id: "8",
    name: "Jamie Taylor",
    lastMessage: "Nice One. Will Do it tomorrow",
    timestamp: "10:35 AM",
    isRead: false,
  },
  {
    id: "9",
    name: "Jason Roy",
    lastMessage: "That's Great. I am Looking forward to having a great start.",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: "10",
    name: "Amy Frost",
    lastMessage: "Hi, will you start working on the chat app right now?",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: "11",
    name: "Paul Wilson",
    lastMessage: "See you tomorrow champ",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: "12",
    name: "Ana Williams",
    lastMessage: "??",
    timestamp: "10:35 AM",
    isRead: false,
  },
];


export const sampleMessages = [
  {
    id: "1",
    text: "How's it going?",
    isFromUser: true,
    created_at: "2024-04-17T10:01:00Z"
  },
  {
    id: "2",
    text: "Hey! All good, just finishing up the last pieces for the course. You?",
    isFromUser: false,
    created_at: "2024-04-17T10:02:36Z"
  },
  {
    id: "3",
    text: "I'm fine! Well, we need to work out where we really want to record our video course.",
    isFromUser: true,
    created_at: "2024-04-17T10:03:03Z"
  },
  {
    id: "4",
    text: "All I know is where I live it's too hard to record because of all the street noise.",
    isFromUser: false,
    created_at: "2024-04-17T10:03:45Z"
  },
  {
    id: "5",
    text: "Maybe we can use Jim's studio. It's usually pretty quiet.",
    isFromUser: true,
    created_at: "2024-04-17T10:04:10Z"
  },
  {
    id: "6",
    text: "Yeah, I think it's best we do that. Otherwise, things won't work well at all.",
    isFromUser: false,
    created_at: "2024-04-17T10:04:35Z"
  },
  {
    id: "7",
    text: "Do you want me to check with Jim if we can book a slot this weekend?",
    isFromUser: true,
    created_at: "2024-04-17T10:05:09Z"
  },
  {
    id: "8",
    text: "Yes please, that would be amazing. What time do you think works best?",
    isFromUser: false,
    created_at: "2024-04-17T10:05:40Z"
  },
  {
    id: "9",
    text: "How about Saturday afternoon? I can be there by 2pm.",
    isFromUser: true,
    created_at: "2024-04-17T10:06:11Z"
  },
  {
    id: "10",
    text: "Saturday 2pm sounds good to me! I'll bring the camera gear.",
    isFromUser: false,
    created_at: "2024-04-17T10:06:36Z"
  },
  {
    id: "11",
    text: "Awesome, I'll message Jim right now and confirm. Excited to finally get this done!",
    isFromUser: true,
    created_at: "2024-04-17T10:07:00Z"
  },
  {
    id: "12",
    text: "Me too! Let me know once you hear back from him.",
    isFromUser: false,
    created_at: "2024-04-17T10:07:17Z"
  }
];

export const storyColors = [
  { name: "red", value: "#ef4444" },
  { name: "orange", value: "#f97316" },
  { name: "yellow", value: "#facc15" },
  { name: "green", value: "#22c55e" },
  { name: "teal", value: "#14b8a6" },
  { name: "blue", value: "#3b82f6" },
  { name: "purple", value: "#a855f7" },
  { name: "pink", value: "#ec4899" },
  { name: "brown", value: "#92400e" },
  { name: "gray", value: "#6b7280" },
  { name: "black", value: "#000000" },
  { name: "white", value: "#ffffff" },
];