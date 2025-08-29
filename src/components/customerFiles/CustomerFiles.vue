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
                                @updateProvince = updateNewProvince
                                :fromProvince = "title = 'provinceFlag'"
                            />
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedProvince" 
                                    :items="province"  
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
                                <v-text-field v-model="provStatus" readonly density="compact" variant="outlined" label="Status" class="small-input" hide-details/>
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
                            :fromCity = "title = 'cityFlag'"
                            />   
                        </v-card-actions> 
                    </v-toolbar>
  
                    <v-card-text> 
                        <v-row dense>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="selectedCity" 
                                    :items="city"  
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
                            :fromCitizen = "title = 'citizenFlag'"
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
                        <!-- <v-card-actions> 
                            <v-spacer/>   
                        </v-card-actions>  -->
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
                        <!-- <v-card-actions> 
                            <v-spacer/>   
                        </v-card-actions>  -->
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
        components: { customerFilesDialog },

        data() {
            return {
                entityObj: {},
                citizenObj: {},
                salutationObj: {},
                NOB_Obj: {},
                selectedProvince: null,
                selectedCity: null,
                selectedCitizen: null,
                selectedSalutation: null,
                selectedNatureOfBusiness: null,
                cityProv: '',
                provStatus: '',
                status: '',
                citizenData: [],
                salutationData: [],
                natureOfBusinessData: [],
                provinceData: [],
            }
        },

        computed: {
            ...mapState(['province', 'city'])
        },

        created () {  
            this.getCustomerFiles();
        },

        watch: {
            updateNewProvince(newVal) {
                if(newVal){
                    this.provinceData = newVal
                }
            },

            province(prov){
                if(prov){
                    this.provinceData = prov
                }
            } 
        },

        methods: {
            async getCustomerFiles(){
                const res = await axios.get('http://localhost:3000/myApi/customer_files')
                console.log(res.data,'citizen'); 
                this.citizenData = res.data.citizen  
                this.salutationData = res.data.salutation 
                this.natureOfBusinessData = res.data.natureOfBusiness 
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
                this.provStatus = !this.selectedProvince? '' : 'ACTIVE'
            },  

            mappedData(selectedObj, objData){ 
                if(selectedObj !== null){
                    let mapItem = Object.fromEntries(
                        Object.entries(selectedObj).map(([key, val]) => {
                            if(key === "status_id"){
                                return [key, val = !val ? null : val == 'A' ? 'ACTIVE' : 'INACTIVE']
                            }
                            return [key, val]
                        })
                    )
                    objData = {...mapItem} 
                }else {
                    objData = {}
                } 
                return objData; 
            },

            selectedCitizenFunc(){  
                this.citizenObj = this.mappedData(this.selectedCitizen, this.citizenObj);
            },

            selectedSalutationFunc(){ 
                this.salutationObj = this.mappedData(this.selectedSalutation, this.salutationObj); 
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