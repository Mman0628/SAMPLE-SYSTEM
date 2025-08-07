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
          <v-toolbar-title>My Sample App </v-toolbar-title> 
        </div> 
        <v-btn @click="test">CLICK ME</v-btn>
        <p>{{count}}</p>
    </v-app-bar>

    <v-navigation-drawer    
    app  
    width="360"
    expand-on-hover
    rail
    color="#CFD8DC"
    dark
    >
      <v-container class="d-flex-row" >
        <v-container max-height="90" class="d-flex" style="align-items: center; "> 
          <v-avatar size="60" icon="mdi-account-circle"></v-avatar>
          <span style="font-size: 12px;">User Info</span>  
        </v-container>
        <v-divider></v-divider> 
        
        <v-list v-for="(route, index) in routes" :key="index" density="compact" nav>      
          <v-list-item link :to="route.path" @click="isClickedSystemManager(route)" :prepend-avatar="getIcon(route.icon)" :title="route.name"></v-list-item> 

          <!-- nested -->
          <v-list v-if="isSystemManagerOpen" dense>
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
    isSystemManagerOpen: false,
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

    isClickedSystemManager(route){
      if(route.name == 'System Manager'){
        this.isSystemManagerOpen = !this.isSystemManagerOpen
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
            {name:"Company Files", path:'company_files', icon:'mdi-briefcase-search'},
            {name:"Project Files", path:'project_files', icon:'mdi-card-search'},
            {name:"Customer Files", path:'customer_files', icon:'mdi-account-search'},
            {name:"Security Files", path:'security_files', icon:'mdi-shield-search'},
          ]
        },
        // { name: 'Search', path: 'a' ,icon:'search.png', 
        //   children:[
        //     {name:"Buyer's Name", path:'test1', icon:'mdi-account-search'},
        //     {name:'Official Receipt (OR)', path:'test2', icon:'mdi-receipt'},
        //     {name:'Request Expenses (for Approval RQST)', path:'test2', icon:'mdi-cash-register'},
        //     {name:'Request Batch Number (RBN)', path:'test2', icon:'mdi-file-document-edit'},
        //     {name:'Disbursement Number (DIS)', path:'test2', icon:'mdi-file-document-multiple'},
        //     {name:'Payable Voucher (PVN)', path:'test2', icon:'mdi-cash-minus'},
        //     {name:'Cheque Voucher (CVN)', path:'test2', icon:'mdi-cash-check'},
        //     {name:'Billing', path:'test2', icon:'mdi-cash-usd-outline'},
        //     {name:'Cash Returned', path:'test2', icon:'mdi-cash-refund'},
        //     {name:'Compliance Report', path:'test2', icon:'mdi-file-alert'},
        //   ]
        // },
        // { name: 'OOASI', path: '/about', icon:'ooasi.png' }, 
        // { name: 'BIR', path: '/b', icon:'bir.png' },  
        // { name: 'RD', path: '/c', icon:'rd.png' },  
        // { name: 'AO', path: '/d', icon:'ao.png' },  
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
