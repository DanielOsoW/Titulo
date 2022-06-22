<template>

<v-col align="center" justify="center" class="col-11 ml-16">
    <v-row align="center" justify="center" class="mt-2 mb-2">
        <h1>¿Qué tal el proceso?</h1>
    </v-row>
    <v-row class="mt-2 mb-2">
        <h2>Del 0 al 100:</h2>
    </v-row>
    <v-card
    flat
    color="transparent"
  >

    <v-subheader>¿Cuán exigente mentalmente fue la tarea?</v-subheader>

    <v-card-text>
      <v-slider
        v-model="nasa.mental"
        step="5"
        ticks="always"
        tick-size="4"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>

    <v-subheader>¿Cuán exigente físicamente fue la tarea?</v-subheader>

    <v-card-text>
      <v-slider
        v-model="nasa.fisico"
        step="5"
        ticks="always"
        tick-size="4"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>

    <v-subheader>¿Qué tan bueno fue el ritmo temporal para el desarrollo de la tarea?</v-subheader>

    <v-card-text>
      <v-slider
        v-model="nasa.tiempo"
        step="5"
        ticks="always"
        tick-size="4"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>

    <v-subheader>¿Qué tanto éxito sientes que tuviste en el desarrollo del ejercicio?</v-subheader>

    <v-card-text>
      <v-slider
        v-model="nasa.performance"
        step="5"
        ticks="always"
        tick-size="4"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>

    <v-subheader>¿Qué tan duro tuviste que trabajar para lograr un buen nivel de rendimiento?</v-subheader>

    <v-card-text>
      <v-slider
        v-model="nasa.esfuerzo"
        step="5"
        ticks="always"
        tick-size="4"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>

    <v-subheader>¿Cuán inseguro, desalentado, irritado, estresado, y molesto te sentiste en el momento del desarrollo?</v-subheader>

    <v-card-text>
      <v-slider
        v-model="nasa.frustracion"
        step="5"
        ticks="always"
        tick-size="4"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-card-text>

    <v-card-actions>
        <v-btn text class="success" @click="goToEntrega()">
            Entregar
        </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
  
</template>

<script>

import {mapGetters} from 'vuex' 

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    value: 0,
    resultado:0,
    drawer: false,
    group: null,
    texto: null,
    area: null,
    items: null,
    cambio: null,
    nasa:{
        enunciado: 0,
        data: 0,
        mental: 0,
        fisico: 0,
        tiempo: 0,
        performance: 0,
        esfuerzo: 0,
        frustracion: 0,
        result: 0
    },
    fruits: 0,
        ticksLabels: [
          'Figs',
          'Lemon',
          'Pear',
          'Apple',
        ],
  }),
  
  methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          if (this.user==null){
            this.$router.push('/');
          }
          try {
              var ruta = this.$route.path;
              var largo = ruta.length;
              var enunciadoID = "";
              var dataID = "";
              var contador = 0;
              for (var i = 0; i < largo; i++){
                if(ruta[i]=="/"){
                  contador = contador + 1;
                }
                if(ruta[i]!="/" && contador == 1){
                  enunciadoID = enunciadoID + "";
                }
                if(ruta[i]!="/" && contador == 2){
                  enunciadoID = enunciadoID + ruta[i];
                }
                if(ruta[i]!="/" && contador == 3){
                  dataID = dataID + ruta[i];
                }
                else{
                  enunciadoID = enunciadoID + "";
                }
              }
              this.nasa.enunciado = parseInt(enunciadoID);
              this.nasa.data = parseInt(dataID);

            }catch (error) {
                console.log('error', error);
            }
        },

        goToEntrega: async function() {
            try{

              this.nasa.mental = this.nasa.mental / 5;
              this.nasa.fisico =  this.nasa.fisico / 5;
              this.nasa.tiempo = this.nasa.tiempo / 5;
              this.nasa.performance =  this.nasa.performance / 5;
              this.nasa.esfuerzo =  this.nasa.esfuerzo / 5;
              this.nasa.frustracion =  this.nasa.frustracion / 5;
              this.nasa.result = this.nasa.mental + this.nasa.fisico + this.nasa.tiempo + this.nasa.performance + this.nasa.esfuerzo + this.nasa.frustracion;
              var result = await this.$http.post('nasa/create',this.nasa);
              let response = result.data;
              this.cambio = response;
              this.$router.push({name:'Entrega Realizada | SE',params:{id:this.nasa.enunciado}});

            }catch (error){
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