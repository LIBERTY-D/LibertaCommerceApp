import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ProductService } from '../../services/product.service';
import { ToastData } from '../../types/toast.type';
import { ToastService } from '../../services/toast.service';
import { CreateProductdDto } from '../../types/product.type';
import { CategoryName } from '../../types/category.type';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css'],
})
export class AdminProductFormComponent {
  @ViewChild('modalHolder', { read: ViewContainerRef })
  container!: ViewContainerRef;
  modalRef?: ComponentRef<ModalComponent>;
  product = {
    id: null,
    quantity: 5,
    name: '',
    price: 0,
    description: '',
    imageFile: null as File | null,
    categoryId: 0,
  };

  imagePreview: string | ArrayBuffer | null = null;
  deleteProductId: number = 0;

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private fileService: FileService
  ) {}
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.product.imageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.product.imageFile);
    }
  }

  onSubmitProductForm() {
    if (this.product.id) {
      this.updateProduct();
    } else {
      if (this.product.imageFile) {
        this.createProduct();
      } else {
        this.toastService.showToast(
          'make sure you profile image for the product',
          'error'
        );
      }
    }
    // Optionally reset form
  }

  onDeleteProduct() {
    if (!this.deleteProductId) return;

    this.container.clear();
    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.message = 'Are sure you want to delete the product';
    this.modalRef.instance.onCancelCallback = () => {
      this.deleteProductId = 0;
      this.closeModal();
    };

    this.modalRef.instance.onConfirmCallback = () => {
      this.productService.deleteProduct(this.deleteProductId).subscribe({
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

  private sendFileToServer(file: File, productId: number) {
    this.fileService.uploadFile(file, productId).subscribe({
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

  private createProduct() {
    let newProduct: CreateProductdDto = {
      quantity: this.product.quantity,
      price: this.product.price,
      name: this.product.name,
      description: this.product.description,
      categoryId: this.product.categoryId,
    };
    this.productService.createProduct(newProduct).subscribe({
      next: (res) => {
        let productId = res.data.id;
        this.toastService.showToast(res.message, 'success');
        if (productId && this.product.imageFile) {
          this.sendFileToServer(this.product.imageFile, productId);
        }
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
  private updateProduct() {
    if (this.product.id) {
      let newProduct: CreateProductdDto = {
        quantity: this.product.quantity,
        price: this.product.price,
        name: this.product.name,
        description: this.product.description,
        categoryId: this.product.categoryId,
      };

      this.productService.updateProduct(newProduct, this.product.id).subscribe({
        next: (res) => {
          let productId = res.data.id;
          this.toastService.showToast(res.message, 'success');
          if (productId && this.product.imageFile) {
            this.sendFileToServer(this.product.imageFile, productId);
          }

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
  closeModal() {
    this.modalRef?.destroy();
  }
}
