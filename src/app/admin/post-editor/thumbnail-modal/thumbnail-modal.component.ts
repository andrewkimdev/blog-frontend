import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ImageFileInfo } from '../image-uploader/image-file-info.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thumbnail-modal',
  templateUrl: './thumbnail-modal.component.html',
  styleUrls: ['./thumbnail-modal.component.scss']
})
export class ThumbnailModalComponent implements OnChanges {
  @Input('imageFile')
  fileInfo!: ImageFileInfo;

  @Input()
  open = false;

  @Output()
  openChange = new EventEmitter<boolean>();

  @Output('file-link')
  linkEmitter = new EventEmitter<string>();

  imageLink = '';

  copyButtonText = 'Insert Link'

  constructor(private cdr: ChangeDetectorRef) {
  }

  onCopyClicked() {
    this.copyLinkToClipboard(this.imageLink);
    this.emitLink(this.imageLink);
    this.closeModal();
  }

  emitLink(link: string) {
    this.linkEmitter.emit(link);
  }

  closeModal(): void {
    this.copyButtonText = 'Insert Link';
    this.cdr.detectChanges();
    this.openChange.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const info = changes['fileInfo'];
    if (changes['fileInfo']) {
      this.imageLink = `![image](${environment.baseUrl}/images/${info.currentValue.id})`;
    }
  }

  private copyLinkToClipboard(str: string) {
    const clipboardItem = new ClipboardItem({ 'text/plain': new Blob([str], { type: 'text/plain' }) });

    // Use the Clipboard API to write the item to the clipboard
    navigator.clipboard.write([clipboardItem]).then(() => {
      this.copyButtonText = 'Insert Link'
      this.cdr.detectChanges();
    }).catch(err => {
      console.error('Could not copy text to clipboard', err);
    });
  }
}
