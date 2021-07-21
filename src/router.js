import Vue from 'vue'
import VueRouter from 'vue-router'

//import BoasVindas from './components/BoasVindas'
import CadastroFilmes from './components/CadastroFilmes'
import FormFilmes from './components/FormFilmes'
import FormUsuario from './components/FormUsuario'
import FormLogin from './components/FormLogin'
import HomePage from "./components/HomePage.vue";
import PropostaFilmes from './components/PropostaFilmes.vue'
import GraficoFilmesGeneros from './components/GraficoFilmesGeneros'
import EnviarProposta from "./components/EnviarProposta.vue";
import CadastroUsuario from "./components/CadastroUsuario.vue";


Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomePage },
    //{ path: '/', component: BoasVindas },
    { path: '/cadfilmes', component: CadastroFilmes },
    { path: '/cadusuario', component: CadastroUsuario },
    { path: '/formusuario', component: FormUsuario },
    { path: '/formfilmes', component: FormFilmes },
    { path: '/homepage', component: HomePage },
    { path: '/formlogin', component: FormLogin },
    { path: '/propostas', component: PropostaFilmes },
    { path: '/graffilmes', component: GraficoFilmesGeneros },
    { path: '/propostas/:id', name: 'propostas', component: EnviarProposta },
]

export default new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})