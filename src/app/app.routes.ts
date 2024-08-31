import { Routes } from '@angular/router';
import { MainComponent } from './Pages/main/main.component';
import { UploadFileComponent } from './Pages/upload-file/upload-file.component';

export const routes: Routes = [
    {path: '', component:MainComponent},
    {path: 'uploadfile', component:UploadFileComponent},


];
