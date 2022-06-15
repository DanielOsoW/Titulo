<template>
<v-container>
  <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Revisar datos de tu progreso.
                Enunciados resultos: {{contador}}</h1>
          </div>
  </v-row>
  <v-col v-if="check==true" align="justify-center" class="mt-3">
    <v-row align="center"
            class="pa-2"
            v-for="(item, i) in items"
            :key="i">
            <v-container>
              <v-card
              class="pa-2" 
              color="blue darken-3"
              dark
            >
              <v-card-title class="text-h5">
                {{item.titulo}}
              </v-card-title>

              <v-card-subtitle>{{item.enunciado}}</v-card-subtitle>

              
              
              <v-card-actions>
                  <v-btn color="green" @click="goToProgress(item.id)">
                    Visualizar Datos
                  </v-btn>
              </v-card-actions>
            </v-card>
            </v-container>
            
    </v-row>
  </v-col>
</v-container>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    items: [],
    resultado:0,
    drawer: false,
    group: null,
    datos:[],
    enunciados:[],
    check: false,
    contador:0,
  }),
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          if (this.user==null){
            this.$router.push('/');
          }
          try {
              var result = await this.$http.get('/progress/'+this.user.id);
              let response = result.data;
              this.datos = response;
              var result2 = await this.$http.get('/enunciados/all');
              let response2 = result2.data;
              this.enunciados = response2;
              var contador=0;
              for(var i=0; i<this.enunciados.length; i++){
                  for(var j=0; j<this.datos.length; j++){
                      if(this.enunciados[i].id==this.datos[j].id_enunciado){
                          this.items[contador]=this.enunciados[i];
                          contador = contador + 1;
                          j=this.datos.length;
                      }
                  }
              }
              this.contador=contador;
              this.check=true;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },

        goToProgress(item) {
          const enunciadoID = item;
          this.$router.push({name:'Progress Area | SE',params:{id:enunciadoID}});
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
