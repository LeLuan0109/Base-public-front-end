import { gql } from "../gql";

export const LOGIN_MUTATE = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;


export const SUBSCRIBE_NOTI_TOPIC = gql`
mutation  SubscribeTokenToTopic($token: String!) {
    subscribeTokenToTopic(token: $token) {
       id
       updated
    } 
  }
`

export const FORGOT_PASS_MUTATE = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      id
      updated
    }
  }
`;

export const REGISTER_MUTATE = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      updated
    }
  }
`;

export const VERIFY_MUTATE = gql`
  mutation Verify($input: VerifyInput!) {
    verify(input: $input) {
      id
      updated
    }
  }
`;