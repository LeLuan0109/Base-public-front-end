import { gql } from "../gql";

export const GET_DETAIL_BACKUP_CONFIG_BY_TYPE_QUERY = gql`
  query GetDetailBackupConfigByType($configType: BackupConfigType!) {
    getDetailBackupConfigByType(configType: $configType) {
        id
        path
        fileName
        timesType
        backupDate
        configType
    }
  }
`;

export const UPDATE_BACKUP_CONFIG_MUTATION = gql`
mutation UpdateBackupConfig($configType: BackupConfigType!, $input: BackupConfigInput!) {
    updateBackupConfig(configType: $configType, input: $input) {
        id
        updated
  }
}
`;