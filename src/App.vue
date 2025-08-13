<template> 
  <v-app style="background-color:ivory;" > 
    <v-app-bar app flat class="gradient-bar" >
      <!-- <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->  
        <div style="width: 250px;" class="d-flex align-center">
          <v-img
            src="@/assets/OOA_Logo.png"
            height="50"  
            max-width="80"
          />
          <v-toolbar-title>OOA Solutions Inc.</v-toolbar-title> 
        </div> 
        <!-- <v-btn @click="test">CLICK ME</v-btn>
        <p>{{count}}</p> -->
    </v-app-bar>

    <v-navigation-drawer    
    app  
    width="360"
    expand-on-hover
    rail
    color="#CFD8DC"
    dark
    elevation="3"
    >
      <v-container class="d-flex-row" >
        <v-container max-height="90" class="d-flex align-center"> 
          <v-avatar class="mr-2">
            <v-img src="../src/assets/profile.png" ></v-img>
          </v-avatar>
          <span style="font-size: 12px;">User Information</span>  
        </v-container>
        <v-divider></v-divider> 
        
        <v-list v-for="(route, index) in routes" :key="index" density="compact" nav>      
          <v-list-item link :to="route.path" @click="toggleFiles(route)" :prepend-avatar="getIcon(route.icon)" :title="route.name"></v-list-item>  

          <!-- nested child item-->
          <v-list v-if="openGroups.includes(route.name)" dense>
            <v-list-item 
            v-for="(child, childIndex) in route.children" :key="childIndex" 
            link 
            :to="child.path" 
            class="nested-item"
            > 
              <v-row align="center" no-gutters> 
                <v-col class="d-flex" cols="auto">
                  <v-list-item-title class="nested-title">
                    <v-icon class="mr-2" small>{{child.icon}}</v-icon>
                    {{ child.name }}
                  </v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item>
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
export default {
  name: 'App', 

  data: () => ({ 
    drawer: false, 
    openGroups:[]
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

    getIcon(icon){
      return require(`@/assets/${icon}`)
    }
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
            {name:"Security Files", path:'/security_files', icon:'mdi-shield-search'},
          ]
        },
        {name:'TCT Manager', path:'/tct_manager', icon:'tct.png',
          children:[
            {name:"Client Master File", path:'/client_master_file', icon:''},
            {name:"Developer Master File", path:'', icon:''},
            {name:"Project Master File", path:'', icon:''}, 
          ]
        },
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
.nested-item {  
  margin-left: 5%;/* Indentation */
  font-size: 100; /* Smaller font size */
}

/* Optional: Make the nested item title even smaller */
.nested-title {
  font-size: 0.875rem; /* Smaller font size for title */
}

/* Optional: Adjust the nested item icon size */
.nested-item img {
  width: 16px;
  height: 16px;
}
</style>
