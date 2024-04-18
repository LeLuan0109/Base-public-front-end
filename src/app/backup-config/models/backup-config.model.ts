export interface BackupConfigInfo {
    id?: number;
    path?: string;
    fileName?: string;
    timesType?: number;
    backupDate?: number;
    configType?: number;
}

export interface BackupConfigInput {
    path?: string;
    fileName?: string;
    timesType?: number;
    backupDate?: number;
}

export enum BackupConfigType {
    STRUCTURE = 'STRUCTURE',
    UNSTRUCTURED = 'UNSTRUCTURED'
}

export const TIMES_TYPE_OPT = [{ label: 'Hàng ngày', value: 1 }, { label: 'Hàng tuần', value: 2 }, { label: 'Hàng tháng', value: 3 }];

export const BACKUP_DATE_WEEK_OPT = [
    { label: 'Thứ 2', value: 2 },
    { label: 'Thứ 3', value: 3 },
    { label: 'Thứ 4', value: 4 },
    { label: 'Thứ 5', value: 5 },
    { label: 'Thứ 6', value: 6 },
    { label: 'Thứ 7', value: 7 },
    { label: 'Chủ nhật', value: 1 },
];

export const BACKUP_DATE_MONTH_OPT = Array.from(Array(30), (_, i) => ({ label: `${i+1}`, value: i + 1}));

export const BACKUP_DATE_WEEK: {[key: number]: string} = BACKUP_DATE_WEEK_OPT.reduce((a, v) => ({ ...a, [v.value]: v.label}), {});