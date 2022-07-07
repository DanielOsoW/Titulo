<template>
<v-container>
  <v-card>
    <v-toolbar
        color="primary"
        dark
        >Asignar Roles</v-toolbar>
        <v-card>
    <v-card-title>
      Usuarios Registrados
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-simple-table :search="search">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nombres
          </th>
          <th class="text-left">
            Apellido
          </th>
          <th class="text-left">
            Apellido
          </th>
          <th class="text-left">
            Correo
          </th>
           <th class="text-left">
            Profesor
          </th>
          <th class="text-left">
            Administrador
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.nombres"
        >
          <td>{{ item.nombres }}</td>
          <td>{{ item.apellido1 }}</td>
          <td>{{ item.apellido1 }}</td>
          <td>{{ item.correo }}</td>
          <td align="justify center">
            <v-btn v-if="item.rol==2" color="red" @click="editRolToEstudiante(item)">Quitar</v-btn>
            <v-btn v-else color="grey">No</v-btn> -
            <v-btn v-if="item.rol!=2" color="green" @click="editRolToProfesor(item)">Asignar</v-btn>
            <v-btn v-else color="grey">Si</v-btn>
          </td>
          <td>
            <v-btn v-if="item.rol==1" color="red" @click="editRolToProfesor(item)">Quitar</v-btn>
            <v-btn v-else color="grey">No</v-btn> -
            <v-btn v-if="item.rol!=1" color="green" @click="editRolToAdmin(item)">Asignar</v-btn>
            <v-btn v-else color="grey">Si</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-card>
        
    </v-card>
    
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
  name: 'App',

  components: {
  },

  data: () => ({
    search: '',
    snackbar: false,
    text: "",
    items: [],
    resultado:0,
    drawer: false,
    group: null,
    nuevoRol: {
    },
    resultado2:""
  }),
  methods:{
         //Función asíncrona para consultar los datos
        getData: async function(){
          if (this.user==null){
            this.$router.push('/');
          }
          try {
              var result = await this.$http.get('/usuarios/all');
              let response = result.data;
              this.items = response;
                
            }catch (error) {
                console.log('error', error);
            }
        },

        editRolToAdmin: async function(item) {
          try {
                this.nuevoRol = item;
                const idUsuario = item.id;
                this.nuevoRol.rol = 1;
                var result2 = await this.$http.put('usuarios/passwordless/'+idUsuario,this.nuevoRol);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Rol modificado"
                this.snackbar = true;
                this.getData();
            }catch (error) {
                this.text = "No se ha podido cambiar el Rol."
                this.snackbar = true;
                console.log('error', error);
            }
        },
        editRolToProfesor: async function(item) {
          try {
                this.nuevoRol = item;
                const idUsuario = item.id;
                this.nuevoRol.rol = 2;
                var result2 = await this.$http.put('usuarios/passwordless/'+idUsuario,this.nuevoRol);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Rol modificado"
                this.snackbar = true;
                this.getData();
            }catch (error) {
                this.text = "No se ha podido cambiar el Rol."
                this.snackbar = true;
                console.log('error', error);
            }
        },
        
        editRolToEstudiante: async function(item) {
          try {
                this.nuevoRol = item;
                const idUsuario = item.id;
                this.nuevoRol.rol = 3;
                var result2 = await this.$http.put('usuarios/passwordless/'+idUsuario,this.nuevoRol);
                let response2 = result2.data;
                this.resultado2 = response2;
                this.text = "Rol modificado"
                this.snackbar = true;
                this.getData();
            }catch (error) {
                this.text = "No se ha podido cambiar el Rol."
                this.snackbar = true;
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