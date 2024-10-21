<template>
    <LayoutView>
        <div class="main-container">
            <div class="card" style="width: 18rem;">
                <img :src="list_icon" alt="list icon">
                <div class="card-body">
                    <h5 class="card-title">Type User</h5>
                    <p class="card-text">List of types of user.</p>
                    <router-link :to="'/params/get_type_user'">
                        <button class="primary-button login-button">Go</button>
                    </router-link>
                </div>
            </div>

            <div class="card" style="width: 18rem; margin-left: 32px;">
                <img :src="list_icon" alt="list icon">
                <div class="card-body">
                    <h5 class="card-title">Type Document</h5>
                    <p class="card-text">List of types of document.</p>
                    <router-link :to="'/params/get_type_document'">
                        <button class="primary-button login-button">Go</button>
                    </router-link>
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
            list_icon: list_icon,
        };
    },
    methods: {
        
    },
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
