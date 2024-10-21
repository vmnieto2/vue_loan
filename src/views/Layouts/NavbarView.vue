<template>
    <header>
      <h1>WELCOME, {{ primer_nombre }} {{ primer_apellido }}</h1>
    </header>

    <nav>
      <router-link to="/dashboard">Home</router-link>
      <a href="#" @click="logout">Sign out</a>
    </nav>

    
</template>

<script>
export default {
    data() {
        return {
            primer_nombre: '',
            primer_apellido: '',
        };
    },
    mounted() {
        const token = localStorage.getItem('token');
        const first_name = localStorage.getItem('first_name');
        const last_name = localStorage.getItem('last_name');
        if (!token) {
            this.$router.push('/');  // Redirigir a login si no hay token
        }

        this.primer_nombre = first_name.toUpperCase();
        this.primer_apellido = last_name.toUpperCase();
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/');
      }
    }
};
</script>

<style scoped>
*{
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
header {
  padding: 50px;
  background-color: #ACD9B2;
  text-align: center;
}
nav {
  display: flex;
  flex-direction: row;
  background-color: #333;
}

nav a{
  color: white;
  padding: 14px 20px;
  text-decoration: none;
}
nav a:hover{
  background-color: gray;
}

</style>
