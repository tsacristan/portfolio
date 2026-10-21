<template>
  <header class="topbar">
    <nav class="page topbar-inner" aria-label="Navigation principale">
      <button class="brand" type="button" @click="selectAndNavigate('hero')">
        <span class="brand-mark">TS</span>
        <span class="brand-name">{{ profile.name }}</span>
      </button>

      <ul class="nav-list">
        <li v-for="(tab, i) in tabs" :key="tab.id">
          <button
            type="button"
            :class="['nav-link', { active: activeTab === tab.id }]"
            :aria-current="activeTab === tab.id ? 'true' : undefined"
            @click="selectAndNavigate(tab.id)"
          >
            <span class="nav-index">§{{ String(i + 1).padStart(2, "0") }}</span>
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <button
        class="menu-btn"
        type="button"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        {{ mobileMenuOpen ? "Fermer" : "Menu" }}
      </button>
    </nav>

    <ul v-if="mobileMenuOpen" id="mobile-nav" class="mobile-nav">
      <li v-for="(tab, i) in tabs" :key="tab.id">
        <button
          type="button"
          :class="['mobile-link', { active: activeTab === tab.id }]"
          @click="selectAndNavigate(tab.id)"
        >
          <span class="nav-index">§{{ String(i + 1).padStart(2, "0") }}</span>
          {{ tab.label }}
        </button>
      </li>
    </ul>
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

const selectAndNavigate = (tabId: string) => {
  mobileMenuOpen.value = false
  emit("navigate", tabId)
}
</script>

<style scoped>
.topbar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  background: rgba(14, 16, 19, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
}

.topbar-inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1.5px solid var(--signal);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 600;
}

.nav-list {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  color: var(--paper-dim);
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.nav-link:hover {
  color: var(--paper);
}

.nav-link.active {
  color: var(--paper);
  border-bottom-color: var(--signal);
}

.nav-index {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--muted);
}

.nav-link.active .nav-index,
.mobile-link.active .nav-index {
  color: var(--signal);
}

.menu-btn {
  display: none;
  padding: 0.45rem 0.8rem;
  border: 1px solid var(--rule-strong);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.mobile-nav {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 1rem;
  border-top: 1px solid var(--rule);
}

.mobile-link {
  display: flex;
  gap: 0.75rem;
  width: var(--page);
  margin: 0 auto;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--rule);
  font-size: 1.05rem;
  text-align: left;
}

@media (max-width: 900px) {
  .nav-list {
    display: none;
  }

  .menu-btn {
    display: block;
  }
}
</style>
