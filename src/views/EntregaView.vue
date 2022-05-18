<template>
<v-container>
  
  <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Su solución ha sido entregada con éxito</h1>
          </div>
  </v-row>

  
  
  <v-row align="center"
          justify="space-around"
          class="mt-6">
          <v-card
            color="blue darken-3"
            dark
          >
            <v-card-title class="text-h5">
              {{ items.titulo }}
            </v-card-title>

            <v-card-subtitle>{{ items.enunciado }}</v-card-subtitle>

            <v-card-actions>
                <v-btn text class="success" disabled>
                  Entregado
                </v-btn>
            </v-card-actions>
          </v-card>
  </v-row>
  
  <v-row align="center"
          justify="space-around"
          class="mt-6">
          <v-col align="center"
                justify="space-around"
                class="mt-6">
                
                <router-link to="/enunciados">
                <v-btn
                    depressed
                    color="blue lighten-3"
                >
                  ¡Buscar más enunciados!
                </v-btn>
                </router-link>
        </v-col>
  </v-row>
</v-container>
</template>

<script>

import {mapGetters} from 'vuex' 

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    resultado:0,
    drawer: false,
    group: null,
    texto: null,
    area: null,
    items: null,
  }),
  
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              var result = await this.$http.get(this.$route.path);
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