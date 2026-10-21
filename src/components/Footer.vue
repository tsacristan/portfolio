<template>
  <footer class="footer">
    <div class="page footer-inner">
      <p class="meta">© {{ year }} {{ profile.name }} — {{ profile.role }}</p>
      <p class="meta">Fin du document</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Profile } from "@/types"

interface Props {
  profile: Profile
}

defineProps<Props>()

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--rule-strong);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.75rem 0;
}
</style>
