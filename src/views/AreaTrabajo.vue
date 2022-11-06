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
                                @click="goToQuest(items.id)"
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
          <v-btn type="button" @click="cleanOut(),runit2()">Ejecutar</v-btn> 
        </v-row>
        <br/><br/>
        <v-row>
          <v-col>
            <prism-editor
              id="yourcode"
              class="my-editor height-200"
              v-model="code"
              :highlight="highlighter"
              :line-numbers="lineNumbers"
              @change="contador()"
            ></prism-editor>
          </v-col>
          <v-col>
            <v-textarea 
              id="output"
              class="my-textarea pa-4"
              outlined
              disabled
              cols="20"
              rows="10"
              background-color="black"
              color="cyan"
              label=""
            ></v-textarea>
          </v-col>
          
         
        </v-row>
        <!--v-row>
            <v-form> 
            <v-textarea v-on:keydown.tab="enableTab('yourcode')"  class="pa-4" cols="80" rows="10" outlined background-color="white" color="orange orange-darken-4" label="Tu código" @change="contador()">
                print("Hello World") 
            </v-textarea><br /> 
            
            </v-form> 
            
        </v-row>
        
        <v-row>
          <div> {{ dataset }} {{largoNuevo}} {{lineas}}</div>
        </v-row>
        
        <row>
            
            <v-col><h1>Solución:</h1>
                <v-textarea v-model="solucion"></v-textarea>
            </v-col>
            <v-col>
                <h1>Resultado Interprete:</h1>
                <v-textarea v-model="resultado"></v-textarea>
            </v-col>
        </v-row-->
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
import { run } from '@programmingplus/pyjs'
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  
  name: 'App',
  
  components: {
    PrismEditor,
  },

  data: () => ({
    code: 'print("Hello World")',
    lineNumbers: true,
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
      enunciado: 0,
      usuario: null,
      sexo:null,
      edad:0,
      anos_experiencia: null,
      rol: null,
      carrera: null,
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
      nro_compilaciones:0,
      nro_estrucflujo: 0,
      nro_operandos: 0,
      respuesta: null
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
        highlighter(code) {
          this.contador();
          return highlight(code, languages.js); //returns html
        },
        //Función asíncrona para consultar los datos
        getData: async function(){
          if (this.user==null){
            this.$router.push('/');
          }
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
        goToQuest: async function() {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getUTCHours() + ":" + today.getMinutes() + ":" + today.getSeconds();  
            var dateTime = date+' '+time;
            this.dataset.fecha_termino = dateTime;

            var result2 = await this.$http.put('datos/'+this.idData,this.dataset);
            let response2 = result2.data;
            this.cambio = response2;
            this.$router.push({name:'Cuestionario | SE',params:{id1:this.items.id,id2:this.idData}});
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
          await run(this.code, { writeStdout: output, writeStderr: output });
          document.getElementById("get").click();
        },
        
        getOutput(){
          this.resultado = document.getElementById("output").value;
          this.solucion = this.code;
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
          this.largoNuevo = this.code.length;
          if(this.largoNuevo!=this.largoAnterior){
            this.dataset.nro_ediciones = this.dataset.nro_ediciones + 1;
          }
          this.largoAnterior = this.largoNuevo;
        },
        lines(){
          var codigo = this.code;
          var iter = codigo.length;
          this.lineas = 1;
          for(var i = 0; i < iter; i++){
            if(codigo[i] == '\n' && codigo[i-1] != '\n' && i+1 !=iter){
              this.lineas = this.lineas + 1;
            }
          }
          if(this.user.nombres != "invitado"){
            this.dataset.usuario = this.user.id;
          }
          this.dataset.nro_lineas = this.lineas
          this.dataset.sexo = this.user.sexo;
          this.dataset.edad = this.user.edad;
          this.dataset.anos_experiencia = this.user.anos_experiencia;
          this.dataset.rol = this.user.rol;
          this.dataset.carrera = this.user.carrera;
          this.dataset.enunciado = this.items.id;
          this.dataset.solucion = this.code;
          this.dataset.resultado = document.getElementById("output").value;

          var contador = 0;
          var result = 0;
          while(result!=-1){
            result = codigo.indexOf("elif ");
            if(result!=-1){
              contador = contador + 1;
              codigo = codigo.replace("elif "," ");
            }
          }
          result = 0;
          while(result!=-1){
            result = codigo.indexOf("if ");
            if(result!=-1){
              contador = contador + 1;
              codigo = codigo.replace("if "," ");
            }
          }
          result = 0;
          while(result!=-1){
            result = codigo.indexOf("else:");
            if(result!=-1){
              contador = contador + 1;
              codigo = codigo.replace("else:"," ");
            }
          }
          result = 0;
          while(result!=-1){
            result = codigo.indexOf("while ");
            if(result!=-1){
              contador = contador + 1;
              codigo = codigo.replace("while "," ");
            }
          }
          this.dataset.nro_estrucflujo = contador;

          var contador2 = 0;
          var iter2 = codigo.length;
          for(var j = 0; j < iter2; j++){
            if(codigo[j] == '+' || codigo[j] == '-' || codigo[j] == '/' || codigo[j] == '%'){
              contador2 = contador2 + 1;
            }
            if(codigo[j] == '='){
              if(codigo[j+1] == '='){
                contador2 = contador2 + 1;
                j = j + 1;
              }
              else{
                contador2 = contador2 + 1;
              }
            }
            if(codigo[j] == '*'){
              if(codigo[j+1] == '*'){
                contador2 = contador2 + 1;
                j = j + 1;
              }
              else{
                contador2 = contador2 + 1;
              }
            }
            if(codigo[j] == '!'){
              if(codigo[j+1] == '='){
                contador2 = contador2 + 1;
                j = j + 1;
              }
            }
          }
          this.dataset.nro_operandos = contador2;
          this.dataset.respuesta = this.items.respuesta;
        },
        enableTab(id) {
          var el = document.getElementById(id);
          el.onkeydown = function(e) {
              if (e.keyCode === 9) { // tab was pressed

                  // get caret position/selection
                  var val = this.value,
                      start = this.selectionStart,
                      end = this.selectionEnd;

                  // set textarea value to: text before caret + tab + text after caret
                  this.value = val.substring(0, start) + '\t' + val.substring(end);

                  // put caret at right position again
                  this.selectionStart = this.selectionEnd = start + 1;

                  // prevent the focus lose
                  return false;

              }
          };
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

<style lang="scss">
.my-textarea textarea { color: white !important }
// required class
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

// optional
.prism-editor__textarea:focus {
  outline: none;
}

// not required:
.height-300 {
  height: 300px;
}
</style>