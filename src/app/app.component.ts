import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';
import { ToastData } from './types/toast.type';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    RouterModule,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'commerce';

  toastData: ToastData | null = null;
  visible = false;
  private toastSub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSub = this.toastService.getToast().subscribe((data) => {
      if (data) {
        this.toastData = data;
        this.visible = true;
      } else {
        this.visible = false;
      }
    });
  }

  ngOnDestroy() {
    this.toastSub.unsubscribe();
  }

  closeToast() {
    this.visible = false;
  }
}
