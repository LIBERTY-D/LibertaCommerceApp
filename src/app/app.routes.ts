import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { CartComponent } from './pages/cart/cart.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { CheckoutDetailsPage } from './pages/checkout-details/checkout-details.page';
import { preventEnteringLoginPageWhenUserIsLoggenIn } from './gaurds/noAuth/noauth.gaurd';
import { authGaurd } from './gaurds/auth/auth.gaurd';
import { AdminGaurd } from './gaurds/admin/admin.gaurd';
import { confirmExitGuard } from './gaurds/contact/contact.gaurd';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [preventEnteringLoginPageWhenUserIsLoggenIn],
  },

  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [preventEnteringLoginPageWhenUserIsLoggenIn],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canDeactivate: [confirmExitGuard],
  },
  {
    path: 'services',
    component: ServiceComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [
      // authGaurd,
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGaurd],
  },
  {
    path: 'details/detail/:productId',
    component: DetailsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGaurd, authGaurd],
  },
  {
    path: 'orders',
    component: UserOrdersComponent,
    canActivate: [authGaurd],
  },
  //   {
  //   path:"checkout-details",
  //   component:  CheckoutDetailsPage,
  //   canActivate:[
  //     authGaurd,
  //   ]
  // },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
