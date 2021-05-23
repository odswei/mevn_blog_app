<template>
  <v-container class="maincard">
    <v-row no-gutters>
      <v-col v-for="n in 2" :key="n" :cols="n === 1 ? 7 : 5">
        <v-card class="pa-2" tile outlined> col-{{ n === 1 ? 8 : 4 }} </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.maincard {
  background-color: aqua;
}
</style>
