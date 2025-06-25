import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-category-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-category-form.component.html',
  styleUrl: './admin-category-form.component.css',
})
export class AdminCategoryFormComponent {
  @ViewChild('modalHolder', { read: ViewContainerRef })
  container!: ViewContainerRef;
  modalRef?: ComponentRef<ModalComponent>;
  category = {
    id: 0,
    name: '',
  };
  deleteCateoryId: number = 0;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  onSubmitCategoryForm() {
    if (this.category.id) {
      this.updateCategory();
    } else {
      this.createCategory();
    }

    this.category = { id: 0, name: '' };
  }

  onDeleteCategory() {
    if (!this.deleteCateoryId) return;
    this.container.clear();
    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.message = 'Are sure you want to delete the category';
    this.modalRef.instance.onCancelCallback = () => {
      this.closeModal();
    };

    this.modalRef.instance.onConfirmCallback = () => {
      this.deleteCategory();
      this.deleteCateoryId = 0;
      this.closeModal();
    };
  }

  closeModal() {
    this.modalRef?.destroy();
  }

  private updateCategory() {
    this.categoryService
      .updateCategory({ id: this.category.id, name: this.category.name })
      .subscribe({
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
  }

  private createCategory() {
    this.categoryService
      .createCategory({ name: this.category.name })
      .subscribe({
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
  }

  private deleteCategory() {
    this.categoryService.deleteCategory(this.deleteCateoryId).subscribe({
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
  }
}
