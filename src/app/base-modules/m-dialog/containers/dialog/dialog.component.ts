import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InsertionDirective } from '../../directive/insertion.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly _closed = new Subject<any>();

  display = false;

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective | undefined;

  public componentRef: ComponentRef<any> | undefined;
  public childComponentType: Type<any> | undefined;
  public onClose = this._closed.asObservable();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType!)
      .pipe(delay(15))
      .subscribe((res) => {
        this.display = res;
      });
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  loadChildComponent(componentType: Type<any>): Observable<boolean> {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );

    let viewContainerRef = this.insertionPoint!.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);

    //add class custom
    this.componentRef.location.nativeElement.setAttribute("class", "custom-sidebar-wapper")

    this._closed.next(true);

    return of(true);
  }

  close() {
    this.display = false;
    this._closed.next(this.display);
  }

  hiden() {
    this.display = false;
  }
}
