export interface MsgMetaData {
  meta_data?: { request_id?: string; post_time?: number; event_type?: string };
  payload?: { user_ids?: number[] };
}
