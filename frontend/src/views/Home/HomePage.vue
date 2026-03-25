<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Bienvenido al panel SEP</h1>
      <p class="subtitle">Sistema Especializado de Proyectos — GGPC SENA</p>
    </header>
    <section class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" :class="['stat-card', stat.color]">
        <div class="stat-icon">
          <component :is="stat.icon" :size="20" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Wheat, Newspaper, TrendingUp, MapPin } from 'lucide-vue-next'

const stats = [
  { label: 'Panaderías registradas', value: '342', icon: Wheat, color: 'green' },
  { label: 'Artículos publicados', value: '56', icon: Newspaper, color: 'purpura' },
  { label: 'Departamentos activos', value: '18', icon: MapPin, color: 'celeste' },
  { label: 'Visitas este mes', value: '2.4k', icon: TrendingUp, color: 'lime' },
]
</script>

<style lang="scss" scoped>
.page { display: flex; flex-direction: column; gap: $space-7; max-width: 1100px; }
.title { font-size: 1.5rem; font-weight: 700; color: $text-primary; }
.subtitle { font-size: 1rem; color: $text-secondary; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: $space-4; }
.stat-card {
  display: flex; align-items: center; gap: $space-4;
  padding: $space-5; background: $bg-primary;
  border-radius: $radius-lg; border: 1px solid $border-default;
  transition: box-shadow $transition-base;
  &:hover { box-shadow: $shadow-md; }
}
.stat-icon {
  width: 44px; height: 44px; border-radius: $radius-md;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.green .stat-icon { background: $green-50; color: $green-500; }
.purpura .stat-icon { background: $purpura-50; color: $purpura-500; }
.celeste .stat-icon { background: $celeste-50; color: $celeste-500; }
.lime .stat-icon { background: $lime-50; color: $lime-500; }
.stat-value { font-size: 1.5rem; font-weight: 700; line-height: 1.1; }
.stat-label { font-size: 0.875rem; color: $text-secondary; }
.stat-info { display: flex; flex-direction: column; }
</style>
