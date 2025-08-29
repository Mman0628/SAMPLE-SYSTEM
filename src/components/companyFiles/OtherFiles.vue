<template>
    <div> 
        <v-card-text v-if="toolbarTitle == 'Document Signatories'"> 
            <v-row dense>
                <v-col cols="12">
                    <v-autocomplete
                        v-model="selectedEntity" 
                        :items="itemsEntity"  
                        :item-title="item => item.entity_name"
                        return-object
                        @update:model-value="selectedEntityFunc"
                        label="Select Entity"   
                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                        variant="outlined"
                        density="compact"      
                        clearable  
                        class="small-select" 
                        hide-details
                    />
                    <!-- <span v-show="!!selectedEntity"  style="font-size: x-small; color: blue;">{{ entityObj.entity_name }}</span>  -->
                </v-col>

                <v-col cols="6">
                    <v-text-field v-model="entityObj.status_id" readonly label="Status" density="compact" variant="outlined" hide-details class="small-input"/>  
                    <v-text-field v-model="entityObj.first_name" readonly label="First Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field v-model="entityObj.middle_name" readonly label="Middle Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field v-model="entityObj.last_name" readonly label="Last Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field v-model="entityObj.position_as_signatory" readonly label="Position" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="entityObj.tin" readonly label="TIN" density="compact" variant="outlined" hide-details class="small-input"/>
                    <v-text-field v-model="entityObj.ctcno" readonly label="CTC No" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field v-model="entityObj.date_tin_encoded" readonly label="Date Issued" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field v-model="entityObj.CityDesc" readonly label="Place Issued" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field v-model="entityObj.signatory_type_code" readonly label="Type" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <!-- <v-autocomplete
                        v-model="selectedEntity" 
                        :items="itemsEntity"  
                        :item-title="item => item.entity_name"
                        return-object
                        @update:model-value="selectedOfficeBranch"
                        label="Select place issued"   
                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                        variant="outlined"
                        density="compact"      
                        clearable  
                        class="mt-2 small-select"
                        hide-details
                    /> 

                    <v-autocomplete
                        v-model="selectedType"
                        :items="['Company Signatory', 'PAG-IBIG Signatory']"  
                        @update:model-value="selectedTypeFunc"
                        label="Select Type" 
                        return-object
                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                        variant="outlined"
                        density="compact"      
                        clearable  
                        class="mt-2 small-select"
                    /> -->
                </v-col>  
            </v-row> 
        </v-card-text>

        <v-card-text v-else-if="toolbarTitle !== 'OTHER COMPANY FILES'">
            <div class="text-center"> 
                <h2>...to follow</h2> 
            </div> 
        </v-card-text>
    </div>
</template>

<script>
import axios from 'axios';
 
export default {
    props:['toolbarTitle', 'updateEntity'],

    data() {
        return {
            selectedEntity: null,
            selectedType: null, 
            itemsEntity:[],
            entityObj:{},
        }
    },

    watch: {
        updateEntity(val) {
            if(val){
                this.getData();
            }
        }
    },

    created () {
        this.getData();
    },

    methods: {
        async getData(){
            const arr =  await axios.get('http://localhost:3000/myApi/other_files') 
            this.itemsEntity = arr.data
            this.$store.commit('mutateSignatoriesData', this.itemsEntity)
        },

        selectedTypeFunc() {
            console.log(this.selectedType,'selectedType'); 
        },

        selectedEntityFunc(){
            if (this.selectedEntity !== null){
                const mappedEntity = Object.fromEntries(
                    Object.entries(this.selectedEntity).map(([key, val]) =>{
                        if(key === "status_id"){ 
                            return [key, val = !val  ? null : val === 'A' ? 'ACTIVE':'INACTIVE']
                        }
                        if(key === 'signatory_type_code'){
                            return [key, val = !val  ? null : val === 'P' ? 'PAGIBIG SIGNATORY' : 'COMPANY SIGNATORY']
                        }
                        return [key, val]
                    })
                )
                this.entityObj = mappedEntity
            }else this.entityObj = {}
        }
    },
}
</script>

<style scoped>
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

::v-deep(.small-input input) {
  font-size: 11px;
  padding: 2px 6px !important;
  height: 28px !important;
}

::v-deep(.small-input .v-label) {
  font-size: 11px;
}

</style>