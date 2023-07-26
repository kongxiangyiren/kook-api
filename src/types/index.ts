export interface Message {
  s: 0;
  d: {
    channel_type: 'PERSON' | 'GROUP';
    type: number;
    target_id: string;
    author_id: string;
    content: string;
    extra: {
      type: number;
      code: string;
      guild_id: string;
      channel_name: string;
      author: any[];
      visible_only: null;
      mention: any[];
      mention_all: boolean;
      mention_roles: any[];
      mention_here: boolean;
      nav_channels: [];
      kmarkdown: any[];
      emoji: any[];
      last_msg_content: string;
      send_msg_device: number;
    };
    msg_id: string;
    msg_timestamp: number;
    nonce: string;
    from_type: number;
  };
  extra: { verifyToken: string; encryptKey: string; callbackUrl: string };
  sn: number;
}
