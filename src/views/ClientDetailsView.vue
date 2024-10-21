<template>
    <LayoutView>
        <div>
            <h1>Loan List</h1>
            <table class="table table-striped table-hover" v-if="loans.length">
            <thead>
                <tr>
                    <th>Consecutive</th>
                    <th>Description</th>
                    <th>Total Loan</th>
                    <th>Loan Date</th>
                    <th>Show Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="loan in loans" :key="loan.id">
                    <td>{{ loan.id }}</td>
                    <td>{{ loan.description }}</td>
                    <td>{{ loan.total_loan }}</td>
                    <td>{{ loan.created_at }}</td>
                    <td><router-link to="" @click="mostrarDetalles(loan)"><img :src="eye_icon" alt="eye icon"></router-link></td>

                </tr>
            </tbody>
            </table>
            <p v-else>{{msg}}...</p>
            <router-link :to="`/loan/${client_id}`" ><button class="primary-button login-button" type="submit">Create Loan</button></router-link>
            
        </div> 

        <!-- Modal de Bootstrap -->
        <div class="modal fade" id="detallesModal" tabindex="-1" aria-labelledby="detallesModalLabel" aria-hidden="true" ref="detallesModal" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="detallesModalLabel">Loan Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" v-if="selected_loan">
                <p><strong>Consecutive:</strong> {{ selected_loan.id }}</p>
                <p><strong>Description:</strong> {{ selected_loan.description }}</p>
                <hr>
                <div v-for="(pay, index) in selected_loan.payments" :key="index">
                  <p><strong>Pay:</strong> {{ index+1 }}</p>
                  <p><strong>Amount:</strong> {{ pay.pay_to_show }}</p>
                  <p><strong>Pay Date:</strong> {{ pay.created_at }}</p>
                  <hr>
                </div>
                <p><strong>Owe:</strong> {{ selected_loan.owe }}</p>
              </div>
              <div class="modal-body" v-else>
                <p>There is not payments.</p>
              </div>
              <div class="modal-footer" v-if="owe === '$0'">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
              <div class="modal-footer" v-else>
                <button type="button" class="btn btn-success" @click="go_payment_view(selected_loan.id)" data-bs-dismiss="modal">Create Payment</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

    </LayoutView>
</template>

<script>
import axios from 'axios';
import LayoutView from '../views/Layouts/LayoutView.vue'
import eye_icon from '@/assets/icons/eye.png';
import { Modal } from 'bootstrap';


export default {
  components: {
    LayoutView
  },
  props: ["id"],
  data() {
    return {
      client_id: `${this.id}`,
      loans: [],
      selected_loan: null,
      eye_icon: eye_icon,
      modalInstance: null,
      msg: '',
      owe: '',
    };
  },
  methods: {
    async showLoansByClient(token) {
      try {
        const response = await axios.post('http://192.168.1.61:8000/loan/show_loans_by_client', 
            {
                client_id: this.client_id
            },
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            this.msg = response.data.message;
            this.loans = response.data.data;
        }
      } catch (error) {
        console.error('Error al cargar el cliente:', error.response ? error.response.data : error.message);
      }
    },
    mostrarDetalles(loan) {
      this.selected_loan = loan;
      this.owe = this.selected_loan.owe;
      this.modalInstance.show();
    },
    go_payment_view(loan_id){
      this.$router.push(`/payment/${loan_id}`);
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
        this.$router.push('/');  // Redirigir a login si no hay token
    }
    this.showLoansByClient(token); // Llama a la función al montar el componente
    this.modalInstance = new Modal(this.$refs.detallesModal);
  }
};
</script>

<style scoped>
.primary-button {
    background-color: #ACD9B2;
    border-radius: 8px;
    border: none;
    color: white;
    width: 150px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    height: 50px;
}
.login-button {
    margin-top: 14px;
    margin-bottom: 30px;
}
</style>
