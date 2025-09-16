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
        @click="openTable()" 
        color="#B0BEC5"  
        density="compact" 
        variant="tonal" 
        icon="mdi-eye" 
        v-tooltip="{location:'bottom',text:'View'}"
    ></v-btn> 

    <!-- ADD PROJECT DIALOG -->
    <v-dialog v-model="projectDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="comfortable">
                <v-toolbar-title>{{flag}} PROJECT</v-toolbar-title>  
                <v-btn 
                    @click="projectDialog = false"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense >  
                    <v-col cols="9" style="max-height: 50px;">
                        <v-text-field v-model="projectObj.proj_name" label="Enter Project" density="compact" variant="outlined" class="small-input"/> 
                    </v-col> 
                    <v-col cols="3" style="max-height: 50px;">
                        <v-text-field v-model="projectObj.proj_alias" label="ALIAS" density="compact" variant="outlined" class="small-input"/>
                    </v-col>   
                    
                    <v-col cols="6">
                        <v-select   
                        v-model="projectObj.status_id" 
                        :items="['ACTIVE', 'INACTIVE']"    
                        label="Select Status"   
                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                        variant="outlined"
                        density="compact" 
                        hide-details      
                        clearable  
                        class=" small-select"
                        ></v-select> 
                    </v-col> 

                    <v-col cols="9" style="max-height: 50px;">
                        <v-autocomplete   
                            v-model="projectObj.co_id" 
                            :items="company"   
                            :item-title="co => co.co_name"
                            :item-value="co => co.co_id" 
                            label="Select company"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class="small-select"
                        />  
                    </v-col>   

                    <v-col cols="12" style="max-height: 50px;">
                        <v-text-field v-model="projectObj.bldg_street" label="Street/Building" density="compact" variant="outlined" class="small-input"/> 
                    </v-col>

                    <v-col cols="6"> 
                        <v-text-field v-model="projectObj.district_municipality" label="Subdivision/District" density="compact" variant="outlined" hide-details class="small-input"/>  
                        <v-text-field v-model="projectObj.zipcode" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
                        <v-autocomplete   
                            v-model="projectObj.prov_id" 
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
                            v-model="projectObj.CityCode" 
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
                        <v-text-field v-model="projectObj.totLandArea" label="Total Land Area" density="compact" variant="outlined" hide-details class="small-input"/> 
                        <v-text-field v-model="projectObj.totSaleableArea" label="Total Saleable Area" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                        <v-text-field v-model="projectObj.startdate" type="datetime-local" label="Start Date" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                    </v-col> 
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="saveProj()" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>  

    <!-- ADD SUB PROJECT DIALOG -->
    <v-dialog v-model="subProjectDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="comfortable">
                <v-toolbar-title>{{flag}} SUB PROJECT</v-toolbar-title>  
                <v-btn 
                    @click="subProjectDialog = false"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense >  
                    <v-col cols="9" style="max-height: 50px;">
                        <v-autocomplete   
                            v-model="subProjectObj.proj_id" 
                            :items="projects"  
                            :item-title="item => item.proj_name"
                            :item-value="item => item.proj_id" 
                            label="Select Project"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class="small-select"
                        />   
                    </v-col> 
                    <v-col cols="6" style="max-height: 50px;">
                        <v-select   
                            v-model="subProjectObj.status_id" 
                            :items="['ACTIVE', 'INACTIVE']"    
                            label="Select Status"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class=" small-select"
                        ></v-select>
                    </v-col> 
                      
                    <v-col cols="9" style="max-height: 50px;"> 
                        <v-text-field v-model="subProjectObj.sub_proj_name" label="Enter sub project" density="compact" variant="outlined" class="small-input"/> 
                    </v-col> 
                    <v-col cols="3" style="max-height: 50px;">
                        <v-text-field v-model="subProjectObj.sub_proj_alias" label="ALIAS" density="compact" variant="outlined" class="small-input"/> 
                    </v-col> 
                     
                    <v-col cols="9" class="pa-0" style="max-height: 50px;"> 
                        <v-checkbox
                            v-model="subProjectObj.with_change_model"  
                            label="With change in house model"
                            class="small-checkbox"    
                        ></v-checkbox> 
                    </v-col> 

                    <v-col cols="6">
                        <v-text-field v-model="subProjectObj.phase" label="Phase" density="compact" variant="outlined" hide-details class="small-input"/> 
                    </v-col>
                    <v-col cols="6"> 
                        <v-text-field v-model="subProjectObj.release_batch" maxlength="3" label="Batch" density="compact" variant="outlined" hide-details class="small-input"/>  
                    </v-col> 
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="saveProj()" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> 

    <!-- PROJECT TABLE DIALOG -->
    <v-dialog v-model="openProjectTableDialog" max-width="80%" persistent transition="dialog-top-transition">  
        <v-card> 
            <v-toolbar color="#00BCD4" density="comfortable">
                <v-toolbar-title style="text-align: center;">{{tableTitle}}</v-toolbar-title>  
                <v-btn 
                    icon="mdi-close-circle" 
                    color="red" 
                    @click="openProjectTableDialog = false, isLoading = true" 
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
                
                <v-table density="compact" fixed-header height="500px" striped="even">
                    <thead>
                        <tr>
                            <th v-for="(header,i) in projectHeaders" :key="i">
                                {{ header.title }}
                            </th> 
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-show="projects.length === 0"><td :colspan="projectHeaders.length" class="text-center" style="color: #B0BEC5;">No Data Available</td></tr>
                        <tr v-if="isLoading">
                            <td :colspan = projectHeaders.length>
                                <div class="d-flex justify-center align-center" style="height: 150px;">
                                <v-progress-circular indeterminate color="primary" size="40" class="mr-2"/>
                                Loading data...
                                </div>
                            </td>
                        </tr> 
                        <tr v-else v-for="(proj,i) in filteredItems" :key="i">
                            <td>{{ proj.co_id }}</td>
                            <td>{{ proj.proj_id }}</td>
                            <td>{{ proj.proj_name }}</td>
                            <td>{{ proj.proj_alias }}</td>
                            <td>{{ proj.bldg_street }}</td>
                            <td>{{ proj.district_municipality }}</td>
                            <td>{{ proj.city_id }}</td>
                            <td>{{ proj.prov_id }}</td>
                            <td>{{ proj.zipcode }}</td>
                            <td>{{ proj.startdate }}</td>
                            <td>{{ proj.totLandArea }}</td>
                            <td>{{ proj.totSaleableArea }}</td> 
                            <td>{{ proj.vatable }}</td>
                            <td>{{ proj.status_id }}</td>
                            <td class="text-center" width="100px"> 
                                <v-btn 
                                    @click="edit(proj)"  
                                    color="success" 
                                    density="compact" 
                                    icon="mdi-pencil" 
                                    class="mr-2"  
                                    v-tooltip="'EDIT'"
                                ></v-btn>   
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>  
        </v-card>
    </v-dialog>

    <!--SUB PROJECT TABLE DIALOG -->
    <v-dialog v-model="openSubProjectTableDialog" max-width="80%" persistent transition="dialog-top-transition">  
        <v-card> 
            <v-toolbar color="#00BCD4" density="comfortable">
                <v-toolbar-title style="text-align: center;">{{tableTitle}}</v-toolbar-title>  
                <v-btn 
                    icon="mdi-close-circle" 
                    color="red" 
                    @click="openSubProjectTableDialog = false, isLoading = true" 
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
                
                <v-table density="compact" fixed-header striped="even">
                    <thead>
                        <tr>
                            <th v-for="(header,i) in subProjectHeaders" :key="i">
                                {{ header.title }}
                            </th> 
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-show="subProjects.length === 0">
                            <td :colspan="subProjectHeaders.length" class="text-center" style="color: #B0BEC5;">
                                No Data Available
                            </td>
                        </tr>
                        <tr v-if="isLoading">
                            <td :colspan = subProjectHeaders.length>
                                <div class="d-flex justify-center align-center" style="height: 150px;">
                                <v-progress-circular indeterminate color="primary" size="40" class="mr-2"/>
                                Loading data...
                                </div>
                            </td>
                        </tr> 
                        <tr v-else v-for="(sproj,i) in filteredSubProject" :key="i"> 
                            <td>{{ sproj.proj_id }}</td>
                            <td>{{ sproj.sub_proj_id }}</td>
                            <td>{{ sproj.sub_proj_name }}</td>
                            <td>{{ sproj.sub_proj_alias }}</td>
                            <td>{{ sproj.phase }}</td>
                            <td>{{ sproj.release_batch }}</td>
                            <td>{{ sproj.with_change_model }}</td> 
                            <td>{{ sproj.status_id }}</td>
                            <td class="text-center" width="100px"> 
                                <v-btn 
                                    @click="edit(sproj)"  
                                    color="success" 
                                    density="compact" 
                                    icon="mdi-pencil" 
                                    class="mr-2"  
                                    v-tooltip="{text:'EDIT'}"
                                ></v-btn>   
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>  
        </v-card>
    </v-dialog> 
</template>

<script>
    import { saveData } from '@/save-data/save'; 
    import { mapState } from 'vuex';
    // import axios from 'axios';  

    export default {
        emits:['updateProject', 'updateSubProject'],
        props:['fromProj', 'tableTitle'],

        data() {
            return {
                projectDialog: false,
                subProjectDialog: false, 
                isLoading: true,
                openProjectTableDialog: false,
                openSubProjectTableDialog: false,
                flag:'', 
                search:'', 
                projectObj:{},
                tempProjectObj:{},
                subProjectObj:{},
                tempSubProjectObj:{}, 
                projectDataTable: [],
                subProjectDataTable: [],
            }
        }, 

        computed: {
            ...mapState(['projects', 'subProjects', 'company', 'province', 'city']),

            hasChanges(){ 
                if(this.flag === 'ADD'){
                    if(this.fromProj === 'proj'){
                        return (!this.projectObj || !this.projectObj.proj_name || !this.projectObj.proj_alias || !this.projectObj.co_id || !this.projectObj.status_id) ? true : false
                    }
                    return (!this.subProjectObj || !this.subProjectObj.proj_id || !this.subProjectObj.status_id || !this.subProjectObj.sub_proj_name 
                        || !this.subProjectObj.sub_proj_alias || !this.subProjectObj.phase || !this.subProjectObj.release_batch) ? true : false
                }else{
                    //edit
                    if(this.fromProj === 'proj'){
                        return !this.projectObj || !this.projectObj.proj_name || !this.projectObj.proj_alias || !this.projectObj.co_id || !this.projectObj.status_id ? true : this.isSaved({obj: this.projectObj, temp: this.tempProjectObj})
                    }
                    return (!this.subProjectObj || !this.subProjectObj.proj_id || !this.subProjectObj.status_id || !this.subProjectObj.sub_proj_name 
                        || !this.subProjectObj.sub_proj_alias || !this.subProjectObj.phase || !this.subProjectObj.release_batch) ? true : this.isSaved({obj: this.subProjectObj, temp: this.tempSubProjectObj})
                }
                
                
            },

            projectHeaders(){
                return [
                    {title:'Co ID'},
                    {title:'Project ID'},
                    {title:'Project Name'},
                    {title:'Project Alias'},
                    {title:'Building/Street'},
                    {title:'District/Municipality'},
                    {title:'City ID'},
                    {title:'Province ID'},
                    {title:'Zip Code'},
                    {title:'Start Date'},
                    {title:'Total Land Area'},
                    {title:'Total Saleable Area'},
                    {title:'Vatable'},
                    {title:'Status ID'},
                    {title:'Action'},
                ]
            },

            subProjectHeaders(){
                return [ 
                    {title:'Project ID'},
                    {title:'Sub Poject ID'},
                    {title:'Sub Project Name'},
                    {title:'ALIAS'},
                    {title:'Phase'},
                    {title:'Release Batch'},
                    {title:'With Change Model'}, 
                    {title:'Status ID'},
                    {title:'Action'},
                ]
            },

            filteredItems() {
                const searchTerm = this.search.trim().toLowerCase();
 
                if (!searchTerm) return this.projectDataTable;
 
                return this.projectDataTable.filter(item =>
                    Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                    )
                );
            },

            filteredSubProject() {
                const searchTerm = this.search.trim().toLowerCase();
 
                if (!searchTerm) return this.subProjectDataTable;
 
                return this.subProjectDataTable.filter(item =>
                    Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                    )
                );
            },
        },

        watch: {
            projects(val) {
                if(val){
                    val.map(value => value.status_id = value.status_id === 'A' || value.status_id === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE' ) 
                    val.map(value => value.vatable = value.vatable === false  || value.vatable === 0 ?  0 : 1) 
                    this.projectDataTable = val
                } 
            },

            subProjects(val){
                if(val){
                    val.map(value => value.status_id = value.status_id === 'A' || value.status_id === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE' ) 
                    val.map(value => value.with_change_model = value.with_change_model === false  || value.with_change_model === 0 ?  0 : 1) 
                    this.subProjectDataTable = val
                } 
            }, 
        },

        methods: {
            add() {
                this.flag = 'ADD'
                if(this.fromProj === 'proj'){
                    this.projectDialog = true 
                    this.projectObj = {} 
                } else{
                    this.subProjectDialog = true
                    this.subProjectObj = {}
                }
            },

            edit(data){
                this.flag = 'EDIT'
                if(this.fromProj === 'proj'){
                    this.projectDialog = true 
                    this.projectObj = {...data}
                    this.tempProjectObj = {...data}
                }else{
                    this.subProjectDialog = true
                    this.subProjectObj = {...data}
                    this.tempSubProjectObj = {...data}
                } 
            },

            isSaved(payload){
                return Object.keys(payload.obj).every((key) => {
                    if (payload.obj[key] === payload.temp[key]) {
                    return true;  
                    }
                    return false; 
                });
            },

            openTable(){
                if(this.fromProj){
                    this.openProjectTableDialog = true
                    this.projectDataTable = this.projects  
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1500); 
                }else{
                    this.openSubProjectTableDialog = true
                    this.subProjectDataTable = this.subProjects
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1500);
                }  
            },
            
            async saveProj(){   
                if(this.flag === 'ADD'){
                    if(this.fromProj === 'proj'){
                        const data = saveData({
                            title: 'project',
                            flag: this.fromProj,
                            data: this.projectObj,
                            status: 'ADD'
                        })
                        const res = await data.saveProject() 
                        if(res === 'saved'){
                            this.projectDialog = false 
                            this.$emit('updateProject')
                        } 
                    }else{
                        const data = saveData({
                            title: 'sub project',
                            flag: '',
                            data: this.subProjectObj,
                            status: 'ADD'
                        })
                        const res = await data.saveProject() 
                        if(res === 'saved'){
                            this.subProjectDialog = false 
                            this.$emit('updateSubProject')
                        } 
                    }
                }else{
                    //edit 
                    if(this.fromProj === 'proj'){
                        const data = saveData({ 
                            flag: this.fromProj,
                            data: this.projectObj, 
                        })
                        const res = await data.saveProject() 

                        if(res === 'edit saved'){
                            this.projectDialog = false 
                            this.$emit('updateProject')
                        } 
                    }else{
                        const data = saveData({  
                            data: this.subProjectObj, 
                        })
                        const res = await data.saveProject() 

                        if(res === 'edit saved'){
                            this.subProjectDialog = false 
                            this.$emit('updateSubProject')
                        } 
                    }
                } 
            },

            deleteItem(){
                alert('Wala pa')
            }
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

::v-deep(.small-checkbox .v-label) {
  font-size: 11px;
  max-height: 28px !important;
} 

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

::v-deep(.v-table thead th){   
  background-color: #9E9E9E !important;  
  border-right: 1px solid #ccc;   
  font-weight: 600;
  font-size: 12px; 
  text-transform: uppercase; 
}

.v-table tbody td { 
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px !important;
  font-size: 11px; 
  color: #333;
} 
</style>