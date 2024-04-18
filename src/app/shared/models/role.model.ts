
export interface RoleInfo {
    code?: string;
    label?: string;
    icon?: string;
    sort?: number;
    routerLink?: string;
    parentCode?: string;
    position?: number;
    actions?: {[key: string]: boolean} | string;
    items?: RoleInfo[];
    queryParams?: {[key: string]: boolean};
}

export interface ActionInfo {
    id?: number;
    code?: string;
    name?: string;
}