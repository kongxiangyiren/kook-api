export interface Message {
  s: 0;
  d: DMessage | systemMessage;
  extra: { verifyToken: string; encryptKey: string; callbackUrl: string };
  sn: number;
}

/** 系统消息 d */
export interface systemMessage {
  channel_type: 'GROUP';
  type: 255;
  target_id: string;
  author_id: string;
  content: '[系统消息]';
  extra: {
    type: string;
    body: {
      id: string;
      name: string;
      user_id: string;
      guild_id: string;
      guild_type: number;
      is_category: number;
      parent_id: string;
      level: number;
      slow_mode: number;
      topic: string;
      type: number;
      permission_overwrites: any[];
      permission_users: any[];
      permission_sync: number;
      mode: number;
      has_password: boolean;
      last_msg_content: string;
      last_msg_id: string;
    };
  };
  msg_id: string;
  msg_timestamp: number;
  nonce: string;
  from_type: number;
}

export interface DMessage {
  channel_type: 'PERSON' | 'GROUP' | 'BROADCAST ';
  type: 1 | 2 | 3 | 4 | 8 | 9 | 10;
  target_id: string;
  author_id: string;
  content: string;
  extra: {
    type: number;
    code: string;
    guild_id: string;
    channel_name: string;
    author: Record<string, any>;
    visible_only: null;
    mention: any[];
    mention_all: boolean;
    mention_roles: any[];
    mention_here: boolean;
    nav_channels: [];
    kmarkdown: Record<string, any> | [];
    emoji: Record<string, any> | [];
    last_msg_content: string;
    send_msg_device: number;
    attachments?: {
      type: string;
      name: string;
      url: string;
    };
  };

  msg_id: string;
  msg_timestamp: number;
  nonce: string;
  from_type: number;
}
