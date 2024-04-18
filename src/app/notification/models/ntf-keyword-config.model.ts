export interface NtfKeywordConfigInfo {
    id?: number;
    timesType?: number;
    name?: string;
    facebook?: boolean;
    youTube?: boolean;
    tiktok?: boolean;
    website?: boolean;
    positive?: boolean;
    negative?: boolean;
    neutral?: boolean;
    profiles?: string;
    keyword?: string | string[];
    topic?: {
        id?: number;
        name?: string;
    }
    removed?: boolean;
    status?: number;
    sources?: {social?: string[]; website: string[]};
    users?: {
        id?: number;
        fullName?: string
    }
}


export interface FilterNtfKeywordConfigInput {
    timesType?: number;
    name?: string;
    facebook?: boolean;
    youTube?: boolean;
    tiktok?: boolean;
    website?: boolean;
    positive?: boolean;
    negative?: boolean;
    neutral?: boolean;
    profiles?: string;
    keyword?: string;
}

export interface NtfKeywordConfigInput {
    timesType?: number;
    name?: string;
    facebook?: boolean;
    youTube?: boolean;
    tiktok?: boolean;
    website?: boolean;
    positive?: boolean;
    negative?: boolean;
    neutral?: boolean;
    email?: boolean;
    telegram?: boolean;
    ntfApp?: boolean;
    profiles?: string;
    keyword?: string[] | string;
    sources?: {type?: 'social' | 'website', profileId?: string}[];
    userIds?: any;
    emails?: string[];
    channelTelegram?: string[]
}

export interface NtfKeyConfigLstInfo {
    id?: number;
    name?: string;
    timesType?: number;
    keyword?: string;
    topicId?: number;
    topicName?: string;
}