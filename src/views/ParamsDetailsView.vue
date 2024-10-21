<template>
    <LayoutView>
        <div v-if="type_list === 'get_type_document'">
            <h1>{{ type_formated }} list</h1>
            <table class="table table-striped table-hover" v-if="list.length">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th style="width: 50px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in list" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.description }}</td>
                    <td><img :src="update_icon" alt="update icon" @click="modalEdit(row)"></td>
                    <td><img :src="delete_icon" alt="borrar icon" @click="modalConfirm(row.id)"></td>
                </tr>
            </tbody>
            </table>
            <p v-else>{{msg}}...</p>
        </div>
        <div v-else>
            <h1>{{ type_formated }} list</h1>
            <table class="table table-striped table-hover" v-if="list.length">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th style="width: 50px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in list" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td>{{ row.name }}</td>
                    <td><img :src="update_icon" alt="update icon" @click="modalEdit(row)"></td>
                    <td><img :src="delete_icon" alt="borrar icon" @click="modalConfirm(row.id)"></td>
                </tr>
            </tbody>
            </table>
            <p v-else>{{msg}}...</p>
        </div>
        <div>
            <button class="primary-button login-button" @click="modalCreate()">Create Param</button>
        </div>
        <div v-if="error" class="alert alert-danger mt-3" >
            {{ error }}
        </div>

        <!-- Modal de pregunta -->
        <div class="modal fade" id="preguntaModal" tabindex="-1" aria-labelledby="preguntaModalLabel" aria-hidden="true" data-bs-backdrop="static" ref="preguntaModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="preguntaModalLabel">Question</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Are you sure you want to delete the parameter {{ this.param_id }}?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="deleteParameter">Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal de éxito -->
        <div class="modal fade" id="exitoModal" tabindex="-1" aria-labelledby="exitoModalLabel" aria-hidden="true" data-bs-backdrop="static" ref="exitoModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exitoModalLabel">{{ titleModal }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ success_msg }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal de edición -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" data-bs-backdrop="static" ref="editModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Mode</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="type_list === 'get_type_document'">
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-6 lg-3">
                                <label class="label" for="name">Name</label>  
                                <input 
                                    type="text" 
                                    v-model="selectedParam.name"
                                    class="input input-password" 
                                    id="name" 
                                    required
                                >
                            </div>
                            <div class="col-md-6 mb-6 lg-3">
                                <label class="label" for="description">Description</label>  
                                <input 
                                    type="text" 
                                    v-model="selectedParam.description"
                                    class="input input-password" 
                                    id="description" 
                                    required
                                >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-body" v-else>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-6 lg-3">
                                <label class="label" for="name">Name</label>  
                                <input 
                                    type="text" 
                                    v-model="selectedParam.name"
                                    class="input input-password" 
                                    id="name" 
                                    required
                                >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" v-if="type_list === 'get_type_document'">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="updateParameterDocument">Update</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                <div class="modal-footer" v-else>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="updateAnyParameter">Update</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal de creación -->
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="static" ref="createModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createModalLabel">Create Parameter</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="type_list === 'get_type_document'">
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-6 lg-3">
                                <label class="label" for="name">Name</label>  
                                <input 
                                    type="text" 
                                    v-model="form_param_name"
                                    class="input input-password" 
                                    id="name" 
                                    required
                                    autocomplete="off"
                                >
                            </div>
                            <div class="col-md-6 mb-6 lg-3">
                                <label class="label" for="description">Description</label>  
                                <input 
                                    type="text" 
                                    v-model="form_param_description"
                                    class="input input-password" 
                                    id="description" 
                                    required
                                    autocomplete="off"
                                >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-body" v-else>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-6 lg-3">
                                <label class="label" for="name">Name</label>  
                                <input 
                                    type="text" 
                                    v-model="form_param_name"
                                    class="input input-password" 
                                    id="name" 
                                    required
                                    autocomplete="off"
                                >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" v-if="type_list === 'get_type_document'">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="createParameterDocument">Create</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                <div class="modal-footer" v-else>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="createAnyParameter">Create</button>
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
import delete_icon from '@/assets/icons/delete.png';
import update_icon from '@/assets/icons/update.png';
import { Modal } from 'bootstrap';

export default {
  components: {
    LayoutView
  },
  props: ["type"],
  data() {
    return {
        list: [],
        type_list: `${this.type}`,
        param_id: '',
        type_formated: '',
        msg: '',
        success_msg: '',
        delete_icon: delete_icon,
        update_icon: update_icon,
        modalInstanceExito: null,
        modalInstancePregunta: null,
        modalInstanceEditar: null,
        modalInstanceCrear: null,
        selectedParam: {},
        titleModal: '',
        form_param_name: '',
        form_param_description: '',
        error: '',
        apiUrl: 'http://192.168.1.61:8000',
        apiProdUrl: '',
    };
  },
  methods: {
    modalEdit(param) {
      this.selectedParam = { ...param };
      this.modalInstanceEditar.show();
    },
    modalConfirm(id) {
        this.modalInstancePregunta.show();
        this.param_id = id;
    },
    modalCreate() {
        this.modalInstanceCrear.show();
    },
    async fetchTypeDocument(token) {
        try {
            const response = await axios.post(
                // `${this.apiProdUrl}/params/get_type_document`, {},
                `${this.apiUrl}/params/get_type_document`, {},
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                this.msg = response.data.message;
                this.list = response.data.data;
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    },
    async fetchAnyList(token) {
        try {
            const response = await axios.post(
                // `${this.apiProdUrl}/params/${this.type_list}`, {},
                `${this.apiUrl}/params/${this.type_list}`, {},
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                this.msg = response.data.message;
                this.list = response.data.data;
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    },
    async deleteParameter() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                // `${this.apiProdUrl}/params/delete_param`, 
                `${this.apiUrl}/params/delete_param`, 
                {
                    type_list: this.type_list,
                    param_id: this.param_id
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            this.modalInstancePregunta.hide();
            if (response.status === 200) {
                this.titleModal = "Deleted Success"
                this.list = this.list.filter(param => param.id !== this.param_id);
                this.success_msg = response.data.message;
                this.modalInstanceExito.show();
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    },
    async updateParameterDocument() {
        try {
            const token = localStorage.getItem('token');
          
            const result = await axios.post(
                // `${this.apiProdUrl}/params/update_param`, 
                `${this.apiUrl}/params/update_param`,  
                {
                    type_list: this.type_list,
                    param_id: this.selectedParam.id,
                    param_name: this.selectedParam.name,
                    param_description: this.selectedParam.description,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            this.modalInstanceEditar.hide();
            if (result.status === 200) {
                this.success_msg = result.data.message;
                this.titleModal = "Updated Success"
                this.modalInstanceExito.show();
                this.fetchTypeDocument(token);       
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    },
    async updateAnyParameter() {
        try {
            const token = localStorage.getItem('token');
          
            const result = await axios.post(
                // `${this.apiProdUrl}/params/update_param`, 
                `${this.apiUrl}/params/update_param`, 
                {
                    type_list: this.type_list,
                    param_id: this.selectedParam.id,
                    param_name: this.selectedParam.name,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            this.modalInstanceEditar.hide();
            if (result.status === 200) {
                this.success_msg = result.data.message;
                this.titleModal = "Updated Success"
                this.modalInstanceExito.show();
                this.fetchAnyList(token);
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    },
    async createParameterDocument() {
        try {
            const token = localStorage.getItem('token');
          
            const result = await axios.post(
                // `${this.apiProdUrl}/params/create_param`, 
                `${this.apiUrl}/params/create_param`,  
                {
                    type_list: this.type_list,
                    param_name: this.form_param_name,
                    param_description: this.form_param_description,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            this.modalInstanceEditar.hide();
            if (result.status === 200) {
                this.success_msg = result.data.message;
                this.titleModal = "Created Success"
                this.modalInstanceExito.show();
                this.fetchTypeDocument(token);       
            }
        } catch (error) {
            this.error = error.response.data.message;
        }
    },
    async createAnyParameter() {
        try {
            const token = localStorage.getItem('token');
          
            const result = await axios.post(
                // `${this.apiProdUrl}/params/create_param`, 
                `${this.apiUrl}/params/create_param`, 
                {
                    type_list: this.type_list,
                    param_name: this.form_param_name,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            this.modalInstanceEditar.hide();
            if (result.status === 200) {
                this.success_msg = result.data.message;
                this.titleModal = "Updated Success"
                this.modalInstanceExito.show();
                this.fetchAnyList(token);
            }
        } catch (error) {
            this.error = error.response.data.message;
        }
    },
  },
  mounted() {
        this.type_formated = this.type_list.replaceAll("_", " ");
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/');  // Redirigir a login si no hay token
        }
        if (this.type_list === 'get_type_document'){
            this.fetchTypeDocument(token)
        }else {
            this.fetchAnyList(token)
        }
        // Inicializar modal
        this.modalInstanceExito = new Modal(this.$refs.exitoModal);
        this.modalInstancePregunta = new Modal(this.$refs.preguntaModal);
        this.modalInstanceEditar = new Modal(this.$refs.editModal);
        this.modalInstanceCrear = new Modal(this.$refs.createModal);
    }
};
</script>

<style scoped>
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
img {
    width: 25px;
    height: 25px;
    cursor: pointer;
}

</style>
