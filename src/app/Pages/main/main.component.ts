import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { DataModel } from '../../Models/DataModel';
import { ApiResponse } from '../../Models/ApiResponse';
import { Router } from '@angular/router';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  dataList: DataModel[] = [];
  dataObj: DataModel = new DataModel;
  isEditForm: boolean = false;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.loadData();
    this.form = fb.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loadData() {
    this.dataService.getData().subscribe((res: ApiResponse) => {
      this.dataList = res.data;
    })
  }

  onSave() {
    if (this.form.valid) {
      this.dataService.createData(this.dataObj).subscribe((res: ApiResponse) => {
        if (res.result) {
          this.alertService.showSuccess("Success", res.message);
          this.loadData();
          this.dataObj = new DataModel();
          this.form.reset();
        } else {
          this.alertService.showError("Error", res.message)
        }
      });
    }
    else{
      this.alertService.showInfo("Warning", "Please fill the required fields.");
    }
  }

  onDelete(serialNumber: number) {
    this.alertService.showWarning(
      'Are you sure?',
      'You will not be able to recover this data!',
      'Yes, delete it!',
      'No, keep it'
    ).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteData(serialNumber).subscribe((res: ApiResponse) => {
          if (res.result) {
            this.loadData();
          } else {
            this.alertService.showError("Error", res.message);
          }
        });
      }
    });
  }
  
  onEdit(editData: DataModel) {
    this.dataObj = editData;
    this.isEditMode = true;
    this.isEditForm = true;
  }

  onReset() {
    this.dataObj = new DataModel;
    this.isEditMode = false;
    this.form.reset;
  }

  // Extra if needed
  onUpdate(serialNumber: number) {
    if (this.form.valid) {
      this.dataService.updateData(serialNumber, this.dataObj).subscribe((res: ApiResponse) => {
        if (res.result) {
          this.alertService.showSuccess("Success", res.message);
          this.loadData();
          this.isEditMode = false;
          this.dataObj = new DataModel();
          this.form.reset();
        }
        else {
          this.alertService.showError("Error", res.message);
        }
      })
    }
  }

  gotonextpage() {
    localStorage.clear();
    this.router.navigateByUrl("uploadfile");
  }
}
