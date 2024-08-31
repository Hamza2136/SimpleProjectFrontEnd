import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showInfo(title: string, text: string, confirmButtonText: string = 'OK') {
    Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText
    });
  }

  showSuccess(title: string, text: string, confirmButtonText: string = 'Great') {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
    });
  }

  showError(title: string, text: string, confirmButtonText: string = 'Try Again') {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText
    });
  }

  showWarning(title: string, text: string, confirmButtonText: string = 'Yes, do it!', cancelButtonText: string = 'No, cancel!') {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    });
  }
}
