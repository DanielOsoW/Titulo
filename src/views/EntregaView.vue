<template>
<v-container>
  
  <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Su solución ha sido entregada con éxito</h1>
          </div>
  </v-row>

  
  
  <v-row align="center"
          justify="space-around"
          class="mt-6">
          <v-card
            color="blue darken-3"
            dark
          >
            <v-card-title class="text-h5">
              Sumatoria
            </v-card-title>

            <v-card-subtitle>Crear un programa en Python que lleva a cabo una sumatoria de 1 desde el 1 al 10</v-card-subtitle>

            <v-card-actions>
                <v-btn text class="success" disabled>
                  Entregado
                </v-btn>
            </v-card-actions>
          </v-card>
  </v-row>
  
  <v-row align="center"
          justify="space-around"
          class="mt-6">
          <v-col align="center"
                justify="space-around"
                class="mt-6">
                
                <router-link to="about">
                <v-btn
                    depressed
                    color="blue lighten-3"
                >
                  ¡Buscar más enunciados!
                </v-btn>
                </router-link>
        </v-col>
  </v-row>
</v-container>
</template>