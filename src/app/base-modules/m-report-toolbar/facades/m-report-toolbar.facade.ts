import { Injectable } from "@angular/core";
import { LabelValue } from "@shared/models/label-value.model";
import { PagingData } from "@shared/models/paging-data.model";
import { Observable, mergeMap, of } from "rxjs";
// import { SocialTopicService } from "src/app/social-topic/services/social-topic.service";

@Injectable({
    providedIn: 'root',
})
export class MReportToolbarFacade {
    // constructor(private socialTopicService: SocialTopicService) { }

    // filterTopics(param: { name?: string, pageIndex?: number, pageSize?: number, sort?: string }): Observable<PagingData<LabelValue>> {
    //     param.sort = '-updated';
    //     // return this.socialTopicService.filterNameSocialTopics(param).pipe(mergeMap(res => {
    //     //     const result = { ...res } as PagingData<LabelValue>;
    //     //     result.data = res.data?.map(p => ({ label: p.name, value: p.id } as LabelValue));
    //     //     return of(result);
    //     // }));
    //     return ;
    // }
}