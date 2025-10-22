export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export enum StoryType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum NotificationType {
  LIKE = 'like',
  SHARE = 'share',
  COMMENT = 'comment',
  ADD_FRIEND = 'add_friend',
  ACCEPT_FRIEND = 'accept_friend',
}

export enum ConnectionType {
  FRIEND = 'friend',
  REQUEST = 'request',
  SENT = 'sent',
  SUGGESTED = 'suggested',
}

export enum FriendStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface Filter {
  keyword?: string;
  page: number;
  limit: number;
}