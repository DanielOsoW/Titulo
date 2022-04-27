<template>
<div>
<div v-if="user">
  <v-carousel v-model="model">
    <v-carousel-item
      v-for="(a, i) in colors"
      :key="i"
    >
      <v-sheet
        :color="a.color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ a.titulo }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  <h1>COSAS {{user}}</h1>
</div>
<div v-if="!user">
  <h1> NADIE LOGUEADO </h1>
</div>
</div>
</template>

<script>

import {mapGetters} from 'vuex' 

  export default {
    data: () => ({
      model: 0,
      items: [],
      colors: [
        {
        titulo:'Variables',
        color:'primary',
        },
        {
        titulo:'Condicionales',
        color:'secondary',
        },
        {
        titulo:'Ciclos',
        color:'yellow darken-2',
        },
        {
        titulo:'Ordenamiento',
        color: 'red',
        },
        {
        titulo:'Funciones',
        color:'orange',
        },
        
       
        
      ],
    }),

    methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              var result = await this.$http.get('/usuarios/all');
              let response = result.data;
              this.items = response;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },

        handleClick() { 
          this.$store.dispatch('user',null); 
          this.$router.push('/'); 
        }
    },

    computed: {
      ...mapGetters(['user']) 
    },

    //Función que se ejecuta al cargar el componente
    created:function(){
        this.getData();
    }
  }
</script>

