import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  loggedData: any;
  uploadLink: string = '';
  files: File[] = [];
  filePreviews: { name: string, size: number }[] = [];
  showModal: boolean = true;
  form: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loggedData = localStorage.getItem('UserData');
    if (this.loggedData != null) {
      this.loggedData = JSON.parse(this.loggedData);
      this.uploadLink = this.loggedData.uploadLink;
      this.showModal = false;
    }
  }

  onLogin(): void {
    if (this.form.valid) {
      const loginObj = this.form.value;
      this.dataService.login(loginObj.email, loginObj.password).subscribe((res: ApiResponse) => {
        if (res.result) {
          this.alertService.showSuccess("Success", res.message);
          localStorage.setItem('UserData', JSON.stringify(res.data));
          this.uploadLink = res.data.uploadLink;
          this.showModal = false;
        } else {
          this.alertService.showError("Error", res.message);
        }
      });
    } else {
      this.alertService.showInfo("Warning", "All fields are required.");
    }
  }

  onFilesSelected(event: any): void {
    const selectedFiles = event.target.files;
    this.handleFiles(selectedFiles);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      const droppedFiles = event.dataTransfer.files;
      this.handleFiles(droppedFiles);
    }
  }

  handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
      this.filePreviews.push({
        name: files[i].name,
        size: files[i].size,
      });
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }

  onSubmit(): void {
    if (this.files.length === 0) {
      this.alertService.showInfo("Info", "Please select files to upload.")
      return;
    }
    this.dataService.uploadFiles(this.files, this.uploadLink).subscribe((res: ApiResponse) => {
      if (res.result) {
        this.alertService.showSuccess("Success", "File sucssefully uploaded.");
        this.files = [];
        this.filePreviews = [];
      }
    });
  }

  browseFiles(): void {
    this.fileInput.nativeElement.click();
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }
}