<template>
 <div class="container">
   <h2>Gráfico Relacionando Nº de Fimes por Genero</h2>
     <GChart
       type="PieChart"
       :data="filmesGeneros"
    />
 </div>   
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from 'axios'
 
export default {
  components: {
    GChart
  },

  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
     filmesGeneros: [["Genero", "Nº Filmes"]],
    }
  }, 
  mounted() {
    axios.get(this.$urlAPI + "/generos_filmes")
         .then(response => {
           const generos = response.data;
//           console.log(marcas)
           generos.forEach(genero => {
             this.filmesGeneros.push([genero.nome, genero.num])             
           });
         })
  }
}
</script>

<style scoped>

</style>
