import { ToastService } from './../../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { NotificationConfigFacade } from '../../facades/notification-config.facade';
import { ESolnAction } from '@shared/models/type-action.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MDialogRef } from '@based/m-dialog/refs/m-dialog-ref';
import { FREQUENCY_OPT } from '@shared/constants/notification.constant';
import { LabelValue, LabelValueStr } from '@shared/models/label-value.model';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { MDialogConfig } from '@based/m-dialog/refs/m-dailog.config';
import { PATTERN } from '@shared/constants/pattern-validators.constant';

@Component({
  selector: 'app-ntf-keyword-config-mutation',
  templateUrl: './ntf-keyword-config-mutation.component.html',
  styleUrls: ['./ntf-keyword-config-mutation.component.scss']
})
export class NtfKeywordConfigMutationComponent implements OnInit {
  timesTypeOpt = FREQUENCY_OPT;
  sourceOpt = [{ label: 'Mạng xã hội', value: 'social' }, { label: 'Website', value: 'website' }];
  userOpt: { id: number, fullName: string, email: string }[] = [];
  profileOpt: LabelValueStr[] = [];
  topicOpt: LabelValue[] = [];

  emailOpt: LabelValueStr[] = [];
  telegramOpt: LabelValueStr[] = [];

  title = '';
  action = ESolnAction.INSERT;

  mutationForm: FormGroup | undefined;
  userInputForm: FormGroup | undefined;
  id?: number;

  topicKeyword = '';
  topicIndex = 0;
  topicHasNextPage = true;
  topicName = '';

  profileKeyword = '';
  profileIndex = 0;
  profileHasNextPage = true;

  userKeyword = '';
  userIndex = 0;
  userHasNextPage = true;
  isLoad = true;

  constructor(
    private ntfConfigFacade: NotificationConfigFacade,
    private dialogRef: MDialogRef,
    private fb: FormBuilder,
    private toastService: ToastService,
    private mDialogConfig: MDialogConfig
  ) { }

  get timesType(): FormControl {
    return this.mutationForm?.get('timesType') as FormControl;
  }
  get name(): FormControl {
    return this.mutationForm?.get('name') as FormControl;
  }
  // get topicId(): FormControl {
  //   return this.mutationForm?.get('topicId') as FormControl;
  // }
  get sources(): FormArray {
    return this.mutationForm?.get('sources') as FormArray;
  }
  get keyword(): FormControl {
    return this.mutationForm?.get('keyword') as FormControl;
  }
  get userIds(): FormControl {
    return this.mutationForm?.get('userIds') as FormControl;
  }

  get email(): FormControl {
    return this.mutationForm?.get('email') as FormControl;
  }
  get emails(): FormArray {
    return this.mutationForm?.get('emails') as FormArray;
  }
  get telegram(): FormControl {
    return this.mutationForm?.get('telegram') as FormControl
  }
  get channelTelegram(): FormArray {
    return this.mutationForm?.get('channelTelegram') as FormArray
  }

  get emailInput(): FormControl {
    return this.userInputForm?.get('emailInput') as FormControl;
  }
  get telegramInput(): FormControl {
    return this.userInputForm?.get('telegramInput') as FormControl;
  }

  ngOnInit(): void {
    this.title = this.ntfConfigFacade.title;
    this.action = this.ntfConfigFacade.action$;
    this._initForm();
    this.ntfConfigFacade.loadEmail();
    this.ntfConfigFacade.loadTelegram();

    if (this.ntfConfigFacade.action$ !== ESolnAction.INSERT) {
      const id = this.mDialogConfig.data?.id;
      this.isLoad = false;
      this.ntfConfigFacade.ntfConfigSingle$
        .subscribe(res => {
          if (!id || (id && res.id === id)) {
            this.topicName = res.topic.name;
            this.isLoad = true;
          }
          if (this.ntfConfigFacade.action$ !== ESolnAction.CLONE) {
            this.id = res.id;
          }
          this.mutationForm?.patchValue(res);
          this.userIds.setValue(res.users);
          this.keyword.setValue(JSON.parse(res.keyword))
          // this.topicId.setValue(res.topic.id)
          const source = JSON.parse(res.profiles) as { social: string[], website: string[] };
          this.sources.clear();
          source.social.forEach(s => {
            this.sources.push(this.fb.group({
              type: ['social'],
              profileId: [s]
            }))
          })
          source.website.forEach(w => {
            this.sources.push(this.fb.group({
              type: ['website'],
              profileId: [w]
            }))
          })
        })
    }
    this.ntfConfigFacade.getAllEmailNtf$.subscribe(res => {
      this.emailOpt = res.map(e => ({ label: e.email, value: e.email })) ?? []
    })
    this.ntfConfigFacade.getAllTelegramNtf$.subscribe(res => {
      this.telegramOpt = res.map(e => ({ label: e.channel, value: e.channel })) ?? []
    })

  }

  close() {
    this.dialogRef.close(this.dialogRef.isLoadClose);
  }

  sourceRemove(index: number) {
    this.sources.removeAt(index);
  }

  addNewSource() {
    const source = this.fb.group({
      profileId: [],
      type: ['social'],
    });
    this.sources.push(source)
    this.changeType(source)
  }

  onSelectEmail(event: any) {
    if (!this.emailInput.value) {
      return;
    }
    if (this.emailInput.invalid || event?.originalEvent?.type === 'input') {
      return;
    }
    if (this.emails.value.findIndex((v: string) => v === this.emailInput.value) > -1) {
      return;
    }

    this.emails.push(new FormControl(this.emailInput.value));
    this.emailInput.setValue(null);

  }

  onRemoveEmail(index: number) {
    this.emails.removeAt(index);
  }

  onSelectTelegram(event: any) {
    if (!this.telegramInput.value) {
      return;
    }
    if (this.telegramInput.invalid || event?.originalEvent?.type === 'input') {
      return;
    }
    if (this.channelTelegram.value.findIndex((v: string) => v === this.telegramInput.value) > -1) {
      return;
    }

    this.channelTelegram.push(new FormControl(this.telegramInput.value));
    this.telegramInput.setValue(null);

  }

  onRemoveTelegram(index: number) {
    this.channelTelegram.removeAt(index);
  }

  onSelectProfile(event: any, index: number) {
    if (this.sources.value.filter((r: any) => r.profileId === event.data.value).length > 1) {
      this.toastService.showError('Nguồn dữ liệu đích danh đã có');
      this.sources.controls[index]?.get('profileId')?.reset();
    }
  }

  filterTopic(event?: any) {
    if (this.topicKeyword !== event?.filter) {
      this.topicIndex = 0;
      this.topicOpt = [];
    }
    if (this.topicKeyword !== event?.filter || this.topicHasNextPage) {
      this.topicKeyword = event?.filter;
      this.ntfConfigFacade.searchTopicNotNtfKeywordConfig({ keyword: this.topicKeyword, pageIndex: this.topicIndex, pageSize: 34 }).subscribe(res => {
        const dataCopy = [...this.topicOpt];
        dataCopy.push(...res.data ?? []);
        this.topicOpt = dataCopy;
        this.topicHasNextPage = res.pageInfo?.hasNextPage ?? false;
      })
      this.topicIndex++;
    }
  }

  filterUser(event?: any) {
    if (this.userKeyword !== event?.filter) {
      this.userIndex = 0;
      this.userOpt = [];
    }
    if (this.userKeyword !== event?.filter || this.userHasNextPage) {
      this.userKeyword = event?.filter;
      this.ntfConfigFacade.filterUser(this.userKeyword, this.userIndex, 34).subscribe(res => {
        const dataCopy = [...this.userOpt];
        dataCopy.push(...res.data ?? []);
        this.userOpt = dataCopy;
        this.userHasNextPage = res.pageInfo?.hasNextPage ?? false;
      })
      this.userIndex++;
    }
  }

  changeType(source?: any) {
    source.get('profileId').setValue();
    this.profileKeyword = '';
    this.profileHasNextPage = true;
    this.profileIndex = 0;
    this.profileOpt = [];
    this.filterProfile({}, source);
  }

  filterProfile(event?: any, source?: any) {
    if (this.profileKeyword !== event?.filter) {
      this.profileIndex = 0;
      this.profileOpt = [];
    }
    if (this.profileKeyword !== event?.filter || this.profileHasNextPage) {
      this.profileKeyword = event?.filter;
      if (source.get('type').value === 'social') {
        this.ntfConfigFacade.searchProfile({ keyword: this.profileKeyword, pageIndex: this.profileIndex, pageSize: 34 }).subscribe(res => {
          const dataCopy = [...this.profileOpt];
          dataCopy.push(...res.data ?? []);
          this.profileOpt = dataCopy;
          this.profileHasNextPage = res.pageInfo?.hasNextPage ?? false;
        })
      } else {
        this.ntfConfigFacade.searchDomain({ domain: this.profileKeyword, pageIndex: this.profileIndex, pageSize: 34 }).subscribe(res => {
          const dataCopy = [...this.profileOpt];
          dataCopy.push(...res.data ?? []);
          this.profileOpt = dataCopy;
          this.profileHasNextPage = res.pageInfo?.hasNextPage ?? false;
        })
      }
      this.profileIndex++;
    }
  }

  save(isClose = true) {
    this.ntfConfigFacade.saveNtfKeywordConfig(this.mutationForm?.value, this.id).subscribe(res => {
      if (isClose && res) {
        this.dialogRef.close(res);
      }
      if (res) {
        this.dialogRef.isLoadClose = true;
        this._initForm();
      }
    });
  }

  private _initForm() {
    this.mutationForm = this.fb.group({
      timesType: [, Validators.compose([Validators.required])],
      name: [, Validators.compose([Validators.required, CustomVaidators.NoWhiteSpaceValidator()])],
      // topicId: [, Validators.compose([Validators.required])],
      facebook: [false],
      youTube: [false],
      tiktok: [false],
      website: [false],
      positive: [false],
      negative: [false],
      neutral: [false],
      email: [false],
      telegram: [false],
      ntfApp: [false],
      profiles: [],
      keyword: [, Validators.compose([CustomVaidators.chipsDuplicate()])],
      userIds: [],
      emails: this.fb.array([]),
      channelTelegram: this.fb.array([]),
      sources: this.fb.array([])
    });
    this.userInputForm = this.fb.group({
      emailInput: [, Validators.compose([Validators.pattern(PATTERN.email)])],
      telegramInput: [, Validators.compose([Validators.pattern(PATTERN.telegram)])]
    })
  }
}