<template> 
    <v-btn 
        @click="add(toolbarTitle)" 
        color="success"  
        density="compact" 
        variant="tonal" 
        icon="mdi-plus" 
        v-tooltip="{location:'bottom',text:'New'}"
    ></v-btn> 
    <v-btn 
        @click="openTable(toolbarTitle)" 
        color="#B0BEC5"  
        density="compact" 
        variant="tonal" 
        icon="mdi-eye" 
        v-tooltip="{location:'bottom',text:'View'}"
    ></v-btn> 

    <!-- DOCUMENT SIGNATORIES ADD DIALOG -->
    <v-dialog v-model="openDocumentSignDialog" max-width="400px" persistent>
        <v-card> 
            <v-toolbar color="#424242" density="comfortable"> 
                <v-toolbar-title>{{flag}} DOCUMENT SIGNATORIES</v-toolbar-title>  
                <v-btn 
                    icon = "mdi-close-circle" 
                    color="red" 
                    @click="openDocumentSignDialog = false" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text>  
                <v-row dense> 
                    <v-col cols="6"> 
                        <v-text-field v-model="entityObj.first_name" label="First Name" density="compact" variant="outlined" hide-details class="small-input"/>
                        <v-text-field v-model="entityObj.middle_name" label="Middle Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="entityObj.last_name" label="Last Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="entityObj.position_as_signatory" label="Position" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                        <v-text-field v-model="entityObj.tin" label="TIN" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    </v-col>
                    <v-col cols="6"> 
                        <v-select   
                            v-model="entityObj.status_id" 
                            :items="['ACTIVE', 'INACTIVE']"    
                            label="Select Status"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact" 
                            hide-details      
                            clearable  
                            class=" small-select"
                        ></v-select>
                        <v-text-field v-model="entityObj.ctcno" label="CTC No" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-text-field v-model="entityObj.date_tin_encoded" label="Date Issued" type="datetime-local" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                        <v-autocomplete
                            v-model="entityObj.CityCode" 
                            :items="city"  
                            :item-title="item => item.CityDesc"
                            return-object 
                            label="Select place issued"   
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact"      
                            clearable  
                            class="mt-2 small-select"
                            hide-details
                        /> 
                        <v-autocomplete
                            v-model="entityObj.signatory_type_code"
                            :items="['Company Signatory', 'PAG-IBIG Signatory']"   
                            label="Select Type" 
                            return-object
                            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                            variant="outlined"
                            density="compact"      
                            clearable  
                            class="mt-2 small-select"
                        />
                    </v-col>  
                </v-row> 
            </v-card-text>
            <v-card-actions>   
                <v-btn @click="save(flag)" :disabled="hasChanges" color="success" variant="elevated" density="compact">SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- DS TABLE -->
    <v-dialog v-model="openDSTableDialog" max-width="80%" persistent transition="dialog-top-transition">  
        <v-card> 
            <v-toolbar color="#00BCD4" density="comfortable">
                <v-toolbar-title class="text-center" style="text-transform: uppercase;">{{toolbarTitle}}</v-toolbar-title>  
                <v-btn 
                    icon="mdi-close-circle" 
                    color="red" 
                    @click="openDSTableDialog = false, isLoading = true" 
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
                    :items="DocumentSignData" 
                    :headers="DSHeaders"
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
    import { mapState } from 'vuex'
    import axios from 'axios' 

    export default {
        props:['toolbarTitle'],
        emits:['updateEntityFromOFDialog'], 
        
        data() {
            return {
                openDocumentSignDialog: false,
                openDSTableDialog: false,
                isLoading: true,
                isSaved: '',
                flag: '',
                search:'',
                entityObj: {},
                DocumentSignData: [],
            }
        },

        computed: {
            ...mapState(['city', 'signatoriesData']), 

            hasChanges(){
                return (!this.entityObj.first_name || !this.entityObj.last_name || !this.entityObj.status_id) ? true : false
            },

            DSHeaders(){
                return [
                    { title: 'ID', align: 'start', key: 'entity_id', sortable:false},
                    { title: 'NAME', align: 'start', key: 'entity_name', sortable:false},
                    { title: 'ACTION', align: 'start', key: 'actions', sortable:false}
                ] 
            }
        },

        watch: {
            openDSTableDialog(isClosed) {
                if(isClosed === false){ 
                    this.DocumentSignData = []
                    this.search = ''
                }
            }
        },

        methods: {
            editItem(data){
                console.log(data, 'manski');
                alert('working')
            },

            add(title) {
                this.flag = 'ADD' 
                if(title === 'Document Signatories'){
                    this.openDocumentSignDialog = true
                }    
            },

            openTable(title){ 
                if(title === 'Document Signatories'){
                    this.openDSTableDialog = true
                    setTimeout(() => {
                        this.DocumentSignData = this.signatoriesData
                        this.isLoading = false
                    }, 1500);
                } 
            },

            async save(){
                this.$Swal.fire({
                    title: "Do you want to add new signatories?",
                    showDenyButton: true, 
                    confirmButtonText: "Yes", 
                }).then(async (result) => { 
                    if (result.isConfirmed) { 
                        const res = await axios.post('http://localhost:3000/myApi/insert_entity', {data: this.entityObj})   
                        if(res.data.success){
                            await this.$Swal.fire({
                                title: res.data.message,
                                text: "",
                                icon: "success",
                                timer: 1500,  
                                showConfirmButton: false 
                            });   
                            this.$emit('updateEntityFromOFDialog') 
                            this.openDocumentSignDialog = false  
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