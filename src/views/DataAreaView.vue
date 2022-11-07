<template>
<v-container>
  <v-row>
    <h1>Métricas enunciado {{enunciado.titulo}}</h1>
  </v-row>
  <v-row>
    <v-col>
    <h1>Métricas de Errores</h1>
     <apex-chart v-if="chart1==true" width="500" type="bar" :options="chartOptions1" :series="series1"></apex-chart>
   </v-col>

   <v-col>
    <h1>Métricas de Tiempo de Ejecución</h1>
     <apex-chart v-if="chart2==true" width="500" type="pie" :options="chartOptions2" :series="series2"></apex-chart>
   </v-col>
  </v-row>
  
  <v-row>
    <div>
    <h1>Métricas de Éxito/Fallos</h1>
     <apex-chart v-if="chart3==true" width="500" type="bar" :options="chartOptions3" :series="series3"></apex-chart>
   </div>
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
    items: [],
    enunciado: [],
    chart1: false,
    chart2: false,
    chart3: false,
    resultado:0,
    drawer: false,
    group: null,
    chartOptions1: {
          chart: {
            id: 'errorschart'
          },
          xaxis: {
            categories: ["Module Errors", "Name Errors", "Identation Errors", "Idex Errors", "Syntax Errors", "Type Errors", "Value Errors", "Total Errors"]
          }
        },
        series1: [{
          name: 'Cantidad Errores',
          data: [0,0,0,0,0,0,0,0]
        }],
        series2: [0, 0, 0, 0],
          chartOptions2: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Menos de 10 minutos', 'Entre 10 y 30 minutos', 'Entre 30 minutos y 1 hora', 'Más de 1 hora'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },

          series3: [{
            name: 'Nº de éxitos',
            data: 0
          }, {
            name: 'Nº de fallos',
            data: 0
          }],
          chartOptions3: {
            chart: {
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
            xaxis: {
              categories: ["Ocurrencias"],
            },
          },
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
              var nuevaRuta = "/data/";
              var enunciado = "/enunciados/"
              var contador = 0;
              for (var j = 0; j < largo; j++){
                if (ruta[j]=="/"){
                  contador = contador+1
                }
                else if(ruta[j]!="/" && contador == 2){
                  nuevaRuta = nuevaRuta + ruta[j];
                  enunciado = enunciado + ruta[j];
                }
              }
              var result = await this.$http.get(nuevaRuta);
              let response = result.data;
              this.items = response;

              var result2 = await this.$http.get(enunciado);
              let response2 = result2.data;
              this.enunciado = response2;

              var largoJson = this.items.length;

              this.series1[0].data = [0,0,0,0,0,0,0,0]

              for(var i = 0; i < largoJson; i++){
                  this.series1[0].data[0] = this.series1[0].data[0] + this.items[i].module_error;
                  this.series1[0].data[1] = this.series1[0].data[1] + this.items[i].name_error;
                  this.series1[0].data[2] = this.series1[0].data[2] + this.items[i].identation_error;
                  this.series1[0].data[3] = this.series1[0].data[3] + this.items[i].index_error;
                  this.series1[0].data[4] = this.series1[0].data[4] + this.items[i].syntax_error;
                  this.series1[0].data[5] = this.series1[0].data[5] + this.items[i].type_error;
                  this.series1[0].data[6] = this.series1[0].data[6] + this.items[i].value_error;
                  if(this.items[i].nro_errores != null){
                      this.series1[0].data[7] = this.series1[0].data[7] + this.items[i].nro_errores;
                  }
              }

              this.chart1 = true;
              
              for(var k=0; k<largoJson; k++){
                var tiempo = Date();
                var inicio = new Date(this.items[k].fecha_inicio);
                //inicio = this.items[0].fecha_inicio;
                var fin = new Date(this.items[k].fecha_termino);
                //fin = this.items[0].fecha_termino;
                tiempo = (fin.getTime() - inicio.getTime()) / 1000;
                if(tiempo < 600){
                    this.series2[0] = this.series2[0] + 1;
                }
                if( tiempo>=600 && tiempo < 1800){
                    this.series2[1] = this.series2[1] + 1;
                }
                if(tiempo>=1800 && tiempo < 3600){
                    this.series2[2] = this.series2[2] + 1;
                }
                if(tiempo > 3600){
                    this.series2[2] = this.series2[2] + 1;
                }

                this.chart2 = true;

                for(var l=0;l<largoJson;l++){
                    if(this.items[l].resultado == this.items[l].respuesta){
                        this.series3[0].data = this.series3[0].data + 1;	
                    }
                    else{
                        this.series3[1].data = this.series3[1].data + 1;
                    }
                }

                this.chart3 = true;
              }
              
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