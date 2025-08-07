<template> 
  <v-dialog v-model="localDialog" max-width="70%" persistent>
    <template #activator="{ props }"> 
      <v-btn v-bind="props" color="#B0BEC5" density="comfortable" icon="mdi-eye" @click="openDialog" :disabled="disabled"></v-btn>
    </template>

    <v-card> 
      <v-toolbar color="#00BCD4" density="comfortable">
        <v-toolbar-title style="text-align: center;">{{diaglogTitle}}</v-toolbar-title>  
        <v-btn icon="mdi-close-circle" color="red" @click="closeDialog"></v-btn>
      </v-toolbar> 

      <v-card-text> 
        <v-card-actions>
          <v-spacer/>
          <v-text-field
          v-model="search" 
          max-width="200px"
          variant="outlined"  
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify" 
          hide-details
          />
        </v-card-actions>
        
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Co Code</th>
              <th class="text-left">Company Name</th>
              <th class="text-left">Co Alias</th>
              <th class="text-left">bldg_street</th>
              <th class="text-center"> Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comp,i) in filteredItems" :key="i">
              <td>{{comp.coCode}}</td>
              <td>{{comp.companyName}}</td>
              <td>{{comp.coAlias}}</td>
              <td>{{comp.street}}</td>
              <td align="center">
                <!-- <v-tooltip text="EDIT" location="bottom" >
                  <template v-slot:activator="{ props }">
                    <v-btn @click="edit(comp,'EDIT')" v-bind="props" color="#CFD8DC" density="compact" icon="mdi-pencil" class="mr-4"></v-btn> 
                  </template>
                </v-tooltip> -->
                <v-tooltip text="ADD" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="add('ADD')" v-bind="props" color="success" density="compact" icon="mdi-plus" class="mr-4"></v-btn> 
                  </template>
                </v-tooltip> 
                <!-- <v-tooltip text="DELETE" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn @click="delete" v-bind="props" color="error" density="compact" icon="mdi-delete"></v-btn> 
                  </template>
                </v-tooltip>  -->
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text> 
    </v-card>
  </v-dialog>

  <!-- add/edit record dialog -->
  <v-dialog v-model="addDialog" max-width="20%" persistent>
    <v-card>
      <v-toolbar color="primary" density="comfortable">
        <v-toolbar-title>{{flag}}</v-toolbar-title>  
        <v-btn icon="mdi-close-circle" color="red" @click="addDialog=!addDialog"></v-btn>
      </v-toolbar> 

      <v-card-text> 
        <v-text-field v-model="companyObj.coCode" label="coCode" density="compact" variant="outlined" max-width="300px" disabled/>
        <v-text-field v-model="companyObj.companyName" label="Company Name" density="compact" variant="outlined" max-width="300px"/>
        <v-text-field v-model="companyObj.coAlias" label="coAlias" density="compact" variant="outlined" max-width="300px"/>
        <v-text-field v-model="companyObj.street" label="Street/Building" density="compact" variant="outlined" max-width="300px"/>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="saveProj(flag)" color="success" variant="elevated" density="compact">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> 
</template>

<script> 
export default {
  name: 'DialogComponent',
  props:[    
    'diaglogTitle','disabled'
  ],
  emits:['isAdded'],

  computed: {
    filteredItems() {
      const searchTerm = this.search.trim().toLowerCase();

      if (!searchTerm) return this.companyTable;

      return this.companyTable.filter(item =>
        Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
        )
      );
    },
  },

  data() {
    return {
      search:'',
      localDialog: false,
      addDialog:false,
      flag:'',
      companyObj:{},
      tempCompanyObj:{},
      companyTable:[
        {coCode:'01', companyName:'OOA SOLUTIONS INC.', coAlias:'OOA', street:'10F VERNIDA IV BLDG., LEVISTE ST'},
        {coCode:'02', companyName:'FEDERAL LAND INC.', coAlias:'FEDERAL', street:'GT TOWER'},
        {coCode:'03', companyName:'PH 1 WORLD DEVELOPERS', coAlias:'PHI WORLD', street:'SAN JUAN CITY'},
      ],
    }
  }, 

  // watch: {
  //   localDialog(val) { 
  //     this.$emit('test', val);
  //   }
  // }, 

  methods: {
    openDialog(){
      console.log(this.disabled,'disabled'); 
    },

    closeDialog() {
      this.localDialog = false;  
    }, 

    edit(val,flag){
      this.companyObj={...val}
      this.tempCompanyObj={...val}
      this.addDialog = true
      this.flag= flag
    },

    add(addFlag){ 
      this.addDialog = true 
      this.companyObj={}
      this.flag = addFlag
      this.companyObj.coCode = `0${this.companyTable.length+1}`
    },

    hasChanges() {
      return Object.keys(this.companyObj).some((key) => {
          if (this.companyObj[key] !== this.tempCompanyObj[key]) {
          return true;
          }
          return false;
      });
    }, 

    saveProj(flag){ 
      const idx = this.companyTable.findIndex(id => id.coCode == this.companyObj.coCode); 
      if(flag == 'EDIT'){ 
        if(this.hasChanges()){
          this.companyTable[idx] ={...this.companyObj}

          this.$Swal.fire({ 
          icon: "success",
          text:'Successfully Edited',
          title: "EDITED",
          showConfirmButton: false,
          timer: 1500
          });

          this.addDialog = false 
        }else 
          this.$Swal.fire({ 
          icon: "info",
          title: "No Changes Made",  
          });  
      }else{      
        const {companyName,coAlias,street} = this.companyObj 
        const projectKeys = {companyName,coAlias,street}  
        const checkVal = Object.values(projectKeys).some(a => a === undefined)    
        
        if(!checkVal){ 
          this.companyTable.push(this.companyObj)
          this.$emit('isAdded', {flag:true, data:this.companyObj.companyName})
          this.$Swal.fire({ 
          icon: "success",
          text:'Successfully Added',
          title: "SAVED!",
          showConfirmButton: false,
          timer: 1500
          });
          this.addDialog = false 

        }else 
          this.$Swal.fire({ 
          icon: "warning",
          title: "Please fill all fields",  
          }); 
      }
    },

    delete(){
      
    }
  }
}
</script>

<style scoped>
.sweetalert-popup {
  z-index: 99999 !important;
}
.swal2-overlay {
  z-index: 999998 !important; 
}
.v-dialog__content {
  z-index: 1000 !important;
}
.v-overlay {
  z-index: 999 !important; 
}

/**table */
.v-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
} 

::v-deep(.v-table thead th),
::v-deep(.v-table tbody td) {
  border-right: 1px solid #ccc;
}

::v-deep(.v-table thead th:last-child),
::v-deep(.v-table tbody td:last-child) {
  border-right: none;
}

.v-table thead tr {
  background-color: #9E9E9E;    
}

::v-deep(.v-table thead th){      
  font-weight: 600;
  font-size: 0.875rem;
  color: #333; 
  text-transform: uppercase;
}

.v-table tbody td { 
  padding: 12px 16px;
  font-size: 0.95rem; 
  color: #333;
}

.v-table tbody tr:hover {
  background-color: #fafafa;
  transition: background-color 0.2s ease-in-out;
}

.v-table tfoot td {
  padding: 12px 16px;
  background-color: #fafafa; 
  font-weight: 500;
}  
</style>
