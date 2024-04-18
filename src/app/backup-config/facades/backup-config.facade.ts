import { ToastService } from './../../shared/services/toast.service';
import { BehaviorSubject, EMPTY, Observable, catchError, distinctUntilChanged, filter, tap } from 'rxjs';
import { BackupConfigService } from './../services/backup-config.service';
import { Injectable } from "@angular/core";
import { BackupConfigInfo, BackupConfigInput, BackupConfigType } from '../models/backup-config.model';
import { ResponseMutate } from '@shared/models/response-mutate.model';
import { ERR_MESSAGE_LABEL } from '@shared/constants/error-message.constant';

@Injectable({
	providedIn: 'root',
})
export class BackupConfigFacade {
	private _backupCongfigSingle = new BehaviorSubject<BackupConfigInfo | null>(null);

	constructor(private backupConfigService: BackupConfigService, private toastService: ToastService) {
	}

	get backupCongfigSingle$(): Observable<BackupConfigInfo> {
		return this._backupCongfigSingle.asObservable().pipe(
			filter((res: any) => res),
			distinctUntilChanged()
		);
	}

	getDetailBackupConfigByType(configType: BackupConfigType): Observable<BackupConfigInfo> {
		return this.backupConfigService.getDetailBackupConfigByType(configType).pipe(tap(res => {
			this._backupCongfigSingle.next(res);
		}))
	}

	save(configType: BackupConfigType, input: BackupConfigInput): Observable<ResponseMutate> {
		return this.backupConfigService.updateBackupConfig(configType, input).pipe(
			tap((_) => {
				this.toastService.showSuccess(configType === BackupConfigType.STRUCTURE ? 'Cập nhật cấu hình lưu dữ liệu có cấu trúc thành công' : 'Cập nhật cấu hình lưu dữ liệu phi cấu trúc thành công')
			}),
			catchError(err => {
				this.toastService.showError(ERR_MESSAGE_LABEL(err.message));
				return EMPTY;
			})
		);
	}
}