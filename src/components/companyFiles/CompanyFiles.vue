<template>
    <v-container fluid>
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
                            :company = companyItems
                            :province = province
                            :city = city  
                            @updateMo="updateMo" 
                            @isAdded = isAdded
                            /> 
                        </v-card-actions> 
                    </v-toolbar>

                    <div class="d-flex justify-center">  
                        <v-card-text> 
                            <v-row dense >
                                <v-col cols="3">
                                    <v-text-field v-model="compObj.co_id" label="Co Code" density="compact" variant="outlined" readonly 
                                    class="small-input"
                                    />  
                                </v-col> 
                                <v-col cols="6">
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
                                <v-col cols="3">
                                    <v-text-field v-model="compObj.status_id" label="Status" density="compact" variant="outlined" readonly class="small-input"/>
                                </v-col>
                            </v-row> 
                            <v-row dense>
                                <v-col cols="6">
                                    <v-text-field v-model="compObj.bldg_street" readonly label="Street/Building" density="compact" variant="outlined" hide-details class="small-input"/>  
                                    <v-text-field v-model="compObj.district_municipality" readonly label="Subdivision/District" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>  
                                    <v-text-field v-model="compObj.zip_code" readonly label="Zip Code" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>    
                                    <v-text-field v-model="compObj.prov_id" readonly label="Province" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                                        <span v-show="compObj.prov_name!=''"  style="font-size: x-small; color: blue;">{{compObj.prov_name}}</span> 
                                    <v-text-field v-model="compObj.city_id" readonly label="Municipality/City" density="compact" variant="outlined"  hide-details class="mt-2 small-input"/>
                                        <span v-show="compObj.city_name!=''"  style="font-size: x-small; color: blue;">{{compObj.city_name}}</span>  
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="compObj.tel_no" readonly label="Phone" density="compact" variant="outlined" hide-details class="small-input"/> 
                                    <v-text-field v-model="compObj.co_tin" readonly label="TIN" density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/> 
                                    <v-text-field v-model="compObj.fax_no" readonly label="Fax" density="compact"  variant="outlined" hide-details class="mt-2 small-input"/> 
                                    <v-text-field v-model="compObj.e_mail" readonly label="Email" type="email" required density="compact"  variant="outlined"  hide-details class="mt-2 small-input"/>  
                                </v-col> 
                            </v-row>  
                        </v-card-text>
                    </div>  
                </v-card>
            </v-col>   
        </v-row>
    </v-container>
</template> 

<script> 
import companyDialog from '../dialog_components/CompanyDialog.vue'
import axios from 'axios'

export default {
    name:'CompanyFiles',
    components:{
        companyDialog
    },  
    
    data() {
        return {  
            companyItems:[],
            select:null,
            compObj:{},    
            province:[],
            city:[], 
            // emailRules: [
            //     v => !!v || 'Email is required',
            // ],
        }
    },

    watch:{  
        select(selected){
            if(selected){ 
                this.compObj.status_id= selected.status_id == 'A'? 'ACTIVE':'INACTIVE'
            }else{
                this.compObj.status_id= ''
            }
        },
    }, 

    created () {
        this.getCompany();
    },

    methods: {  
        async updateMo(){ 
            this.companyItems =  await this.getCompany();
        },

        async getCompany(){
            try {
                const comp = await axios.get('http://localhost:3000/myApi/company')   
                this.companyItems = comp.data.company  
                this.province =  comp.data.province
                this.city = comp.data.city 
                return comp.data.company 
            } catch (error) {
                console.error('Error fetching data:', error);
            }  
        },

        selectedCompany(){   
            if(this.select != null){
                this.compObj = {...this.select} 
            }else{ 
                this.compObj = {} 
            }   
            console.log(this.select); 
        },

        // isAdded(val){ 
        //     this.items.push(val) 
        // }
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