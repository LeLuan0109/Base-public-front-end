import { PATTERN } from '../../../shared/constants/pattern-validators.constant';
import { MDialogRef } from '../../../base-modules/m-dialog/refs/m-dialog-ref';
import { AccountFacade } from '../../facades/account.facade';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Action, ESolnAction } from 'src/app/shared/models/type-action.model';
import { CustomVaidators } from 'src/app/shared/validators/custom.validator';
import { LabelValue } from '@shared/models/label-value.model';
import { combineLatest } from 'rxjs';
import { ActionInfo, RoleInfo } from '@shared/models/role.model';

@Component({
  selector: 'app-account-mutation',
  templateUrl: './account-mutation.component.html',
  styleUrls: ['./account-mutation.component.scss']
})
export class AccountMutationComponent implements OnInit {
  mutation: FormGroup | undefined;

  title = '';
  action = ESolnAction.INSERT;
  typePass = 'password';
  id: number | undefined;

  functions: RoleInfo[] = [];
  actions: ActionInfo[] = [];

  constructor(
    private dialogRef: MDialogRef,
    private fb: FormBuilder,
    private accountFacade: AccountFacade
  ) {
  }

  get username(): FormControl {
    return this.mutation?.get('username') as FormControl
  }
  get password(): FormControl {
    return this.mutation?.get('password') as FormControl
  }
  get passwordConfirmation(): FormControl {
    return this.mutation?.get('passwordConfirmation') as FormControl
  }
  get fullName(): FormControl {
    return this.mutation?.get('fullName') as FormControl
  }
  get all(): FormControl {
    return this.mutation?.get('all') as FormControl
  }
  get f(): { [key: string]: AbstractControl } {
    return this.mutation?.controls!
  }

  ngOnInit(): void {
    this.action = this.accountFacade.action$;
    this.title = this.accountFacade.title;
    this._initForm();
    combineLatest({
      fun: this.accountFacade.functions$,
      ac: this.accountFacade.actions$,
    })
      .subscribe(res => {
        this.actions = res.ac;
        this.functions = res.fun;
        this._initFromRoles();
      });
    if (this.action !== ESolnAction.INSERT) {
      this.accountFacade.accountSingle$.subscribe(account => {
        this.id = this.action === ESolnAction.CLONE ? undefined : account.id;
        this.mutation?.patchValue(account);
        this._setRolesForm(account.roles);
      })
    }
  }

  close() {
    this.dialogRef.close(this.dialogRef.isLoadClose);
  }

  save(isClose = true) {
    this.accountFacade.saveAccount(this.mutation?.value, this.id).subscribe(res => {
      if (isClose && res) {
        this.dialogRef.close(res);
      }
      if (res) {
        this.dialogRef.isLoadClose = true;
        this.mutation?.reset();
      }
    })
  }

  generatePassword() {
    const randomstring = Math.random().toString(36).slice(-8);
    this.password.setValue(randomstring);
    this.passwordConfirmation.setValue(randomstring);
    this.passwordConfirmation.updateValueAndValidity();
    this.password.updateValueAndValidity();
  }

  toggleMaskPass() {
    this.typePass = this.typePass === 'password' ? 'text' : 'password';
  }

  onChangePass() {
    this.passwordConfirmation.updateValueAndValidity()
  }

  changeAll() {
    this._setAllValue(this.all.value);
  }

  changeCol(col: ActionInfo, index: number) {
    this.setByColChange(col.code!, this.f['col_' + col.code].value);
  }

  changeRow(row: RoleInfo, index: number, parent?: RoleInfo) {
    // set cell of row
    const value = this.f['row_' + row.code].value;
    this.all.setValue(value);
    if (row.actions) {
      Object.keys(row.actions!).forEach((key) => {
        this.f[row.code!].get(key)?.setValue(value);
      });

      if (parent) {
        this.f['row_' + parent.code].setValue(value);
        if (value) {
          parent.items?.forEach(sub => {
            if (!this.f['row_' + sub.code].value) {
              this.f['row_' + parent.code].setValue(false);
            }
          })
        }
      }

    } else {
      row.items?.forEach(sub => {
        this.f['row_' + sub.code].setValue(value);
        if (sub.actions) {
          Object.keys(sub.actions!).forEach((key) => {
            this.f[sub.code!].get(key)?.setValue(value);
          });
        }
      })
    }
    // set all
    if (value) {
      this.functions.forEach((f) => {
        if (!this.f['row_' + f.code].value) {
          this.all.setValue(false);
          return;
        }
      });

      if (this.all.value) {
        this.actions.forEach((col) => {
          this.f['col_' + col.code].setValue(true);
        });
      }
    } else {
      this.actions.forEach((col) => {
        this.f['col_' + col.code].setValue(false);
      });
    }
  }

  changeCell(row: RoleInfo, col: ActionInfo, parent?: RoleInfo) {
    if (this.f[row.code!].get(col.code!)?.value) {
      // set row all
      this.f['row_' + row.code].setValue(true);
      if (row.actions) {
        Object.keys(row.actions).forEach((key) => {
          if (!this.f[row.code!].get(key)?.value) {
            this.f['row_' + row.code].setValue(false);
            return;
          }
        });
      }

      // set col all
      this.f['col_' + col.code].setValue(true);
      this.functions.forEach((f) => {
        if (f.actions && (f.actions as { [key: string]: boolean })[col.code!] !== undefined) {
          if (!this.f[f.code!].get(col.code!)?.value) {
            this.f['col_' + col.code].setValue(false);
            return;
          }
        }
        f.items?.forEach(fi => {
          if (fi.actions && (fi.actions as { [key: string]: boolean })[col.code!] !== undefined) {
            if (!this.f[fi.code!].get(col.code!)?.value) {
              this.f['col_' + col.code].setValue(false);
              return;
            }
          }
        })
      });

      // set all
      this.all.setValue(true);
      this.actions.forEach((ac) => {
        if (!this.f['col_' + ac.code].value) {
          this.all.setValue(false);
          return;
        }
      });

      // set row parent
      if (parent) {
        this.f['row_' + parent.code].setValue(true);
        parent.items?.forEach(sub => {
          if (!this.f['row_' + sub.code].value) {
            this.f['row_' + parent.code].setValue(false);
          }
        })
      }

    } else {
      //set all
      this.all.setValue(false);
      //set col all
      this.f['col_' + col.code].setValue(false);
      //set row all
      this.f['row_' + row.code].setValue(false);
      // set row parent
      if (parent) {
        this.f['row_' + parent.code].setValue(false);
      }
    }
  }

  private _initForm() {
    this.mutation = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN.email)])],
      fullName: [, Validators.compose([Validators.required, CustomVaidators.NoWhiteSpaceValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6),
      Validators.maxLength(64), Validators.pattern(PATTERN.password)])],
      passwordConfirmation: ['', Validators.compose([Validators.required])],
      all: [true]
    })

    this.passwordConfirmation.setValidators([
      Validators.required,
      CustomVaidators.ConfirmMatchValidator(
        this.password
      ),
    ])

    if (this.action === ESolnAction.UPDATE) {
      this.generatePassword();
    }
  }

  private _initFromRoles() {
    this.actions.forEach((ac) => {
      this.mutation?.setControl('col_' + ac.code, new FormControl(true));
    });
    this.functions.forEach((f) => {
      this.mutation?.setControl('row_' + f.code, new FormControl(true));

      this.mutation?.setControl(f.code!, new FormGroup({}));
      const callActions = this.mutation?.get(f.code!) as FormGroup;
      if (f.actions) {
        const acs = f.actions as { [key: string]: any };
        this.actions.forEach((ac) => {
          if (acs[ac.code!] !== undefined) {
            callActions.setControl(ac.code!, new FormControl(acs[ac.code!]));
            if (acs[ac.code!] === false) {
              this.all.setValue(false);
              this.f['col_' + ac.code].setValue(false);
              this.f['row_' + f.code].setValue(false);
            }
          }
        });
      }
      if (f.items!.length > 0) {
        f.items?.forEach((fi) => {
          this.mutation?.setControl('row_' + fi.code, new FormControl(true));

          this.mutation?.setControl(fi.code!, new FormGroup({}));
          const callActions = this.mutation?.get(fi.code!) as FormGroup;
          if (fi.actions) {
            const acs = fi.actions as { [key: string]: any };
            this.actions.forEach((ac) => {
              if (acs[ac.code!] !== undefined) {
                callActions.setControl(ac.code!, new FormControl(acs[ac.code!]));
                if (acs[ac.code!] === false) {
                  this.all.setValue(false);
                  this.f['col_' + ac.code].setValue(false);
                  this.f['row_' + fi.code].setValue(false);
                  this.f['row_' + f.code].setValue(false);
                }
              }
            });
          }
        })
      }
    })
  }

  private _setAllValue(value: boolean) {
    // set col all
    this.actions.forEach((c) => {
      this.f['col_' + c.code].setValue(value);
    });
    // set col all
    this.functions.forEach((f) => {
      this.f['row_' + f.code].setValue(value);
      if (f.actions) {
        Object.keys(f.actions).forEach(a => {
          this.f[f.code!].get(a)?.setValue(value);
        })
      }
      if (f.items!.length > 0) {
        f.items?.forEach(fi => {
          this.f['row_' + fi.code].setValue(value);
          if (fi.actions) {
            Object.keys(fi.actions).forEach(a => {
              this.f[fi.code!].get(a)?.setValue(value);
            })
          }
        })
      }
    });
  }

  private setByColChange(code: string, value: boolean) {
    // set cell of col
    this.functions.forEach((f) => {
      if (f.actions) {
        this.f[f.code!]?.get(code)?.setValue(value);
      }
      f.items?.forEach(fi => {
        if (fi.actions) {
          this.f[fi.code!]?.get(code)?.setValue(value);
        }
      })
    });

    // set all
    this.all.setValue(value);
    if (value) {
      this.actions.forEach((c) => {
        if (!this.f['col_' + c.code].value) {
          this.all.setValue(false);
          return;
        }
      });
      if (this.all.value) {
        this.functions.forEach((f) => {
          this.f['row_' + f.code].setValue(value);
          f.items?.forEach(fi => {
            this.f['row_' + fi.code].setValue(value);
          })
        });
      }
    } else {
      this.functions.forEach((f) => {
        this.f['row_' + f.code].setValue(value);
        f.items?.forEach(fi => {
          this.f['row_' + fi.code].setValue(value);
        })
      });
    }
  }

  private _setDataForm(roles?: string) {
    if (!roles) {
      return;
    }
    const functions = JSON.parse(roles) as RoleInfo[];
    functions.forEach(f => {
      if (f.actions) {
        const objAction = Object.entries(f.actions);
        objAction.forEach(el => {
          this.f[f.code!].get(el[0])?.setValue(el[1]);
        })
        if (objAction.length > 0 && objAction.findIndex(el => el[1] === false) < 0) {
          this.f['row_' + f.code].setValue(true);
        }
      } else {
        let countSub = 0;
        f.items?.forEach(sub => {
          if (sub.actions) {
            const objAction = Object.entries(sub.actions);
            objAction.forEach(el => {
              this.f[sub.code!].get(el[0])?.setValue(el[1]);
            })
            if (objAction.length > 0 && objAction.findIndex(el => el[1] === false) < 0) {
              this.f['row_' + sub.code].setValue(true);
              countSub++;
            }
          }
        })
        if (countSub === f.items!.length) {
          this.f['row_' + f.code].setValue(true);
        }
      }
    })
    // check all
    if (functions.length > 0 && functions.findIndex(f => this.f['row_' + f.code].value === false) < 0) {
      this.all.setValue(true);
    }
    // set col all
    this.actions.forEach(col => {
      this.f['col_' + col.code].setValue(true);
      this.functions.forEach((f) => {
        if (f.actions && (f.actions as { [key: string]: boolean })[col.code!] !== undefined) {
          if (!this.f[f.code!].get(col.code!)?.value) {
            this.f['col_' + col.code].setValue(false);
            return;
          }
        }
        f.items?.forEach(fi => {
          if (fi.actions && (fi.actions as { [key: string]: boolean })[col.code!] !== undefined) {
            if (!this.f[fi.code!].get(col.code!)?.value) {
              this.f['col_' + col.code].setValue(false);
              return;
            }
          }
        })
      });
    });
  }

  private _setRolesForm(roles?: string) {
    if (!roles) {
      return;
    }
    const functions = JSON.parse(roles) as RoleInfo[];
    functions.forEach(f => {
      if (f.actions) {
        const objAction = Object.entries(JSON.parse(f.actions as string));
        objAction.forEach(el => {
          this.f[f.code!].get(el[0])?.setValue(el[1]);
        })
        if (objAction.length > 0 && objAction.findIndex(el => el[1] === false) < 0) {
          this.f['row_' + f.code].setValue(true);
        }
      }
    })
    // check all
    if (functions.length > 0 && functions.findIndex(f => this.f['row_' + f.code].value === false) < 0) {
      this.all.setValue(true);
    }
    // set col all
    this.actions.forEach(col => {
      this.f['col_' + col.code].setValue(true);
      this.functions.forEach((f) => {
        if (f.actions && (f.actions as { [key: string]: boolean })[col.code!] !== undefined) {
          if (!this.f[f.code!].get(col.code!)?.value) {
            this.f['col_' + col.code].setValue(false);
            return;
          }
        }
        f.items?.forEach(fi => {
          if (fi.actions && (fi.actions as { [key: string]: boolean })[col.code!] !== undefined) {
            if (!this.f[fi.code!].get(col.code!)?.value) {
              this.f['col_' + col.code].setValue(false);
              return;
            }
          }
        })
      });
    });
  }
}
