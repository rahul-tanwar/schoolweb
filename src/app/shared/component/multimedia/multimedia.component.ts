import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MultimediaFile } from '../../model/mutimedia';




@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-multimedia',
    styleUrls: ['./multimedia.component.css'],
    templateUrl: './multimedia.component.html'
})
export class MultimediaComponent implements OnInit {

    @Input() public item: MultimediaFile;

    public trustedUrl: any;

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
    ) {


    }



    public ngOnInit(): void {

    }


    public click(): void {
        // Trigger browser upload window
        document.getElementById(this.item.id).click();
    }

    public onChange(event: any): void {
        const filedata = event.target.files[0];

        if (filedata) {
            const reader = new FileReader();
            const fileType = filedata.type as string;
            const fileName = filedata.name as string;
            if (!fileType.startsWith('image/')) {
                //   void this.notificationsService.addNotification('TEMP ISSUE: Accepts only images', 'warning');

                // } else if (filedata.size && filedata.size >= 1048576) { // 1 MB
                //         void this.notificationsService.addNotification('TEMP ISSUE: Size limitation 1 MB', 'warning');

            } else {

                reader.onerror = () => {
                    console.warn('Failed to upload file:', fileName, fileType);
                    this.clear();
                };

                reader.onload = () => {
                    this.item.data = reader.result.split(',')[1];
                    this.item.fileName = fileName;
                    this.item.fileType = fileType.split('/')[1];
                    this.changeDetectorRef.detectChanges();
                };

                reader.readAsDataURL(filedata);
                console.log(reader);

            }
        }

        // Browser trick to erase selection, so same file can be re-selected.
        if (event && event.target) {
            event.target.value = null;
        }
    }

    public clear(): void {
        this.item.data = null;
        this.item.fileName = undefined;
        this.item.fileType = undefined;
        this.changeDetectorRef.detectChanges();
    }
}
