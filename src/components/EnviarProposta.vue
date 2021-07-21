<template>
  <div class="container">
    <section class="container items">
      <div class="col-sm-6">
          <div class="card mb-3">
      <img style="height: 300px; width: 100%; display: block;" v-bind:src="Propostas.foto" alt="Card image"/>
         <div class="card-body bg-light">
              <h5 class="card-title">{{Propostas.nomefilme}} - {{propostas.ano}}</h5>
              <h6 class="card-subtitle text-muted">R$ {{Propostas.preco | estiloMoeda}}</h6>
      </div>
          </div>
      </div>
          <form @submit.prevent="salvar">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label for="nomePessoa">Nome:</label>
            <input type="text" id="cor" class="form-control" required v-model="Propostas.nomePessoa" />
          </div>
        </div>
     
        <div class="col-sm-12">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" class="form-control" required v-model="Propostas.email" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="text" id="telefone" class="form-control" required v-model="Propostas.telefone" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="preco">Valor</label>
            <input type="text" id="preco" class="form-control" required v-model="Propostas.lance" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-success px-4 mr-2">
        <i class="far fa-save"></i> Salvar proposta
      </button>
    </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      proposta: {
        id: null,
        filme_id: null,
        
        genero_id: null,
        telefone: null,
        lance: null,
        
        foto: null,
       
        destaque: "-"
      },
      nomefilme: null
    };
  },
  mounted() {
    this.buscar();
  },
  methods: {
    buscar() {
      axios
        .get(this.$urlAPI + `/filmes/${this.$route.params.id}`)
        .then(response => 
                // console.log('response',response.data)
        (this.proposta = response.data)
        );
    },
    salvar() {
      this.proposta.filme_id = this.$route.params.id;
            console.log(this.proposta);
      axios
        .post(
          this.$urlAPI + `/propostas`,
          this.proposta
        )
        .then(() => {
          alert(`Ok! Proposta cadastrada com sucesso!!`);
          this.proposta = {};
          this.goBack();
        });
    },
      goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  filters: {
        estiloMoeda(value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        }
}
}
</script>

<style scoped>
img {
  width: 500px;
  height: 300px;
}
.container {
  display: flex;
}
.card {
  width: 500px;
}
</style>