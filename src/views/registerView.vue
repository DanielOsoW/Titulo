<template>
<v-container>
    <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Ingrese sus datos y comience a programar</h1>
          </div>
    </v-row>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field
              class= "d-flex pa-2"
              v-model="nombres"
              :rules="nameRules"
              label="Nombres"
              required
            ></v-text-field>

        <v-text-field
              class= "d-flex pa-2"
              v-model="apellido1"
              :rules="apellidoRules"
              label="Apellido Paterno"
              required
            ></v-text-field>

        <v-text-field
              class= "d-flex pa-2"
              v-model="apellido2"
              :rules="apellidoRules"
              label="Apellido Materno"
              required
            ></v-text-field>

        <v-text-field
              class= "d-flex pa-2"
              v-model="edad"
              :rules="edadRules"
              label="Edad"
              required
        ></v-text-field>

        <v-select
              class= "d-flex pa-2" 
              v-model="sexo"
              :items="sexos"
              :rules="sexoRules"
              label="Sexo"
              required
          ></v-select>

        <v-text-field
              class= "d-flex pa-2"
              v-model="correo"
              :rules="emailRules"
              label="Correo"
              required
            ></v-text-field>

        <v-text-field
        class= "password d-flex pa-2"
        v-model="nueva1"
        :rules="nuevaRules"
        label="Nueva Contraseña"
        required
        :type="showPassword1 ? 'text' : 'password'" prepend-icon="mdi-lock" 
        :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'" 
        @click:append="showPassword1 = !showPassword1">
        </v-text-field>

        <v-text-field
        class= "password dd-flex pa-2"
        v-model="nueva2"
        :rules="nuevaRules"
        label="Repetir Nueva Contraseña"
        required
        :type="showPassword2 ? 'text' : 'password'" prepend-icon="mdi-lock" 
        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'" 
        @click:append="showPassword2 = !showPassword2">
        </v-text-field>

        <div v-if="valid1">{{texto1}}</div>
        <!--v-select
        v-model="select"
        :items="allCarreras"
        :rules="[v => !!v || 'Item is required']"
        label="Carrera"
        required
        ></v-select>

        <div>{{cantiCarreras}}{{allCarreras}}</div-->
        <div>{{nombres}}{{apellido1}}{{apellido2}}{{correo}}{{nueva1}}{{nueva2}}{{edad}}{{sexo}}</div>

        
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate,register()"
        >
          Registrarse
        </v-btn>

        <v-btn
        color="error"
        class="mr-4 center"
        @click="reset"
        >
        Borrar Formulario
        </v-btn>

        <!--v-btn
        color="warning"
        @click="resetValidation"
        >
        Reset Validation
        </v-btn-->
    </v-form>
</v-container>
</template>

<script>
  export default {
    data: () => ({
        nombres:null,
        apellido1:null,
        apellido2:null,
        correo:null,
        nueva1: null,
        nueva2: null,
        carrera: null,
        edad: null,
        sexo:"",
        cantiCarreras: null,
        allCarreras: [],
        showPassword1:false,
        showPassword2:false,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        apellidoRules: [
          v => !!v || 'Se requiere el apellido',
          v => (v && v.length <= 200) || 'El apellido no puede contener más de 200 caracteres',
        ],
        nuevaRules: [
          v => !!v || 'Debes ingresar la nueva contraseña',
          v => (v && v.length >= 12) || 'La contraseña debe contener más de 12 caracteres',
        ],
        edadRules: [
          v => !!v || 'Edad requerida',
          v => (v && v > 10 && v < 100) || 'Edad inválida',
        ],
        sexoRules: [
          v => !!v || 'Sexo requerido',
          v => (v != null) || 'Sexo requerido',
        ],      
        select: null,
        carreras: [],
        checkbox: false,
        usuario: null,
        texto1: null,
        valid1: false,
        sexos: [
        'Femenino',
        'Masculino',
        'Prefiero no decirlo'
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      //Función asíncrona para consultar los datos
        getData: async function(){
            try {
                let response = await this.$http.get('carreras/all');
                this.carreras = response.data;
                this.cantiCarreras = this.carreras.length;
                for(var i = 0;i<this.cantiCarreras;i++){
                  if (i==0){
                    this.allCarreras[i]='Selecciona una carrera';
                  }
                  else{
                    this.allCarreras[i] = this.carreras[i].nombre_carrera;
                  }
                }
            } catch (error) {
                console.log('error', error);
            }
        },


        register: async function() {
          this.valid1 = false;
          if(this.nueva1!=this.nueva2){
            this.texto1='Las contraseñas no son iguales';
            this.valid1 = true;
          }
          else if(this.nombres != '' && this.paterno!='' && this.materno != '' &&  this.correo != '' && this.nueva1!='' && this.nueva2!=''){
            try {
                var result = await this.$http.post('usuarios/create',{"apellido1":this.apellido1, "apellido2":this.apellido2, "nombres":this.nombres, "correo":this.correo, "password":this.nueva1, "rol":1, "carrera":1});
                let response2 = result.data;
                this.usuario = response2.data;
                this.texto1='Información editada con éxito';
                this.$router.push('/login')
            } catch (error) {
                console.log('error', error);
            }
          }
          else{
            this.texto1='El usuario no se ha podido crear';
            this.valid1 = true;
          }
          
        },
    },
    //Función que se ejecuta al cargar el componente
    created:function(){
        this.getData();
    }
  }
</script>