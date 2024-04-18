import { gql } from "../gql";

export const FILTER_NTF_QUERY = gql`
query FilterNtf($filter: FilterNtfInput, $sort: String, $pageIndex: Int, $pageSize: Int) {
    filterNtf(filter: $filter, sort: $sort, pageIndex: $pageIndex, pageSize: $pageSize) {
        totalCount
        pageInfo {
            pageSize
            pageIndex
            startCursor
            hasNextPage
            totalPage
        }
        data {
            id
            sendTime
            message
            sendType
            title
            posts
            interact
            negative
            topicId
            topicName
            timesType
            ntfType
        }
  }
}
`;

export const GET_NTF_DETAIL_QUERY = gql`
query GetDetailNtf($id: ID!) {
    getDetailNtf(id: $id) {
    id
    sendTime
    message
    sendType
    title
    posts
    interact
    negative
    topicId
    topicName
    timesType
  }
}
`;

export const GET_NTFTOP_QUERY = gql`
query GetTopNewNtf($top: Int) {
    getTopNewNtf(top: $top) {
    id
    sendTime
    message
    sendType
    title
    posts
    interact
    negative
    topicId
    topicName
    timesType
  }
}
`;