<template>
    <LayoutView>
        <div class="main-container">
            <div class="form-container">
                <h1 class="title">Create Client</h1>
                <form @submit.prevent="createClient" class="form">

                    <div class="row">
                        <div class="col-md-6 mb-6 lg-3">
                            <label for="type_document" class="label">Type document</label>
                            <select id="type_document" v-model="client.type_document" class="form-select" required>
                                <option v-for="type_d in type_document_list" :key="type_d.id" :value="type_d.id">{{ type_d.description }}</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="label" for="document">Document</label>  
                            <input 
                                type="text" 
                                v-model="client.document"
                                class="input input-password" 
                                id="document" 
                                placeholder="1010101010" 
                                required
                            >
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-6 lg-3">
                            <label class="label" for="first_name">First Name</label>  
                            <input 
                                type="text" 
                                v-model="client.first_name"
                                class="input input-password" 
                                id="first_name" 
                                placeholder="first name" 
                                required
                            >
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="label" for="second_name">Second name</label>  
                            <input 
                                type="text" 
                                v-model="client.second_name"
                                class="input input-password" 
                                id="second_name" 
                                placeholder="second name" 
                            >
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-6 lg-3">
                            <label class="label" for="last_name">Last name</label>  
                            <input 
                                type="text" 
                                v-model="client.last_name"
                                class="input input-password" 
                                id="last_name" 
                                placeholder="last name" 
                                required
                            >
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="label" for="second_last_name">Second last name</label>  
                            <input 
                                type="text" 
                                v-model="client.second_last_name"
                                class="input input-password" 
                                id="second_last_name" 
                                placeholder="second last name" 
                            >
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-6 lg-3">
                            <label class="label" for="cell_phone">Cell phone</label>  
                            <input 
                                type="text" 
                                v-model="client.cell_phone"
                                class="input input-password" 
                                id="cell_phone" 
                                placeholder="3222222222" 
                                required
                            >
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="label" for="email">Email address</label>    
                            <input 
                                type="email" 
                                class="input input-password"
                                v-model="client.email"
                                id="email" 
                                placeholder="name@example.com"
                                required
                            >
                        </div>
                    </div>
                
                    <button class="primary-button login-button" type="submit">Create</button>
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
                    <h5 class="modal-title" id="exitoModalLabel">Client Modal</h5>
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

    </LayoutView>
</template>

<script>
import axios from 'axios';
import LayoutView from '../views/Layouts/LayoutView.vue';
import { Modal } from 'bootstrap';

export default {
    components: {
        LayoutView
    },
    data() {
        return {
            type_document_list: [],
            client: {
                type_document: '',
                document: '',
                first_name: '',
                second_name: '',
                last_name: '',
                second_last_name: '',
                cell_phone: '',
                email: '',
            },
            msg: '',
            error: '',
            apiUrl: 'http://192.168.1.61:8000',
            apiProdUrl: 'https://industrial-odille-victor-nieto-c0b6bebb.koyeb.app',
        };
    },
    methods: {
        async createClient() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push('/');  // Redirigir a login si no hay token
                }
                const response = await axios.post(
                    `${this.apiProdUrl}/client/save_client`,
                    // `${this.apiUrl}/client/save_client`,
                    {
                        type_document: this.client.type_document,
                        document: this.client.document,
                        first_name: this.client.first_name,
                        second_name: this.client.second_name,
                        last_name: this.client.last_name,
                        second_last_name: this.client.second_last_name,
                        cell_phone: this.client.cell_phone,
                        email: this.client.email,
                    },
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.status === 201) {
                    this.msg = response.data.message
                    this.modalInstance.show();                    
                }else if (response.status === 200) {
                    this.error = response.data.message
                }
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
                this.error = error.response.data.message;
            }
        },
        // Método para cargar las opciones del select desde las APIs
        async cargarDatos(token) {
            try {
                const response = await axios.post(
                    `${this.apiProdUrl}/params/get_type_document`, {},
                    // `${this.apiUrl}/params/get_type_document`, {},
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.status === 200) {
                    this.msg = response.data.message;
                    this.type_document_list = response.data.data;
                }

            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        },
        goToClientPage(){
            this.$router.push(`/client`); // Redirigir a la página principal
        }
    },
    mounted() {
        // Inicializar modal
        this.modalInstance = new Modal(this.$refs.exitoModal);

        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/');  // Redirigir a login si no hay token
        }

        // Cargar los datos para los select inputs cuando se monta el componente
        this.cargarDatos(token);
    }
};
</script>

<style scoped>
.main-container {
    width: 100%;
    height: 30vh;
    display: grid;
    place-items: center;
}
.form-select {
    margin-bottom: 12px;
}
.form-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 450px;
}
.logo {
    width: 150px;
    margin-bottom: 48px;
    justify-self: center;
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