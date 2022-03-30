<template>
<v-container>
    <v-card
            color="blue darken-3"
            dark
          >
            <v-card-title class="text-h5">
              Sumatoria
            </v-card-title>

            <v-card-subtitle>Crear un programa en Python que lleva a cabo una sumatoria de 1 desde el 1 al 10</v-card-subtitle>

            <v-card-actions>
                <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                    >Entregar Solución</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >Confirmación de Entrega Solución</v-toolbar>
                            <v-card-text>
                            <div class="text-h5 pa-12">¿Desea entregar la solución propuesta anteriormente del enunciado?</div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                                color="error"
                            >Cancelar</v-btn>

                            <router-link to="entregado"><v-btn
                                text
                                @click="dialog.value = false"
                                color="green"
                            >
                            
                            Entregar
                            
                            </v-btn></router-link>
                            
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </v-card-actions>
          </v-card>

  <v-row align="center"
          justify="space-around"
          class="mt-6">
          <v-col align="center"
                justify="space-around"
                class="mt-6">
                
                <v-textarea
                    outlined
                    name="input-7-4"
                    label="Su código"
                    value="suma=0
i=0
while i<10:
    suma = suma+1
return 0"
                ></v-textarea>
                
        </v-col>
  

        <v-col align="center"
                justify="space-around"
                class="mt-6">

                <v-textarea v-if="resultado==0"
                    outlined
                    name="input-7-4"
                    label="Resultado"
                    value=""
                ></v-textarea>
                
                <v-textarea v-if="resultado==1"
                    outlined
                    name="input-7-4"
                    label="Resultado"
                    value="Output:
10"
                ></v-textarea>
                
        </v-col>
  </v-row>
  <v-row>
      <v-btn class="primary" @click="resultado=1">
                Ejecutar
        </v-btn>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    resultado:0,
    drawer: false,
    group: null,
  }),
};
</script>
