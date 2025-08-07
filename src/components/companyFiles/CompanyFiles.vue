<template>
    <v-container fluid>
        <v-row dense> 
            <v-col cols="6">  
                <v-row dense>
                    <v-col cols="4" >
                        <v-card 
                        max-width="400px" 
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">COMPANY</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog
                                    :diaglogTitle = "title='COMPANY MASTER TABLE'"
                                    @isAdded = isAdded
                                    /> 
                                </v-card-actions> 
                            </v-toolbar>

                            <div class="d-flex justify-center">  
                                <v-card-text> 
                                    <v-row dense >
                                        <v-col cols="3">
                                            <v-text-field v-model="compObj.companyCode" label="Co Code" density="compact" variant="outlined" readonly 
                                            class="small-input"
                                            />  
                                        </v-col> 
                                        <v-col cols="6">
                                            <v-select   
                                            v-model="select" 
                                            :items="items"  
                                            @update:model-value="selectedCompany"
                                            label="Select company"   
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
                                            <v-text-field v-model="compObj.status" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                                        </v-col>
                                    </v-row> 
                                    <v-row dense>
                                        <v-col cols="6">
                                            <v-text-field v-model="compObj.street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
                                            <v-text-field v-model="compObj.subdivision" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
                                            <v-text-field v-model="compObj.zipCode" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>    
                                            <v-text-field v-model="compObj.province" label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                                <span v-show="compObj.province!=''"  style="font-size: x-small; color: blue;">{{provinceName}}</span> 
                                            <v-text-field v-model="compObj.city" label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                                <span v-show="compObj.city!=''"  style="font-size: x-small; color: blue;">{{cityName}}</span>  
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-model="compObj.phone" label="Phone" density="compact" variant="outlined" hide-details class="small-input"/> 
                                            <v-text-field v-model="compObj.tin" label="TIN" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/> 
                                            <v-text-field v-model="compObj.fax" label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
                                            <v-text-field v-model="compObj.email" label="Email" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                                        </v-col> 
                                    </v-row>  
                                </v-card-text>
                            </div>  
                        </v-card>
                    </v-col> 
                    <v-col cols="4">
                        <v-card
                        max-width="400px" 
                        height="390px"
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">BUSINESS UNIT</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                                
                            <v-card-text> 
                                <!-- <v-row dense>
                                    <v-col cols="3" style="height: 50px;">
                                        <v-text-field v-model="compObj.companyCode" label="Business Unit ID" density="compact" variant="outlined" disabled class="small-input"/>  
                                    </v-col> 
                                    <v-col cols="6" style="height: 50px;" class="mb-5">
                                        <v-select   
                                        v-model="select" 
                                        :items="items"  
                                        @update:model-value="selectedCompany"
                                        label="Select Business Unit ID"   
                                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                        variant="outlined"
                                        density="compact" 
                                        hide-details      
                                        clearable  
                                        class="small-select"
                                        ></v-select>
                                        <span v-show="select!=null" style="color: red; font-size: xx-small;">{{alias}}</span> 
                                    </v-col>
                                    <v-col cols="3" style="height: 50px;">
                                        <v-text-field v-model="compObj.status" label="Status" density="compact" variant="outlined" disabled class="small-input"/>
                                    </v-col> 

                                    <v-col cols="3" style="height: 50px;">
                                        <v-text-field v-model="compObj.companyCode" label="Company" density="compact" variant="outlined" disabled class="small-input"/>
                                    </v-col> 
                                    <v-col cols="6" class="mt-2">
                                        <span style="font-size: x-small; color: blue;">{{alias}}</span>
                                    </v-col>
                                </v-row>    
                                <v-row dense>
                                    <v-col cols="6">
                                        <v-text-field v-model="compObj.street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
                                        <v-text-field v-model="compObj.subdivision" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
                                        <v-text-field v-model="compObj.zipCode" label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>    
                                        <v-text-field v-model="compObj.province" label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                            <span v-show="compObj.province!=''"  style="font-size: x-small; color: blue;">{{provinceName}}</span>  
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="compObj.city" label="Municipality/City" density="compact" variant="outlined"  hide-details class="small-input"/>
                                            <span v-show="compObj.city!=''"  style="font-size: x-small; color: blue;">{{cityName}}</span>
                                        <v-text-field v-model="compObj.phone" label="Phone" density="compact" variant="outlined" hide-details class=" mt-2 small-input"/>  
                                        <v-text-field v-model="compObj.fax" label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
                                        <v-text-field v-model="compObj.email" label="Email" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                                    </v-col> 
                                </v-row>   -->
                            </v-card-text> 
                        </v-card>
                    </v-col> 
                    <v-col cols="4">
                        <v-card
                        max-width="400px" 
                        height="390px"
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">OFFICE BRANCH</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <div class="d-flex justify-center">  
                                <v-card-text> 
                                    <!-- <v-row dense>
                                        <v-col cols="3" style="height: 50px;">
                                            <v-text-field v-model="compObj.companyCode" label="Company" density="compact" variant="outlined" disabled class="small-input"/>
                                        </v-col> 
                                        <v-col cols="6" class="mt-2">
                                            <span style="font-size: x-small; color: blue;">{{alias}}</span>
                                        </v-col>
                                    </v-row>
                                    <v-row dense > 
                                        <v-col cols="3">
                                            <v-text-field v-model="compObj.companyCode" label="Co Code" density="compact" variant="outlined" disabled class="small-input"/>  
                                        </v-col> 
                                        <v-col cols="6">
                                            <v-select   
                                            v-model="select" 
                                            :items="items"  
                                            @update:model-value="selectedCompany"
                                            label="Select office branch id"   
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
                                            <v-text-field v-model="compObj.status" label="Status" density="compact" variant="outlined" disabled class="small-input"/>
                                        </v-col>
                                    </v-row> 
                                    <v-row dense>
                                        <v-col cols="6">
                                            <v-text-field v-model="compObj.street" label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
                                            <v-text-field v-model="compObj.subdivision" label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>     
                                            <v-text-field v-model="compObj.province" label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                                <span v-show="compObj.province!=''"  style="font-size: x-small; color: blue;">{{provinceName}}</span> 
                                            <v-text-field v-model="compObj.city" label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                                <span v-show="compObj.city!=''"  style="font-size: x-small; color: blue;">{{cityName}}</span>  
                                        </v-col>
                                        <v-col cols="6"> 
                                            <v-text-field v-model="compObj.zipCode" label="Zip Code" density="compact" variant="outlined" hide-details class="small-input"/> 
                                            <v-text-field v-model="compObj.phone" label="Phone" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                            <v-text-field v-model="compObj.fax" label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/>  
                                        </v-col> 
                                    </v-row>   -->
                                </v-card-text>
                            </div>  
                        </v-card>
                    </v-col> 
                </v-row> 

                <v-row dense>
                    <v-col cols="4">
                        <v-card
                        max-width="400px"  
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">DOCUMENT SIGNATORIES</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar> 
                        
                            <v-card-text>   
                            </v-card-text>
                        </v-card>
                    </v-col> 
                    <v-col cols="4">
                        <v-card
                        max-width="400px" 
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">DOCUMENTS</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text> 
                            </v-card-text> 
                        </v-card>
                    </v-col> 
                    <v-col cols="4">
                        <v-card
                        max-width="400px"  
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">DIVISION</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text> 
                            </v-card-text> 
                        </v-card>
                    </v-col>  
                </v-row> 
            </v-col> 

            <v-col cols="6">  
                <v-row dense>  
                    <v-col cols="4">
                        <v-card
                        max-width="400px" 
                        height="390px"
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">DEPARTMENT</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled
                                    /> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text> 
                            </v-card-text>
                        </v-card>
                    </v-col> 
                    <v-col cols="4">
                        <v-card
                        max-width="400px"  
                        height="390px"
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">SECTION</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card
                        max-width="400px"  
                        height="390px"
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">EMPLOYEE INFORMATION</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text> 
                            </v-card-text>
                        </v-card>
                    </v-col> 
                </v-row>

                <v-row dense>  
                    <v-col cols="4">
                        <v-card
                        max-width="400px"  
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">RANK/LEVEL</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text>  
                            </v-card-text>
                        </v-card>
                    </v-col> 
                    <v-col cols="4">
                        <v-card
                        max-width="400px" 
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">EMPLOYEE STATUS</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text>   
                            </v-card-text>
                        </v-card>
                    </v-col>  
                    <v-col cols="4">
                        <v-card
                        max-width="400px" 
                        >
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title style=" font-size: 12px;">CUT-OFF</v-toolbar-title>
                                <!-- dialog  --> 
                                <v-card-actions> 
                                    <v-spacer/>
                                    <company-dialog disabled/> 
                                </v-card-actions> 
                            </v-toolbar>

                            <v-card-text>  
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row> 
            </v-col>
        </v-row>
    </v-container>
</template> 

<script> 
import companyDialog from '../dialog_components/CompanyDialog.vue'

export default {
    name:'CompanyFiles',
    components:{
        companyDialog
    },  
    
    data() {
        return {  
            items:['FEDERAL LAND INC.','OOA SOLUTIONS INC.','PH 1 WORLD DEVELOPERS'],
            select:null,
            compObj:{
                companyCode:'',
                city:'',
                province:'', 
                street:'',
                subdivision:'',
                zipCode:'',
                phone:'',
                tin:'',
                fax:'',
                email:'',
                status:''
            }, 
            alias:'',
            provinceName:'',
            cityName:'',  
        }
    },

    watch:{  
        select(val){
            if(val == 'OOA SOLUTIONS INC.'){
                this.alias = 'OOA'
            }else{
                this.alias = val
            }
        },  
        'compObj.city'(val){
            if(val == '002'){
                this.cityName = 'MAKATI'
            }else{
                this.cityName=''
            }
        },
        'compObj.province'(val){ 
            if(val == '001'){
                this.provinceName = 'NATIONAL CAPITAL REGION'
            }else{
                this.provinceName=''
            }
        }
    }, 

    methods: {    
        selectedCompany(){  
            if(this.select== 'OOA SOLUTIONS INC.'){
                this.compObj.companyCode = '01'
                this.compObj.street = '10F VERNIDA IV BLDG., LEVISTE ST'
                this.compObj.subdivision = 'MAKATI CITY'
                this.compObj.province = '001'
                this.compObj.city = '002'
                this.compObj.tin = '008-426-605-000'
                this.compObj.status = 'Active'
            }else{
                this.compObj ={}
            }  
        },

        isAdded(val){
            if(val.flag){
                this.items.push(val.data)
            }
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
</style>