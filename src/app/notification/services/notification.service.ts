import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GraphqlService } from "src/app/graphql/graphql.service";
import { PagingData } from "src/app/shared/models/paging-data.model";
import { FilterNtfInput, NtfInfo } from "../models/notification.model";
import { FILTER_NTF_QUERY, GET_NTFTOP_QUERY, GET_NTF_DETAIL_QUERY } from "@graphql/query/notification.graphql";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private graphqlService: GraphqlService) { }

    filterNtf(filter: FilterNtfInput, sort?: string, pageIndex?: number, pageSize?: number): Observable<PagingData<NtfInfo>> {
        return this.graphqlService.query(FILTER_NTF_QUERY, { filter, sort, pageIndex, pageSize });
    }

    getNtfDetail(id: number): Observable<NtfInfo> {
        return this.graphqlService.query(GET_NTF_DETAIL_QUERY, { id });
    }

    getNtfTop(top: number): Observable<NtfInfo[]> {
        return this.graphqlService.query(GET_NTFTOP_QUERY, { top });
    }


}
