import { Injectable } from "@angular/core";
import { GraphqlService } from "@graphql/graphql.service";
import { Observable } from "rxjs";
import { GET_ALL_ACTION_QUERY, GET_ALL_FUNCTION_QUERY, GET_ALL_STATUS_FUNCTION_QUERY, UPDATE_FUNCTION_MUTATION, UPDATE_FUNCTION_SORT_MUTATION, UPDATE_STATUS_FUNCTION_MUTATION } from "@graphql/query/function.graphql";
import { FunctionInput } from "../models/function.model";
import { ResponseMutate } from "@shared/models/response-mutate.model";
import { ActionInfo, RoleInfo } from "@shared/models/role.model";

@Injectable({
  providedIn: 'root',
})
export class FunctionService {
  constructor(private graphqlService: GraphqlService) { }


  getAllFunction(): Observable<RoleInfo[]> {
    return this.graphqlService.query(GET_ALL_FUNCTION_QUERY);
  }

  getAllStatusFunction(): Observable<RoleInfo[]> {
    return this.graphqlService.query(GET_ALL_STATUS_FUNCTION_QUERY);
  }

  getAllAction(): Observable<ActionInfo[]> {
    return this.graphqlService.query(GET_ALL_ACTION_QUERY);
  }

  updateFunction(code: string, input: FunctionInput): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_FUNCTION_MUTATION, { code, input });
  }

  updateStatusFunction(code: string, status: number): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_STATUS_FUNCTION_MUTATION, { code, status });
  }

  updateSort(input: { code: string, sort: number }[], parentCode?: string): Observable<ResponseMutate> {
    return this.graphqlService.mutation(UPDATE_FUNCTION_SORT_MUTATION, { parentCode, input });
  }
}