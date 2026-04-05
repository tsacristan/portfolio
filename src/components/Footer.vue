<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <p class="footer-line">Portfolio de {{ profile.name }}</p>
        <p class="footer-sub">Étudiant BUT Informatique — 2026</p>
      </div>
      <div class="footer-links">
        <a :href="profile.github" target="_blank" rel="noreferrer" aria-label="GitHub">
          <i>🐙</i>
        </a>
        <a :href="`mailto:${profile.email}`" aria-label="Email">
          <i>✉️</i>
        </a>
        <a :href="profile.linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <i>💼</i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Profile } from "@/types"

interface Props {
  profile: Profile
}

defineProps<Props>()
</script>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid var(--line);
  padding: 3rem 0;
  margin-top: 6rem;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.footer-line {
  margin: 0;
  font-weight: 600;
}

.footer-sub {
  margin: 0.25rem 0 0;
  color: var(--muted);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--line-soft);
  transition: all 0.28s ease;
}

.footer-links a:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background: rgba(34, 211, 238, 0.1);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
</style>
