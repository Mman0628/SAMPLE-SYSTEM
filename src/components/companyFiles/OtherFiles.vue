<template>
    <div> 
        <v-card-text v-show="toolbarTitle == 'Document Signatories'"> 
            <v-row dense>
                <v-col cols="12">
                    <v-select
                        v-model="selectedEntity" 
                        :items="officeBranchItems"  
                        :item-title="item => item.branch_name"
                        return-object
                        @update:model-value="selectedOfficeBranch"
                        label="Select Entity"   
                        :menu-props="{ scrim: true, scrollStrategy: 'close' }"
                        variant="outlined"
                        density="compact"      
                        clearable  
                        class="small-select" 
                    ></v-select>
                </v-col>

                <v-col cols="6">
                    <v-text-field label="Status" density="compact" variant="outlined" hide-details class="small-input"/>  
                    <v-text-field label="First Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field label="Middle Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field label="Last Name" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field label="Position" density="compact" variant="outlined" hide-details class="mt-2 small-input"/> 
                </v-col>
                <v-col cols="6">
                    <v-text-field label="TIN" density="compact" variant="outlined" hide-details class="small-input"/>
                    <v-text-field label="CTC No" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-text-field label="Date Issued" type="datetime-local" density="compact" variant="outlined" hide-details class="mt-2 small-input"/>
                    <v-autocomplete
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
                    />
                </v-col>  
            </v-row> 
        </v-card-text>

        <v-card-text v-show="toolbarTitle == 'Documents'">
            <h5>{{ toolbarTitle }}</h5>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
            <h6>MMANSKY</h6>
        </v-card-text>
    </div>
</template>

<script>
import axios from 'axios';

 
    export default {
        props:['toolbarTitle'],

        data() {
            return {
                selectedEntity: null,
                selectedType: null,
                itemsEntity:[]
            }
        },

        created () {
            this.getData();
        },

        methods: {
            async getData(){
               const arr =  await axios.get('http://localhost:3000/myApi/other_files')
               console.log(arr.data,'ittooooooo dataaaa'); 
               this.itemsEntity = arr.data
            },

            selectedTypeFunc() {
                console.log(this.selectedType,'selectedType'); 
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