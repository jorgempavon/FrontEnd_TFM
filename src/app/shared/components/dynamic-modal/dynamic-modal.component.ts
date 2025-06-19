import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ModalButton } from '../../dtos/modalButtonDto';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.css']
})
export class DynamicModalComponent implements AfterViewInit {

  @Input() title: string = '';
  @Input() body: string = '';
  @Input() buttons: ModalButton[] = [];
  @Input() modalId: string = 'defaultModal';

  modalInstance: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const modalEl = this.el.nativeElement.querySelector(`#${this.modalId}`);
    this.modalInstance = new Modal(modalEl);
  }

  open() {
    this.modalInstance?.show();
  }

  close() {
    this.modalInstance?.hide();
  }
}
