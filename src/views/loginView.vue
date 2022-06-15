<template> 
<v-container>

    <form @submit.prevent="handleSubmit"> 
		<error v-if="error" :error="error"/> 
		<v-content> 
			<v-card width="500" class="mx-auto mt-9"> 
				<v-card-title> Acceda a su cuenta </v-card-title> 
				<v-card-text> 
					<v-text-field label="Correo" class="form-control" v-model="correo" prepend-icon="mdi-account-circle"/> 
					<v-text-field label="Contraseña" class="form-control" v-model="password"   
					:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock"  
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  
					@click:append="showPassword = !showPassword"/> 
				</v-card-text> 
 
				<v-divider></v-divider> 
				<v-card-actions> 
					<v-btn @click="handleSubmit" > Acceder </v-btn> 
				</v-card-actions> 
			</v-card> 
		</v-content> 
	</form>
    
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
    import Error from './errorView.vue' 
    export default { 
 
        components: { 
            Error 
        }, 
        data() { 
            return{
                snackbar:false, 
                correo: '', 
                password: '', 
                error: '', 
                showPassword:false,
                text: 'Usuario/contraseña erroneos' 
            } 
        }, 
        methods: { 
            async handleSubmit() { 
                try { 
                    var result = await this.$http.post('/login', {
                        correo: this.correo,
                        password: this.password
                    });
                    let response = result.data; 
                    localStorage.setItem('token', response.jwt);
                    this.$cookies.set("token",response);
                    
                    var result2 = await this.$http.post('/user', response);
                    let response2 = result2.data; 
                    this.$store.dispatch('user', response2);
                    this.$router.push('/');
                } catch(e) { 
                        this.snackbar = true; 
                } 
                
            } 
        } 
    } 
</script>