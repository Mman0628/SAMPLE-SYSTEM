<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols="4"> 
                <v-card 
                max-width="400px" 
                >
                    <v-toolbar color="primary" density="comfortable">
                        <v-toolbar-title style=" font-size: 12px;">PROJECT MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>
                            <company-dialog
                            :diaglogTitle = "title='PROJECT MASTER TABLE'"
                            /> 
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense > 
                            <v-col cols="3">
                                <v-text-field v-model="projectObj.projectCode" label="Project" density="compact" variant="outlined" readonly class="small-input"/>  
                            </v-col> 
                            <v-col cols="6">
                                <v-select   
                                v-model="select" 
                                :items="items"  
                                @update:model-value="selectedpProject"
                                label="Select Project"   
                                :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                variant="outlined"
                                density="compact" 
                                hide-details      
                                clearable  
                                class="small-select"
                                ></v-select>
                                <span v-show="select!=null" style="color: red; font-size: xx-small;">{{alias}}</span> 
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="projectObj.status" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col>

                            
                            <v-col cols="3" style="height: 50px;">
                                <v-text-field v-model="projectObj.companyCode" label="Company" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col> 
                            <v-col cols="6" class="mt-2">
                                <span style="font-size: x-small; color: blue;">OOA SOLUTIONS INC.</span>
                            </v-col> 
                        </v-row> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-text-field v-model="projectObj.street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
                                <v-text-field v-model="projectObj.subdivision" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
                                <v-text-field v-model="projectObj.zipCode" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>    
                                <v-text-field v-model="projectObj.province" label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                    <span v-show="projectObj.province!=''"  style="font-size: x-small; color: blue;">{{provinceName}}</span> 
                                <v-text-field v-model="projectObj.city" label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                    <span v-show="projectObj.city!=''"  style="font-size: x-small; color: blue;">{{cityName}}</span>  
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="projectObj.landArea" label="Total Land Area" density="compact" variant="outlined" hide-details class="small-input"/> 
                                <v-text-field v-model="projectObj.saleableArea" label="Total Saleable Area" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                                <v-text-field v-model="projectObj.startDate" label="Start Date" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                            </v-col> 
                        </v-row>  
                    </v-card-text> 
                </v-card>
            </v-col> 

            <!-- <v-col cols="8"> 
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
                            <th>Co Code</th>
                            <th>Company Name</th>
                            <th>Co Alias</th>
                            <th>bldg_street</th>
                            <th class="text-center"> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(proj,i) in filteredItems" :key="i">
                            <td>{{proj.coCode}}</td>
                            <td>{{proj.companyName}}</td>
                            <td>{{proj.coAlias}}</td>
                            <td>{{proj.street}}</td>
                            <td align="center"> 
                                <v-tooltip text="EDIT" location="bottom" >
                                    <template v-slot:activator="{ props }">
                                        <v-btn @click="edit(proj,'EDIT')" v-bind="props" color="#CFD8DC" density="compact" icon="mdi-pencil" class="mr-4"></v-btn> 
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="ADD" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn @click="add(proj.coCode,'ADD')" v-bind="props" color="success" density="compact" icon="mdi-plus"></v-btn> 
                                    </template>
                                </v-tooltip> 
                            </td>
                        </tr>
                    </tbody>
                </v-table> 
            </v-col> -->
        </v-row>
    </v-container>
    <v-dialog v-model="projectDialog" max-width="20%" persistent>
        <v-card>
            <v-toolbar color="primary" density="comfortable">
                <v-toolbar-title>{{flag}}</v-toolbar-title>  
                <v-btn icon="mdi-close-circle" color="red" @click="closeDialog"></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-text-field v-model="projObj.coCode" label="coCode" density="compact" variant="outlined" max-width="300px" disabled/>
                <v-text-field v-model="projObj.companyName" label="Company Name" density="compact" variant="outlined" max-width="300px"/>
                <v-text-field v-model="projObj.coAlias" label="coAlias" density="compact" variant="outlined" max-width="300px"/>
                <v-text-field v-model="projObj.street" label="Street/Building" density="compact" variant="outlined" max-width="300px"/>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="saveProj(flag)" color="success" variant="elevated" density="compact">SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> 
</template>


<script>
    export default {
        data() {
            return {
                items:['ADDAS DEVELOPMENT CORPORATION', 'ADDIO PROPERTIES INC.','AMBITION LAND INC','AMICASSA PROCESS SOLUTIONS INC',
                    'CACTUS REALTY CORPORATION', 'COGL','COMPAS','DMCI PROJECT DEVELOPERS, INC.','EARTH & STYLE CORPORATION','EARTH ASPIRE CORPORATION'
                ],
                search:'',
                select:null,
                projectObj:{
                    projectCode:'',
                    companyCode:'01',
                    city:'',
                    province:'', 
                    street:'',
                    subdivision:'',
                    zipCode:'',
                    landArea:0,
                    saleableArea:0,
                    status:'',
                    startDate:''
                },  
                alias:'',
                provinceName:'',
                cityName:'',
                sampleDataTable:[
                    {coCode:'01', companyName:'OOA SOLUTIONS INC.', coAlias:'OOA', street:'10F VERNIDA IV BLDG., LEVISTE ST'},
                    {coCode:'02', companyName:'EARTH & STYLE CORPORATION', coAlias:'ESC', street:'CALOOCAN'},
                ],
                projObj:{},
                tempProjObj:{}, 
                projectDialog:false,
                flag:''
            }
        }, 

        methods: { 
            selectedpProject() {
                if(this.select == 'ADDAS DEVELOPMENT CORPORATION'){
                    this.projectObj = {...this.projectObj, projectCode:'20', status:'Active', startDate: '2/10/2016'} 
                    this.alias = 'ADDAS'
                } 
            },

            edit(val,editFlag){ 
                this.projObj={...val}
                this.tempProjObj={...val}
                this.projectDialog = true
                this.flag= editFlag
            },

            add(addFlag){
                this.flag= addFlag
                this.projectDialog = true
                this.projObj={} 
            },

            hasChanges() {
                return Object.keys(this.projObj).some((key) => {
                    if (this.projObj[key] !== this.tempProjObj[key]) {
                    return true;
                    }
                    return false;
                });
            },

            saveProj(EA){  
                const idx = this.sampleDataTable.findIndex(id => id.coCode == this.projObj.coCode); 
                if(EA == 'EDIT'){ 
                    if(this.hasChanges()){
                        this.sampleDataTable[idx] ={...this.projObj}

                        this.$Swal.fire({ 
                        icon: "success",
                        text:'Successfully Edited',
                        title: "EDITED",
                        showConfirmButton: false,
                        timer: 1500
                        });

                        this.projectDialog = false 
                    }else 
                        this.$Swal.fire({ 
                        icon: "info",
                        title: "No Changes Made",  
                        });  
                }else{      
                    const {companyName,coAlias,street} = this.projObj 
                    const projectKeys = [companyName,coAlias,street]
                    const checkVal = Object.values(projectKeys).some(a => a === undefined)
                    
                    if(!checkVal){
                        this.projObj.coCode = `0${this.sampleDataTable.length+1}`
                        this.sampleDataTable.push(this.projObj)

                        this.$Swal.fire({ 
                        icon: "success",
                        text:'Successfully Added',
                        title: "SAVED!",
                        showConfirmButton: false,
                        timer: 1500
                        });
                        this.projectDialog = false 
                    }else 
                        this.$Swal.fire({ 
                        icon: "warning",
                        title: "Please fill all fields",  
                        }); 
                } 
            },

            closeDialog(){
                this.projectDialog = false
            } 
        },

        computed: {
            filteredItems() {
                const searchTerm = this.search.trim().toLowerCase();
 
                if (!searchTerm) return this.sampleDataTable;
 
                return this.sampleDataTable.filter(item =>
                    Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                    )
                );
            },
        },
    }
</script>

<style scoped>
::v-deep(.small-input input) {
  font-size: 11px;
  padding: 2px 6px !important;
  height: 28px !important;
}

::v-deep(.small-input .v-label) {
  font-size: 11px;
}

/*select*/
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
/**table css */
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
  background-color: #9bedf3;   
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
/**sweetalert overlay */
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
</style>