import { NtfConfigInfo } from "./notification-config.model";
import { NtfKeywordConfigInfo } from "./ntf-keyword-config.model";

export interface TopicNtfInfo {
    id?: number;
    name?: string;
    comment?: string;
    notificationConfigs?: NtfConfigInfo[];
    timesTypes?: number[]|string[];
    ntfKeywordConfig?: NtfKeywordConfigInfo;
    ntfStatus?: boolean;
}

export interface FilterTopicNtfInput {
    name?: string;
    comment?: string;
    ntfName?: string;
    ntfStatus?: number;
}


export interface  TopicNtfKeywordInfo {
    id?: number;
    name?: string;
    ntfId?: number;
    ntfName?: string;
    ntfStatus?: number;
    ntfRemoved?: boolean;
  }