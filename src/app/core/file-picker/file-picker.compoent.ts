import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';

declare let $: any;

@Component({
    selector: 'file-picker',
    templateUrl: './file-picker.component.html',
    styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent implements OnInit
{

    @Input() image: any;
    @Input() imageId: any;
    @Input() editType: any;
    @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

    @Output() onFileSelect: EventEmitter<any> = new EventEmitter;
    @Output() onDeleteFile: EventEmitter<any> = new EventEmitter;
    @Input() description: string;
    @Input() isIconHidden: boolean = false;
    @Input() type: string;
    @Input() size: { width: number, height: number } = { width: 200, height: 200 };
    @Input() controlName: string = 'image';
    isDeleteShown: boolean = false;

    constructor() 
    {
        this.size = { width: 0, height: 0 };
        this.image = '';
    }

    ngOnInit() 
    {
        // // console.log('ssssssssssss')
    }

    onHover(state: string): void
    {
        if (this.image)
        {
            if (state == 'over')
            {
                this.isDeleteShown = true;
            }
            else
            {
                this.isDeleteShown = false;
            }
        }

    }

    onDeleteImage(): void
    {
        if (this.editType == 'add')
        {
            this.image = '';
        }
        else
        {
            this.image = '';
            if (this.imageId)
            {
                this.onDeleteFile.emit(this.imageId);
            }
        }

        let dict = {

            valid: false,
            file: null,
            controlName: this.controlName
        }


        this.onFileSelect.emit(dict);
    }

    onFileChange(event)
    {
        let reader: any = new FileReader();
        if (event.target.files && event.target.files.length > 0)
        {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = (event: any) =>
            {
                // this.Form.get('avatar').setValue({
                // 	filename: file.name,
                // 	filetype: file.type,
                // 	value: reader.result.split(',')[1]
                // })
                var img: any = new Image();

                img.onload = () =>
                {
                    // // console.log(img.width);
                    // // console.log(img.height);

                    let dict = {
                        filename: file.name,
                        filetype: file.type,
                        value: reader.result.split(',')[1],
                        valid: false,
                        imagePreview: event.target.result,
                        file: file,
                        controlName: this.controlName
                    }

                    if (this.type == 'Square')
                    {
                        if (Math.floor(img.width) == Math.floor(img.height))
                        {
                            // // console.log('Square pefect');
                            dict.valid = true;
                            this.onFileSelect.emit(dict);
                            this.image = event.target.result;
                        }
                        else
                        {
                            // // console.log('Square not perfect')
                            dict.valid = false;
                            this.onFileSelect.emit(dict);
                            this.image = '';
                        }
                    }
                    else
                    {
                        if (Math.floor((img.height / img.width) * this.size.width) == this.size.height)
                        {
                            // // console.log('Rect pefect', Math.floor((img.height/ img.width) * 310));
                            dict.valid = true;
                            this.onFileSelect.emit(dict);
                            this.image = event.target.result;
                        }
                        else if (img.width == 600 && img.height == 900)
                        {
                            // // console.log('Rect pefect', Math.floor((img.height / img.width) * 310));
                            dict.valid = true;
                            this.onFileSelect.emit(dict);
                            this.image = event.target.result;
                        }
                        else
                        {
                            // // console.log('Rect not perfect', Math.floor((img.height/ img.width) * 310));
                            dict.valid = true;
                            this.onFileSelect.emit(dict);
                            this.image = event.target.result;
                        }
                    }
                };

                img.src = reader.result;
            };
        }
    }
}
