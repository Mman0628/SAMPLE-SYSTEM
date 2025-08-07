<!-- <template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card elevation="8" width="350">
      <v-card-title class="text-h6">Login</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" :disabled="!valid" block>
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const email = ref('')
const password = ref('')
const valid = ref(false)
const form = ref(null)

const rules = {
  required: value => !!value || 'Required.',
  email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
}

onMounted(() => {
  form.value?.validate()
})

const submit = () => {
  if (form.value?.validate()) {
    // Simulate login
    alert(`Logging in as: ${email.value}`)
    // Here you would call an API
  }
}
</script> -->

<template>
  <div>

  </div>
</template>

<script>
  export default {
      
  }
</script>

<style lang="scss" scoped>

</style>
