<template>
  <div class="layout">
    <TheSidebar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from './TheSidebar.vue'
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: $space-7;
  overflow-y: auto;
}
</style>
