import { ActivatedRouteSnapshot, Router } from '@angular/router';

export interface DataTitle {
  title?: string;
  showSearch?: boolean;
}

export const GET_TITLE = (
  router: Router,
  activatedRoutes: ActivatedRouteSnapshot[],
  url = ''
): DataTitle => {
  let data: DataTitle = {};
  const curentUrl = router.url.split('?')[0];
  if (activatedRoutes) {
    activatedRoutes.filter((e: any) => {
      if (e) {
        if (e.url.length > 0) {
          [...e.url].forEach(u => {
            if (u.path) {
              url += '/' + u.path;
            }
          });
        }
        if (e.children) {
          data = GET_TITLE(router, e.children, url);
        }
        if (url === curentUrl && e.data?.title) {
          data = e.data;
        }
      }
    });
  }
  return data;
};