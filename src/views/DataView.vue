<template>
<v-container>
  <v-row align="center"
            class="pa-2">
     <v-btn
      color="light-green"
      class="ml-1 mt-5"
      @click="exportar()"
    >
      Descargar Datos (XLSX)
    </v-btn>
  </v-row>
  <br/>
  <br/>
  <v-row >
          <div class="about">
            <h1>Revisar datos por enunciado:</h1>
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
                {{item.id}} {{item.titulo}}
              </v-card-title>

              <v-card-subtitle>{{item.enunciado}}</v-card-subtitle>

              
              
              <v-card-actions>
                  <v-btn color="green" @click="goToData(item.id)">
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
import * as XLSX from 'xlsx';
import {mapGetters} from 'vuex'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    items: [],
    datos: [],
    roles: [],
    carreras: [],
    nasa: [],
    resultado:0,
    drawer: false,
    group: null,
    
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
              var result2 = await this.$http.get('/datos/all');
              let response2 = result2.data;
              this.datos = response2;
              var result3 = await this.$http.get('/roles/all');
              let response3 = result3.data;
              this.roles = response3;
              var result4 = await this.$http.get('/carreras/all');
              let response4 = result4.data;
              this.carreras = response4;
              var result5 = await this.$http.get('/nasa/all');
              let response5 = result5.data;
              this.nasa = response5;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },

        goToData(item) {
          const enunciadoID = item;
          this.$router.push({name:'Data Area | SE',params:{id:enunciadoID}});
        },

        handleClick() { 
        this.$store.dispatch('user',null); 
        this.$router.push('/'); 
      },

      exportar() {

          let newArr = [];

          for( var k = 0; k < this.datos.length; k++ ) {
            
            var nombreRol = "";
            var nombreCarrera = "";

            for(var i = 0; i < this.roles.length; i++){
              if(this.datos[k].rol == this.roles[i].id){
                nombreRol = this.roles[i].nombre_rol;
              }
            }

            for(var j = 0; j <this.carreras.length; j++){
              if(this.datos[k].carrera == this.carreras[j].id){
                nombreCarrera = this.carreras[j].nombre_carrera;
              }
            }

            var mental,fisico,tiempo,performance,esfuerzo,frustracion,result;

            for(var l = 0; l <this.nasa.length; l++){
              if(this.datos[k].id == this.nasa[l].data){
                mental = this.nasa[l].mental;
                fisico = this.nasa[l].fisico;
                tiempo = this.nasa[l].tiempo;
                performance = this.nasa[l].performance;
                esfuerzo = this.nasa[l].esfuerzo;
                frustracion = this.nasa[l].frustracion;
                result = this.nasa[l].result;
              }
            }

            newArr[k]= {
              "ID": this.datos[k].id,
              "ID Enunciado": this.datos[k].enunciado,
              "ID Usuario": this.datos[k].usuario,
              "Edad": this.datos[k].edad,
              "Sexo": this.datos[k].sexo,
              "Rol": nombreRol,
              "Años de Experiencia Programando": this.datos[k].anos_experiencia,
              "Carrera": nombreCarrera,
              "Fecha Inicio": this.datos[k].fecha_inicio,
              "Fecha Término": this.datos[k].fecha_termino,
              "Nro Errores": this.datos[k].nro_errores,
              "Module Error": this.datos[k].module_error,
              "Name Error": this.datos[k].name_error,
              "Identation Error": this.datos[k].identation_error,
              "Index Error": this.datos[k].index_error,
              "Syntax Error": this.datos[k].syntax_error,
              "Type Error": this.datos[k].type_error,
              "Value Error": this.datos[k].value_error,
              "Nro Lineas": this.datos[k].nro_lineas,
              "Nro Ediciones": this.datos[k].nro_ediciones,
              "Nro Compilaciones": this.datos[k].nro_compilaciones,
              "Nro Estructuras de Flujo": this.datos[k].nro_estrucflujo,
              "Nro Operandos": this.datos[k].nro_operandos,
              "Solución": this.datos[k].solucion,
              "Resultado": this.datos[k].resultado,
              "Respuesta": this.datos[k].respuesta,
              "Cuentionario: Mental": mental,
              "Cuentionario: Fisico": fisico,
              "Cuentionario: Tiempo": tiempo,
              "Cuentionario: Performance": performance,
              "Cuentionario: Esfuerzo": esfuerzo,
              "Cuentionario: Frustración": frustracion,
              "Cuentionario: Resultado": result,
            };

          }
          let data = XLSX.utils.json_to_sheet(newArr);
          const workbook = XLSX.utils.book_new();
          const filename = "Data";
          XLSX.utils.book_append_sheet(workbook, data, filename);
          XLSX.writeFile(workbook, `${filename}.xlsx`);
        },
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
