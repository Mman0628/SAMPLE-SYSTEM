<template> 
  <v-app style="background-color:ivory;" >   
    <v-app-bar app flat class="gradient-bar">
      <!-- <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>   -->  
        <div style="width: 250px;" class="d-flex align-center"> 
          <v-img
            src="@/assets/OOA_Logo.png"
            height="50"  
            max-width="80"
          /> 
          <v-toolbar-title>OOA Solutions Inc.</v-toolbar-title> 
        </div>  
        <!-- <v-container max-width="50%" class="d-flex justify-start">
          <v-img
            src="@/assets/xmas.gif"   
            height="200"
            width="auto"
            style="object-fit: cover;" 
          />
        </v-container>  -->
    </v-app-bar>

    <v-navigation-drawer    
    app  
    width="320"
    expand-on-hover
    rail
    color="#CFD8DC"
    dark
    elevation="3"
    >
      <v-container fluid> 
        <v-list>
          <v-list-item
            :prepend-avatar = "userPhoto"
            title = "User Information"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider> 
        
        <v-list 
          v-for="(route, index) in routes" 
          :key="index" 
          density="compact"
          nav  
        >      
          <v-list-item 
            link 
            @click="toggleFiles(route)" 
            :to= "route.path"  
            :prepend-avatar= "require(`@/assets/${route.icon}`)" 
            :title= "route.name"    
          ></v-list-item>   

          <!-- nested child item-->
          <v-list 
            v-if="openGroups.includes(route.name)" 
            density="compact" 
            nav 
            class="ml-4"
          > 
            <v-list-item 
              v-for="(child, childIndex) in route.children" :key="childIndex" 
              link 
              :to= "child.path"  
              :prepend-icon= "child.icon"
              :title= "child.name" 
            ></v-list-item>
          </v-list> 
        </v-list> 
      </v-container> 
    </v-navigation-drawer> 

    <v-main> 
      <router-view/>  
    </v-main>   
  </v-app>
</template>

<script>   
import { mapState } from 'vuex'
import axios from 'axios'  
import image from '@/assets/profile.png'

export default {
  name: 'App',  

  data: () => ({ 
    drawer: false, 
    openGroups:[],  
    userPhoto: image, 
  }), 

  methods: {
    async test(){
      this.$store.commit('countNum')
      try {
        const data = await axios.get('http://localhost:3000/myApi')  
        console.log(data,'data');
        // axios.get('http://localhost:3000/myApi')
        // .then(res =>{
        //   console.log(res.data,'ni emman'); 
        // }).catch(handleError)  
      } catch (error) {
          console.error('Error fetching data:', error);
      }  
    }, 

    toggleFiles(route){   
      const index = this.openGroups.indexOf(route.name); 
      
      if (index > -1) { 
        this.openGroups.splice(index, 1);
      }else { 
        this.openGroups.push(route.name);
      }
    },  
  },

  computed:{
    ...mapState(['count']),

    routes(){
      return [
        {name:'System Manager', path:'/', icon:'client_profile.png',
          children:[
            {name:"Company Files", path:'/company_files', icon:'mdi-briefcase-search'},
            {name:"Project Files", path:'/project_files', icon:'mdi-card-search'},
            {name:"Customer Files", path:'/customer_files', icon:'mdi-account-search'}, 
            // {name:"Security Files", path:'/security_files', icon:'mdi-shield-search'},
          ]
        },
        // {name:'TCT Manager', path:'/tct_manager', icon:'tct.png',
        //   children:[
        //     {name:"Master Files", path:'/master_file', icon:'mdi-folder-cog'},
        //     // {name:"Developer Master File", path:'', icon:'mdi-card-search'},
        //     // {name:"Project Master File", path:'', icon:'mdi-card-search'}, 
        //   ]
        // },
      ]
    }
  },
}
</script>

<style scoped>  
.gradient-bar {
  background: linear-gradient(to right, #053847 50%, rgba(0, 0, 0, 0) 100%); 
  color: white;
}   
</style>
