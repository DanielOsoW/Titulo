<template>
<v-container>
  
  <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Administrar enunciados:</h1>
          </div>
  </v-row>
  <v-col align="justify-center" class="mt-3">
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
                {{item.id}}. {{item.titulo}}
              </v-card-title>

              <v-card-subtitle>{{item.enunciado}}</v-card-subtitle>
              <v-card-subtitle>Tipo: {{item.tipo}}</v-card-subtitle>  
              <v-card-subtitle>Respuesta: {{item.respuesta}}</v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-col>
                    <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            @click="nuevoEnunciado.titulo=item.titulo, nuevoEnunciado.enunciado=item.enunciado, nuevoEnunciado.tipo=item.tipo, nuevoEnunciado.respuesta=item.respuesta, nuevoEnunciado.active=item.active"
                            color="orange"
                            v-bind="attrs"
                            v-on="on"
                        >Editar Enunciado</v-btn>
                        </template>
                        <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                color="primary"
                                dark
                                >Edición Enunciado</v-toolbar>
                                <v-card-text>
                                <v-textarea class="text-h10 pa-12" v-model="nuevoEnunciado.titulo" label="Título"></v-textarea>
                                <v-textarea class="text-h10 pa-12" v-model="nuevoEnunciado.enunciado" label="Enunciado"></v-textarea>
                                <v-textarea class="text-h10 pa-12" v-model="nuevoEnunciado.tipo" label="Tipo Enunciado"></v-textarea>
                                <v-textarea class="text-h10 pa-12" v-model="nuevoEnunciado.respuesta" label="Respuesta Enunciado"></v-textarea>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="dialog.value = false"
                                    color="error"
                                >Cancelar</v-btn>

                                <v-btn
                                    v-if="nuevoEnunciado.titulo!='' && nuevoEnunciado.enunciado!='' && nuevoEnunciado.tipo!='' && nuevoEnunciado.respuesta!=''"
                                    text
                                    @click="editEnunciado(item.id), dialog.value=false"
                                    color="green"
                                >
                                
                                Editar
                                
                                </v-btn>

                                <v-btn
                                    v-else
                                    text
                                    color="gray"
                                >
                                
                                Editar
                                
                                </v-btn>
                                
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
                    
                
                    <v-btn
                        v-if="item.active==true"
                        @click="desactiveEnunciado(item)"
                        color="red"
                    >
                        Desactivar
                                
                    </v-btn>
                    <v-btn
                        v-else
                        color="gray"
                    >
                        Desactivar
                                
                    </v-btn>

                    <v-btn
                        v-if="item.active==false"
                        @click="activeEnunciado(item)"
                        color="green"
                    >
                        Activar
                                
                    </v-btn>
                    <v-btn
                        v-else
                        color="gray"
                    >
                        Activar
                                
                    </v-btn>
                    
              </v-card-actions>
            </v-card>
            </v-container>
            
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
    snackbar: false,
    text: "",
    items: [],
    resultado:0,
    drawer: false,
    group: null,
    nuevoEnunciado: {
        titulo:"",
        enunciado:"",
        tipo:"",
        respuesta:"",
        active:null,
    },
    resultado2:""
  }),
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          if (this.user==null){
            this.$router.push('/');
          }
          try {
              var result = await this.$http.get('/enunciados/all');
              let response = result.data;
              this.items = response;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },

        editEnunciado: async function(item) {
          const enunciadoID = item;
          try {
                var result2 = await this.$http.put('enunciados/'+enunciadoID,this.nuevoEnunciado);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Enunciado editado con éxito."
                this.snackbar = true;
                this.getData();
            }catch (error) {
                this.text = "No se ha podido editar el enunciado."
                this.snackbar = true;
                console.log('error', error);
            }
        },

        activeEnunciado: async function(item) {
          const enunciadoID = item.id;
          this.nuevoEnunciado.titulo = item.titulo;
          this.nuevoEnunciado.enunciado = item.enunciado;
          this.nuevoEnunciado.tipo =item.tipo;
          this.nuevoEnunciado.respuesta = item.respuesta;
          this.nuevoEnunciado.active = true;
          try {
                var result2 = await this.$http.put('enunciados/'+enunciadoID,this.nuevoEnunciado);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Enunciado activado con éxito."
                this.snackbar = true;
                this.getData();
            }catch (error) {
                this.text = "No se ha podido activar el enunciado."
                this.snackbar = true;
                console.log('error', error);
            }
        },

        desactiveEnunciado: async function(item) {
          const enunciadoID = item.id;
          this.nuevoEnunciado.titulo = item.titulo;
          this.nuevoEnunciado.enunciado = item.enunciado;
          this.nuevoEnunciado.tipo =item.tipo;
          this.nuevoEnunciado.respuesta = item.respuesta;
          this.nuevoEnunciado.active = false;
          try {
                var result2 = await this.$http.put('enunciados/'+enunciadoID,this.nuevoEnunciado);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Enunciado desactivado con éxito."
                this.snackbar = true;
                this.getData();
            }catch (error) {
                this.text = "No se ha podido desactivar el enunciado."
                this.snackbar = true;
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
