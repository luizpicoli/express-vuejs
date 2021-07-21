<template>
  <div class="container">
    <h2>
      <span v-if="filme.id">Alteração de Filmes</span>
      <span v-else>Inclusão de Filmes</span>

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
            <label for="nomefilme">nome filme:</label>
            <input
              type="text"
              id="nomefilme"
              class="form-control"
              v-model="filme.nomefilme"
              ref="nomefilme"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="genero_id">genero:</label>
            <select
              id="genero_id"
              class="form-control"
              v-model="filme.genero_id"
              required
            >
              <option v-for="genero in generos" :key="genero.id" :value="genero.id">
                {{ genero.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="preco">Preço R$</label>
            <input
              type="text"
              id="preco"
              class="form-control"
              v-model="filme.preco"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <label for="ano">Ano:</label>
            <input
              type="text"
              id="ano"
              class="form-control"
              v-model="filme.ano"
              required
            />
          </div>
        </div>
        <div class="col-sm-9">
          <div class="form-group">
            <label for="foto">URL da Foto:</label>
            <input
              type="text"
              id="foto"
              class="form-control"
              v-model="filme.foto"
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
      filme: {
        id: null,
        nomefilme: null,
        genero_id: null,
        preco: null,
        ano: null,
        foto: null,
      },
      generos: null,
      erros: [],
    };
  },

  methods: {
    verificaForm() {
      // limpa vetor de erros
      this.erros = [];
      if (Number(this.filme.ano) >= 1970 && Number(this.filme.preco) >= 20) {
        return true;
      }

      if (Number(this.filme.ano) < 1970) {
        this.erros.push("Revise o ano do Filme.");
      }
      if (Number(this.filme.preco) < 20) {
        this.erros.push("Valor incorreto. Por favor, verifique.");
      }
      return false;
    },

    altera() {
      axios
        .put(this.$urlAPI + "/filmes/" + this.filme.id, this.filme, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Filme Alterado Corretamente ${response.data}`)
        );
    },

    inclui() {
      axios
        .post(this.$urlAPI + "/filmes", this.filme, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) =>
          alert(`Ok! Filme Cadastro com código ${response.data.id}`)
        );
      this.filme = {}; // limpando o objeto carro, limpa os campos do form
      this.$refs.nomefilme.focus();
    },

    salvar() {
      // if (!localStorage.getItem("token")) {
      //   alert("Erro... Faça Login para Realizar a Inclusão / Alteração")
      //   return
      // }

      if (!this.verificaForm()) {
        return;
      }

      if (this.filme.id) {
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
    axios.get(this.$urlAPI + "/generos").then((response) => {
      this.generos = response.data;
    });

    if (this.$route.query.altera) {
      //      console.log(this.$route.query.altera)
      this.filme = this.$route.query.altera;
    }
  },
};
</script>

<style>
</style>
