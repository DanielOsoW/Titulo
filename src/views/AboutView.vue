<template>
<v-container>
  
  <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Descubre y aprende con cientos de enunciados:</h1>
          </div>
  </v-row>
  <v-col align="justify-center" class="mt-3">
    <v-row align="center"
            class="pa-2"
            v-for="(item, i) in items"
            :key="i">
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
                  <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="green"
                        v-bind="attrs"
                        v-on="on"
                    >Resolver Enunciado</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >Confirmación de Resolución</v-toolbar>
                            <v-card-text>
                            <div class="text-h5 pa-12">¿Desea iniciar el desarrollo de la solución para el problema {{item.titulo}} ?</div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                                color="error"
                            >Cancelar</v-btn>

                            <v-btn
                                text
                                @click="goToEnunciado(item.id)"
                                color="green"
                            >
                            
                            Iniciar
                            
                            </v-btn>
                            
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>

              </v-card-actions>
            </v-card>
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
  }),
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              var result = await this.$http.get('/enunciados/all');
              let response = result.data;
              this.items = response;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },

        goToEnunciado(item) {
          const enunciadoID = item;
          this.$router.push({name:'area',params:{id:enunciadoID}});
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
