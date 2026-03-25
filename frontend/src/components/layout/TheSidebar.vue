<template>
  <aside :class="['sidebar', { collapsed }]">
    <div class="logo-area">
      <div v-if="!collapsed" class="logos">
        <div class="logo-placeholder">SENA</div>
        <div class="logo-divider" />
        <div class="logo-placeholder">SEP</div>
      </div>
      <div v-else class="logo-small">
        <div class="logo-placeholder">S</div>
      </div>
    </div>

    <nav class="nav">
      <span v-if="!collapsed" class="section-label">Contenido</span>
      <div v-if="!collapsed" class="section-divider" />

      <RouterLink
        v-for="item in navItems"
        :key="item.id"
        :to="item.path"
        :class="['nav-item', { active: route.path === item.path }]"
        :title="collapsed ? item.label : undefined"
      >
        <component :is="item.icon" :size="20" />
        <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <button class="collapse-btn" @click="collapsed = !collapsed">
      <component :is="collapsed ? ChevronRight : ChevronLeft" :size="16" />
    </button>

    <div class="user-area">
      <div class="user-avatar">
        <img src="https://ui-avatars.com/api/?name=Admin&background=39a900&color=fff&size=36" alt="Admin" />
      </div>
      <template v-if="!collapsed">
        <div class="user-info">
          <span class="user-name">Nombre Admin</span>
          <span class="user-role">Administrador</span>
        </div>
        <ChevronRight :size="16" class="user-chevron" />
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Home, Wheat, Newspaper, ChevronRight, ChevronLeft } from 'lucide-vue-next'

const route = useRoute()
const collapsed = ref(false)

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home, path: '/' },
  { id: 'bakeries', label: 'Directorio de panaderías', icon: Wheat, path: '/panaderias' },
  { id: 'blog', label: 'Gestor del blog', icon: Newspaper, path: '/blog' },
]
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-height: 100vh;
  background: $purpura-500;
  color: $text-inverse;
  padding: $space-5 $space-4;
  transition: width $transition-base;
  position: relative;
  z-index: $z-sidebar;
  flex-shrink: 0;
  &.collapsed { width: 72px; padding: $space-5 $space-3; }
}

.logo-area { margin-bottom: $space-8; }

.logos {
  display: flex;
  align-items: center;
  gap: $space-3;
  justify-content: center;
}

.logo-small { display: flex; justify-content: center; }

.logo-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
}

.logo-divider {
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: $space-1;
  flex: 1;
}

.section-label {
  padding: $space-2 $space-3;
  color: rgba(255, 255, 255, 0.5);
}

.section-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: $space-2;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-3;
  border-radius: $radius-md;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all $transition-fast;
  text-decoration: none;
  &:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
  &.active { background: rgba(255, 255, 255, 0.18); color: #fff; }
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collapse-btn {
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: $purpura-600;
  color: $text-inverse;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid $bg-secondary;
  z-index: 10;
  &:hover { background: $purpura-700; }
}

.user-area {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-3;
  border-radius: $radius-md;
  background: $green-500;
  margin-top: auto;
  cursor: pointer;
  transition: background $transition-fast;
  &:hover { background: $green-600; }
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  img { width: 100%; height: 100%; object-fit: cover; }
}

.user-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
}

.user-role { font-size: 0.75rem; color: rgba(255, 255, 255, 0.7); }
.user-chevron { color: rgba(255, 255, 255, 0.7); flex-shrink: 0; }
</style>
