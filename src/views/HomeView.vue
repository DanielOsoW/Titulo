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
                    max-width="600"
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
                              Sexo
                              <v-select 
                                v-model="invitado.sexo"
                                :items="sexos"
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
                                v-if="invitado.sexo=='' || invitado.edad==0"
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
  <v-carousel v-model="model">
    <v-carousel-item
      v-for="(a, i) in colors"
      :key="i"
    >
      <v-sheet
        :color="a.color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ a.titulo }}
          </div>
        </v-row>
      </v-sheet>
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
        sexo:""
      },
      colors: [
        {
        titulo:'Variables',
        color:'primary',
        },
        {
        titulo:'Condicionales',
        color:'secondary',
        },
        {
        titulo:'Ciclos',
        color:'yellow darken-2',
        },
        {
        titulo:'Ordenamiento',
        color: 'red',
        },
        {
        titulo:'Funciones',
        color:'orange',
        },
        
       
        
      ],
      edadRules: [
        v => !!v || 'Edad requerida',
        v => (v && v > 10 && v < 100) || 'Edad inválida',
      ],
    }),

    methods:{
        //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              var result = await this.$http.get('/usuarios/all');
              let response = result.data;
              this.items = response;
                
                
            }catch (error) {
                console.log('error', error);
            }
        },

        login() {
          this.$router.push('/login');
        },

        async handleClick() { 
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

