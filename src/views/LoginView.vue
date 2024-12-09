<template>
    <div class="main-container">
        <div class="form-container">
            <img :src="logo" alt="logo" class="logo">
            <h1 class="title">Loan log in</h1>
            <form @submit.prevent="login" class="form">        
                
                <label class="label" for="email">Email address</label>    
                <input 
                    type="email" 
                    class="input input-password"
                    v-model="email"
                    id="email" 
                    placeholder="name@example.com"
                    required
                >
                
                <label class="label" for="password">Password</label>  
                <input 
                    type="password" 
                    v-model="password"
                    class="input input-password" 
                    id="password" 
                    placeholder="Password" 
                    required
                >
            
                <button class="primary-button login-button" type="submit">Log In</button>
                <div v-if="error" class="alert alert-danger mt-3" >
                    {{ error }}
                </div>
                <p class="mt-5 mb-3 text-body-secondary">&copy; 2023–{{fecha}}</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import logo from '@/assets/icons/loan-icon-vector.jpg';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
            logo: logo,
            fecha: new Date().getFullYear(),
            apiUrl: 'http://192.168.1.61:8000',
            apiProdUrl: 'https://industrial-odille-victor-nieto-c0b6bebb.koyeb.app',
        };
    },
    methods: {
        async login() {

            try {
                const response = await axios.post(
                    `${this.apiProdUrl}/login`,
                    // `${this.apiUrl}/login`,
                    {
                        email: this.email,
                        password: this.password
                    },
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                if(response.status === 200) {
                    const token = response.data.data.token;
                    const first_name = response.data.data.first_name;
                    const last_name = response.data.data.last_name;
                    localStorage.setItem('token', token);
                    localStorage.setItem('first_name', first_name);
                    localStorage.setItem('last_name', last_name);
                    this.$router.push('/dashboard');  // Redirigir a otra página
                } 

            } catch (error) {
                this.error = error.response.data.message;
            }            
        }
    }
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