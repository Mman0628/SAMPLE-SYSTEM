<template>
    <v-container fluid>
        <v-row dense>  
            <v-col cols="3">
                <v-card 
                max-width="400px"   
                >
                    <v-toolbar color="primary" density="comfortable">
                        <v-toolbar-title style=" font-size: 12px;">COMPANY</v-toolbar-title> 
                        <!-- dialog  --> 
                        <v-card-actions>  
                            <company-dialog
                            :diaglogTitle = "title='COMPANY MASTER TABLE'" 
                            :fromComp = "co = 'co'"
                            @updateCompany="updateCompany"  
                            /> 
                        </v-card-actions> 
                    </v-toolbar>
 
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="compObj.co_id" label="Co Code" density="compact" variant="outlined" readonly class="small-input"/>  
                            </v-col> 
                            <v-col cols="6" style="max-height: 50px;">
                                <v-select   
                                    v-model="select" 
                                    :items="companyItems"  
                                    :item-title="item => item.co_name" 
                                    return-object
                                    @update:model-value="selectedCompany" 
                                    label="Select company"   
                                    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    variant="outlined"
                                    density="compact" 
                                    hide-details      
                                    clearable  
                                    class="small-select"
                                ></v-select>
                                <span v-show="select!=null" style="color: red; font-size: xx-small;">{{compObj.co_alias}}</span> 
                            </v-col>
                            <v-col cols="3"  style="max-height: 50px;">
                                <v-text-field v-model="compObj.status_id" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col>  
                        </v-row>  
                        <v-row dense> 
                            <v-col cols="12" class="mt-2">
                                <v-text-field v-model="compObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class=" small-input"/> 
                            </v-col>
                            <v-col cols="6"> 
                                <v-text-field v-model="compObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class="small-input"/>  
                                <v-text-field v-model="compObj.zip_code" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>    
                                <v-text-field v-model="compObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                    <span v-show="compObj.prov_name!=''"  style="font-size: x-small; color: blue;">{{compObj.prov_name}}</span> 
                                <v-text-field v-model="compObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                    <span v-show="compObj.CityDesc!=''"  style="font-size: x-small; color: blue;">{{compObj.CityDesc}}</span>  
                                
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="compObj.tel_no" readonly label="Phone" density="compact" variant="outlined" hide-details class="small-input"/>  
                                <v-text-field v-model="compObj.co_tin" readonly label="TIN" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>
                                <v-text-field v-model="compObj.fax_no" readonly label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
                                <v-text-field v-model="compObj.e_mail" readonly label="Email" type="email" required density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                            </v-col> 
                        </v-row>  
                    </v-card-text> 
                </v-card>
            </v-col>   
            <!-- BUSINESS UNIT -->
            <v-col cols="3">
                <v-card
                max-width="400px"   
                >
                    <v-toolbar color="primary" density="comfortable">
                        <v-toolbar-title style=" font-size: 12px;">BUSINESS UNIT</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>
                            <company-dialog
                                :diaglogTitle = "title='BUSINESS UNIT MASTER TABLE'"
                                :businessUnit = businessunitItems
                                :fromBU = "bu = 'bu'"
                                @updateBusinessunit = updateBusinessunit
                            /> 
                        </v-card-actions> 
                    </v-toolbar>

                        
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="businessunitObj.busunit_id" label="Business Unit ID" density="compact" variant="outlined" readonly class="small-input"/>  
                            </v-col> 
                            <v-col cols="6" >
                                <v-select   
                                v-model="selectBusinessunit" 
                                :items="businessunitItems"  
                                :item-title="item => item.busunit_name"
                                return-object
                                @update:model-value="selectedBusinessunit"
                                label="Select Business Unit"   
                                :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                variant="outlined"
                                density="compact" 
                                hide-details      
                                clearable  
                                class="small-select"
                                ></v-select>
                                <span v-show="businessunitObj.busunit_name!=null" style="color: red; font-size: xx-small;">{{businessunitObj.busunit_alias}}</span> 
                            </v-col>
                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="businessunitObj.status_id" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col> 

                            <v-col cols="3" style="max-height: 50px;">
                                <v-text-field v-model="businessunitObj.co_id" label="Company" density="compact" variant="outlined" readonly class="small-input"/>
                            </v-col> 
                            <v-col cols="6" class="mt-2">
                                <span style="font-size: x-small; color: blue;">{{businessunitObj.co_name}}</span>
                            </v-col>
                        </v-row>     
                        <v-row dense>
                            <v-col cols="12" >
                                <v-text-field v-model="businessunitObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>
                            </v-col>
                            <v-col cols="6"> 
                                <v-text-field v-model="businessunitObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class="small-input"/>   
                                <v-text-field v-model="businessunitObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                    <span v-show="businessunitObj.prov_name != ''"  style="font-size: x-small; color: blue;">{{businessunitObj.prov_name}}</span>  
                                <v-text-field v-model="businessunitObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                    <span v-show="businessunitObj.CityDesc != ''"  style="font-size: x-small; color: blue;">{{businessunitObj.CityDesc}}</span>
                                <v-text-field v-model="businessunitObj.tel_no" readonly label="Phone" density="compact" variant="outlined" hide-details class=" mt-2 small-input"/>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="businessunitObj.zip_code" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="small-input"/> 
                                <v-text-field v-model="businessunitObj.fax_no" readonly label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
                                <v-text-field v-model="businessunitObj.e_mail" readonly label="Email" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                            </v-col> 
                        </v-row>  
                    </v-card-text> 
                </v-card>
            </v-col> 
            <!-- OFFICE BRANCH -->
            <v-col cols="3">
                <v-card
                max-width="400px"   
                >
                    <v-toolbar color="primary" density="comfortable">
                        <v-toolbar-title style=" font-size: 12px;">OFFICE BRANCH</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>
                            <company-dialog 
                                :diaglogTitle = "title='OFFICE BRANCH MASTER TABLE'"
                                :officeBranch = officeBranchItems
                                :fromOB = "ob = 'ob'"
                                @updateOfficeBranch = updateOfficeBranch
                            /> 
                        </v-card-actions> 
                    </v-toolbar>

                    <div class="d-flex justify-center">  
                        <v-card-text> 
                            <v-row dense>
                                <v-col cols="3" style="max-height: 50px;">
                                    <v-text-field v-model="officeBranchObj.co_id" label="Company" density="compact" variant="outlined" readonly class="small-input"/>
                                </v-col> 
                                <v-col cols="6" class="mt-2">
                                    <span style="font-size: x-small; color: blue;">{{officeBranchObj.co_name}}</span>
                                </v-col>
                            </v-row>
                            <v-row dense > 
                                <v-col cols="3" style="max-height: 50px;">
                                    <v-text-field v-model="officeBranchObj.branch_id" label="Office Branch Id" density="compact" variant="outlined" readonly class="small-input"/>  
                                </v-col> 
                                <v-col cols="6" style="max-height: 50px;">
                                    <v-select   
                                        v-model="selectOfficeBranch" 
                                        :items="officeBranchItems"  
                                        :item-title="item => item.branch_name"
                                        return-object
                                        @update:model-value="selectedOfficeBranch"
                                        label="Select office branch id"   
                                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                        variant="outlined"
                                        density="compact" 
                                        hide-details      
                                        clearable  
                                        class="small-select"
                                    ></v-select>
                                    <span v-show="!!selectOfficeBranch" style="color: red; font-size: xx-small;">{{officeBranchObj.branch_alias}}</span> 
                                </v-col>
                                <v-col cols="3" style="max-height: 50px;">
                                    <v-text-field v-model="officeBranchObj.status_id" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                                </v-col>
                            </v-row> 
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field v-model="officeBranchObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                </v-col>
                                <v-col cols="6"> 
                                    <v-text-field v-model="officeBranchObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class=" small-input"/>     
                                    <v-text-field v-model="officeBranchObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                        <span v-show="!!officeBranchObj.prov_name"  style="font-size: x-small; color: blue;">{{officeBranchObj.prov_name}}</span> 
                                    <v-text-field v-model="officeBranchObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                        <span v-show="!!officeBranchObj.CityDesc"  style="font-size: x-small; color: blue;">{{officeBranchObj.CityDesc}}</span>  
                                </v-col>
                                <v-col cols="6"> 
                                    <v-text-field v-model="officeBranchObj.zip_code" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="small-input"/> 
                                    <v-text-field v-model="officeBranchObj.tel_no" readonly label="Phone" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                    <v-text-field v-model="officeBranchObj.fax_no" readonly label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/>  
                                </v-col> 
                            </v-row>  
                        </v-card-text>
                    </div>  
                </v-card>
            </v-col> 

            <!-- OTHER FILES -->
            <v-col cols="3">
                <v-card max-width="400px">
                    <v-toolbar color="primary" density="comfortable">    
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn
                                color="#E0E0E0"
                                v-bind="props"
                                v-tooltip="{text:'SELECT OTHER FILES'}" 
                                icon="mdi-view-headline"
                                > 
                                </v-btn>
                            </template>

                            <v-list density="compact"> 
                                <v-list-item v-for="(title,i) in menus" :key="i">
                                    <v-btn @click="otherFilesTitle(title)" density="compact" variant="outlined">
                                        {{ title }}
                                    </v-btn>
                                </v-list-item> 
                            </v-list>
                        </v-menu> 
                        <v-toolbar-title style="text-transform: uppercase; font-size: 12px;">{{ toolbarTitle }}</v-toolbar-title> 

                        <v-card-actions v-show="toolbarTitle !== 'OTHER COMPANY FILES'"> 
                            <other-files-dialog
                                :toolbarTitle = "title = toolbarTitle"
                                @updateEntityFromOFDialog = updateFromEntity
                            /> 
                        </v-card-actions>
                    </v-toolbar>
                    <!-- other vue file -->
                    <other-files
                        :toolbarTitle = "title = toolbarTitle"
                        :updateEntity = "message"
                    /> 
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template> 

<script> 
//components
import companyDialog from '../dialog_components/CompanyDialog.vue'
import otherFiles from '../companyFiles/OtherFiles.vue'
import otherFilesDialog from '../dialog_components/OtherFilesDialog.vue'
import axios from 'axios'
import { mapState } from 'vuex'  

export default {
    name:'CompanyFiles',
    components:{ companyDialog, otherFiles, otherFilesDialog},   

    computed: { 
        ...mapState(['company']),

        menus(){ 
            return [
                'Document Signatories', 
                'Documents', 
                'Division', 
                'Department', 
                'Section', 
                'Employee Information', 
                'Rank/Level', 
                'Employee Status', 
                'Holidays', 
                'Cut-Off',  
            ]
        },
    },
    
    data() {
        return {  
            selectOfficeBranch:null,
            selectBusinessunit:null,
            toolbarTitle:'OTHER COMPANY FILES',
            openFiles:false, 
            toggle:true,
            companyItems:[],
            businessunitItems:[],
            officeBranchItems:[],
            select:null,
            compObj:{},    
            businessunitObj:{},
            officeBranchObj:{},
            province:[],
            city:[], 
            message:''
            // emailRules: [
            //     v => !!v || 'Email is required',
            // ],
        }
    },

    watch:{  
        select(selected){
            if(selected){ 
                this.compObj.status_id= selected.status_id == 'A' || selected.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE'
            }
        },

        selectBusinessunit(bu){
            if(bu){ 
                this.businessunitObj.status_id = bu.status_id == 'A' || bu.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE'
            }else{
                this.businessunitObj.status_id = ''
            }
        },

        selectOfficeBranch(sel){ 
            this.officeBranchObj.status_id = !sel ? '' : sel.status_id == 'A' || sel.status_id == 'ACTIVE'? 'ACTIVE':'INACTIVE' 
        }, 
    }, 

    created () {
        this.getCompany();
    },

    methods: {  
        otherFilesTitle(title){
            this.toolbarTitle = title
        },

        updateFromEntity(){
            this.message = 'updateEntityData'
        },

        async updateCompany(){ 
            const updatedComp = await this.getCompany();
            this.companyItems =  updatedComp.company
        }, 

        async updateBusinessunit(){
            const businessUnit = await this.getCompany();
            this.businessunitItems = businessUnit.BU
        },

        async updateOfficeBranch(){
            const officeBranchUpdated = await this.getCompany();
            this.officeBranchItems = officeBranchUpdated.OB
        },

        async getCompany(){
            try {
                const comp = await axios.get('http://192.168.1.174:3000/myApi/company')   
                this.companyItems = comp.data.company  
                this.province =  comp.data.province
                this.city = comp.data.city 
                this.businessunitItems = comp.data.businessunit
                this.officeBranchItems = comp.data.officeBranch
                // console.log(comp.data);
                
                this.$store.commit('mutateCompany', this.companyItems) 
                this.$store.commit('mutateProvince', this.province)
                this.$store.commit('mutateCity', this.city)  

                return {
                    company: comp.data.company, 
                    BU: comp.data.businessunit,
                    OB: comp.data.officeBranch
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
            }  
        }, 

        selectedCompany(){    
            this.compObj = this.select !== null ? {...this.select} : {} 
        },

        selectedBusinessunit(){
            this.businessunitObj = this.selectBusinessunit !== null? {...this.selectBusinessunit } : {} 
        },

        selectedOfficeBranch(){ 
            this.officeBranchObj = !this.selectOfficeBranch ?  {} : {...this.selectOfficeBranch}
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

/**select */
::v-deep(.small-select .v-field__input) {
  font-size: 11px;  
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
</style>