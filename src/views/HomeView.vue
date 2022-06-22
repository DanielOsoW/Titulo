<template>
<v-container>
<div v-if="!user">
  <br><br><br><br><br>
  <v-container class="center">
    <v-row>
      <v-col>
          <v-btn color="primary" class="center mb-10" block elevation="12" x-large @click="login()">
            Ingresar con usuario
          </v-btn>
      </v-col>
      <v-col>
         <v-dialog
                    transition="dialog-top-transition"
                    max-width="900"
                >
                    <template v-slot:activator="{ on, attrs }">
                     <v-btn color="secondary" class="center mb-10" block v-bind="attrs" v-on="on" elevation="12" x-large>
                        Ingresar como Invitado
                    </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >Ingreso como Invitado</v-toolbar>
                            <v-card-text>
                            <div class="text-h5 pa-12">Por favor, ingresar los siguientes datos:</div>
                            </v-card-text>
                          
                            <v-card-text>
                              Edad
                              <v-text-field
                                v-model="invitado.edad"
                                :rules="edadRules"
                                required
                              ></v-text-field>
                            </v-card-text>

                            <v-card-text>
                              Años de experiencia programando en Python
                              <v-text-field
                                v-model="invitado.anos_experiencia"
                                :rules="expRules"
                                required
                              ></v-text-field>
                            </v-card-text>
                            
                            <v-card-text>
                              Sexo
                              <v-select 
                                v-model="invitado.sexo"
                                :items="sexos"
                                required
                              ></v-select>
                           </v-card-text>

                           <v-card-text v-if="carCheck==true">
                              Título Profesional
                              <v-select 
                                v-model="carrera"
                                :items="items"
                                required
                              ></v-select>
                           </v-card-text>

                           <v-card-text v-if="carCheck==true">
                              Yo soy...
                              <v-select 
                                v-model="rol"
                                :items="items2"
                                required
                              ></v-select>
                           </v-card-text>
                           
                           
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                                color="error"
                            >Cancelar</v-btn>

                            <v-btn
                                v-if="invitado.sexo=='' || invitado.edad==0 || invitado.anos_experiencia=='' || carrera=='' || rol==''"
                                text
                                color="gray"
                                @click="snackbar = true"
                            >
                            
                            Ingresar
                            
                            </v-btn>

                            <v-btn
                                v-else
                                text
                                @click="handleClick()"
                                color="green"
                            >
                            
                            Ingresar
                            
                            </v-btn>
                            
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
      </v-col>
    </v-row>
    
  </v-container>
</div>

<div>
  <v-carousel cycle>
    <v-carousel-item
      v-for="(item,i) in images"
      :key="i"
      :src=item.src
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
    </v-carousel-item>
  </v-carousel>
  <!--h1>COSAS {{user}}</h1-->
</div>

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
    data: () => ({
      model: 0,
      items: [],
      items2: [],
      roles:[],
      rol: null,
      carreras:[],
      carrera:null,
      carCheck: false,
      checkInvitado: false,
      snackbar: false,
      text: `Debes ingresar edad y sexo para poder continuar como invitado`,
      sexos: [
        'Femenino',
        'Masculino',
        'Prefiero no decirlo'
      ],
      invitado: {
        nombres:"invitado",
        edad:null,
        sexo:"",
        carrera:null,
        rol:null,
      },
      
      images: [
          {
            src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
          },
          {
            src: "https://cdn.pixabay.com/photo/2016/11/19/14/16/man-1839500_1280.jpg",
          },
          {
            src: "https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg",
          },
          {
            src: "https://cdn.pixabay.com/photo/2020/01/22/12/33/python-4785225_1280.jpg",
          },
          {
            src: "https://i.ytimg.com/vi/aIQMXbFZyVk/maxresdefault.jpg",
          },
        ],
        
      edadRules: [
        v => !!v || 'Edad requerida',
        v => (v && v > 10 && v < 100) || 'Edad inválida',
      ],
      expRules: [
        v => !!v || 'Experiencia requerida',
        v => (v && v > -1) || 'Experiencia inválida',
      ],
    }),

    methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              let response = await this.$http.get('carreras/all');
                this.carreras = response.data;
                this.cantiCarreras = this.carreras.length;
                for(var i = 0;i<this.cantiCarreras;i++){
                  var nombre = (this.carreras[i].nombre_carrera)+"";
                  this.items[i] = nombre;
                }
                var result2 = await this.$http.get('roles/all');
                let response2 = result2.data;
                this.roles = response2;
                for(var j = 1;j<this.roles.length;j++){
                    var nombre2 = (this.roles[j].nombre_rol)+"";
                    this.items2[j] = nombre2;
                }

                this.carCheck = true;
                
            }catch (error) {
                console.log('error', error);
            }
        },

        login() {
          this.$router.push('/login');
        },

        async handleClick() { 
          for(var j=0;j<this.carreras.length;j++){
            if(this.carrera==this.carreras[j].nombre_carrera){
              this.invitado.carrera = this.carreras[j].id;
            }
          }
          for(var k=0;k<this.roles.length;k++){
            if(this.rol==this.roles[k].nombre_rol){
              this.invitado.rol = this.roles[k].id;
            }
          }
          localStorage.setItem('token', this.invitado);
          this.$cookies.set("token",this.invitado);
          this.$store.dispatch('user',this.invitado); 
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

