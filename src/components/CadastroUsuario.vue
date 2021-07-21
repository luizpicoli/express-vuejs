<template>
  <div class="container mt-4">
    <h2>
      Cadastro de Veículos
      <router-link to="/formusuario" class="btn btn-danger float-right ml-3">
        <i class="fas fa-plus-circle"></i> Adicionar
      </router-link>
      <form class="form-inline float-right">
        <input class="form-control form-control mr-1" type="text" v-model="filtro" @keyup="pesquisar"
               placeholder="Pesquisa">
        <button class="btn btn-success" @click.prevent="listar">Todos</button>
      </form>
    </h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome do Cliente</th>
          <th>Email</th>          
          <th>Ações</th>
        </tr>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
          <td>
           
            <button
              class="btn btn-warning btn-sm mx-1"
              title="Alterar"
              @click="editar(usuario.id)"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm mx-1"
              title="Excluir"
              @click="excluir(usuario.id, usuario.nome)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuario: {
        id: null,
        nome: null,
        email: null,
        senha: null,
       
      },
      filtro: "",
     usuarios: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/usuarios")
        .then((response) => (this.usuarios = response.data));
      this.filtro = "";  
    },

    editar(id) {
      axios
        .get(this.$urlAPI + "/usuarios/" + id)
        .then((response) => {
          this.usuarios = response.data
          this.$router.push({ path: "/formusuario", query: { altera: this.usuario }})
        });
    },   

    excluir(id, nome) {
      if (confirm(`Confirma exclusão do Usuario '${nome}'?`)) {
        axios.delete(this.$urlAPI + "/usuarios/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Ok! Usuario '${nome}' excluído com sucesso!`);
            this.listar();
          }
        });
      }
    },

    pesquisar() {
      if (this.filtro.length == 0) {
        this.listar();     // mostra todos
      } else {
        axios
          .get(this.$urlAPI + "/usuarios/pesq/" + this.filtro)
          .then((response) => (this.usuarios = response.data));
      }
    },
  },
  filters: {
    estiloMoeda(value) {
      return Number(value).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
    },
   
  },
};
</script>

<style scoped>
table img {
  width: 100px;
  height: 60px;
}
</style>
