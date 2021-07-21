<template>
  <nav class="navbar navbar-expand-sm bg-primary navbar-dark mb-3">
    <img src="popfilme.png" alt="Filme" class="mx-3">
    <router-link class="navbar-brand" to="/">Locadora de filmes</router-link>

    <!-- Links -->
    <ul class="navbar-nav">

      <!-- Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Cadastros
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/cadfilmes">Filmes</router-link>
          <router-link class="dropdown-item" to="/cadusuario">Usuario</router-link>      
        </div>
      </li>

      <!-- <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Pesquisas
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Veículos</a>
          <a class="dropdown-item" href="#">Propostas</a>
        </div>
      </li> -->
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbardrop"
          data-toggle="dropdown"
        >
          Pesquisas
        </a>
        <!-- <div class="dropdown-menu"> -->
        <!-- <a class="dropdown-item" href="#">Filmes</a>
          <a class="dropdown-item" href="#">Destaques</a> -->
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/homepage"
            >Destaques</router-link
          >
        </div>
        <!-- </div> -->
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          Gráficos
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/graffilmes">Filme por genero</router-link>
         
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#">Utilitários</a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <!-- Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
          <i class="fas fa-user mr-1"></i>
          <span v-if="user">{{user}}</span>
          <span v-else>(Não Logado)</span>
        </a>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/formlogin">Login</router-link>
          <a class="dropdown-item" href="#" @click="sair">Logout</a>
        </div>
      </li>
    </ul>
  </nav>  
</template>

<script>
export default {
  props: {
    user: String
  },
  methods: {
    sair() {
      localStorage.removeItem("token")
      this.$parent.mudaUser(null)
    }
  }
}
</script>

<style scoped>
img {
  width: 60px;
  height: 40px;
}
</style>