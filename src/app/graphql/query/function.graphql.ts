import { gql } from "../gql";

export const GET_ALL_FUNCTION_QUERY = gql`
  query GetAllFunction {
    getAllFunction {
        code
        label
        icon
        sort
        routerLink
        parentCode
        position
        actions
        queryParams
        status
    }
  }
`;

export const GET_ALL_STATUS_FUNCTION_QUERY = gql`
  query GetAllStatusFunction {
    getAllStatusFunction {
        code
        label
        icon
        sort
        routerLink
        parentCode
        position
        actions
        queryParams
        status
    }
  }
`;


export const GET_ALL_ACTION_QUERY = gql`
  query GetAllAction {
    getAllAction {
      code
      name
    }
  }
`;

export const UPDATE_FUNCTION_MUTATION = gql`
mutation UpdateFunction($code: String!, $input: FunctionInput!) {
  updateFunction(code: $code, input: $input) {
    id
    updated
  }
}
`

export const UPDATE_STATUS_FUNCTION_MUTATION = gql`
mutation UpdateStatusFunction($code: String!, $status: Short!) {
  updateStatusFunction(code: $code, status: $status) {
    id
    updated
  }
}
`

export const UPDATE_FUNCTION_SORT_MUTATION = gql`
mutation UpdateFunctionSort($parentCode: String, $input: [FunctionSortInput!]!) {
  updateFunctionSort(parentCode: $parentCode, input: $input) {
    id
    updated
  }
}
`