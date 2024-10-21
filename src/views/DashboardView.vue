<template>
    <LayoutView>
      <div class="main-container">
        <div class="card" style="width: 18rem;">
          <img :src="list_icon" alt="list icon">
          <div class="card-body">
            <h5 class="card-title">Client</h5>
            <p class="card-text">Here we cand find all the clients who owe me money.</p>
            <button class="primary-button login-button" @click="go_client_list">Go</button>
          </div>
        </div>

        <div class="card" style="width: 18rem; margin-left: 32px;">
          <img :src="list_icon" alt="list icon">
          <div class="card-body">
            <h5 class="card-title">Params</h5>
            <p class="card-text">Here we can edit the params of the project.</p>
            <button class="primary-button login-button" @click="go_params_view">Go</button>
          </div>
        </div>
      </div>
  </LayoutView>
</template>

<script>
import LayoutView from '../views/Layouts/LayoutView.vue'
import list_icon from '@/assets/icons/note.png';

export default {
  components: {
    LayoutView
  },
  data() {
      return {
          primer_nombre: '',
          primer_apellido: '',
          list_icon: list_icon,
      };
  },
  methods: {
      go_client_list(){
        this.$router.push('/client');
      },
      go_params_view(){
        this.$router.push('/params');
      },
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
}
.card img {
  width: 75px;
  height: 75px;
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
