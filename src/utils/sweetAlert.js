// utils/sweetalert.js
import Swal from 'sweetalert2';

export const showSuccess = (message) => {
  return Swal.fire({
    title: 'Başarılı!',
    text: message,
    icon: 'success',
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#3085d6'
  });
};

export const showError = (message) => {
  return Swal.fire({
    title: 'Hata!',
    text: message,
    icon: 'error',
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#d33'
  });
};

export const showWarning = (message) => {
  return Swal.fire({
    title: 'Uyarı!',
    text: message,
    icon: 'warning',
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#f8bb86'
  });
};

export const showConfirm = (message) => {
  return Swal.fire({
    title: 'Emin misiniz?',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Evet',
    cancelButtonText: 'Hayır'
  });
};