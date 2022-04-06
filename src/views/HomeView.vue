<template>
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
  <h1>COSAS</h1>
</div>
</template>

<script>
  export default {
    data: () => ({
      model: 0,
      items: [],
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
        }
    },
    //Función que se ejecuta al cargar el componente
    created:function(){
        this.getData();
    }
  }
</script>

