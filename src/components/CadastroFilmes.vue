<template>
  <div class="container mt-4">
    <h2>
      Cadastro de Veículos
      <router-link to="/formfilmes" class="btn btn-danger float-right ml-3">
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
          <th>Nome do Filme</th>
          <th>Genero</th>
          <th>Ano</th>
          <th>Destaque</th>
          <th>Preço R$</th>
          <th>Foto</th>
          <th>Ações</th>
        </tr>
        <tr v-for="filme in filmes" :key="filme.id">
          <td>{{ filme.nomefilme }}</td>
          <td>{{ filme.genero }}</td>
          <td class="text-center">{{ filme.ano }}</td>
          <td class="text-center text-danger font-weight-bold">{{ filme.destaque | destacaFilme }}</td>
          <td class="text-right">{{ filme.preco | estiloMoeda }}</td>
          <td class="text-center">
            <img :src="filme.foto" alt="Foto do Veículo" />
          </td>
          <td>
            <button
              class="btn btn-sm btn-info mx-1"
              title="Destacar"
              @click="destacar(filme.id)"
            >
              <i class="far fa-star"></i>
            </button>
            <button
              class="btn btn-warning btn-sm mx-1"
              title="Alterar"
              @click="editar(filme.id)"
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm mx-1"
              title="Excluir"
              @click="excluir(filme.id, filme.nomefilme)"
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
      filme: {
        id: null,
        nomefilme: null,
        genero_id: null,
        preco: null,
        ano: null,
        foto: null,
        destaque: null,
      },
      filtro: "",
      filmes: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/filmes")
        .then((response) => (this.filmes = response.data));
      this.filtro = "";  
    },

    editar(id) {
      axios
        .get(this.$urlAPI + "/filmes/" + id)
        .then((response) => {
          this.filme = response.data
          this.$router.push({ path: "/formfilmes", query: { altera: this.filme }})
        });
    },

    destacar(id) {
      axios.put(this.$urlAPI + "/filmes/destaques/" + id).then((response) => {
        if (response.status == 200) {
          this.listar();
        }
      });
    },

    excluir(id, nomefilme) {
      if (confirm(`Confirma exclusão do Filme '${nomefilme}'?`)) {
        axios.delete(this.$urlAPI + "/filmes/" + id).then((response) => {
          if (response.status == 200) {
            alert(`Ok! Filme '${nomefilme}' excluído com sucesso!`);
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
          .get(this.$urlAPI + "/filmes/pesq/" + this.filtro)
          .then((response) => (this.filmes = response.data));
      }
    },
  },
  filters: {
    estiloMoeda(value) {
      return Number(value).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
    },
    destacaFilme(value) {
      return value ? "x" : "";
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
