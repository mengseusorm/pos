<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16"> 
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >   
      <VCardText>
          <VAlert v-if="error" type="error" variant="tonal" prominent border="left" class="mb-4" dismissible @click:close="error = ''">
            {{ error }}
          </VAlert> 
          <VForm @submit.prevent="handleLogin">
            <VRow> 
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email or Username"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol> 
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                /> 
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox
                    v-model="form.remember"
                    label="Remember me"
                  /> 
                </div> 
                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>  
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<script setup> 
import { useAuthStore } from '@/plugins/router/store/authStore';
import { useRouter } from 'vue-router';
const router = useRouter(); 
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const error = ref('');

const isPasswordVisible = ref(false)

const handleLogin = async () => {
  error.value = '';
  
  try {
    const login = await authStore.login(form.value);
    
    if (login.success) { 
      await router.replace('/dashboard');
    } else { 
      error.value = login.message;
    }
  } catch (err) {
    console.error('Login Error:', err);
    error.value = 'An error occurred during login. Please try again.';
  }
}; 

</script>

<style lang="scss">
@use "@core-scss/template/pages/page-auth";
</style>
