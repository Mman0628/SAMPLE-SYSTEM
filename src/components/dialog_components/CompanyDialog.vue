<template> 
  <v-dialog v-model="localDialog" max-width="80%" persistent>
    <template #activator="{ props }"> 
      <v-btn v-bind="props" color="#B0BEC5" density="comfortable" icon="mdi-eye" @click="openDialog" :disabled="disabled"></v-btn>
    </template>

    <v-card> 
      <v-toolbar color="#00BCD4" density="comfortable">
        <v-toolbar-title style="text-align: center;">{{diaglogTitle}}</v-toolbar-title>  
        <v-btn icon="mdi-close-circle" color="red" @click="closeDialog"></v-btn>
      </v-toolbar>  

      <v-card-text>  
        <v-card-actions class="pa-0"> 
          <v-btn @click="add('ADD')" color="success"  variant="flat">ADD</v-btn>  
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
        
        <v-table density="compact">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.key" :class="header.class" >
                {{ header.title }}
              </th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comp,i) in filteredItems" :key="i">
              <td>{{ comp.co_id }}</td>
              <td>{{ comp.co_name }}</td>
              <td>{{ comp.co_alias }}</td>
              <td>{{ comp.bldg_street }}</td>
              <td>{{ comp.district_municipality }}</td>
              <td>{{ comp.city_id }}</td>
              <td>{{ comp.prov_id }}</td>
              <td>{{ comp.zip_code }}</td>
              <td>{{ comp.e_mail }}</td>
              <td>{{ comp.tel_no }}</td>
              <td>{{ comp.fax_no }}</td>
              <td>{{ comp.co_tin }}</td>
              <td>{{ comp.status_id }}</td>
              <td align="center">
                <v-tooltip text="EDIT" location="bottom" >
                  <template v-slot:activator="{ props }">
                    <v-btn @click="edit(comp,'EDIT')" v-bind="props"  color="#CFD8DC" density="compact" icon="mdi-pencil" class="mr-4"></v-btn> 
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
        <v-toolbar-title>{{flag}} COMPANY</v-toolbar-title>  
        <v-btn icon="mdi-close-circle" color="red" @click="addDialog=!addDialog"></v-btn>
      </v-toolbar> 

      <v-card-text>  
        <v-row dense>
          <v-col cols="12">
            <v-text-field v-model="companyObj.co_name" label="Enter Company" density="compact" variant="outlined" hide-details class="small-input"/>
          </v-col> 
          <v-col cols="6">
            <v-select   
              v-model="companyObj.status_id" 
              :items="['ACTIVE', 'INACTIVE']"    
              label="Select Status"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            ></v-select>
            <!-- <v-text-field v-model="companyObj.status_id" label="Status" density="compact" variant="outlined" hide-details class="small-input"/> -->
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="companyObj.co_alias" label="ALIAS" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
          </v-col>
        </v-row>

        <v-row dense> 
          <v-col cols="6">
            <v-text-field v-model="companyObj.bldg_street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
            <v-text-field v-model="companyObj.district_municipality" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
            <v-text-field v-model="companyObj.zip_code" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>     
            <v-select   
              v-model="companyObj.prov_name" 
              :items="province"  
              :item-title="item => item.prov_name" 
              return-object  
              label="Select Province"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            ></v-select> 
            <v-select   
              v-model="companyObj.city_name" 
              :items="city"  
              :item-title="item => item.CityDesc" 
              return-object  
              label="Select Municipality/City"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="companyObj.tel_no" label="Phone" density="compact" variant="outlined" hide-details class="small-input"/> 
            <v-text-field v-model="companyObj.co_tin" label="TIN" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/> 
            <v-text-field v-model="companyObj.fax_no" label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
            <v-text-field v-model="companyObj.e_mail" label="Email" type="email" required density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
          </v-col> 
        </v-row> 
      </v-card-text>
      <v-card-actions>   
        <v-btn @click="saveComp(flag)" :disabled="isSaved" color="success" variant="elevated" density="compact">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> 
</template>

<script> 
import axios from 'axios';
export default { 
  name: 'DialogComponent',
  props:[    
    'diaglogTitle','disabled', 'company', 'province', 'city',
  ],
  emits:['isAdded', 'updateMo' ],

  watch: {
    company(val){
      if(val){
        this.companyTable = val
      }
    },

    filteredItems(data) {
      data.map(com => com.status_id = com.status_id == 'A' || com.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE')  
    },  

    hasChanges(val){  
      if(this.flag === 'EDIT'){ 
        return this.isSaved = val;
      } 
        return this.isSaved = val 
    }
  },

  computed: {
    filteredItems() {
      const searchTerm = this.search.trim().toLowerCase();

      if (!searchTerm) return this.companyTable;

      return this.companyTable.filter(item =>
        Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
        ));
    }, 

    hasChanges() {
      if(this.flag === 'EDIT'){
        return Object.keys(this.companyObj).every((key) => {
          if (this.companyObj[key] === this.tempCompanyObj[key]) {
            return true;  
          }
            return false; 
        }); 
      }else{
        if(
          !this.companyObj.co_name ||
          !this.companyObj ||
          !this.companyObj.status_id ||
          !this.companyObj.co_alias ||
          !this.companyObj.bldg_street ||
          !this.companyObj.district_municipality ||
          !this.companyObj.zip_code ||
          !this.companyObj.prov_name ||
          !this.companyObj.city_name ||
          !this.companyObj.tel_no ||
          !this.companyObj.co_tin ||
          !this.companyObj.fax_no ||
          !this.companyObj.e_mail 
        ){
          return true
        }
          return false 
      }
    }, 
  },

  data() {
    return {   
      search:'',  
      isSaved:'',
      localDialog: false,
      addDialog:false,
      flag:'',
      companyObj:{},
      tempCompanyObj:{},
      companyTable:[],
      headers: [
        { key: 'co_id', title: 'Company ID', class:'text-left'},
        { key: 'co_name', title: 'Company Name', width: 150, class:'text-left' },
        { key: 'co_alis', title: 'Co Alias', class:'text-left' },
        { key: 'building', title: 'Building/Street', width: 150, class:'text-left' },
        { key: 'disctrict', title: 'District/Municipality', class:'text-left' },
        { key: 'city_id', title: 'City ID', class:'text-left' },
        { key: 'province_id', title: 'Province ID', class:'text-left' },
        { key: 'zip_code', title: 'ZIP Code', class:'text-left' },
        { key: 'email', title: 'Email', class:'text-left' },
        { key: 'tel_no', title: 'Tel No', class:'text-left' },
        { key: 'fax_no', title: 'Fax No', class:'text-left' },
        { key: 'company_tin', title: 'Company TIN', class:'text-left' },
        { key: 'status', title: 'Status', class:'text-left' },
        { key: 'actions', title: 'Actions', class:'text-center' },
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
      this.companyTable = this.company  
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
      this.companyObj={}  
      this.addDialog = true 
      this.flag = addFlag  
    }, 

    async saveComp(flag){ 
      // const idx = this.companyTable.findIndex(val => val.co_name == this.companyObj.co_name); 
      if(flag == 'EDIT'){   
        console.log(this.companyObj,'sssss');
        
        this.$Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true, 
          confirmButtonText: "Yes", 
        }).then(async (result) => { 
          if (result.isConfirmed) { 
            const res = await axios.post('http://localhost:3000/myApi/edit_company', {data: this.companyObj}) 
            // this.companyTable[idx] ={...this.companyObj}  
            await this.$Swal.fire({
              title: res.data.message,
              text: "",
              icon: "success",
              timer: 1500,  
              showConfirmButton: false 
            });   
            this.$emit('updateMo') 
          } else if (result.isDenied) { 
            this.$Swal.fire({
              title: "Changes are not saved",
              text: "",
              icon: "info",
              timer: 2000,  
              showConfirmButton: false 
            });
          }
        }); 
        this.addDialog = false   
      }else{  
        const res = await axios.post('http://localhost:3000/myApi/add_company', {data: this.companyObj}) 
        console.log(res.data,'response');
         
        if(res.data.success){
          this.$Swal.fire({ 
          icon: "success",
          text: res.data.message,
          title: "SAVED!",
          showConfirmButton: false,
          timer: 2000
          }); 
        } else{
          this.$Swal.fire({ 
          icon: "error",
          text: res.data.message,
          title: "ERROR!", 
          }); 
        }
        this.addDialog = false   

        // else if(res.data.success == 'warning'){
        //   this.$Swal.fire({ 
        //   icon: "warning",
        //   text: res.data.message,
        //   title: "warning!", 
        //   }); 
        // }
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

/**font size */
::v-deep(.small-input .v-label) {
  font-size: 11px;
}

/**select */
::v-deep(.small-select .v-field__input) {
  font-size: 11px;
  padding: 2px 6px !important; 
}

/* Target label */
::v-deep(.small-select .v-label) {
  font-size: 11px;
}

/* Optionally reduce height of the whole field */
::v-deep(.small-select .v-field) {
  min-height: 28px !important;
  padding: 0px !important;
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
