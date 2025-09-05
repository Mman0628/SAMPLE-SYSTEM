<template> 
    <v-container fluid>
        <v-row dense>
            <v-col cols="3"> 
                <v-card hover variant="outlined" title="CLIENT MASTER FILE" color="warning" density="compact" > 
                    <template #append>
                        <v-btn 
                            @click="test" 
                            color="success" 
                            icon="mdi-plus" 
                            density="compact" 
                            variant="tonal"
                            v-tooltip="'ADD'"
                        ></v-btn>       
                        <v-btn 
                            @click="test" 
                            icon="mdi-eye" 
                            density="compact" 
                            variant="tonal" 
                            class="ml-2" 
                            color="#757575"
                            v-tooltip="'VIEW'"
                        ></v-btn>
                    </template>   
                    
                    <v-card-text class="pb-0">  
                        <v-sheet border rounded>  
                            <v-row dense class="ma-2">
                                <v-col cols="8">
                                    <v-autocomplete
                                        label= "Select client"
                                        v-model="selectedClient" 
                                        :items="clientData"  
                                        :item-title="item => item.co_name"
                                        return-object 
                                        @update:model-value="selectedClientFunc"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        clearable
                                        class="small-select" 
                                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    /> 
                                </v-col>  
                                <v-col cols="4">
                                    <v-text-field v-model="clientObj.status_id" readonly label="Status" density="compact" variant="outlined" hide-details class="small-input"/> 
                                </v-col>
                                <span v-if="!!selectedClient" class="ml-1" style="font-size: x-small; color: red;"> {{clientObj.co_alias}}</span>
                            </v-row>
                            <v-divider/>
                            <v-card-title class="pb-0" style="color: lightseagreen;"> Address Information </v-card-title>
                            <v-divider/>
                            <v-row dense class="ma-2"> 
                                <v-col cols="12">
                                    <v-text-field v-model="clientObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/> 
                                    <v-text-field v-model="clientObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                </v-col>
                                <v-col cols="6"> 
                                    <v-text-field v-model="clientObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="small-input"/> 
                                        <span v-if="!!clientObj.prov_name"  style="font-size: x-small; color: blue;">{{clientObj.prov_name}}</span> 
                                    <v-text-field v-model="clientObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                        <span v-if="!!clientObj.CityDesc"  style="font-size: x-small; color: blue;">{{clientObj.CityDesc}}</span>  
                                </v-col> 
                                <v-col cols="6"> 
                                    <v-text-field v-model="clientObj.zip_code" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="small-input"/>   
                                </v-col>
                            </v-row> 
                        </v-sheet> 
                    </v-card-text>  
                    
                    <v-card-text>
                        <v-sheet border rounded>
                            <v-card-title class="pb-0" style="color: lightseagreen;"> Contact Information </v-card-title>
                            <v-divider/>
                            <v-row dense class="ma-2">
                                <v-col cols="6">
                                    <v-text-field v-model="clientObj.contact_salutation" readonly label="Salutation" density="compact" variant="outlined" hide-details class="small-input"/>
                                    <v-text-field v-model="clientObj.contact_last" readonly label="Contact Last Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.contact_first" readonly label="First Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.contact_mid" readonly label="Middle Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.position" readonly label="Position" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.e_mail" readonly label="Email" density="compact" variant="outlined" hide-details class="mt-2 small-input" type="email"/>
                                </v-col> 
                                <v-col cols="6">
                                    <v-text-field v-model="clientObj.tin_no" readonly label="TIN" density="compact" variant="outlined" hide-details class="small-input"/>
                                    <v-text-field v-model="clientObj.tel_no" readonly label="Phone" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.fax_no" readonly label="Fax" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.ctc_no" readonly label="CTC No" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.ctc_place" readonly label="Place" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <v-text-field v-model="clientObj.ctc_date" readonly label="Date" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                    <!-- <v-text-field v-model="clientObj.ctc_date" readonly label="Date" density="compact" variant="outlined" hide-details class="mt-2 small-input" type="datetime-local"/> -->
                                </v-col> 
                                <v-checkbox
                                    v-model="clientObj.all_in"  
                                    label="All-in (With expenses)"
                                    class="small-checkbox"   
                                    readonly
                                ></v-checkbox> 
                            </v-row> 
                        </v-sheet>
                    </v-card-text> 
                </v-card>
            </v-col>

            <v-col cols="3">
                <v-card hover variant="outlined" title="DEVELOPER MASTER FILE" color="warning" density="compact"> 
                    <template #append>
                        <v-btn 
                            @click="test" 
                            color="success" 
                            icon="mdi-plus" 
                            density="compact" 
                            variant="tonal"
                            v-tooltip="'ADD'"
                        ></v-btn>       
                        <v-btn 
                            @click="test" 
                            icon="mdi-eye" 
                            density="compact" 
                            variant="tonal" 
                            class="ml-2" 
                            color="#757575"
                            v-tooltip="'VIEW'"
                        ></v-btn>
                    </template> 

                    <v-card-text class="pb-0">  
                        <v-sheet border rounded>  
                            <v-row dense class="ma-2">
                                <v-col cols="8">
                                    <v-autocomplete
                                        label= "Select client"
                                        v-model="selectedClient" 
                                        :items="clientData"  
                                        :item-title="item => item.co_name"
                                        return-object 
                                        @update:model-value="selectedClientFunc"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        clearable
                                        class="small-select" 
                                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                                    /> 
                                </v-col>  
                                <v-col cols="4">
                                    <v-text-field v-model="clientObj.status_id" readonly label="Status" density="compact" variant="outlined" hide-details class="small-input"/> 
                                </v-col>
                                <span v-if="!!selectedClient" class="ml-1" style="font-size: x-small; color: red;"> {{clientObj.co_alias}}</span>
                            </v-row>
                            <v-divider/>
                            <v-card-title class="pb-0" style="color: lightseagreen;"> Address Information </v-card-title>
                            <v-divider/>
                            <v-row dense class="ma-2"> 
                                <v-col cols="12">
                                    <v-text-field v-model="clientObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/> 
                                    <v-text-field v-model="clientObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                                </v-col>
                                <v-col cols="6"> 
                                    <v-text-field v-model="clientObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="small-input"/> 
                                        <span v-if="!!clientObj.prov_name"  style="font-size: x-small; color: blue;">{{clientObj.prov_name}}</span> 
                                    <v-text-field v-model="clientObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                        <span v-if="!!clientObj.CityDesc"  style="font-size: x-small; color: blue;">{{clientObj.CityDesc}}</span>  
                                </v-col> 
                                <v-col cols="6"> 
                                    <v-text-field v-model="clientObj.zip_code" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="small-input"/>   
                                </v-col>
                            </v-row> 
                        </v-sheet> 
                    </v-card-text> 
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                selectedClient: null,
                clientData: [],
                clientObj: {},
            }
        },

        created () {
            this.getTCTData();
        },

        methods: {
            test() {
                alert('wtf')
            },

            async getTCTData(){
                const res = await axios.get('http://192.168.1.174:3000/myApi/tct_data')
                // console.log(res.data,'ressss'); 
                this.clientData = res.data.client
            },

            mappedData(selectedObj){ 
                let obj = {}
                if(selectedObj !== null){
                    obj = Object.fromEntries(
                        Object.entries(selectedObj).map(([key, val]) => {
                            if(key === "status_id"){
                                return [key, val = !val ? null : val == 'A' ? 'ACTIVE' : 'INACTIVE']
                            }
                            if(key === "all_in"){
                                return [key, val = !val ? null : val == 1 ? true : false]
                            }
                            return [key, val]
                        })
                    ) 
                }else {
                    obj = {}
                } 
                return obj; 
            }, 

            selectedClientFunc(){ 
                this.clientObj = this.mappedData(this.selectedClient)
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
::v-deep(.small-checkbox .v-label) {
  font-size: 11px; 
} 
</style>