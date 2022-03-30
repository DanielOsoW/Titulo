<template>
<v-container>
  
  <v-row align="center"
        justify="space-around"
        class="mt-6">
          <div class="about">
            <h1>Descubre y aprende con cientos de enunciados:</h1>
          </div>
  </v-row>
  <v-col align="justify-center" class="mt-3">
    <v-row align="center"
            class="pa-2"
            v-for="(item, i) in items"
            :key="i">
            <v-card
              class="pa-2" 
              color="blue darken-3"
              dark
            >
              <v-card-title class="text-h5">
                {{item.titulo}}
              </v-card-title>

              <v-card-subtitle>{{item.texto}}</v-card-subtitle>

              <v-card-actions>
                  <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="green"
                        v-bind="attrs"
                        v-on="on"
                    >Resolver Enunciado</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar
                            color="primary"
                            dark
                            >Confirmación de Resolución</v-toolbar>
                            <v-card-text>
                            <div class="text-h5 pa-12">¿Desea iniciar el desarrollo de la solución para el problema {{item.titulo}} ?</div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                            <v-btn
                                text
                                @click="dialog.value = false"
                                color="error"
                            >Cancelar</v-btn>

                            <router-link to="area"><v-btn
                                text
                                @click="dialog.value = false"
                                color="green"
                            >
                            
                            Iniciar
                            
                            </v-btn></router-link>
                            
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>

              </v-card-actions>
            </v-card>
    </v-row>
  </v-col>
</v-container>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    items: [
        {
          titulo: 'Pares',
          texto: 'Llevar a cabo un programa en Python que compare 2 listas de números, revisando si la suma de cada número de la lista 1 con el de la lista 2 dan como resultado un número par. Lista 1: [1,2,3,4]. Lista 2: [1,2,2,1]',
        },
        {
          titulo: 'Sumatoria',
          texto: 'Crear un programa en Python que lleva a cabo una sumatoria de 1 desde el 1 al 10',
        },
        {
          titulo: 'Encuentra palabra',
          texto: 'Llevar a cabo un programa en Python que busque una palabra específica en un texto, y retorne si la palabra existe en el mismo y la cantidad de veces que aparece',
        },
        {
          titulo: 'Signos',
          texto: 'Llevar a cabo un programa en Python que a partir de el día y mes de una persona, pueda entregar el signo zodiacal al cual pertenece esa persona',
        },
      ],
    resultado:0,
    drawer: false,
    group: null,
  }),
};
</script>
