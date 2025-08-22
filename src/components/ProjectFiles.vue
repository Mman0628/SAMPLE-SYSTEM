<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols="4"> 
                <v-card 
                max-width="400px" 
                class="mx-auto"
                >
                    <v-toolbar color="primary" density="comfortable">
                        <v-toolbar-title style=" font-size: 12px;">PROJECT MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>  
                            <project-dialog
                                @updateProject = updateProject
                                :fromProj = "proj='proj'"
                                :tableTitle = "title = 'PROJECT TABLE MASTER FILE'"
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense > 
                            <v-col cols="3" style="max-height: 60px;">
                                <v-text-field v-model="projectObj.proj_id" label="Project ID" density="compact" variant="outlined" readonly class="small-input"/>  
                            </v-col> 
                            <v-col cols="9" style="max-height: 60px;">
                                <v-select   
                                v-model="selectedProject" 
                                :items="projectItems"  
                                :item-title="proj => proj.proj_name"
                                return-object
                                @update:model-value="selectedpProjectFunc"
                                label="Select Project"   
                                :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                variant="outlined"
                                density="compact" 
                                hide-details      
                                clearable  
                                class="small-select"
                                ></v-select>
                                <span v-show="!!selectedProject" style="color: red; font-size: xx-small;">{{projectObj.proj_alias}}</span> 
                            </v-col>
                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="projectObj.status_id" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col> 
                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="projectObj.co_id" label="Company" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col> 
                            <v-col cols="6" class="mt-2" style="max-height: 50px;" >
                                <span v-show="!!selectedProject" style="font-size: x-small; color: blue;">{{projectObj.co_name}}</span>
                            </v-col> 
                        </v-row> 
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field v-model="projectObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/> 
                            </v-col>
                            <v-col cols="6"> 
                                <v-text-field v-model="projectObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class="small-input"/>  
                                <v-text-field v-model="projectObj.zipcode" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>    
                                <v-text-field v-model="projectObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                    <span v-show="!!projectObj.prov_name"  style="font-size: x-small; color: blue;">{{projectObj.prov_name}}</span> 
                                <v-text-field v-model="projectObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                    <span v-show="!!projectObj.CityDesc"  style="font-size: x-small; color: blue;">{{projectObj.CityDesc}}</span>  
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="projectObj.totLandArea" readonly label="Total Land Area" density="compact" variant="outlined" hide-details class="small-input"/> 
                                <v-text-field v-model="projectObj.totSaleableArea" readonly label="Total Saleable Area" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                                <v-text-field v-model="projectObj.startdate" readonly label="Start Date" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                            </v-col> 
                        </v-row>  
                    </v-card-text> 
                </v-card>
            </v-col> 

            <!-- SUB PROJECT -->
            <v-col cols="4"> 
                <v-card 
                max-width="400px" 
                class="mx-auto"
                >
                    <v-toolbar color="primary" density="comfortable">
                        <v-toolbar-title style=" font-size: 12px;">SUB PROJECT MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>  
                            <project-dialog
                                :tableTitle = "title = 'SUB PROJECT TABLE MASTER FILE'"
                                @updateSubProject = updateSubProject
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense > 
                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="subProjectObj.proj_id" label="Project ID" density="compact" variant="outlined" readonly class="small-input"/>  
                            </v-col> 
                            <v-col cols="9" class="mt-2" style="max-height: 50px;">
                                <span style="font-size: x-small; color: blue;">{{subProjectObj.proj_name}}</span>
                            </v-col>

                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="subProjectObj.sub_proj_id" label="Sub ID" density="compact" variant="outlined" readonly class="small-input"/>  
                            </v-col> 
                            <v-col cols="9" style="max-height: 60px;">
                                <v-select   
                                v-model="selectedSubProject" 
                                :items="subProjectItems"  
                                :item-title="item => item.sub_proj_name"
                                return-object
                                @update:model-value="selectedpSubProjectFunc"
                                label="Select Sub Project"   
                                :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                variant="outlined"
                                density="compact" 
                                hide-details      
                                clearable  
                                class="small-select"
                                ></v-select>
                                
                                <span style="color: red; font-size: xx-small;">{{subProjectObj.sub_proj_alias}}</span> 
                            </v-col>

                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="subProjectObj.status_id" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col> 
                            <v-col cols="9" class="pa-0" style="max-height: 50px;"> 
                                <v-checkbox
                                    v-model="subProjectObj.with_change_model"  
                                    label="With change in house model"
                                    class="small-checkbox"   
                                    readonly
                                ></v-checkbox> 
                            </v-col> 

                            <v-col cols="6">
                                <v-text-field v-model="subProjectObj.phase" readonly label="Phase" density="compact" variant="outlined" hide-details class="small-input"/> 
                            </v-col>
                            <v-col cols="6"> 
                                <v-text-field v-model="subProjectObj.release_batch" readonly label="Batch" density="compact" variant="outlined" hide-details class="small-input"/>  
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
                            <th>Project Name</th>
                            <th>Project Alias</th>
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
</template>


<script>
    import ProjectDialog from './dialog_components/ProjectDialog.vue';
    import axios from 'axios';   
    import { mapState } from 'vuex';

    export default {
        components: { ProjectDialog },

        data() {
            return {
                selectedProject:null,
                selectedSubProject: null, 
                projectItems:[],
                subProjectItems:[],  
                projectObj:{},  
                subProjectObj: {},   
            }
        }, 

        watch: {
            selectedProject(val) {
                if(val){
                    this.projectObj.status_id= val.status_id == 'A' || val.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE'
                }
            },

            selectedSubProject(val){
                if(val){
                    this.subProjectObj.status_id= val.status_id === 'A' || val.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE'
                }
            }, 
        },

        created () {
            this.getData();
        },

        methods: { 
            async getData(){
                const projData = await axios.get('http://localhost:3000/myApi/project') 
                this.projectItems = projData.data.project
                this.subProjectItems = projData.data.subProject 
                console.log(projData.data,'projjjj');
                this.$store.commit('mutateProject', this.projectItems)
                this.$store.commit('mutateSubProjects', this.subProjectItems)
                return {
                    proj: projData.data.project,
                    subProj: projData.data.subProject 
                }
            }, 

            async updateProject(){
                const updatedData = await this.getData() 
                this.projectItems = updatedData.proj
            },

            async updateSubProject(){
                const updatedData = await this.getData() 
                this.subProjectItems = updatedData.subProj
            },

            selectedpSubProjectFunc(){
                this.subProjectObj = !this.selectedSubProject ? {} : {...this.selectedSubProject}
            },

            selectedpProjectFunc() { 
                this.projectObj = !this.selectedProject ? {} : {...this.selectedProject} 
            }, 
        },

        computed: {
            ...mapState(['projects']), 
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
::v-deep(.small-checkbox .v-label) {
  font-size: 11px;
  max-height: 28px !important;
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