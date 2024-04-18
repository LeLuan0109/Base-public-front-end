import { gql } from "../gql";

export const FILTER_NTF_KEYWORD_CONFIG_QUERY = gql`
query FilterNtfKeywordConfig($filter: FilterNtfKeywordConfigInput, $sort: String, $pageIndex: Int, $pageSize: Int) {
  filterNtfKeywordConfig(filter: $filter, sort: $sort, pageIndex: $pageIndex, pageSize: $pageSize) {
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
          name
          timesType
          keyword
          topicId
          topicName
        }
  }
}
`;

export const GET_NTF_KEYWORD_CONFIG_DETAIL_QUERY = gql`
query GetNtfKeywordConfigDetail($id: Long!) {
  getNtfKeywordConfigDetail(id: $id) {
    id
    timesType
    name
    facebook
    youTube
    tiktok
    website
    positive
    negative
    neutral
    profiles
    keyword
    email
    ntfApp
    status
    topic {
      id
      name
    }
    users {
      id
      fullName
    }
  }
}
`;

export const CREATE_NTF_KEYWORD_CONFIG_MUTATION = gql`
mutation CreateNtfKeywordConfig($input: NtfKeywordConfigInput!) {
  createNtfKeywordConfig(input: $input) {
    id
    updated
  }
}
`

export const UPDATE_NTF_KEYWORD_CONFIG_MUTATION = gql`
mutation UpdaterNtfKeywordConfig($id: Long!, $input: NtfKeywordConfigInput!) {
  updaterNtfKeywordConfig(id: $id, input: $input) {
    id
    updated
  }
}
`

export const DELETE_NTF_KEYWORD_CONFIG_MUTATION = gql`
mutation DeleteNtfKeywordConfig($id: Long!) {
  deleteNtfKeywordConfig(id: $id) {
    id
    updated
  }
}
`