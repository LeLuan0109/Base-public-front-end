export interface NtfConfigInfo {
    id?: number
    timesType?: number
    posts?: number
    interact?: number
    negative?: number
    message?: string
    title?: string
    sendDay: DayOfWeek
    sendTime?: number
    email: Boolean
    ntfApp: Boolean
    telegram: Boolean
}


export interface FilterNtfConfigInput {
    timesType?: number
    posts?: number
    interact?: number
    negative?: number
    message?: string
    title?: string
}

export interface NtfConfigInput {
    timesType?: number
    posts?: number
    interact?: number
    title?: string
    email?: Boolean
    ntfApp?: Boolean
}

export interface EmailNtfInfo{
    email: string
}

export interface TelegramNtfInfo{
    channel: string
}

export enum DayOfWeek {
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
    Sun
}