declare global {
  interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }

  interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: Meta;
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