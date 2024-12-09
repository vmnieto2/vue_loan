<template>
    <LayoutView>
        <div class="main-container">
            <div class="form-container">
                <h1 class="title">Create Payment</h1>
                <form class="form" @submit.prevent="modalConfirm">        
                    
                    <label class="label" for="amount">Amount</label>    
                    <input 
                        type="number" 
                        class="input input-password"
                        v-model="amount"
                        id="amount" 
                        placeholder="123456789"
                        required
                    >
                    <button class="primary-button login-button">Create</button>
                    <div v-if="error" class="alert alert-danger mt-3" >
                        {{ error }}
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal de éxito -->
        <div class="modal fade" id="exitoModal" tabindex="-1" aria-labelledby="exitoModalLabel" aria-hidden="true" ref="exitoModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exitoModalLabel">Payment Success</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ msg }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="goToClientPage()">Cerrar</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal de pregunta -->
        <div class="modal fade" id="preguntaModal" tabindex="-1" aria-labelledby="preguntaModalLabel" aria-hidden="true" ref="preguntaModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="preguntaModalLabel">Question</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Are you sure you want to pay {{ formated_amount }}?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="createPayment">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>
    
  </LayoutView>
</template>

<script>
import axios from 'axios';
import LayoutView from '../views/Layouts/LayoutView.vue'
import { Modal } from 'bootstrap';

export default {
  components: {
    LayoutView
  },
  props: ["id"],
    data() {
        return {
            loan_id: `${this.id}`,
            msg: '',
            amount: '',
            formated_amount: '',
            error: '',
            modalInstanceExito: null,
            modalInstancePregunta: null,
            apiUrl: 'http://192.168.1.61:8000',
            apiProdUrl: 'https://industrial-odille-victor-nieto-c0b6bebb.koyeb.app',
        };
    },
    methods: {
        modalConfirm() {
            this.formated_amount = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(this.amount);
            this.modalInstancePregunta.show()
        },
        async createPayment() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push('/');  // Redirigir a login si no hay token
                }
                const response = await axios.post(
                    `${this.apiProdUrl}/payment/create_payment`,
                    // `${this.apiUrl}/payment/create_payment`,
                    {
                        loan_id: this.loan_id,
                        pay_amount: this.amount
                    },
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                this.modalInstancePregunta.hide();
                if (response.status === 201) {
                    this.msg = response.data.message
                    this.modalInstanceExito.show();                    
                }else if (response.status === 200) {
                    this.error = response.data.message
                }
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
                this.error = error.response.data.message;
            }
        },
        goToClientPage(){
            this.$router.push(`/client`); // Redirigir a la página principal
        }

    },
    mounted() {
        // Inicializar modal
        this.modalInstanceExito = new Modal(this.$refs.exitoModal);
        this.modalInstancePregunta = new Modal(this.$refs.preguntaModal);
    }
};
</script>

<style scoped>
.main-container {
    width: 100%;
    height: 60vh;
    display: grid;
    place-items: center;
}
.form-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 300px;
}
.title {
    font-size: 32px;
    margin-bottom: 12px;
    text-align: center;
}
.form {
    display: flex;
    flex-direction: column;
}
.label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
}
.input {
    background-color: #F7F7F7;
    border: none;
    border-radius: 8px;
    height: 30px;
    font-size: 16px;
    padding: 6px;
    margin-bottom: 12px;
}
.primary-button {
    background-color: #ACD9B2;
    border-radius: 8px;
    border: none;
    color: white;
    width: 100%;
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
