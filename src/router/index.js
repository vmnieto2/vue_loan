import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue';
import ClientView from '../views/ClientView.vue';
import CreateClientView from '../views/CreateClientView.vue';
import ClientDetailsView from '../views/ClientDetailsView.vue';
import PaymentView from '../views/PaymentView.vue';
import LoanView from '../views/LoanView.vue';
import ParamsView from '../views/ParamsView.vue';
import ParamsDetailsView from '../views/ParamsDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'login', component: LoginView},
    {path: '/dashboard', name: 'dashboard', component: DashboardView},
    {path: '/client', name: 'client', component: ClientView},
    {path: '/client/create', name: 'client/create', component: CreateClientView},
    {path: '/client/:id', name: 'clientDetails', component: ClientDetailsView, props: true},
    {path: '/payment/:id', name: 'payment', component: PaymentView, props: true},
    {path: '/loan/:id', name: 'loan', component: LoanView, props: true},
    {path: '/params', name: 'params', component: ParamsView, props: true},
    {path: '/params/:type', name: 'paramsDetails', component: ParamsDetailsView, props: true},
  ]
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token');
  // Si no se requiere autenticación (por ejemplo, en la ruta de login), continúa
  if (to.path === '/' || to.name === 'login') {
    next();
  } else {
    // Si se requiere autenticación y no hay token, redirigir al login
    if (!token) {
      next({ name: 'login' }); // Redirigir a la ruta de login si no hay token
    } else {
      // Si hay token, permitir la navegación
      next();
    }
  }
});

export default router
