import { gql } from '../gql';

export const GET_MESSAGES_QUERY = gql`
  query Messages($pageIndex: Int, $pageSize: Int) {
    messages(pageIndex: $pageIndex, pageSize: $pageSize) {
      totalCount
      pageInfo {
        pageIndex
        pageSize
        startCursor
        hasNextPage
        totalPage
      }
      data {
        id
        content
        title
        topicId
        orgId
        url
        sentiment
        created
        status
        username
        userId
      }
    }
  }
`;

export const GET_MESSAGE_DETAIL_QUERY = gql`
  query MsgDetail($id: ID!) {
    msgDetail(id: $id) {
      id
      content
      title
      topicId
      orgId
      url
      sentiment
      created
      status
      username
      userId
    }
  }
`;

export const GET_TOTAL_UNREAD_MSG = gql`
  query UnreadMsg {
    unreadMsg {
      total
    }
  }
`;

export const UPDATE_STATUS_MUTATION = gql`
  mutation UpdateStatus($id: ID!, $status: Short!) {
    updateStatus(id: $id, status: $status) {
      id
      updated
    }
  }
`;
