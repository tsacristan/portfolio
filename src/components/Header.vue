<template>
  <header class="topbar">
    <nav class="container nav">
      <button class="brand" @click="selectAndNavigate('hero')" type="button">
        <span class="brand-icon">📡</span>
        <span>{{ profile.name }}</span>
      </button>

      <div class="desktop-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['nav-link', { active: activeTab === tab.id }]"
          @click="selectAndNavigate(tab.id)"
          type="button"
        >
          {{ tab.label }}
        </button>
      </div>

      <button class="menu-btn" @click="toggleMenu" aria-label="Ouvrir le menu" type="button">
        ☰
      </button>
    </nav>

    <div v-if="mobileMenuOpen" class="mobile-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['nav-link mobile', { active: activeTab === tab.id }]"
        @click="selectAndNavigate(tab.id)"
        type="button"
      >
        {{ tab.label }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { Profile, Tab } from "@/types"

interface Props {
  profile: Profile
  tabs: Tab[]
  activeTab: string
}

interface Emits {
  (e: "navigate", tabId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const selectAndNavigate = (tabId: string) => {
  mobileMenuOpen.value = false
  emit("navigate", tabId)
}
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.nav {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  color: var(--text);
  transition: all 0.28s ease;
}

.brand:hover {
  background: rgba(255, 107, 74, 0.1);
  color: var(--neon-cyan);
}

.brand-icon {
  display: flex;
  color: var(--indigo);
}

.desktop-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  transition: all 0.28s ease;
  color: var(--muted);
  font-weight: 400;
  letter-spacing: 0.06em;
}

.nav-link:hover {
  color: var(--text);
  background: transparent;
}

.nav-link.active {
  color: var(--neon-cyan);
  background: transparent;
  border-bottom: 2px solid var(--neon-cyan);
}

.menu-btn {
  display: none;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text);
}

.mobile-nav {
  display: none;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--line);
  background: rgba(245, 245, 247, 0.95);
}

.nav-link.mobile {
  border-radius: 0;
  border-left: 3px solid transparent;
  padding: 1rem 1.5rem;
  text-align: left;
}

.nav-link.mobile.active {
  border-left-color: var(--indigo);
  background: rgba(99, 102, 241, 0.08);
  border-bottom: none;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .menu-btn {
    display: flex;
    align-items: center;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
