import { Injectable } from "@angular/core";
import { GraphqlService } from "@graphql/graphql.service";
import { BackupConfigInfo, BackupConfigInput, BackupConfigType } from "../models/backup-config.model";
import { Observable } from "rxjs";
import { GET_DETAIL_BACKUP_CONFIG_BY_TYPE_QUERY, UPDATE_BACKUP_CONFIG_MUTATION } from "@graphql/query/backup-config.graphql";
import { ResponseMutate } from "@shared/models/response-mutate.model";

@Injectable({
    providedIn: 'root',
})
export class BackupConfigService {

    constructor(private graphqlService: GraphqlService) { }

    getDetailBackupConfigByType(configType: BackupConfigType): Observable<BackupConfigInfo> {
        return this.graphqlService.query(GET_DETAIL_BACKUP_CONFIG_BY_TYPE_QUERY, { configType });
    }

    updateBackupConfig(configType: BackupConfigType, input: BackupConfigInput): Observable<ResponseMutate> {
        return this.graphqlService.query(UPDATE_BACKUP_CONFIG_MUTATION, { configType, input });
    }


}