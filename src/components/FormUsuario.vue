<template>
  <div class="container">
    <h2>
      <span v-if="usuario.id">Alteração de Usuarios</span>
      <span v-else>Inclusão de Usuarios</span>

      <a class="btn btn-warning float-right" href="#" @click="goBack">
        <i class="fas fa-undo"></i> Voltar</a
      >
    </h2>

    <h4 v-if="erros.length" class="text-danger">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li
          v-for="(erro, index) in erros"
          class="text-danger small"
          :key="index"
        >
          {{ erro }}
        </li>
      </ul>
    </h4>

    <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label for="nome">Nome Do Cliente:</label>
            <input
              type="text"
              id="nome"
              class="form-control"
              v-model="usuario.nome"
              ref="nome"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="usuario.email"
              required
            />
             
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="senha">Senha</label>
            <input
              type="password"
              id="senha"
              class="form-control"
              v-model="usuario.senha"
              required
            />
          </div>
        </div>
      </div>
     

      <button type="submit" class="btn btn-success px-4 mr-2">
        <i class="far fa-save"></i> Salvar
      </button>
      <button type="reset" class="btn btn-danger px-4">
        <i class="far fa-window-restore"></i> Limpar
      </button>
    </form>
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
      erros: [],
    };
  },

  methods: {
    

    altera() {
      axios
        .put(this.$urlAPI + "/usuarios/" + this.usuario.id, this.usuario, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Usuario Alterado Corretamente ${response.data}`)
        );
    },

    inclui() {
      axios
        .post(this.$urlAPI + "/usuarios", this.usuario, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Usuario Cadastro com código ${response.data.id}`)
        );
      this.usuario = {}; // limpando o objeto carro, limpa os campos do form
      this.$refs.nome.focus();
    },

    salvar() {
      // if (!localStorage.getItem("token")) {
      //   alert("Erro... Faça Login para Realizar a Inclusão / Alteração")
      //   return
      // }

    

      if (this.usuario.id) {
        this.altera();
      } else {
        this.inclui();
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  mounted() {
    axios.get(this.$urlAPI + "/usuarios").then((response) => {
      this.nome = response.data;
    });

    if (this.$route.query.altera) {
      //      console.log(this.$route.query.altera)
      this.usuario = this.$route.query.altera;
    }
  },
};
</script>

<style>
</style>
