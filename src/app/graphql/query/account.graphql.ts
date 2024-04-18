import { gql } from '../gql';

export const ME_QUERY = gql`
  query GetMe {
    getMe {
      id
      username
      avatar
      email
      address
      fullName
      phone
      gender
      birthday
      admin
      roles
      status
      organization {
        companyName
        website
        phone
        email
        address
        taxCode
        logo
      }
    }
  }
`;

export const FILTER_ACCOUNT_QUERY = gql`
  query FilterOrgAccount($filter: FilterOrgAccountInput, $sort: String, $pageIndex: Int, $pageSize: Int) {
    filterOrgAccount(filter: $filter, sort: $sort, pageIndex: $pageIndex, pageSize: $pageSize) {
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
        username
        fullName
        phone
        admin
        created
        status
      }
    }
  }
`;

export const GET_ACCOUNT_DETAIL_QUERY = gql`
  query GetOrgAccountDetail($id: Long!) {
    getOrgAccountDetail(id: $id) {
      id
      username
      avatar
      email
      address
      fullName
      phone
      gender
      birthday
      admin
      roles
      status
      organization {
        id
        companyName
      }
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateOrgAccount($input: OrgAccountInput!) {
    createOrgAccount(input: $input) {
      id
      updated
    }
  }
`;

export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdaterOrgAccount($id: Long!, $input: OrgAccountUpdateInput!) {
    updaterOrgAccount(id: $id, input: $input) {
      id
      updated
    }
  }
`;

export const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteOrgAccount($id: Long!) {
    deleteOrgAccount(id: $id) {
      id
      updated
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
      updated
    }
  }
`;

export const SET_PASSWORD_MUTATION = gql`
  mutation SetPassword($id: Long!, $password: String!) {
    setPassword(id: $id, password: $password) {
      id
      updated
    }
  }
`;

export const UPDATE_STATUS_MUTATION = gql`
  mutation UpdateOrgAccountStatus($id: Long!, $status: Short!) {
    updateOrgAccountStatus(id: $id, status: $status) {
      id
      updated
    }
  }
`;
