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
                {{item.titulo}}
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
    items2: [],
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
              this.items2 = response2;
                
                
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

          for( var k = 0; k < this.items2.length; k++ ) {

             newArr[k]= {
              "ID": this.items2[k].id,
              "ID Enunciado": this.items2[k].id_enunciado,
              "ID Usuario": this.items2[k].id_estudiante,
              "Edad": this.items2[k].edad,
              "Sexo": this.items2[k].sexo,
              "Entidad": this.items2[k].entidad,
              "Años de Experiencia Programando": this.items2[k].anos_experiencia,
              "Título Profesional": this.items2[k].titulo_profesional,
              "Fecha Inicio": this.items2[k].fecha_inicio,
              "Fecha Término": this.items2[k].fecha_termino,
              "Nro Errores": this.items2[k].nro_errores,
              "Module Error": this.items2[k].module_error,
              "Name Error": this.items2[k].name_error,
              "Identation Error": this.items2[k].identation_error,
              "Index Error": this.items2[k].index_error,
              "Syntax Error": this.items2[k].syntax_error,
              "Type Error": this.items2[k].type_error,
              "Value Error": this.items2[k].value_error,
              "Nro Lineas": this.items2[k].nro_lineas,
              "Nro Ediciones": this.items2[k].nro_ediciones,
              "Nro Compilaciones": this.items2[k].nro_compilaciones,
              "Nro Estructuras de Flujo": this.items2[k].nro_estrucflujo,
              "Nro Operandos": this.items2[k].nro_operandos,
              "Solución": this.items2[k].solucion,
              "Resultado": this.items2[k].resultado,
              "Respuesta": this.items2[k].respuesta
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
