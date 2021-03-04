import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertDialog } from './alert/alert.dialog';
import { FilePickerComponent } from './file-picker/file-picker.compoent';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
     
    ],
    declarations: [
       
        AlertDialog,
        FilePickerComponent,
       
    ],
    exports: [
       
        AlertDialog,
        FilePickerComponent,
      
    ],
    providers: [

    ],
    entryComponents: [
        AlertDialog
    ],
})
export class CoreModule { }
