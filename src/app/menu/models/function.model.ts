export interface FunctionInfo {
    code?: string;
    label?: string;
    icon?: string;
    sort?: number;
    routerLink?: string;
    parentCode?: string;
    position?: number;
    actions?: string | {[key: string]: boolean};
    items?: FunctionInfo[];
    queryParams?: string | {[key: string]: boolean};
    status?: number;
}

export interface ActionInfo {
    id?: number;
    code?: string;
    name?: string;
}

export interface FunctionInput {
    label: string;
    description: string;
    icon: string;
    sort: number;
}