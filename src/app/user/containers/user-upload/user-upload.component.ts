import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from "@angular/core";
import { ToastService } from '@shared/services/toast.service';
import { UserFacade } from '../../facades/user.facade';

@Component({
    selector: 'app-user-upload',
    templateUrl: './user-upload.component.html',
    styleUrls: ['./user-upload.component.scss'],
})
export class UserUploadComponent implements OnInit {
    file: any;

    constructor(private userFacade: UserFacade,
        private ref: DynamicDialogRef, private toastService: ToastService,
        private config: DynamicDialogConfig) {
    }

    ngOnInit(): void {
    }

    getTemplate() {
        this.userFacade.getTemplate().subscribe();
    }

    onChoose(fileUpload: any) {
        fileUpload.click();
    }

    onChange(event: any) {
        if (event.target?.files && event.target?.files.length > 0) {
            if (event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || event.target.files[0].type === 'application/vnd.ms-excel') {
                this.file = event.target.files[0];
            } else {
                this.toastService.showError('Định dạng tệp không đúng! Vui lòng kiểm tra lại')
            }
        }
    }

    onUpload() {
        this.userFacade.upload(this.file).subscribe(res => {
            if (res) {
                this.ref.close(res);
            }
        });
    }

    close() {
        this.ref.destroy();
    }
}
