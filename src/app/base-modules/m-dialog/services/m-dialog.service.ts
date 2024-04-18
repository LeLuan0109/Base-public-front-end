import { SessionService } from 'src/app/shared/services/session.service';
import { MDialogConfig } from './../refs/m-dailog.config';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from '../containers/dialog/dialog.component';
import { MDialogInjector } from '../injectors/dialog.injector';
import { MDialogRef } from '../refs/m-dialog-ref';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: SharedModule,
})
export class MDialogService {
  dialogComponentRef: Map<
    MDialogRef,
    ComponentRef<DialogComponent>
  > = new Map();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private mDialogConfig: MDialogConfig,
    private sessionService: SessionService,
    private location: LocationStrategy
  ) { }

  public open(componentType: Type<any>, config?: any): MDialogRef {
    const ref = this.appendDialogComponentToBody();
    this.dialogComponentRef.get(
      ref
    )!.instance.childComponentType = componentType;
    this.mDialogConfig.setData(config);
    return ref;
  }

  private appendDialogComponentToBody(): MDialogRef {
    const map = new WeakMap();
    const dialogRef = new MDialogRef();
    map.set(MDialogRef, dialogRef);

    const sub = dialogRef.afterClosed
      .pipe(
        tap(() => {
          if (this.dialogComponentRef.get(dialogRef)!.instance.display) {
            this.dialogComponentRef.get(dialogRef)!.instance.hiden();
          }
        }),
        delay(200)
      )
      .subscribe(() => {
        // close the dialog
        this.removeDialogComponentFromBody(dialogRef);
        sub.unsubscribe();
      });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DialogComponent
    );
    const componentRef = componentFactory.create(
      new MDialogInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef.set(dialogRef, componentRef);

    this.dialogComponentRef.get(dialogRef)!.instance.onClose.subscribe((res) => {
      if (!res) {
        dialogRef.close(dialogRef.isLoadClose);
      }
    });
    if (!this.sessionService.checkToken()) {
      dialogRef.close(dialogRef.isLoadClose);
    }
    this.location.onPopState(() => {
      dialogRef.close(dialogRef.isLoadClose);
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(dialogRef: MDialogRef) {
    if (!dialogRef || !this.dialogComponentRef.has(dialogRef)) {
      return;
    }

    this.appRef.detachView(this.dialogComponentRef.get(dialogRef)!.hostView);
    this.dialogComponentRef.get(dialogRef)!.destroy();
    this.dialogComponentRef.delete(dialogRef);
    const child = document.getElementsByClassName('p-sidebar-mask');
    const appDialog = document.getElementsByTagName('app-dialog');
    if (child && child.length > 0) {
      document.body.removeChild(child[0]);
      document.body.removeChild(appDialog[0]);
    }
  }
}
