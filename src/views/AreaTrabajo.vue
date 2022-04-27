<template>
<v-container>
    <v-card
            color="blue darken-3"
            dark
          >
            <v-card-title class="text-h5">
              {{items.titulo}}
            </v-card-title>

            <v-card-subtitle>{{ items.enunciado }}.</v-card-subtitle>

            <v-card-actions>
                <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                    >Entregar Solución</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >Confirmación de Entrega Solución</v-toolbar>
                            <v-card-text>
                            <div class="text-h5 pa-12">¿Desea entregar la solución propuesta anteriormente del enunciado?</div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                                color="error"
                            >Cancelar</v-btn>

                            <v-btn
                                v-if="resultado==null || solucion==null || resultado=='' || solucion=='' "
                                text
                                color="gray"
                                @click="snackbar = true"
                            >
                            
                            Entregar
                            
                            </v-btn>

                            <v-btn
                                v-else
                                text
                                @click="goToEntrega(items.id)"
                                color="green"
                            >
                            
                            Entregar
                            
                            </v-btn>
                            
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </v-card-actions>
          </v-card>

  <v-col align="center" justify="space-around" class="mt-6">
        <v-row>
            
        </v-row>
        <v-row>
            <iframe src="https://trinket.io/embed/python/24179ee988" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
        </v-row>
        
        <v-row>
            
            <v-col><h1>Solución:</h1>
                <v-textarea v-model="solucion"></v-textarea>
            </v-col>
            <v-col>
                <h1>Resultado Interprete:</h1>
                <v-textarea v-model="resultado"></v-textarea>
            </v-col>
        </v-row>
  </v-col>

  <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  
</v-container>

</template>

<script>

import {mapGetters} from 'vuex' 

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    error: 0,
    drawer: false,
    group: null,
    texto: null,
    area: null,
    items: null,
    solucion: null,
    resultado: null,
    snackbar: false,
    text: `Debes ingresar tu solución y la respuesta al enunciado`,
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
        goToEntrega(item) {
            const enunciadoID = item;
            this.$router.push({name:'entregado',params:{id:enunciadoID}});
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
