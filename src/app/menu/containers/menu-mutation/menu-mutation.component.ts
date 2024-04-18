import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { MenuFacade } from '../../facades/menu.facade';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';

@Component({
  selector: 'app-menu-mutation',
  templateUrl: './menu-mutation.component.html',
  styleUrls: ['./menu-mutation.component.scss']
})
export class MenuMutationComponent implements OnInit {
  title = 'Cập nhật menu';

  mutation?: FormGroup;
  code = '';

  constructor(private fb: FormBuilder, private menuFacade: MenuFacade, private dialogRef: MDialogRef) { }

  get label(): FormControl {
    return this.mutation?.get('label') as FormControl;
  }

  get icon(): FormControl {
    return this.mutation?.get('icon') as FormControl;
  }

  get parent(): FormControl {
    return this.mutation?.get('parent') as FormControl;
  }

  ngOnInit(): void {
    this._initForm();
    this.menuFacade.func$.subscribe(res => {
      this.mutation?.patchValue(res)
      this.code = res.code!;
    })
    this.menuFacade.parent$.subscribe(res => {
      if (res) {
        this.parent.setValue(res.label)
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.menuFacade.updateFunction(this.code, this.mutation?.value).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  selectIcon(event: any) {
    if (event.target.innerText) {
      this.icon.setValue(`pi ${event.target.innerText}`)
    } else {
      this.icon.setValue(event.target.classList.value);
    }
  }

  private _initForm() {
    this.mutation = this.fb.group({
      label: [, Validators.compose([Validators.required, Validators.maxLength(255), CustomVaidators.NoWhiteSpaceValidator()])],
      icon: [],
      sort: [],
      routerLink: [],
      parent: []
    })
  }
}
