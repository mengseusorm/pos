<template> 
<VRow>
    <VCol cols="12">
      <div class="text-end mb-6"> 
        <ItemCategoryForm 
          translation-key="label.add_item_category" 
          @created="lists"
        /> 
      </div>  
      <VCard title="">  
        <VTable>
          <thead>
            <tr>
              <th class="text-uppercase">
                {{ $t('label.name') }}
              </th> 
              <th>
                {{ $t('label.status') }}
              </th>
              <th>
                {{ $t('label.action') }}
              </th> 
            </tr>
          </thead>

          <tbody>
            <tr v-for="itemCategory in data" :key="itemCategory.id">
              <td>
                {{ itemCategory.name }}
              </td> 
              <td> 
                <VChip :color="itemCategory.status === StatusEnum.ACTIVE ? 'success' : 'error'" size="small">
                  {{ $t(enums[0].statusEnumEnumArray[itemCategory.status]) }}
                </VChip>
              </td>
              <td>
                <ViewButton/>
                <EditButton @click="editItemCategory(itemCategory)" />
                <DelButton @click="deleteItemCategory(itemCategory)" /> 
              </td>  
            </tr>
          </tbody>
        </VTable>
      </VCard>
      
      <!-- Edit Dialog -->
      <ItemCategoryForm 
        v-model="editDialog"
        :edit-mode="true"
        :item-data="selectedItem"
        @updated="lists"
      />
    </VCol>
  </VRow> 
</template> 

<script setup> 
import { StatusEnum } from '@/Enums/StatusEnum';
import ItemCategoryForm from './ItemCategoryForm.vue'; 
import { api } from '@/plugins/router/store/authStore.js';
import { onMounted, ref } from 'vue'
import EditButton from '@/components/button/button/EditButton.vue';
import DelButton from '@/components/button/button/DelButton.vue';
import ViewButton from '@/components/button/button/ViewButton.vue';  
import alertService from '@/service/alertService';

const editDialog = ref(false) 
const selectedItem = ref(null)
const data = ref([])

const enums = [
  {
    StatusEnum: StatusEnum,
    statusEnumEnumArray: {
        [StatusEnum.ACTIVE]: `label.active`,
        [StatusEnum.INACTIVE]: `label.inactive`
    },
  }
]

const lists = async () => {   
  const response = await api.get('/admin/item-categories')
  data.value = response.data?.data 
}

const editItemCategory = (itemCategory) => {
  selectedItem.value = itemCategory
  editDialog.value = true
}

const deleteItemCategory = async (itemCategory) => {
  // Implement delete functionality
  // const confirmed = await alertService.confirm('Are you sure?')
  // if (confirmed) {
  //   await api.delete(`/admin/item-categories/${itemCategory.id}`)
  //   alertService.success('item_category_deleted_successfully')
  //   await lists()
  // }
}
 
onMounted(() => {   
  lists()  
}) 
</script>
