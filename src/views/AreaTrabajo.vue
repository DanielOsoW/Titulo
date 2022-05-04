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
            <v-form> 
            <textarea id="yourcode" cols="40" rows="10">
            print("Hello World") 
            </textarea><br /> 
            <v-btn type="button" @click="runit()">Run</v-btn> 
            </v-form> 
            <pre id="output" ></pre> 
        </v-row>

        <v-row>
            <iframe src="https://trinket.io/embed/python/24179ee988" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
        </v-row>
        
        <v-row>
            
            <v-col><h1>Solución:</h1>
                <v-textarea v-model="$el"></v-textarea>
            </v-col>
            <v-col>
                <h1>Resultado Interprete:</h1>
                <v-textarea v-model="solucion"></v-textarea>
            </v-col>
        </v-row>
        <v-row>
          <v-btn
            text
            @click="getInfo()"
            color="green"
          >
            info
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
import Sk from "../../../skulpt"
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
  mounted() {
      let recaptchaScript = document.createElement('script1')
      recaptchaScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js')
      document.head.appendChild(recaptchaScript)
      let recaptchaScript2 = document.createElement('script2')
      recaptchaScript2.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/255806/skulpt.min.js')
      document.head.appendChild(recaptchaScript2)
      let recaptchaScript3 = document.createElement('script3')
      recaptchaScript3.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/255806/skulpt-stdlib.js')
      document.head.appendChild(recaptchaScript3)
    },
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
      },
      getInfo() { 
        const collection = document.getElementsByClassName("ace_layer ace_marker-layer")[1];
        this.solucion = collection;
        const collection2 = document.getElementsByClassName("__web-inspector-hide-shortcut__")[1];
        this.resultado = collection2;

        
      },

      // output functions are configurable.  This one just appends some text
      // to a pre element.
      outf(text) { 
          var mypre = document.getElementById("output"); 
          mypre.innerHTML = mypre.innerHTML + text; 
      }, 
      builtinRead(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                  throw "File not found: '" + x + "'";
          return Sk.builtinFiles["files"][x];
      },

      // Here's everything you need to run a python program in skulpt
      // grab the code from your textarea
      // get a reference to your pre element for output
      // configure the output function
      // call Sk.importMainWithBody()
      runit() { 
        var prog = document.getElementById("yourcode").value;
        this.solucion = prog; 
        var mypre = document.getElementById("output"); 
        mypre.innerHTML = 'A'; 
        Sk.canvas = "mycanvas";
        Sk.pre = "output";
        Sk.configure({output:this.outf(), read:this.builtinRead()}); 
        try {
            eval(Sk.importMainWithBody("<stdin>",false,prog)); 
        }
        catch(e) {
            alert(e.toString())
        }
      }, 
    },

    watch:{
      isVisible: function(){
        setTimeout( () => {
          this.solucion = this.$el.getElementsByClassName('ace_layer ace_marker-layer')[0].scrollIntoView();
          }, 250)
          }
          },
    computed: {
        ...mapGetters(['user']) 
    },
    
    //Función que se ejecuta al cargar el componente
    created:function(){
        this.getData();
        this.isVisible();
    }
}
</script>
