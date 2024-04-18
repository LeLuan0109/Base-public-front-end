
export interface TopPostInfo {
    title: string;
    pubTime: number;
    authName: string;
    url: string;
    content: string;
    socPSourceType: string;
    createSource: string;
}

export class TopPostsModel {
    data: TopPostInfo[] = [];

    pipeLine(res: any) {
        this.data = res;
    }
}
