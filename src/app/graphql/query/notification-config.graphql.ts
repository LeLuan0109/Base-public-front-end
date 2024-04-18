import { gql } from "../gql";

export const FILTER_NTF_CONFIG_QUERY = gql`
query FilterNtfConfig($filter: FilterNtfConfigInput, $sort: String, $pageIndex: Int, $pageSize: Int) {
    filterNtfConfig(filter: $filter, sort: $sort, pageIndex: $pageIndex, pageSize: $pageSize) {
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
            timesType
            posts
            interact
            negative
            title
            email
            ntfApp
        }
  }
}
`;

export const GET_NTF_CONFIG_DETAIL_QUERY = gql`
query GetNtfConfigDetail($id: Long!) {
  getNtfConfigDetail(id: $id) {
        id
        timesType
        posts
        interact
        negative
        title
        email
        ntfApp
  }
}
`;

export const GET_NFT_CONFIG_BY_TOPIC_QUERY = gql`
query GetNtfConfigByTopic($topicId: Long!) {
  getNtfConfigByTopic(topicId: $topicId) {
        id
        timesType
        posts
        interact
        negative
        title
        email
        ntfApp
  }
}
`;

export const GET_ALL_EMAIL_NTF_QUERY = gql`
query GetAllEmailNtf{
  getAllEmailNtf{
    email
  }
}
`

export const GET_ALL_TELEGRAM_NTF_QUERY = gql`
query GetAllTelegramNtf{
  getAllTelegramNtf{
    channel
  }
}
`

export const CREATE_NTF_CONFIG_MUTATION = gql`
mutation CreateNtfConfig($input: NtfConfigInput!) {
    createNtfConfig(input: $input) {
    id
    updated
  }
}
`

export const UPDATE_NTF_CONFIG_MUTATION = gql`
mutation UpdaterNtfConfig($id: Long!, $input: NtfConfigInput!) {
    updaterNtfConfig(id: $id, input: $input) {
    id
    updated
  }
}
`

export const DELETE_NTF_CONFIG_MUTATION = gql`
mutation DeleteNtfConfig($id: Long!) {
    deleteNtfConfig(id: $id) {
    id
    updated
  }
}
`