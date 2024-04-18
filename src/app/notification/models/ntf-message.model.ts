export interface MsgInfo {
  id: string;
  content: string;
  title: string;
  topicId: number;
  orgId: number;
  url: string;
  sentiment: number;
  created: number;
  status: number;
  username: string;
  userId: number;
  checked?: boolean;
}

export interface UnreadMsgInfo {
  total: number;
}
