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
        @click="openGift = !openGift" 
        color="#B0BEC5"  
        density="compact" 
        variant="flat"  
        icon
        v-tooltip="{location:'bottom',text:'View'}"
    >
        <v-icon v-if="openGift">mdi-gift-off</v-icon>
        <v-icon v-else>mdi-gift-open</v-icon>
    </v-btn> 
    <!-- <v-btn 
        @click="openTable(fromProj)" 
        color="#B0BEC5"  
        density="compact" 
        variant="tonal" 
        icon="mdi-eye" 
        v-tooltip="{location:'bottom',text:'View'}"
    ></v-btn> -->

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
                    @click="cityDialog = false"
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
                    @click="citizenDialog = false"
                    icon="mdi-close-circle" 
                    color="red" 
                    v-tooltip="{location:'right',text:'Close'}"
                ></v-btn>
            </v-toolbar> 

            <v-card-text> 
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field v-model="citizenObj.city" density="compact" variant="outlined" label="Enter new citizen" class="small-input" hide-details/> 
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
</template>

<script>
    import axios from 'axios'
    import { mapState } from 'vuex'

    export default { 
        props:[
            'fromProvince', 'fromCity', 'fromCitizen'
        ],
        emits:['updateProvince'], 

        data() {
            return {
                provinceDialog: false,
                flag: '',
                provObj: {},
                //city
                cityDialog: false, 
                cityObj: {},
                openGift: true,
                //citizen
                citizenDialog: false,
                citizenObj: {},
            }
        },

        computed: {
            ...mapState(['province']),

            hasChanges() {
                if(this.fromProvince !== undefined){
                    return (!this.provObj || !this.provObj.province || !this.provObj.status_id) ? true : false
                }else{
                    return true
                } 
            }
        }, 

        methods: { 
            add() {    
                this.flag = 'ADD'
                if(this.fromProvince !== undefined){
                    this.provinceDialog = true 
                }else if(this.fromCity !== undefined){
                    this.cityDialog = true
                }else if(this.fromCitizen !== undefined){
                    this.citizenDialog = true
                }
            },

            save(){
                if(this.fromProvince !== undefined){
                    this.$Swal.fire({
                        title: "Do you want to add new province?",
                        showDenyButton: true, 
                        confirmButtonText: "Yes", 
                    }).then(async (result) => { 
                        if (result.isConfirmed) { 
                            const res = await axios.post('http://localhost:3000/myApi/insert_customer_files', {data: this.provObj})
                            if(res.data.success){
                                await this.$Swal.fire({
                                    title: res.data.message,
                                    text: "",
                                    icon: "success",
                                    timer: 1500,  
                                    showConfirmButton: false 
                                });   

                                let provinceData = await this.$store.dispatch('updateProvince')
                                this.$emit('updateProvince', provinceData)
                                this.provinceDialog = false  
                            }else{
                                this.$Swal.fire({ 
                                icon: "error",
                                text: res.data.message,
                                title: "ERROR!", 
                                });
                            }   
                        }  
                    });
                }else if(this.fromCity !== undefined){
                    alert('Wtf!')
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
</style>