import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GraphqlService } from "src/app/graphql/graphql.service";
import { PagingData } from "src/app/shared/models/paging-data.model";
import { ADD_NTF_CONFIG_MUTATE, FILTER_TOPICS_NTF_KEYWORD_QUERY, FILTER_TOPICS_NTF_QUERY } from "@graphql/query/project.graphql";
import { FilterTopicNtfInput, TopicNtfKeywordInfo, TopicNtfInfo } from "../models/topic-ntf.model";

@Injectable({
    providedIn: 'root',
})
export class TopicNtfConfigService {
    constructor(private graphqlService: GraphqlService) { }

    filterTopicNtf(filter: FilterTopicNtfInput, sort?: string, pageIndex?: number, pageSize?: number): Observable<PagingData<TopicNtfInfo>> {
        return this.graphqlService.query(FILTER_TOPICS_NTF_QUERY, { filter, sort, pageIndex, pageSize });
    }

    filterTopicNtfKeyword(filter: FilterTopicNtfInput, sort?: string, pageIndex?: number, pageSize?: number): Observable<PagingData<TopicNtfKeywordInfo>> {
        return this.graphqlService.query(FILTER_TOPICS_NTF_KEYWORD_QUERY, { filter, sort, pageIndex, pageSize });
    }

    addNtfConfig(topicId: number, timesTypes: number[], ntfStatus?: number): Observable<TopicNtfInfo> {
        return this.graphqlService.query(ADD_NTF_CONFIG_MUTATE, { topicId, timesTypes, ntfStatus });
    }

}
