<template>
  <v-app>
    <v-app-bar
      app
      color="blue lighten-3"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true" v-if="user"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="DIINF Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/diinf.png')"
          transition="scale-transition"
          width="220"
        />

        <v-toolbar-title>Sistema de Enunciados</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-right">
        <v-col>
          <v-btn margin-right="200" v-if="!user" color="primary" @click="home()">
          Ingresar
        </v-btn>
        </v-col>
        <v-col>
          <v-btn v-if="!user" color="orange" @click="register()">
          Registrate
        </v-btn>
        </v-col>
      </div>

        <v-menu
          left
          bottom
          v-if="user"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>{{ user.nombres }} {{user.apellido1}} {{user.apellido2}}</v-list-item-title>
            </v-list-item>
            <!--v-list-item v-if="user.nombres!='invitado'" @click="() => {}">
              <v-list-item-title>Mis Datos</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user.nombres!='invitado'" @click="() => {}">
              <v-list-item-title>Estadísticas</v-list-item-title>
            </v-list-item-->
            <v-list-item @click="() => cerrar()">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      v-if="user"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="home()">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <!--v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mi Cuenta</v-list-item-title>
          </v-list-item-->

          <v-list-item @click="enunciados()">
            <v-list-item-icon>
              <v-icon>mdi-file-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Enunciados</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.rol==1" @click="revisarenunciados()">
            <v-list-item-icon>
              <v-icon>mdi-filter-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Revisar Enunciados</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.rol<3 && user.nombres!='invitado'" @click="agregarenunciados()">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Agregar Enunciados</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.nombres!='invitado'" @click="progress()">
            <v-list-item-icon>
              <v-icon>mdi-widgets</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mi Progreso</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.rol==1" @click="datos()">
            <v-list-item-icon>
              <v-icon>mdi-database-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Datos</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.rol==1" @click="asignarroles()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Asignar Roles</v-list-item-title>
          </v-list-item>

          <!--router-link to="area">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Área de Trabajo</v-list-item-title>
          </v-list-item>
          </router-link-->

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from 'vuex' 

export default {
  name: 'App',

  components: {
  },

  methods: {

    //Función asíncrona para consultar los datos
        getData: async function(){
          try {
              this.cosas = this.$cookies.get("token");
              if(this.user==null && this.cosas!=null){

                  if(this.cosas.nombres == 'invitado'){
                    this.$store.dispatch('user',this.cosas);
                  }
                  
                  else{
                    var result2 = await this.$http.post('/user', { jwt: this.cosas.jwt});
                    let response2 = result2.data; 
                    this.$store.dispatch('user', response2);
                  }
                  
              } 
              var result = await this.$http.get('/usuarios/all');
              let response = result.data;
              this.items = response;
                
            }catch (error) {
                console.log('error', error);
            }
        },

    handleClick() { 
        this.$store.dispatch('user',null); 
        this.$router.push('/'); 
      },
    login() {
        this.$router.push('/login');
      },
    register() {
        this.$router.push('/register');
      },
    home() {
        this.$router.push('/');
      },
    enunciados() {
        this.$router.push('/enunciados');
      },
    revisarenunciados() {
        this.$router.push('/revisarenunciados');
      },
    agregarenunciados() {
        this.$router.push('/nuevoenunciado');
      },
    asignarroles() {
        this.$router.push('/asignarrol');
      },
    datos() {
        this.$router.push('/data');
      },
    progress() {
        this.$router.push('/progress');
      },
    cerrar() {
        this.$store.dispatch('user',null);
        this.$cookies.remove("token");
        this.$router.push('/');
      },
  },
  
  computed: {
    ...mapGetters(['user']) 
  },

  data: () => ({
    //
    cosas:null,
    drawer: false,
    group: null,
    options: [
        {
        titulo:'Mis Datos',
        color:'primary',
        },
        {
        titulo:'Estadísticas',
        color:'secondary',
        },
        {
        titulo:'Cerrar sesión',
        color:'',
        },
      ],
  }),

   //Función que se ejecuta al cargar el componente
    created:function(){
        this.getData();
    }
};
</script>
