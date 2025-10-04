declare global {
  interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
  }

  enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
  }

  enum StoryType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
  }

  enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video',
  }
}

export {};