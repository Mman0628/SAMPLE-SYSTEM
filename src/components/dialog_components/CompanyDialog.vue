<template> 
  <v-btn 
    @click="add()" 
    color="success"  
    density="compact" 
    variant="tonal" 
    icon="mdi-plus" 
    v-tooltip="{location:'bottom',text:'New'}"
  ></v-btn> 
  <v-btn 
    @click="openDialog()"  
    color="#B0BEC5" 
    density="compact" 
    variant="tonal" 
    icon="mdi-eye"  
    v-tooltip="{location:'bottom',text:'View'}"
  ></v-btn>
  <!-- COMPANY TABLE DIALOG -->
  <v-dialog v-model="localDialog" max-width="80%" persistent>  
    <v-card> 
      <v-toolbar color="#00BCD4" density="comfortable">
        <v-toolbar-title style="text-align: center;">{{diaglogTitle}}</v-toolbar-title>  
        <v-btn @click="localDialog = false, isLoading = true" icon="mdi-close-circle" color="red" v-tooltip="{location:'right',text:'Close'}"></v-btn>
      </v-toolbar>  

      <v-card-text>   
        <!-- <v-card-actions class="pa-0">  --> 
          <v-spacer/>
          <v-text-field
            v-model="search" 
            max-width="250px"
            variant="outlined"  
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify" 
            hide-details
            class="mb-2 small-input"
          />
        <!-- </v-card-actions> -->
        
        <v-table density="compact">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.key" :class="header.class" width="350px">
                {{ header.title }}
              </th> 
            </tr>
          </thead>
          <tbody>
            <tr v-show="company.length === 0"><td :colspan="headers.length" class="text-center" style="color: #B0BEC5;">No Data Available</td></tr>
            <tr v-if="isLoading">
              <td :colspan = headers.length>
                <div class="d-flex justify-center align-center" style="height: 150px;">
                  <v-progress-circular indeterminate color="primary" size="40" class="mr-2"/>
                  Loading data...
                </div>
              </td>
            </tr> 
            <tr v-else v-for="(comp,i) in filteredItems" :key="i">
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
                <v-btn 
                  @click="edit(comp)"  
                  color="#CFD8DC" 
                  density="compact"  
                  icon="mdi-pencil"  
                  class="mr-1"
                  v-tooltip="{location:'top',text:'EDIT'}" 
                ></v-btn>     

                <!-- <v-btn 
                  @click="deleteItem"  
                  color="error" 
                  density="compact" 
                  icon="mdi-delete"
                  v-tooltip="'DELETE'"
                  disabled
                ></v-btn>   -->
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>  
    </v-card>
  </v-dialog>

  <!-- COMPANY ADD DIALOG--> 
  <v-dialog v-model="addDialog" max-width="400px" persistent>
    <v-card>
      <v-toolbar color="#424242" density="comfortable"> 
        <v-toolbar-title>{{flag}} COMPANY</v-toolbar-title>  
        <v-btn 
          icon="mdi-close-circle" 
          color="red" 
          @click="addDialog = false" 
          v-tooltip="{location:'right',text:'Close'}"
        ></v-btn>
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
              class=" small-select"
            ></v-select>
            <!-- <v-text-field v-model="companyObj.status_id" label="Status" density="compact" variant="outlined" hide-details class="small-input"/> -->
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="companyObj.co_alias" label="ALIAS" density="compact" variant="outlined" hide-details class=" small-input"/>
          </v-col>
        </v-row>

        <v-row dense> 
          <v-col cols="6">
            <v-text-field v-model="companyObj.bldg_street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
            <v-text-field v-model="companyObj.district_municipality" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
            <v-text-field v-model="companyObj.zip_code" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>     
            <v-autocomplete   
              v-model="companyObj.prov_id" 
              :items="province"  
              :item-title="item => item.prov_name" 
              :item-value="item => item.prov_id" 
              label="Select Province"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            /> 
            <v-autocomplete   
              v-model="companyObj.CityCode" 
              :items="city"  
              :item-title="item => item.CityDesc" 
              :item-value="item => item.CityCode" 
              label="Select Municipality/City"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            /> 
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
        <v-btn @click="saveComp()" :disabled="hasChanges" color="success" variant="elevated" density="compact">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> 

  <!-- BUSINESS UNIT TABLE DIALOG -->
  <v-dialog v-model="openBusinessunitDialog" max-width="80%" persistent>  
    <v-card> 
      <v-toolbar color="#00BCD4" density="comfortable">
        <v-toolbar-title style="text-align: center;">{{diaglogTitle}}</v-toolbar-title>  
        <v-btn 
          icon="mdi-close-circle" 
          color="red" 
          @click="openBusinessunitDialog = false, isLoading = true" 
          v-tooltip="{location:'right',text:'Close'}"
        ></v-btn>
      </v-toolbar>  

      <v-card-text>   
        <v-card-actions class="pa-0">  
          <v-spacer/>
          <v-text-field
            v-model="search" 
            max-width="250px"
            variant="outlined"  
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify" 
            hide-details
            class="small-input"
          />
        </v-card-actions>   

        <v-table density="compact">
          <thead>
            <tr>
              <th v-for="header in BuHeaders" :key="header.key" :class="header.class" >
                {{ header.title }}
              </th> 
            </tr>
          </thead>
          <tbody> 
            <tr v-show="businessUnit.length === 0"><td :colspan="BuHeaders.length" class="text-center" style="color: #B0BEC5;">No Data Available</td></tr>
            <tr v-if="isLoading">
              <td :colspan = BuHeaders.length>
                <div class="d-flex justify-center align-center" style="height: 150px;">
                  <v-progress-circular indeterminate color="primary" size="40" class="mr-2"/>
                  Loading data...
                </div>
              </td>
            </tr> 
            <tr v-else v-for="(bu,i) in filteredBu" :key="i">
              <td>{{ bu.co_id }}</td>
              <td>{{ bu.busunit_id }}</td>
              <td>{{ bu.busunit_name }}</td>
              <td>{{ bu.busunit_alias }}</td>
              <td>{{ bu.bldg_street }}</td>
              <td>{{ bu.district_municipality }}</td>
              <td>{{ bu.city_id }}</td>
              <td>{{ bu.prov_id }}</td>
              <td>{{ bu.zip_code }}</td>
              <td>{{ bu.e_mail }}</td>
              <td>{{ bu.tel_no }}</td>
              <td>{{ bu.fax_no }}</td> 
              <td>{{ bu.status_id }}</td>
              <td align="center"> 
                <v-btn 
                  @click="edit(bu)"  
                  color="#CFD8DC" 
                  density="compact" 
                  icon="mdi-pencil" 
                  class="mr-4"  
                  v-tooltip="'EDIT'"
                ></v-btn>  
                
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
  <!-- BUSINESS UNIT ADD DIALOG -->
  <v-dialog v-model="addBuDialog" max-width="400px" persistent>
    <v-card> 
      <v-toolbar color="#424242" density="comfortable"> 
        <v-toolbar-title>{{flag}} BUSINESS UNIT</v-toolbar-title>  
        <v-btn icon="mdi-close-circle" color="red" @click="addBuDialog = false" v-tooltip="{location:'right',text:'Close'}"></v-btn>
      </v-toolbar> 

      <v-card-text>  
        <v-row dense>
          <v-col cols="12">
            <v-text-field v-model="buObj.busunit_name" label="Enter Business name" density="compact" variant="outlined" hide-details class="small-input"/>
          </v-col> 
          <v-col cols="12">
            <v-autocomplete   
              v-model="buObj.co_id" 
              :items="company"  
              :item-title="item => item.co_name" 
              :item-value="item => item.co_id"  
              label="Select company"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="small-select"
            /> 
          </v-col>
          <v-col cols="6">
            <v-select   
              v-model="buObj.status_id" 
              :items="['ACTIVE', 'INACTIVE']"    
              label="Select Status"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class=" small-select"
            ></v-select>
            <!-- <v-text-field v-model="buObj.status_id" label="Status" density="compact" variant="outlined" hide-details class="small-input"/> -->
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="buObj.busunit_alias" label="ALIAS" density="compact" variant="outlined" hide-details class=" small-input"/>
          </v-col>
        </v-row>

        <v-row dense> 
          <v-col cols="6">
            <v-text-field v-model="buObj.bldg_street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
            <v-text-field v-model="buObj.district_municipality" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
            <v-text-field v-model="buObj.zip_code" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>     
            <v-autocomplete   
              v-model="buObj.prov_id" 
              :items="province"  
              :item-title="item => item.prov_name" 
              :item-value="item => item.prov_id"  
              label="Select Province"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            />  
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="buObj.tel_no" label="Phone" density="compact" variant="outlined" hide-details class="small-input"/>  
            <v-text-field v-model="buObj.fax_no" label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
            <v-text-field v-model="buObj.e_mail" label="Email" type="email" required density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
            <v-autocomplete   
              v-model="buObj.CityCode" 
              :items="city"  
              :item-title="item => item.CityDesc" 
              :item-value="item => item.CityCode"  
              label="Select Municipality/City"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            /> 
          </v-col> 
        </v-row> 
      </v-card-text>
      <v-card-actions>   
        <v-btn @click="saveComp()" :disabled="hasChanges" color="success" variant="elevated" density="compact">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- OFFICE BRANCH TABLE DIALOG -->
  <v-dialog v-model="openOfficeBranchDialog" max-width="80%" persistent>  
    <v-card> 
      <v-toolbar color="#00BCD4" density="comfortable">
        <v-toolbar-title style="text-align: center;">{{diaglogTitle}}</v-toolbar-title>  
        <v-btn 
          icon="mdi-close-circle" 
          color="red" 
          @click="openOfficeBranchDialog = false, isLoading = true" 
          v-tooltip="{location:'right',text:'Close'}"
        ></v-btn>
      </v-toolbar>  

      <v-card-text>  
        <v-card-actions class="pa-0">  
          <v-spacer/>
          <v-text-field
            v-model="search" 
            max-width="250px"
            variant="outlined"  
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify" 
            hide-details
            class="small-input"
          />
        </v-card-actions>
        
        <v-table density="compact">
          <thead>
            <tr>
              <th v-for="header in officeBranchHeaders" :key="header.key" :class="header.class" >
                {{ header.title }}
              </th> 
            </tr>
          </thead>
          <tbody>
            <tr v-show="officeBranch.length === 0"><td :colspan="BuHeaders.length" class="text-center" style="color: #B0BEC5;">No Data Available</td></tr>
            <tr v-if="isLoading">
              <td :colspan = BuHeaders.length>
                <div class="d-flex justify-center align-center" style="height: 150px;">
                  <v-progress-circular indeterminate color="primary" size="40" class="mr-2"/>
                  Loading data...
                </div>
              </td>
            </tr>  
            <tr v-else v-for="(ob,i) in filteredOfficeBranch" :key="i">
              <td>{{ ob.co_id }}</td>
              <td>{{ ob.branch_id }}</td>
              <td>{{ ob.branch_name }}</td>
              <td>{{ ob.branch_alias }}</td>
              <td>{{ ob.bldg_street }}</td>
              <td>{{ ob.district_municipality }}</td>
              <td>{{ ob.city_id }}</td>
              <td>{{ ob.prov_id }}</td>
              <td>{{ ob.zip_code }}</td> 
              <td>{{ ob.tel_no }}</td>
              <td>{{ ob.fax_no }}</td> 
              <td>{{ ob.status_id }}</td>
              <td align="center"> 
                <v-btn 
                  @click="edit(ob)"  
                  color="#CFD8DC" 
                  density="compact" 
                  icon="mdi-pencil" 
                  class="mr-4"  
                  v-tooltip="{location:'top',text:'EDIT'}"
                ></v-btn>  
                
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
  <!-- OFFICE BRANCH ADD DIALOG -->
  <v-dialog v-model="addOfficeBranchDialog" max-width="400px" persistent>
    <v-card> 
      <v-toolbar color="#424242" density="comfortable"> 
        <v-toolbar-title>{{flag}} OFFICE BRANCH</v-toolbar-title>  
        <v-btn icon="mdi-close-circle" color="red" @click="addOfficeBranchDialog = false" v-tooltip="{location:'right',text:'Close'}"></v-btn>
      </v-toolbar> 

      <v-card-text>  
        <v-row dense> 
          <v-col cols="12">
            <v-autocomplete   
              v-model="officeBranchObj.co_id" 
              :items="company"  
              :item-title="item => item.co_name" 
              :item-value="item => item.co_id"  
              label="Select company"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="small-select"
            /> 
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="officeBranchObj.branch_name" label="Enter Office Branch name" density="compact" variant="outlined" hide-details class="small-input"/>
          </v-col> 
          <v-col cols="6">
            <v-select   
              v-model="officeBranchObj.status_id" 
              :items="['ACTIVE', 'INACTIVE']"    
              label="Select Status"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class=" small-select"
            ></v-select>
            <!-- <v-text-field v-model="officeBranchObj.status_id" label="Status" density="compact" variant="outlined" hide-details class="small-input"/> -->
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="officeBranchObj.branch_alias" label="ALIAS" density="compact" variant="outlined" hide-details class=" small-input"/>
          </v-col>
        </v-row>

        <v-row dense> 
          <v-col cols="6">
            <v-text-field v-model="officeBranchObj.bldg_street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
            <v-text-field v-model="officeBranchObj.district_municipality" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
            <v-text-field v-model="officeBranchObj.zip_code" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>     
            <v-autocomplete   
              v-model="officeBranchObj.prov_id" 
              :items="province"  
              :item-title="item => item.prov_name" 
              :item-value="item => item.prov_id"  
              label="Select Province"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            />  
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="officeBranchObj.tel_no" label="Phone" density="compact" variant="outlined" hide-details class="small-input"/>  
            <v-text-field v-model="officeBranchObj.fax_no" label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/>  
            <v-autocomplete   
              v-model="officeBranchObj.CityCode" 
              :items="city"  
              :item-title="item => item.CityDesc" 
              :item-value="item => item.CityCode"  
              label="Select Municipality/City"   
              :menu-props="{ scrim: true, scrollStrategy: 'close' }"
              variant="outlined"
              density="compact" 
              hide-details      
              clearable  
              class="mt-2 small-select"
            /> 
          </v-col> 
        </v-row> 
      </v-card-text>
      <v-card-actions>   
        <v-btn @click="saveComp()" :disabled="hasChanges" color="success" variant="elevated" density="compact">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script> 
import axios from 'axios';
import { mapState } from 'vuex';

export default { 
  name: 'DialogComponent',
  props:[    
    'diaglogTitle','disabled', 
    'businessUnit' ,
    'officeBranch' , 'fromCompanyFiles'
  ],
  emits:['updateCompany', 'updateBusinessunit', 'updateOfficeBranch' ],

  watch: {
    company(newData){
      if(newData){
        this.companyTable = newData
      }
    }, 

    businessUnit(newData){
      if(newData){
        this.businessUnitTable = newData
      } 
    },

    officeBranch(newData){
      if(newData){
        this.officeBranchTable = newData
      }
    },
 
    filteredItems(data) {
      data.map(com => com.status_id = com.status_id == 'A' || com.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE')  
    },  
    
    filteredBu(data) {
      data.map(bu => bu.status_id = bu.status_id == 'A' || bu.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE')  
    },  

    filteredOfficeBranch(data) {
      data.map(ob => ob.status_id = ob.status_id == 'A' || ob.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE')  
    },   
  },

  computed: {
    ...mapState(['company', 'province', 'city']),

    filteredItems() {
      const searchTerm = this.search.trim().toLowerCase();

      if (!searchTerm) return this.companyTable;

      return this.companyTable.filter(item =>
        Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
        ));
    }, 

    filteredBu(){ 
      const searchTerm = this.search.trim().toLowerCase();

      if (!searchTerm) return this.businessUnitTable; 
      return this.businessUnitTable.filter(item =>
        Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
        ));
    },

    filteredOfficeBranch(){ 
      const searchTerm = this.search.trim().toLowerCase();

      if (!searchTerm) return this.officeBranchTable; 
      return this.officeBranchTable.filter(item =>
        Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
        ));
    },

    hasChanges() {
      if(this.flag === 'EDIT'){
        if(this.fromCompanyFiles === 'bu'){
          return !this.buObj || !this.buObj.busunit_name || !this.buObj.co_id || !this.buObj.busunit_alias || !this.buObj.status_id ? true : this.isSaved({
                                                                                                                                              obj: this.buObj, 
                                                                                                                                              temp: this.tempBuObj
                                                                                                                                            })
        }else if(this.fromCompanyFiles === 'co'){ 
          return !this.companyObj.co_name || !this.companyObj || !this.companyObj.status_id || !this.companyObj.co_alias ? true : this.isSaved({
                                                                                                                                    obj: this.companyObj, 
                                                                                                                                    temp: this.tempCompanyObj
                                                                                                                                  }) 
        }else if(this.fromCompanyFiles === 'ob'){
          return !this.officeBranchObj || !this.officeBranchObj.co_id || !this.officeBranchObj.branch_name || !this.officeBranchObj.status_id ? true : this.isSaved({
                                                                                                                                                        obj: this.officeBranchObj, 
                                                                                                                                                        temp: this.tempOfficeBranchObj
                                                                                                                                                      }) 
        } 
        return alert('mali sa edit has changes')
      }else{
        if(this.fromCompanyFiles === 'co'){ 
          return (!this.companyObj.co_name || !this.companyObj || !this.companyObj.status_id || !this.companyObj.co_alias) ? true : false
        }else if(this.fromCompanyFiles === 'bu'){
          return !this.buObj || !this.buObj.busunit_name || !this.buObj.co_id || !this.buObj.busunit_alias || !this.buObj.status_id ? true : false
        }else if(this.fromCompanyFiles === 'ob'){
          return (!this.officeBranchObj || !this.officeBranchObj.co_id || !this.officeBranchObj.branch_name || !this.officeBranchObj.status_id) ? true : false
        }return alert('mali sa add hasChanges')
      }
    }, 

    BuHeaders(){ 
      return [
        { key: 'co_id', title: 'Company ID', class:'text-left'},
        { key: 'busunit_id', title: 'Business ID', width: 150, class:'text-left' },
        { key: 'busunit_name', title: 'Business Name', class:'text-left' },
        { key: 'busunit_alias', title: 'Business Alias', width: 150, class:'text-left' },
        { key: 'bldg_street', title: 'Building/Street', class:'text-left' },
        { key: 'district_municipality', title: 'District/Municipality', class:'text-left' },
        { key: 'city_id', title: 'City Id', class:'text-left' },
        { key: 'prov_id', title: 'Province Id', class:'text-left' },
        { key: 'zip_code', title: 'zip code', class:'text-left' },
        { key: 'e_mail', title: 'Email', class:'text-left' },
        { key: 'tel_no', title: 'Tel No', class:'text-left' },
        { key: 'fax_no', title: 'Fax No', class:'text-left' },
        { key: 'status_id', title: 'Status', class:'text-left' },
        { key: 'actions', title: 'Actions', class:'text-center' },
      ]
    }, 

    officeBranchHeaders(){ 
      return [
        { key: 'co_id', title: 'Company ID', class:'text-left'},
        { key: 'branch_id', title: 'Branch ID', width: 150, class:'text-left' },
        { key: 'branch_name', title: 'Branch Name', class:'text-left' },
        { key: 'branch_alias', title: 'Branch Alias', width: 150, class:'text-left' },
        { key: 'bldg_street', title: 'Building/Street', class:'text-left' },
        { key: 'district_municipality', title: 'District/Municipality', class:'text-left' },
        { key: 'city_id', title: 'City Id', class:'text-left' },
        { key: 'prov_id', title: 'Province Id', class:'text-left' },
        { key: 'zip_code', title: 'zip code', class:'text-left' }, 
        { key: 'tel_no', title: 'Tel No', class:'text-left' },
        { key: 'fax_no', title: 'Fax No', class:'text-left' },
        { key: 'status_id', title: 'Status', class:'text-left' },
        { key: 'actions', title: 'Actions', class:'text-center' },
      ]
    }, 

    headers(){
      return [
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
      ]
    }, 
  },

  data() {
    return {   
      search:'',   
      flag:'',
      isLoading: true,
      openOfficeBranchDialog:false,
      openBusinessunitDialog:false,
      addBuDialog:false,
      addOfficeBranchDialog: false,
      localDialog: false,
      addDialog:false,
      companyTable:[],
      businessUnitTable:[],
      officeBranchTable:[],
      companyObj:{},
      tempCompanyObj:{},   
      buObj:{}, 
      tempBuObj:{},
      officeBranchObj:{},
      tempOfficeBranchObj:{},
    }
  }, 

  // watch: {
  //   localDialog(val) { 
  //     this.$emit('test', val);
  //   } 
  // },   

  methods: { 
    isSaved(payload){
      return Object.keys(payload.obj).every((key) => {
        if (payload.obj[key] === payload.temp[key]) {
          return true;  
        }
          return false; 
      });
    },

    openDialog(){    
      if(this.fromCompanyFiles === 'bu'){ 
        this.openBusinessunitDialog = true 
        this.businessUnitTable = this.businessUnit  
        setTimeout(() => {
          this.isLoading = false
        }, 1500);
      }else if(this.fromCompanyFiles === 'co'){  
        this.companyTable = this.company
        this.localDialog = true
        setTimeout(() => {
          this.isLoading = false
        }, 1500); 
      }else if(this.fromCompanyFiles === 'ob'){
        this.officeBranchTable = this.officeBranch
        this.openOfficeBranchDialog = true
        setTimeout(() => {
          this.isLoading = false
        }, 1500);
      }
    }, 

    deleteItem(){
      alert('Wala pa')
    },  

    edit(value){  
      this.flag= 'EDIT'    
      if(this.fromCompanyFiles === 'bu'){
        this.addBuDialog = true 
        this.buObj = {...value}
        this.tempBuObj = {...value}
      }else if(this.fromCompanyFiles === 'co'){
        this.addDialog = true
        this.companyObj={...value}
        this.tempCompanyObj={...value} 
      }else if(this.fromCompanyFiles === 'ob'){
        this.addOfficeBranchDialog = true 
        this.officeBranchObj = {...value}
        this.tempOfficeBranchObj = {...value} 
      }  
    }, 
    
    add(){  
      this.flag = 'ADD' 
      if(this.fromCompanyFiles === 'bu'){ 
        this.buObj = {}
        this.addBuDialog = true 
      } else if(this.fromCompanyFiles === 'co'){
        this.companyObj={}  
        this.addDialog = true  
      } else if(this.fromCompanyFiles === 'ob'){
        this.officeBranchObj = {}
        this.addOfficeBranchDialog = true
      } else{
        alert('mali add')
      }
    }, 

    saveCompData(obj, title){
      if(this.flag === 'EDIT'){
        this.$Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true, 
          confirmButtonText: "Yes", 
        }).then(async (result) => { 
          if (result.isConfirmed) { 
            const res = await axios.post('http://192.168.1.174:3000/myApi/edit_company', {data: obj, flag: this.fromCompanyFiles})
            if(res.data.success){
              await this.$Swal.fire({
                title: res.data.message,
                text: "",
                icon: "success",
                timer: 1500,  
                showConfirmButton: false 
              });    

              if(this.fromCompanyFiles === 'co'){
                this.addDialog = false 
                this.$emit('updateCompany') 
              }else if(this.fromCompanyFiles === 'bu'){
                this.addBuDialog = false 
                this.$emit('updateBusinessunit')
              }else if(this.fromCompanyFiles === 'ob'){
                this.addOfficeBranchDialog = false 
                this.$emit('updateOfficeBranch') 
              }else{
                alert('wala man ma update after edit')
              } 
            }else{
              this.$Swal.fire({ 
              icon: "error",
              text: res.data.message,
              title: "ERROR!", 
              });
            }  
          } 
        });
      }else{
        //ADD 
        this.$Swal.fire({
          title: `Do you want to add ${title}?`,
          showDenyButton: true, 
          confirmButtonText: "Yes", 
        }).then(async (result) => { 
          if (result.isConfirmed) {
            const res = await axios.post('http://192.168.1.174:3000/myApi/add_company', {data: obj, flag: this.fromCompanyFiles}) 
            if(res.data.success){
              await this.$Swal.fire({ 
                icon: "success",
                text: res.data.message,
                title: "SAVED!",
                showConfirmButton: false,
                timer: 2000
              });  

              if(this.fromCompanyFiles === 'co'){
                this.addDialog = false 
                this.$emit('updateCompany') 
              }else if(this.fromCompanyFiles === 'bu'){
                this.addBuDialog = false 
                this.$emit('updateBusinessunit')
              }else if(this.fromCompanyFiles === 'ob'){
                this.addOfficeBranchDialog = false 
                this.$emit('updateOfficeBranch') 
              }else{
                alert('wala man ma update after add')
              }
            } else{
              this.$Swal.fire({ 
              icon: "error",
              text: res.data.message,
              title: "ERROR!", 
              }); 
            } 
          } 
        })
      } 
    },

    async saveComp(){  
      if(this.flag == 'EDIT'){ 
        if(this.fromCompanyFiles === 'co'){    
          this.saveCompData(this.companyObj) 
        }else if(this.fromCompanyFiles === 'bu'){   
          this.saveCompData(this.buObj) 
        }else if(this.fromCompanyFiles === 'ob'){ 
          this.saveCompData(this.officeBranchObj) 
        }else{
          alert('wala man masave sa edit')
        }   
      }else{  
        //ADD
        if(this.fromCompanyFiles === 'co'){ 
          this.saveCompData(this.companyObj, 'company')
        }else if(this.fromCompanyFiles === 'bu'){   
          this.saveCompData(this.buObj, 'business unit')
        }else if(this.fromCompanyFiles === 'ob'){ 
          this.saveCompData(this.officeBranchObj, 'office branch') 
        }else{
          alert('wala man sa save ih')
        } 
      }
    }, 
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

::v-deep(.v-table thead th:last-child),
::v-deep(.v-table tbody td:last-child) {
  border-right: none;
}

.v-table thead tr {
  background-color: #9E9E9E;    
}

::v-deep(.v-table thead th){    
  border-right: 1px solid #ccc;  
  font-weight: 600;
  font-size: 12px;
  color: #333; 
  text-transform: uppercase;
}

.v-table tbody td { 
  border-right: 1px solid #ccc;
  padding: 12px 16px;
  font-size: 11px; 
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
