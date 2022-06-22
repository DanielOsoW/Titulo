<template>
<v-container>
  <v-card>
    <v-toolbar
        color="primary"
        dark
        >Agregar Enunciado</v-toolbar>
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
                @click="addEnunciado()"
                color="green"
            >Agregar</v-btn>

            <v-btn
                v-else
                text
                color="gray"
            >Agregar</v-btn>
                                
        </v-card-actions>
    </v-card>
    
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
        active:false,
    },
    resultado2:""
  }),
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          if (this.user==null || this.user.rol>2){
            this.$router.push('/');
          }
        },

        addEnunciado: async function() {
          try {
                var result2 = await this.$http.post('enunciados/create',this.nuevoEnunciado);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Enunciado creado con éxito. Debe ser aceptado por los Administradores."
                this.snackbar = true;
            }catch (error) {
                this.text = "No se ha podido crear el enunciado."
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