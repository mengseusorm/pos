<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const selectedLocale = ref(locale.value)

watch(selectedLocale, (val) => {
  locale.value = val
  localStorage.setItem('userLocale', val)
})
</script>

<template> 
  <VBtn
    variant="tonal"
    class="me-2"
    size="small"
    append-icon="bx-chevron-down"
  >
    {{ selectedLocale === 'en' ? 'English' : 'ខ្មែរ' }}
    <VMenu activator="parent">
      <VList>
        <VListItem
          v-for="(item, index) in [
            { title: 'English', value: 'en' },
            { title: 'ខ្មែរ', value: 'kh' }
          ]"
          :key="index"
          :value="item.value"
          @click="selectedLocale = item.value"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>

<style lang="scss" scoped>
.language-selector {
  max-width: 100px;
}
</style>
