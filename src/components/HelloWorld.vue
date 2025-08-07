<template>
  <div class="mt-4">
    <!-- <div class="bgImage">  
    </div>  -->
  </div>
</template>

<script>
import { ref } from 'vue'
  export default {
    data() {
      return {
        items:['AMICASSA PROCESS SOLUTIONS, INC.', 'FEDERAL LAND INC.','ADDIO GROUP OF COMPANIES'],
        select:ref([])
      }
    },
    methods: {
      test(){
        console.log(this.select); 
      }
    },
  }
</script>

<style scoped>

.bgImage{
  margin: 0;
  padding: 0;  /* Replace with your image path */
  height: 100vh; /* Full screen height */
  width: 100%;
  background-size: cover;  
  background-image: url('../assets/bir.png');      /* Makes image cover the entire area */
  background-position: center;   /* Centers the image */
  background-repeat: no-repeat;  /* Prevents tiling */ 
  position: relative;
  scroll-behavior: smooth;
  overflow: hidden;
}
.overlay {
  background-color: rgba(255, 255, 255, 0.7); /* white overlay with 70% opacity */
  height: 100%;
  width: 100%;
}
</style>