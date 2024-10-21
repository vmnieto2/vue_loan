<template>
    <LayoutView>
    <div>
        <h1>Client List</h1>
        <table class="table table-striped table-hover" v-if="clients.length">
        <thead>
            <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Document</th>
                <th>Email</th>
                <th>Cellphone</th>
                <th>Show Loans</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.full_name }}</td>
            <td>{{ client.document }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.cell_phone }}</td>
            <td><router-link :to="`/client/${client.id}`" ><img :src="eye_icon" alt="eye icon"></router-link></td>
            </tr>
        </tbody>
        </table>
        <p v-else>{{msg}}...</p>
    </div>
    <div>
        <router-link to="/client/create"><button class="primary-button login-button" type="submit">Create Client</button></router-link>
    </div>
  </LayoutView>
</template>

<script>
import axios from 'axios';
import LayoutView from '../views/Layouts/LayoutView.vue';
import eye_icon from '@/assets/icons/eye.png';

export default {
  components: {
    LayoutView
  },
    data() {
        return {
            clients: [],
            msg: '',
            eye_icon: eye_icon,
            apiUrl: 'http://192.168.1.61:8000',
            apiProdUrl: '',
        };
    },
    methods: {
        async fetchClientes(token) {
            try {
                const response = await axios.post(
                    // `${this.apiProdUrl}/client/get_all_clients`, {},
                    `${this.apiUrl}/client/get_all_clients`, {},
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.status === 200) {
                    this.msg = response.data.message;
                    this.clients = response.data.data;
                }
            } catch (error) {
                console.error('Error al cargar los clientes:', error);
            }
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/');  // Redirigir a login si no hay token
        }
        this.fetchClientes(token);

    },
  
};
</script>

<style scoped>
.main-container {
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
}
.form-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 300px;
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
    width: 130px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
}
.login-button {
    margin-top: 32px;
    margin-bottom: 30px;
}
</style>
