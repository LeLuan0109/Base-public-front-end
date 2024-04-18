export interface NtfInfo {
    id?: string;
    sendTime?: number;
    message?: string;
    sendType?: number;
    title?: string;
    posts?: number;
    interact?: number;
    negative?: number;
    topicId?: number;
    topicName?: string;
    timesType?: number;
    ntfType?: 'GENERAL' | 'KEYWORD';
}

export interface FilterNtfInput {
    sendTime?: number;
    message?: string;
    sendType?: number;
    title?: string;
    posts?: number;
    interact?: number;
    negative?: number;
    topicId?: number;
    topicName?: string;
    timesType?: number;
    ntfType?: 'GENERAL' | 'KEYWORD';
}

type SortArrayType = <T>(arr: T[]) => T[];

export const sortByTime: SortArrayType = (arr) => {
    return arr.sort((a, b) => {
        const strA = JSON.stringify(a);
        const strB = JSON.stringify(b);
        if (strA > strB) {
            return -1;
        }
        if (strA < strB) {
            return 1;
        }
        return 0;
    });
}; 