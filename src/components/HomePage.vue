<template>
  <!--Carousel-->
  <div>
    <div id="demo" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="filmes.jpg" alt="Brinde" width="550" height="250" />
          <div class="carousel-caption">
            <h3>Clássicos</h3>
            <p>Aqui você encontra filmes antigos</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="locadora.jpg" alt="Chicago" width="550" height="250" />
          <div class="carousel-caption">
            <h3>Lançamentos</h3>
            <p>Aceitamos seu usado na troca</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="filmes1.jpg" alt="New York" width="550" height="250" />
          <div class="carousel-caption">
            <h3>Acervo</h3>
            <p>Encontre aqui seu filme</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>

    <!--Pesquisar-->

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div class="container">
        <input class="form-control mr-sm-2" type="text" v-model="filtro" @keyup="pesquisar" placeholder="Pesquise por nome do filme" />
        <button class="btn btn-secondary my-2 my-sm-0" @click.prevent="listar">Pesquisar</button>
      </div>
    </nav>


<!--Carros-->

<div class="carros">
  <div class="carros items">
  <p class="lead">Confira os Filmes destaques da semana</p>
  <hr class="my-4">

    <div class="container mb-5">
      <div class="row">
        
        <div class="col-sm-4" v-for="destaque in destaques" v-bind:key="destaque.id">
          <div class="card mb-3">
            <h3 class="card-header card text-white bg-secondary">{{destaque.nomefilme}}</h3>
            <div class="card-body bg-light">
              <h5 class="card-title">{{destaque.genero}}</h5>
              <h6 class="card-subtitle text-muted">{{destaque.ano}}</h6>
            </div>
            <img
              style="height: 200px; width: 100%; display: block;" v-bind:src="destaque.foto" alt="Card image"/>
            <div class="card-body bg-light">
              <p class="card-text">R${{destaque.preco | estiloMoeda}}</p>
            </div>
            <div class="card-body card-footer bg-secondary">
              <router-link :to="{ name: 'propostas' , params:{id: destaque.id} }"  class="card-link">Faça sua Reserva</router-link>
            </div>
          </div>
        </div>
      </div>
        </div>
  </div>
</div>

        
  </div>
</template>



<script>
import axios from 'axios'
export default {
    data() {
        return {
            filmes: [],
            destaques: [],
            filtro: null
        }
    },
    components: {},
    mounted() {
        this.listar()
    },
    methods: {
        listar() {
            axios
              .get(this.$urlAPI+'/filmes/destaques')
              .then(response => (this.destaques = response.data))
              
               
        },
        pesquisar() {
            if (this.filtro.length == 0) {
              this.listar()
            } else {
              axios
                .get(this.$urlAPI + '/filmes/destaques/pesq/' + this.filtro)
                .then(response => (this.destaques = response.data))
            }
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
  width: 120px;
  height: 60px;
}
.carousel-inner img {
  width: 1550px;
  height: 400px;
}
</style>