<template> 
    <v-container fluid> 
        <v-row dense>
            <v-col cols="3"> 
                <v-card 
                    max-width="400px"  
                >
                    <v-toolbar color="primary" density="compact">
                        <v-toolbar-title style=" font-size: 12px;">PROVINCE MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>   
                            <customer-files-dialog 
                                :fromProvince = "'provinceFlag'"
                                :toolbarTitle = "'Province Master File'" 
                                :dataFromCustomerFiles = provinceData
                                @updateProvince = updateNewProvince
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedProvince" 
                                    :items="provinceData"  
                                    :item-title="item => item.prov_name"
                                    return-object 
                                    label="Select province"   
                                    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    variant="outlined"
                                    density="compact"      
                                    clearable  
                                    class="small-select" 
                                    hide-details
                                    @update:model-value="selectedProvinceFunc"
                                /> 
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="provObj.status_id" readonly density="compact" variant="outlined" label="Status" class="small-input" hide-details/>
                            </v-col> 
                        </v-row> 
                    </v-card-text> 
                </v-card>
            </v-col> 

            <v-col cols="3"> 
                <v-card 
                    max-width="400px"  
                >
                    <v-toolbar color="primary" density="compact">
                        <v-toolbar-title style=" font-size: 12px;">CITY MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>
                            <customer-files-dialog 
                            :fromCity = "'cityFlag'" 
                            :toolbarTitle = "'City Master File'" 
                            :dataFromCustomerFiles = cityData
                            @updateCity = updateNewCity
                            />   
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedCity" 
                                    :items="cityData"  
                                    :item-title="item => item.CityDesc"
                                    return-object 
                                    label="Select city"   
                                    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    variant="outlined"
                                    density="compact"      
                                    clearable  
                                    class="small-select" 
                                    hide-details
                                    @update:model-value="selectedCityFunc"
                                /> 
                                <v-text-field v-model="cityProv" readonly density="compact" variant="outlined" label="Province" class="mt-2 small-input" hide-details/>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="status" readonly density="compact" variant="outlined" label="Status" class="small-input" hide-details/>
                            </v-col>  
                        </v-row> 
                    </v-card-text> 
                </v-card>
            </v-col> 

            <v-col cols="3"> 
                <v-card 
                    max-width="400px"  
                >
                    <v-toolbar color="primary" density="compact">
                        <v-toolbar-title style=" font-size: 12px;">CITIZEN</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>   
                            <customer-files-dialog 
                            :fromCitizen = "'citizenFlag'" 
                            :dataFromCustomerFiles = citizenData
                            :toolbarTitle = "'Citizen Master File'" 
                            @updateCitizen = updateNewCitizen
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedCitizen" 
                                    :items="citizenData"  
                                    :item-title="item => item.CitizenshipDesc"
                                    return-object 
                                    label="Select citizen"   
                                    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    variant="outlined"
                                    density="compact"      
                                    clearable  
                                    class="small-select" 
                                    hide-details
                                    @update:model-value="selectedCitizenFunc"
                                /> 
                                <span v-show="!!selectedCitizen" style="color: blue; font-size: small;">{{ citizenObj.CitizenshipCode }} </span>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="citizenObj.status_id" readonly density="compact" variant="outlined" label="Status" class="small-input" hide-details/>
                            </v-col> 
                        </v-row> 
                    </v-card-text> 
                </v-card>
            </v-col>  

            <v-col cols="3"> 
                <v-card 
                    max-width="400px"  
                >
                    <v-toolbar color="primary" density="compact">
                        <v-toolbar-title style=" font-size: 12px;">SALUTATION MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>   
                            <customer-files-dialog 
                            :fromSalutation = "'salutationFlag'"  
                            :dataFromCustomerFiles = salutationData
                            :toolbarTitle = "'Salutation Master File'"
                            @updateSalutation = updateNewSalutation 
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedSalutation" 
                                    :items="salutationData"  
                                    :item-title="item => item.SalutationDesc"
                                    return-object 
                                    label="Select salutation"   
                                    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    variant="outlined"
                                    density="compact"      
                                    clearable  
                                    class="small-select" 
                                    hide-details
                                    @update:model-value="selectedSalutationFunc"
                                /> 
                                <span v-show="!!selectedSalutation" style="color: blue; font-size: small;">{{ salutationObj.SalutationCode }} </span>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="salutationObj.status_id" readonly density="compact" variant="outlined" label="Status" class="small-input" hide-details/>
                            </v-col> 
                        </v-row> 
                    </v-card-text> 
                </v-card>
            </v-col>  
        </v-row>

        <v-row dense class="mt-6">
            <v-col cols="3"> 
                <v-card 
                    max-width="400px"  
                >
                    <v-toolbar color="primary" density="compact">
                        <v-toolbar-title style=" font-size: 12px;">NATURE OF BUSINESS MASTER FILE</v-toolbar-title>
                        <!-- dialog  --> 
                        <v-card-actions> 
                            <v-spacer/>   
                            <customer-files-dialog 
                            :fromNOB = "'NOBFlag'"   
                            :dataFromCustomerFiles = natureOfBusinessData
                            :toolbarTitle = "'Nature of Business Master File'" 
                            @updateNOB = updateNewNOB
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedNatureOfBusiness" 
                                    :items="natureOfBusinessData"  
                                    :item-title="item => item.NOBDesc"
                                    return-object 
                                    label="Select nature of business"   
                                    :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    variant="outlined"
                                    density="compact"      
                                    clearable  
                                    class="small-select" 
                                    hide-details
                                    @update:model-value="selectedNOB"
                                /> 
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="NOB_Obj.status_id" readonly density="compact" variant="outlined" label="Status" class="small-input" hide-details/>
                            </v-col> 
                        </v-row> 
                    </v-card-text> 
                </v-card>
            </v-col>
        </v-row> 
    </v-container> 
</template>

<script>
    //components
    import customerFilesDialog from '../dialog_components/CustomerFilesDialog.vue'
    import { mapState } from 'vuex';
    import axios from 'axios';  

    export default {
        components: { customerFilesDialog},

        data() {
            return {
                entityObj: {},
                citizenObj: {},
                salutationObj: {},
                NOB_Obj: {},
                provObj: {},
                selectedProvince: null,
                selectedCity: null,
                selectedCitizen: null,
                selectedSalutation: null,
                selectedNatureOfBusiness: null,
                cityProv: '', 
                status: '',
                citizenData: [],
                salutationData: [],
                natureOfBusinessData: [],
                provinceData: [],
                cityData: [], 
                btnColor: null,
            }
        },

        computed: {
            ...mapState(['province', 'city', 'company'])
        },

        created () {  
            this.getCustomerFiles(); 
            this.provinceData = this.province
            this.cityData = this.city
        },  

        methods: {   
            async getCustomerFiles(){
                const res = await axios.get('http://192.168.1.174:3000/myApi/customer_files')
                console.log(res.data,'citizen'); 
                this.citizenData = res.data.citizen  
                this.salutationData = res.data.salutation 
                this.natureOfBusinessData = res.data.natureOfBusiness 
                return {
                    citizen: this.citizenData,
                    salutation: this.salutationData,
                    NOB: this.natureOfBusinessData
                }
            },

            async updateNewNOB(){
                const res = await this.getCustomerFiles()
                this.natureOfBusinessData = res.NOB
            },

            async updateNewSalutation (){
                const res = await this.getCustomerFiles()
                this.salutationData = res.salutation
            },

            async updateNewCitizen(){
                const res = await this.getCustomerFiles()
                this.citizenData = res.citizen
            },

            updateNewProvince(newVal) {
                console.log(newVal,'newVal ng prov pota'); 
                if(newVal){
                    this.provinceData = newVal
                }
            },

            updateNewCity(newVal) {
                if(newVal){
                    this.cityData = newVal
                }
            },

            selectedCityFunc() {  
                if(this.selectedCity !== null){
                    let prov = this.province.filter( prov => {
                        return prov.prov_id == this.selectedCity.city_prov
                    })

                    this.cityProv = prov.length > 0 ? prov[0].prov_name : '' 
                    this.status = 'ACTIVE'
                }else { 
                    this.cityProv = '' 
                    this.status = ''
                }
            },

            selectedProvinceFunc(){  
                this.provObj = this.mappedData(this.selectedProvince)
            },  

            mappedData(selectedObj){ 
                let obj = {}
                if(selectedObj !== null){
                    obj = Object.fromEntries(
                        Object.entries(selectedObj).map(([key, val]) => {
                            if(key === "status_id"){
                                return [key, val = !val ? null : val == 'A' ? 'ACTIVE' : 'INACTIVE']
                            }
                            return [key, val]
                        })
                    ) 
                }else {
                    obj = {}
                } 
                return obj; 
            },

            selectedNOB(){
                this.NOB_Obj = this.mappedData(this.selectedNatureOfBusiness);
            },

            selectedCitizenFunc(){  
                this.citizenObj = this.mappedData(this.selectedCitizen);
            },

            selectedSalutationFunc(){ 
                this.salutationObj = this.mappedData(this.selectedSalutation); 
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