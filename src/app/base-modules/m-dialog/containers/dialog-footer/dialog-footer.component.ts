import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ESolnAction } from '@shared/models/type-action.model';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
})
export class DialogFooterComponent implements OnInit {
  @Output() onSave = new EventEmitter<any>();
  @Output() onSaveContinue = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<any>();

  @Input() disabledSave = false;
  @Input() isOnSave = true;
  @Input() isOnSaveContinue = true;
  @Input() isOnClose = true;

  @Input() cancelLabel = 'Hủy';
  @Input() saveLabel = 'Lưu';
  @Input() saveContinueLabel = 'Lưu tiếp tục';

  constructor() { }

  ngOnInit(): void { }
}
