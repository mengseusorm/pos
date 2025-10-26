<template>
  <VBtn v-if="!editMode" class="variant"> 
    <VIcon icon="bx-plus-circle" start size="20"/>
    {{ $t(translationKey) }}  
    <v-dialog v-model="dialog" activator="parent" max-width="500">
      <VForm @submit.prevent="save" ref="form"> 
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              {{ $t(editMode ? 'label.edit_item_category' : 'label.add_item_category') }}
            </div> 
            <VBtn
              icon="mdi-close"
              variant="text"
              @click="reset"
            ></VBtn>
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-card-text>
            <VTextField
              v-model="formData.name"
              :label="$t('label.name')"  
              required
              variant="outlined"   
              :error-messages="errors?.name?.[0]"
            ></VTextField>  

            <VRadioGroup v-model="formData.status" row class="mb-3">
              <VRadio 
                :key="StatusEnum.ACTIVE"
                :label="$t(`label.active`)"
                :value="StatusEnum.ACTIVE"
              ></VRadio>
              <VRadio
                :key="StatusEnum.INACTIVE"
                :label="$t(`label.inactive`)"
                :value="StatusEnum.INACTIVE"
              ></VRadio>
            </VRadioGroup>
            <VTextarea
              v-model="formData.description"
              :label="$t('label.description')"
              :counter="300"
              rows="3"
              variant="outlined"
              persistent-counter
            ></VTextarea>  
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-actions class="my-2 d-flex justify-end">
            <VBtn
              class="text-none"
              rounded="xl"
              :text="$t('label.cancel')"
              @click="reset"
            ></VBtn>

            <VBtn
              class="text-none"
              color="primary"
              rounded="xl"
              :text="$t('label.submit')" 
              variant="flat"
              type="submit"
            ></VBtn>
          </v-card-actions>
        </v-card>
      </VForm>
    </v-dialog>
  </VBtn>
  
  <!-- Dialog for edit mode (triggered externally) -->
  <v-dialog v-else v-model="dialog" max-width="500">
    <VForm @submit.prevent="save" ref="form"> 
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            {{ $t('label.edit_item_category') }}
          </div> 
          <VBtn
            icon="mdi-close"
            variant="text"
            @click="reset"
          ></VBtn>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>

        <v-card-text>
          <VTextField
            v-model="formData.name"
            :label="$t('label.name')"  
            required
            variant="outlined"   
            :error-messages="errors?.name?.[0]"
          ></VTextField>  

          <VRadioGroup v-model="formData.status" row class="mb-3">
            <VRadio 
              :key="StatusEnum.ACTIVE"
              :label="$t(`label.active`)"
              :value="StatusEnum.ACTIVE"
            ></VRadio>
            <VRadio
              :key="StatusEnum.INACTIVE"
              :label="$t(`label.inactive`)"
              :value="StatusEnum.INACTIVE"
            ></VRadio>
          </VRadioGroup>
          <VTextarea
            v-model="formData.description"
            :label="$t('label.description')"
            :counter="300"
            rows="3"
            variant="outlined"
            persistent-counter
          ></VTextarea>  
        </v-card-text>

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="my-2 d-flex justify-end">
          <VBtn
            class="text-none"
            rounded="xl"
            :text="$t('label.cancel')"
            @click="reset"
          ></VBtn>

          <VBtn
            class="text-none"
            color="primary"
            rounded="xl"
            :text="$t('label.submit')" 
            variant="flat"
            type="submit"
          ></VBtn>
        </v-card-actions>
      </v-card>
    </VForm>
  </v-dialog>
</template>

<script setup>  
import { StatusEnum } from '@/Enums/StatusEnum';
import { api } from '@/plugins/router/store/authStore.js';
import alertService from '@/service/alertService';
import { ref, watch } from 'vue';

const props = defineProps({
  translationKey: {
    type: String,
    default: ''
  },
  editMode: {
    type: Boolean,
    default: false
  },
  itemData: {
    type: Object,
    default: null
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})
 
const emit = defineEmits(['created', 'updated', 'update:modelValue']) 
const dialog = ref(props.modelValue) 
const form = ref(null)
const errors = ref(null)

const formData = ref({
  name: '',
  status: StatusEnum.ACTIVE,
  description: ''
})

// Watch for external dialog control (edit mode)
watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
  if (newVal && props.itemData) {
    formData.value = {
      name: props.itemData.name || '',
      status: props.itemData.status || StatusEnum.ACTIVE,
      description: props.itemData.description || ''
    }
  }
})

// Watch dialog changes to emit updates
watch(dialog, (newVal) => {
  emit('update:modelValue', newVal)
})
  
const reset = () => {
  formData.value = {
    name: "",
    status: StatusEnum.ACTIVE,
    description: ""
  }
  errors.value = null
  dialog.value = false  
}  

const save = async () => {
  try {
    let response
    
    if (props.editMode && props.itemData?.id) {
      // Update existing item
      response = await api.put(`/admin/item-categories/${props.itemData.id}`, formData.value)
      
      if (response.status === 200) {
        alertService.success('item_category_updated_successfully')
        reset()
        emit('updated')
      }
    } else {
      // Create new item
      response = await api.post('/admin/item-categories', formData.value)
      
      if (response.status === 201) {
        alertService.success('item_category_created_successfully')
        reset()
        emit('created')
      }
    }
  } catch (err) {
    errors.value = err.response?.data?.errors
  }
}
</script>
