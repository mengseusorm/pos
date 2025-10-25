<template> 
<VRow>
    <VCol cols="12">
      <div class="text-end mb-6"> 
        <ItemCategoryCeate translation-key="label.add_item_category"/> 
      </div>
      <VCard title="Basic">  
        <VTable>
          <thead>
            <tr>
              <th class="text-uppercase">
                Desserts (100g Servings)
              </th>
              <th>
                calories
              </th>
              <th>
                Fat(g)
              </th>
              <th>
                Carbs(g)
              </th>
              <th>
                protein(g)
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.dessert"
            >
              <td>
                {{ item.dessert }}
              </td>
              <td>
                {{ item.calories }}
              </td>
              <td>
                {{ item.fat }}
              </td>
              <td>
                {{ item.carbs }}
              </td>
              <td>
                {{ item.protein }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template> 
<script setup>
import ItemCategoryCeate from './itemCategoryCeate.vue';
 
// import CreateBtnModal from '@/layouts/components/button/CreateBtnModal.vue';

// const handleAddClick = () => {
  
//   // Add your modal opening logic here
//   console.log('Add button clicked')
// }
const desserts = [
  {
    dessert: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Ice cream sandwich',
    calories: 237,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Eclair',
    calories: 262,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Cupcake',
    calories: 305,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Gingerbread',
    calories: 356,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
]
</script> 
