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

    <v-dialog v-model="provinceDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="compact">
                <v-toolbar-title>{{flag}} PROVINCE</v-toolbar-title>  
                <v-btn 
                    @click="provinceDialog = false, provObj = {} "
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field v-model="provObj.province" density="compact" variant="outlined" label="Enter province" class="small-input" hide-details/>
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete   
                            v-model="provObj.status_id" 
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
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="save(flag)" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="cityDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="compact">
                <v-toolbar-title>{{flag}} CITY</v-toolbar-title>  
                <v-btn 
                    @click="cityDialog = false, cityObj = {}"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field v-model="cityObj.city" density="compact" variant="outlined" label="Enter new city" class="small-input" hide-details/> 
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete   
                            v-model="cityObj.status_id" 
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
                        <v-autocomplete   
                            v-model="cityObj.prov_name" 
                            :items="province"    
                            :item-title="item => item.prov_name"
                            return-object
                            label="Select province"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class="mt-2 small-select"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="save(flag)" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="citizenDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="compact">
                <v-toolbar-title>{{flag}} CITIZEN</v-toolbar-title>  
                <v-btn 
                    @click="citizenDialog = false, citizenObj = {}"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field v-model="citizenObj.citizenName" density="compact" variant="outlined" label="Enter new citizen" class="small-input" hide-details/> 
                        <v-text-field v-model="citizenObj.alias" density="compact" variant="outlined" label="Enter alias" class="mt-2 small-input" hide-details/> 
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete   
                            v-model="citizenObj.status_id" 
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
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="save(flag)" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="salutationDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="compact">
                <v-toolbar-title>{{flag}} SALUTATION</v-toolbar-title>  
                <v-btn 
                    @click="salutationDialog = false, salutationObj = {}"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field v-model="salutationObj.salutName" density="compact" variant="outlined" label="Enter new salutation" class="small-input" hide-details/> 
                        <v-text-field v-model="salutationObj.salutCode" density="compact" variant="outlined" label="Enter salutation code" class="mt-2 small-input" hide-details/> 
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete   
                            v-model="salutationObj.status_id" 
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
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="save(flag)" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
                >SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="NOBDialog" max-width="400px" persistent >
        <v-card>
            <v-toolbar color="#424242" density="compact">
                <v-toolbar-title>{{flag}} NATURE OF BUSINESS</v-toolbar-title>  
                <v-btn 
                    @click="NOBDialog = false, NOBObj = {}"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field v-model="NOBObj.NOBDescription" density="compact" variant="outlined" label="Enter new nature of business" class="small-input" hide-details/>  
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete   
                            v-model="NOBObj.status_id" 
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
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="save(flag)" 
                    :disabled="hasChanges" 
                    color="success" 
                    variant="elevated" 
                    density="compact"
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
                    :items="customerData.data" 
                    :headers="customerData.header"
                    :search="search" 
                    :loading="isLoading" 
                    items-per-page="10"
                    fixed-header 
                    density="compact"  
                > </v-data-table> 
                    <!-- <template v-slot:[`item.actions`]="{ item }">
                        <v-btn @click="editItem(item)">Edit</v-btn>
                        <v-btn @click="deleteItem(item)">Delete</v-btn>
                    </template> -->
                
            </v-card-text>  
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios'
    import { mapState } from 'vuex'

    export default { 
        props:['fromProvince', 'fromCity', 'fromCitizen', 'fromSalutation', 'fromNOB', 'toolbarTitle', 'dataFromCustomerFiles'],
        emits:['updateProvince', 'updateCity', 'updateCitizen', 'updateSalutation', 'updateNOB'], 

        data() {
            return {
                search: '',
                isLoading: true,
                provinceDialog: false,
                openTableDialog: false,
                flag: '',
                provObj: {},
                //city
                cityDialog: false, 
                cityObj: {}, 
                //citizen
                citizenDialog: false,
                citizenObj: {},
                //salutation
                salutationDialog: false,
                salutationObj: {},
                //NOB
                NOBDialog: false,
                NOBObj: {},
                //
                customerData: {}
            }
        },  

        computed: {
            ...mapState(['province', 'city']),

            hasChanges() {
                if(this.fromProvince !== undefined){
                    return (!this.provObj || !this.provObj.province || !this.provObj.status_id) ? true : false
                }else if(this.fromCity !== undefined){
                    return (!this.cityObj || !this.cityObj.status_id || !this.cityObj.city) ? true : false
                }else if(this.fromCitizen !== undefined){
                    return (!this.citizenObj || !this.citizenObj.citizenName || !this.citizenObj.status_id) ? true : false
                }else if(this.fromSalutation !== undefined){
                    return (!this.salutationObj || !this.salutationObj.salutName || !this.salutationObj.status_id || !this.salutationObj.salutCode) ? true : false
                }else if(this.fromNOB !== undefined){
                    return (!this.NOBObj || !this.NOBObj.NOBDescription || !this.NOBObj.status_id) ? true : false
                }
                else{
                    return true
                } 
            }, 
        },  

        watch: {
            openTableDialog(isClosed) {
                if(isClosed === false){ 
                    this.customerData = {}
                    this.search = ''
                }
            }
        },

        methods: { 
            openTable(){
                // TABLES  
                if(this.fromProvince !== undefined){
                    this.openTableDialog = true
                    setTimeout(() => { 
                        this.customerData.header = [
                            {title: 'Province ID', align: 'start', key: 'prov_id', sortable: false},
                            {title: 'Province Name', align: 'start', key: 'prov_name', sortable: false},
                            {title: 'Status', align: 'start', key:'status_id', sortable: false},
                        ]
                        this.customerData.data = this.province
                        this.isLoading = false
                    }, 1500);
                }else if(this.fromCity !== undefined){
                    this.openTableDialog = true 
                    setTimeout(() => { 
                        this.customerData.header = [
                            {title: 'City ID', align: 'start', key: 'CityCode', sortable: false},
                            {title: 'City Name', align: 'start', key: 'CityDesc', sortable: false},
                            {title: 'City prov id', align: 'start', key: 'city_prov', sortable: false},
                            {title: 'Status', align: 'start', key:'status_id', sortable: false},
                        ]
                        this.customerData.data = this.city
                        this.isLoading = false
                    }, 1500);
                }else if(this.fromCitizen !== undefined){
                    this.openTableDialog = true
                    setTimeout(() => { 
                        this.customerData.header = [
                            {title: 'Code', align: 'start', key: 'citizen_id', sortable: false},
                            {title: 'alias', align: 'start', key: 'CitizenshipCode', sortable: false},
                            {title: 'Description', align: 'start', key: 'CitizenshipDesc', sortable: false}, 
                            {title: 'Status', align: 'start', key:'status_id', sortable: false},
                        ]
                        this.customerData.data = this.dataFromCustomerFiles
                        this.isLoading = false
                    }, 1500);
                }else if(this.fromSalutation !== undefined){
                    this.openTableDialog = true
                    setTimeout(() => { 
                        this.customerData.header = [
                            {title: 'salutation Code', align: 'start', key: 'SalutationCode', sortable: false},
                            {title: 'salutation desc', align: 'start', key: 'SalutationDesc', sortable: false}, 
                            {title: 'Status', align: 'start', key:'status_id', sortable: false},
                        ]
                        this.customerData.data = this.dataFromCustomerFiles
                        this.isLoading = false
                    }, 1500);
                }else if(this.fromNOB !== undefined){
                    this.openTableDialog = true
                    setTimeout(() => { 
                        this.customerData.header = [
                            {title: 'Code', align: 'start', key: 'NOBCode', sortable: false},
                            {title: 'description', align: 'start', key: 'NOBDesc', sortable: false}, 
                            {title: 'Status', align: 'start', key:'status_id', sortable: false},
                        ]
                        this.customerData.data = this.dataFromCustomerFiles
                        this.isLoading = false
                    }, 1500);
                }
                else{
                    alert('walang maopen')
                } 
            },

            add() {    
                this.flag = 'ADD'
                if(this.fromProvince !== undefined){
                    this.provinceDialog = true 
                }else if(this.fromCity !== undefined){
                    this.cityDialog = true
                }else if(this.fromCitizen !== undefined){
                    this.citizenDialog = true
                }else if(this.fromSalutation !== undefined){
                    this.salutationDialog = true
                }else if(this.fromNOB !== undefined){
                    this.NOBDialog = true
                }  
            },

            insertData(payload){ 
                this.$Swal.fire({
                    title: `Do you want to add ${payload.title}? `,
                    showDenyButton: true, 
                    confirmButtonText: "Yes", 
                }).then(async (result) => { 
                    if (result.isConfirmed) { 
                        const res = await axios.post('http://192.168.1.174:3000/myApi/insert_customer_files', {data: payload.dataObject, flag: payload.flag})
                        if(res.data.success){
                            await this.$Swal.fire({
                                title: res.data.message,
                                text: "",
                                icon: "success",
                                timer: 1500,  
                                showConfirmButton: false 
                            });  
                            //for auto reflect in select field.
                            if(payload.flag === 'NOB'){
                                this.$emit('updateNOB')
                                this.NOBDialog = false  
                                this.NOBObj = {}
                            }else if(payload.flag === 'salutation'){
                                this.$emit('updateSalutation')
                                this.salutationDialog = false  
                                this.salutationObj = {}
                            }else if(payload.flag === 'citizen'){
                                this.$emit('updateCitizen')
                                this.citizenDialog = false  
                                this.citizenObj = {}
                            }else if(payload.flag === 'city'){
                                let data = await this.$store.dispatch('updateProvince')
                                this.$emit('updateCity', data.city)
                                this.cityDialog = false  
                                this.cityObj = {}
                            }else if(payload.flag === 'province'){
                                let data = await this.$store.dispatch('updateProvince') 
                                this.$emit('updateProvince', data.province)
                                this.provinceDialog = false  
                                this.provObj = {}
                            }else{
                                alert('wala man mainsert')
                            }  
                        }else{
                            this.$Swal.fire({ 
                            icon: "error",
                            text: res.data.message,
                            title: "ERROR!", 
                            }); 
                        }   
                    }  
                });
            },

            save(){
                if(this.fromProvince !== undefined){
                    let obj = {
                        title: "province",
                        dataObject: this.provObj, 
                        flag: 'province',  
                    }
                    this.insertData(obj)
                }else if(this.fromCity !== undefined){  
                    let obj = {
                        title: "city",
                        dataObject: this.cityObj, 
                        flag: 'city',  
                    }
                    this.insertData(obj)
                }else if(this.fromCitizen !== undefined){ 
                    let obj = {
                        title: "citizen",
                        dataObject: this.citizenObj, 
                        flag: 'citizen',  
                    }
                    this.insertData(obj)
                }else if(this.fromSalutation !== undefined){ 
                    let obj = {
                        title: "salutation",
                        dataObject: this.salutationObj, 
                        flag: 'salutation',  
                    }
                    this.insertData(obj)
                }else if(this.fromNOB !== undefined){  
                    let obj = {
                        title: "Nature of business",
                        dataObject: this.NOBObj, 
                        flag: 'NOB',  
                    }
                    this.insertData(obj)
                }else{
                    alert('wala ngani masave')
                } 
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

/**table */
.v-data-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}   

::v-deep(.v-data-table thead th){   
  background-color: #9E9E9E !important;  
  border-right: 1px solid #ccc !important;   
  font-weight: 600;
  font-size: 12px; 
  text-transform: uppercase; 
}

::v-deep(.v-data-table thead th:last-child),
::v-deep(.v-data-table tbody td:last-child) {
  border-right: none;
}

::v-deep(.v-data-table tbody td) { 
  border-right: 1px solid #ccc; 
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