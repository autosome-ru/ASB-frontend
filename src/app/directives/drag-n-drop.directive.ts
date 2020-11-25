import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[astraDragDrop]'
})
export class DragDropDirective {

  @Output()
  public fileDropped = new EventEmitter<FileList>();

  @HostBinding('style.background-color')
  private background = '#f5fcff';
  @HostBinding('style.opacity')
  private opacity = '1';
  @HostListener('dragover', ['$event'])
  onDragOver(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files: FileList = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
