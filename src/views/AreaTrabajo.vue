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
                        @click="lines()"
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
          <v-btn type="button" @click="cleanOut(),runit2()">Run</v-btn> 
        </v-row>
        <v-row>
            <v-form> 
            <v-textarea id="yourcode" cols="80" rows="10" background-color="amber lighten-4" color="orange orange-darken-4" label="Tu código" @change="contador()">
                print("Hello World") 
            </v-textarea><br /> 
            
            </v-form> 
            <v-textarea id="output" disabled cols="20" rows="10" background-color="grey lighten-2" color="cyan" label=""> 
            </v-textarea>
        </v-row>
        <v-row>
          <div> {{ dataset }} {{largoNuevo}} {{lineas}}</div>
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
        <v-row>
          <v-btn
            id="get"
            text
            @click="getOutput()"
            color="white"
          >
          </v-btn>
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
import { run } from '@programmingplus/pyjs';
export default {
  
  name: 'App',
  
  components: {
  },

  data: () => ({
    idData:0,
    error: 0,
    drawer: false,
    group: null,
    texto: null,
    area: null,
    items: null,
    solucion: null,
    resultado: '',
    snackbar: false,
    text: `Debes ingresar tu solución y la respuesta al enunciado`,
    largoAnterior: 0,
    largoNuevo: 0,
    lineas: 0,
    cambio: {},
    dataset:{
      id_enunciado: 0,
      id_estudiante: null,
      solucion: "",
      resultado: "",
      fecha_termino: "",
      nro_errores: 0,
      module_error: 0,
      name_error: 0,
      identation_error: 0,
      index_error: 0,
      syntax_error: 0,
      type_error: 0,
      value_error: 0,
      nro_lineas: 0,
      nro_ediciones:0,
      nro_compilaciones:0
    },
    errores:{
        module: "ModuleNotFoundError",
        name: "NameError",
        identation: "IndentationError",
        index: "IndexError",
        syntax: "SyntaxError",
        type: "TypeError",
        value: "ValueError"
    }
  }),
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              var ruta = this.$route.path;
              var largo = ruta.length;
              var nuevaRuta = "";
              var contador = 0;
              for (var i = 0; i < largo; i++){
                if(ruta[i]=="/" && contador == 2){
                  i = largo+1;
                }
                else if(ruta[i]=="/" && contador < 2){
                  nuevaRuta = nuevaRuta + ruta[i];
                  contador = contador + 1;
                }
                else{
                  nuevaRuta = nuevaRuta + ruta[i];
                }
              }
              contador = 0;
              var dataID = "";
              for (var j = 0; j < largo; j++){
                if (ruta[j]=="/"){
                  contador = contador+1
                }
                else if(ruta[j]!="/" && contador == 3){
                  dataID = dataID + ruta[j];
                }
              }
              this.idData = parseInt(dataID);
              var result = await this.$http.get(nuevaRuta);
              let response = result.data;
              this.items = response;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },
        goToEntrega: async function() {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            this.dataset.fecha_termino = dateTime;

            var result2 = await this.$http.put('datos/'+this.idData,this.dataset);
            let response2 = result2.data;
            this.cambio = response2;
            this.$router.push({name:'entregado',params:{id:this.items.id}});
        },
        handleClick() { 
        this.$store.dispatch('user',null); 
        this.$router.push('/'); 
        },

        cleanOut: async function(){
          document.getElementById("output").value = '';
        },
        runit2: async function(){
          const output = (s) => (document.getElementById("output").value += s);
          await run(document.getElementById("yourcode").value, { writeStdout: output, writeStderr: output });
          document.getElementById("get").click();
        },
        
        getOutput(){
          this.resultado = document.getElementById("output").value;
          this.solucion = document.getElementById("yourcode").value;
          this.dataset.nro_compilaciones = this.dataset.nro_compilaciones + 1;
          var result = this.resultado.includes(this.errores.module);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.module_error = this.dataset.module_error + 1;
          } 
          result = this.resultado.includes(this.errores.name);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.name_error = this.dataset.name_error + 1;
          }
          result = this.resultado.includes(this.errores.identation);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.identation_error = this.dataset.identation_error + 1;
          }
          result = this.resultado.includes(this.errores.index);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.index_error = this.dataset.index_error + 1;
          }
          result = this.resultado.includes(this.errores.syntax);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.syntax_error = this.dataset.syntax_error + 1;
          }
          result = this.resultado.includes(this.errores.type);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.type_error = this.dataset.type_error + 1;
          }
          result = this.resultado.includes(this.errores.value);
          if (result){
            this.dataset.nro_errores = this.dataset.nro_errores + 1;
            this.dataset.value_error = this.dataset.value_error + 1;
          }
        },
        contador(){
          this.largoNuevo = document.getElementById("yourcode").value.length;
          if(this.largoNuevo!=this.largoAnterior){
            this.dataset.nro_ediciones = this.dataset.nro_ediciones + 1;
          }
          this.largoAnterior = this.largoNuevo;
        },
        lines(){
          var codigo = document.getElementById("yourcode").value;
          var iter = codigo.length;
          this.lineas = 1;
          for(var i = 0; i < iter; i++){
            if(codigo[i] == '\n' && codigo[i-1] != '\n' && i+1 !=iter){
              this.lineas = this.lineas + 1;
            }
          }
          if(this.user.nombres != "invitado"){
            this.dataset.id_estudiante = this.user.id;
          }
          this.dataset.id_enunciado = this.items.id;
          this.dataset.solucion = document.getElementById("yourcode").value;
          this.dataset.resultado = document.getElementById("output").value;
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
