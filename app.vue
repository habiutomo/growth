<script setup lang="ts">
usePerformanceVitals()
onMounted(() => {
  if (localStorage.getItem('northstar_analytics_consent') === 'granted') {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    gtag?.('consent', 'update', { analytics_storage: 'granted' })
  }
})
</script>

<template>
  <NuxtPage />
</template>
