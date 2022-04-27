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
        <router-link to="/login">
          <v-btn margin-right="200" v-if="!user" color="primary">
          Ingresar
        </v-btn>
        </router-link>
        </v-col>
        <v-col>
        <router-link to="/register">
          <v-btn v-if="!user" color="orange">
          Registrate
        </v-btn>
        </router-link>
        </v-col>
      </div>

      <v-btn icon v-if="user">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

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
            <v-list-item @click="() => {}">
              <v-list-item-title>Mis Datos</v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title>Estadísticas</v-list-item-title>
            </v-list-item>
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
          <router-link to="/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          </router-link>

          <router-link to="/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mi Cuenta</v-list-item-title>
          </v-list-item>
          </router-link>

          <router-link to="/about">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Enunciados</v-list-item-title>
          </v-list-item>
          </router-link>

          <router-link to="/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-filter-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Revisar Enunciados</v-list-item-title>
          </v-list-item>
          </router-link>

          <router-link to="/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-database-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Datos</v-list-item-title>
          </v-list-item>
          </router-link>

          <!--router-link to="prueba">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Prueba</v-list-item-title>
          </v-list-item>
          </router-link-->

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
    handleClick() { 
        this.$store.dispatch('user',null); 
        this.$router.push('/'); 
      },
    cerrar() {
        this.$store.dispatch('user',null);
        this.$cookies.remove("tokken");
        this.$router.push('/');
        
      },
  },

  computed: {
    ...mapGetters(['user']) 
  },

  data: () => ({
    //
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
};
</script>
