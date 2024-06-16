import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetUsers } from '../services/api.getUser.service';
import { createUser } from '../services/api.createUser.service';
import { editUser } from '../services/api.editUser.service ';
import { deleteUser } from '../services/api.deleteUser.server';
import { User, DataSend } from '../services/users.type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-content2',
  templateUrl: './content2.component.html',
  styleUrls: ['./content2.component.css'],
})
export class Content2Component implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  dataSend: DataSend = { name: '', email: '', street: '' };
  displayedColumns: string[] = ['name', 'email', 'street', 'actions'];
  isUpdate: boolean = false;
  userId: number = 0;

  constructor(
    private getUsersService: GetUsers,
    private fb: FormBuilder,
    private createUserService: createUser,
    private editUserService: editUser,
    private deleteUserService: deleteUser,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private scroller: ViewportScroller
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  cancelUpdate():void{
    this.isUpdate = false
    this.userForm.reset();
  }

  fetchUsers(): void {
    this.getUsersService.fetchData().subscribe(
      (response) => {
        this.users = response;
        console.log('berhasil dapat data user:', this.users);
      },
      (error) => {
        console.error('Ada error saat mengambil data pengguna:', error);
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.isUpdate) {
        this.editUserService
          .updateData(this.userId, userData)
          .subscribe((response) => {
            console.log('user berhasil diedit', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Berhasil edit user',
            });
            this.isUpdate = false;
            this.fetchUsers();
            this.userForm.reset();
          });
      } else {
        this.createUserService.createUser(userData).subscribe(
          (response) => {
            console.log('User berhasil dibuat', response);
            this.fetchUsers(); // Refresh daftar pengguna setelah pembuatan berhasil
            this.userForm.reset(); // Reset form setelah berhasil
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Berhasil membuat user baru',
            });
          },
          (error) => {
            console.error('Error creating user:', error);
            this.toastr.error('Gagal membuat user');
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Gagal membuat user',
            });
          }
        );
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  editUser(user: User) {
    // Mengisi form dengan nilai pengguna yang dipilih

    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      street: user.address.city,
    });

    this.isUpdate = true;
    this.userId = user.id;
    console.log("click edit")
    // this.scroller.scrollToAnchor("user-heading")
    
    window.scrollTo(0, 0);
   
  }

  deleteUser(userId: number) {
    this.deleteUserService.deleteUser(userId).subscribe(
      (response) => {
        if (response) {
          console.log(`User berhasil dihapus`);
          this.toastr.success(`User ${response} berhasil dihapus`);
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'berhasil dihapus',
          });
          this.fetchUsers(); // Refresh daftar pengguna setelah penghapusan berhasil
        } else {
          console.error('Respon dari server tidak valid setelah penghapusan');
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'berhasil dihapus',
          });
        }
      },

      (error) => {
        console.error('Error deleting user:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'gagal dihapus',
        });
      }
    );
  }

  confirm(event: Event, userId: number) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userId);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
