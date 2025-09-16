<template>  
    <v-btn 
        @click="add" 
        color="success" 
        icon="mdi-plus" 
        density="compact" 
        variant="tonal"
        v-tooltip="'New'"
    ></v-btn>       
    <v-btn 
        @click="openTable" 
        icon="mdi-eye" 
        density="compact" 
        variant="tonal" 
        class="ml-2" 
        color="#757575"
        v-tooltip="'View'"
    ></v-btn>

    <v-dialog v-model="openClientDialog" max-width="450px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="compact">
                <v-toolbar-title>{{flag}} CLIENT</v-toolbar-title>  
                <v-btn 
                    @click="openClientDialog = false, clientObj ={}"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text>   
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field v-if="flag === 'ADD'" v-model="clientObj.clientName" label="Enter client" density="compact" variant="outlined" hide-details class="small-input"/>
                        <v-text-field v-else v-model="clientObj.co_name" label="Enter client" density="compact" variant="outlined" hide-details class="small-input"/>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-if="flag === 'ADD'" v-model="clientObj.alias" label="Enter alias" density="compact" variant="outlined" hide-details class="small-input"/> 
                        <v-text-field v-else v-model="clientObj.co_alias" label="Enter alias" density="compact" variant="outlined" hide-details class="small-input"/> 
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete    
                            v-model="clientObj.status_id"
                            :items="['ACTIVE', 'INACTIVE']"    
                            label="Select Status"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class=" small-select"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="clientObj.bldg_street" label="Enter street/building" density="compact" variant="outlined" hide-details class="small-input"/>  
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="clientObj.district_municipality" label="Enter subdivision/district" density="compact" variant="outlined" hide-details class="small-input"/> 
                        <v-autocomplete    
                            v-model="clientObj.prov_id"
                            :items="province"    
                            :item-title="item => item.prov_name" 
                            :item-value="item => item.prov_id"
                            label="Select province"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class="mt-2 small-select"
                        />
                        <v-text-field v-model="clientObj.contact_salutation" label="Salutation" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.contact_last" label="Contact Last Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.contact_first" label="First Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.contact_mid" label="Middle Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.position" label="Position" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.e_mail" label="Email" density="compact" variant="outlined" hide-details class="mt-2 small-input" type="email"/>
                        <v-checkbox
                            v-model="clientObj.all_in"  
                            label="All-in (With expenses)"
                            class="small-checkbox"  
                        ></v-checkbox> 
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <v-text-field v-model="clientObj.zip_code" label="Zip Code" density="compact" variant="outlined" hide-details class=" small-input"/>
                        <v-autocomplete 
                            v-model="clientObj.CityCode"
                            :items="city"  
                            :item-title="item => item.CityDesc"
                            :item-value="item => item.CityCode" 
                            label="Select city"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact"      
                            clearable  
                            class="mt-2 small-select"
                            hide-details
                        />
                        <v-text-field v-model="clientObj.tin_no" label="TIN" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.tel_no" label="Phone" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.fax_no" label="Fax" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.ctc_no" label="CTC No" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.ctc_place" label="Place" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="clientObj.ctc_date" label="Date" density="compact" variant="outlined" hide-details class="mt-2 small-input" type="datetime-local"/>
                    </v-col>

                </v-row>
            </v-card-text>
            <v-card-actions> 
                <v-btn 
                    @click="save(flag)"  
                    color="success" 
                    variant="elevated" 
                    density="compact"
                    :disabled="hasChanges" 
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- TABLES -->
    <v-dialog v-model="openTableDialog" max-width="80%" persistent transition="dialog-top-transition">  
        <v-card> 
            <v-toolbar color="#00BCD4" density="comfortable">
                <v-toolbar-title class="text-center" style="text-transform: uppercase;">{{toolbarTitle}}</v-toolbar-title>  
                <v-btn 
                    icon="mdi-close-circle" 
                    color="red" 
                    @click="openTableDialog = false, isLoading = true" 
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
                
                <v-data-table   
                    :items="clientData.data" 
                    :headers="clientData.header"
                    :search="search" 
                    :loading="isLoading" 
                    items-per-page="10"
                    fixed-header 
                    height="500px"
                    density="compact"  
                > 
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn 
                            @click="editItem(item)" 
                            icon="mdi-pencil" 
                            variant="flat" 
                            density="compact"
                            color="success"
                            v-tooltip="'Edit'"
                        ></v-btn>
                        <!-- <v-btn @click="deleteItem(item)">Delete</v-btn> -->
                    </template>
                </v-data-table>   
            </v-card-text>  
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from 'axios'

    export default {
        props:['dataFromCustomerFiles', 'toolbarTitle'],
        emits:['updateClient'],

        data() {
            return {
                openClientDialog: false,
                flag:'',
                clientObj: {},
                tempClientObj: {},  

                //table
                openTableDialog: false,
                isLoading: true,
                search: '',
                clientData: {}, 
            }
        }, 

        watch: {
            dataFromCustomerFiles(val) {
                if(val){
                    val.map(value => value.status_id = value.status_id === 'A' || value.status_id === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE' ) 
                    val.map(value => value.all_in = value.all_in === null? null : value.all_in === false  || value.all_in === 0 ?  0 : 1) 
                    this.clientData.data = val
                }  
            }, 
        },

        computed: { 
            ...mapState(['province', 'city']),

            hasChanges(){
                if(this.flag === 'ADD'){
                    return !this.clientObj || !this.clientObj.clientName || !this.clientObj.alias || !this.clientObj.contact_last || !this.clientObj.status_id ? true : false
                }else{
                    return !this.clientObj.status_id || !this.clientObj.co_name || !this.clientObj.co_alias || !this.clientObj.contact_last ? true : Object.keys(this.clientObj).every((key) => {
                                                                                                                                                        if (this.clientObj[key] === this.tempClientObj[key]) {
                                                                                                                                                            return true;  
                                                                                                                                                        }
                                                                                                                                                            return false; 
                                                                                                                                                    });   
                } 
            }
        },

        methods: { 
            add(){
                this.flag = 'ADD'
                this.openClientDialog = true
            },

            editItem(client){ 
                this.openClientDialog = true
                this.flag = 'EDIT'
                this.clientObj = {...client}
                this.tempClientObj = {...client}
            },

            openTable(){ 
                this.openTableDialog = true
                setTimeout(() => { 
                    this.clientData.header = [
                        {title: 'Co ID', align: 'start', key: 'co_id', sortable: false}, 
                        {title: 'Co Name', align: 'start', key: 'co_name', sortable: false}, 
                        {title: 'Alias', align: 'start', key: 'co_alias', sortable: false}, 
                        {title: 'bldg/street', align: 'start', key: 'bldg_street', sortable: false}, 
                        {title: 'district/municipality', align: 'start', key: 'district_municipality', sortable: false}, 
                        {title: 'city ID', align: 'start', key: 'city_id', sortable: false}, 
                        {title: 'Province ID', align: 'start', key: 'prov_id', sortable: false}, 
                        {title: 'zip code', align: 'start', key: 'zip_code', sortable: false}, 
                        {title: 'salutation', align: 'start', key: 'contact_salutation', sortable: false}, 
                        {title: 'last name', align: 'start', key: 'contact_last', sortable: false}, 
                        {title: 'first name', align: 'start', key: 'contact_first', sortable: false}, 
                        {title: 'Middle name', align: 'start', key: 'contact_mid', sortable: false}, 
                        {title: 'position', align: 'start', key: 'position', sortable: false}, 
                        {title: 'tin no', align: 'start', key: 'tin_no', sortable: false}, 
                        {title: 'ctc no', align: 'start', key: 'ctc_no', sortable: false}, 
                        {title: 'ctc place', align: 'start', key: 'ctc_place', sortable: false}, 
                        {title: 'ctc date', align: 'start', key: 'ctc_date', sortable: false}, 
                        {title: 'tel no', align: 'start', key: 'tel_no', sortable: false}, 
                        {title: 'fax no', align: 'start', key: 'fax_no', sortable: false}, 
                        {title: 'email', align: 'start', key: 'e_mail', sortable: false}, 
                        {title: 'status', align: 'start', key: 'status_id', sortable: false}, 
                        {title: 'all in', align: 'start', key: 'all_in', sortable: false},  
                        {title: 'actions', align: 'start',key: 'actions', sortable: false},  
                    ]
                    this.clientData.data = this.dataFromCustomerFiles
                    this.isLoading = false
                }, 1500);
            },

            async save(){   
                if(this.flag === 'ADD'){
                    this.$Swal.fire({
                        title: "Do you want to add client?",
                        showDenyButton: true, 
                        confirmButtonText: "Yes", 
                    }).then(async (result) => {  
                        if (result.isConfirmed) {  
                            const res = await axios.post('http://192.168.1.174:3000/myApi/insert_client', {data: this.clientObj})
                            if(res.data.success){
                                await this.$Swal.fire({
                                    title: res.data.message,
                                    text: "",
                                    icon: "success",
                                    timer: 1500,  
                                    showConfirmButton: false 
                                }); 
                                this.openClientDialog = false 
                                this.$emit('updateClient') 
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
                    console.log(this.clientObj,'edit this.clientObj'); 
                    this.$Swal.fire({
                        title: "Do you want to save changes?",
                        showDenyButton: true, 
                        confirmButtonText: "Yes", 
                    }).then(async (result) => { 
                        if (result.isConfirmed) { 
                        const res = await axios.post('http://192.168.1.174:3000/myApi/edit_tct', {data: this.clientObj})
                        if(res.data.success){
                            await this.$Swal.fire({
                            title: res.data.message,
                            text: "",
                            icon: "success",
                            timer: 1500,  
                            showConfirmButton: false 
                            });    
                            this.openClientDialog = false 
                            this.$emit('updateClient') 
                        }else{
                            this.$Swal.fire({ 
                            icon: "error",
                            text: res.data.message,
                            title: "ERROR!", 
                            });
                        }  
                        } 
                    });
                }    
            }
        }, 
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

.v-data-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}  

::v-deep(.v-data-table thead th:last-child),
::v-deep(.v-data-table tbody td:last-child) {
  border-right: none; 
}  

::v-deep(.v-data-table thead th){   
  background-color: #9E9E9E !important;  
  border-right: 1px solid #ccc !important;   
  font-weight: 600;
  font-size: 12px; 
  text-transform: uppercase; 
}

::v-deep(.v-data-table tbody td) { 
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px !important;
  font-size: 11px; 
  color: #333;
}    

::v-deep(.v-data-table-footer){ 
  font-size: 12px;  
  height: 50px;
  padding: 2px;
}
::v-deep(.v-data-table-footer .v-field__input){ 
  font-size: 12px;  
}
</style>