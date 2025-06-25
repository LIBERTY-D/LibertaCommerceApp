import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Role, UserAdminUpdateDto, UserResponse } from '../../types/user.type';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-admin-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css'],
})
export class AdminUserFormComponent {
  @ViewChild('modalHolder', { read: ViewContainerRef })
  container!: ViewContainerRef;
  modalRef?: ComponentRef<ModalComponent>;
  user: UserAdminUpdateDto = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: Role.ROLE_USER,
    enabled: false,
    nonLocked: true,
  };

  availableRoles: Role[] = Object.values(Role);
  deleteUserId: number = 0;

  constructor(
    private toastService: ToastService,
    private userService: UserService
  ) {}
  onSubmitUserForm() {
    if (this.user.id) {
      this.updateAccount();
    } else {
      this.createUserAccount();
    }
  }

  updateAccount() {
    this.userService.updateUserAdmin(this.user, this.user.id).subscribe({
      next: (res) => {
        this.toastService.showToast(res.message, 'success');
      },
      error: (err) => {
        if (err.error) {
          this.toastService.showToast(err.error.message, 'error');
        } else {
          this.toastService.showToast(err.message, 'error');
        }
      },
    });
  }

  createUserAccount() {
    let { id, nonLocked, enabled, role, ...newUser } = this.user;
    this.userService.createUserAccount(newUser).subscribe({
      next: (userRes: UserResponse) => {
        this.toastService.showToast(userRes.message);
      },
      error: (err) => {
        let error = err.error;
        if (error) {
          this.toastService.showToast(error.message, 'error');
        } else {
          this.toastService.showToast(error.message, 'error');
        }
      },
    });
  }

  onDeleteUser() {
    if (!this.deleteUserId) return;
    this.container.clear();
    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.message = 'Are sure you want to delete the user';
    this.modalRef.instance.onCancelCallback = () => {
      this.deleteUserId = 0;
      this.closeModal();
    };

    this.modalRef.instance.onConfirmCallback = () => {
     
       this.userService.deleteAccount(this.deleteUserId).subscribe({
        next: (res) => {
          this.toastService.showToast(res.message, 'success');
          this.closeModal();
        },
        error: (err) => {
          if (err.error) {
            this.toastService.showToast(err.error.message, 'error');
          } else {
            this.toastService.showToast(err.message, 'error');
          }
          this.closeModal();
        },
      });
    };
    
  }

  closeModal() {
    this.modalRef?.destroy();
  }
}
