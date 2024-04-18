import { gql } from "../gql";

export const FILTER_USER_QUERY = gql`
query FilterUser($filter: FilterUserInput, $pageIndex: Int, $pageSize: Int) {
  filterUser(filter: $filter, pageIndex: $pageIndex, pageSize: $pageSize) {
      totalCount
      data {
        id
        fullName
        phone
        email
        userGroup {
          id
          name
        }
        account {
          username
        }
    }
  }
}
`
export const GET_USER_DETAIL_QUERY = gql`
query GetUserDetail($id: Long!) {
  getUserDetail(id: $id) {
    id
    avatar
    email
    address
    fullName
    phone
    userType
    userGroup {
      id
      name
    }
    roles
  }
}
`;

export const CREATE_USER_MUTATION = gql`
mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    id
    updated
  }
}
`

export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($id: Long!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    id
    updated
  }
}
`

export const DELETE_USER_MUTATION = gql`
mutation DeleteUser($id: Long!) {
  deleteUser(id: $id) {
    id
    updated
  }
}
`

export const UPDATE_ME_MUTATION = gql`
mutation UpdateMe($input: UpdateMeInput!) {
  updateMe(input: $input) {
    id
    updated
  }
}
`

export const GET_ALL_USER_QUERY = gql`
query GetAllUserNotAccount {
  getAllUserNotAccount {
      id
      fullName
  }
}
`

export const SEARCH_USER_QUERY = gql`
query SearchUser($keyword: String , $pageIndex: Int, $pageSize: Int) {
  searchUser(keyword: $keyword, pageIndex: $pageIndex, pageSize: $pageSize) {
    totalCount
    pageInfo {
      hasNextPage
    }
    data{
      id
      fullName
    }
  }
}
`

export const SEARCH_USER_NOT_GROUP_QUERY = gql`
query SearchUserNotGroup($keyword: String, $pageIndex: Int, $pageSize: Int) {
  searchUserNotGroup(keyword: $keyword, pageIndex: $pageIndex, pageSize: $pageSize) {
    totalCount
    pageInfo {
      hasNextPage
    }
    data{
      id
      fullName
    }
  }
}
`

export const UPDATE_GROUP_ID_USER_MUTATION = gql`
mutation UpdateGroupIdUser($groupId: Long!, $ids: [Long]) {
  updateGroupIdUser(groupId: $groupId, ids: $ids) {
    id
    updated
  }
}
`
