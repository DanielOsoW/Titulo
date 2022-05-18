<template>
<div>
<div v-if="user || checkInvitado">
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
  <h1>COSAS {{user}}</h1>
</div>
<div v-if="!user && !checkInvitado">
  <br><br><br><br><br>
  <v-container class="center">
    <v-row>
      <v-col>
        <router-link to="/login">
          <v-btn color="primary" class="center" block elevation="12" x-large >
            Ingresar con usuario
          </v-btn>
        </router-link>
      </v-col>
      <v-col>
          <v-btn color="secondary" class="center" block elevation="12" x-large @click="checkInvitado=true,handleClick()">
              Ingresar como Invitado
          </v-btn>
      </v-col>
    </v-row>
    
  </v-container>
</div>
</div>
</template>

<script>

import {mapGetters} from 'vuex' 

  export default {
    data: () => ({
      model: 0,
      items: [],
      checkInvitado: false,
      invitado: {
        nombres:"invitado"
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

