<template>
  <section class="section reveal-ready">
    <div class="hero-banner">
      <div class="hero-top">
        <p class="badge">{{ profile.tagline }}</p>
        <h1 class="hero-title">{{ profile.name }}</h1>
        <p class="hero-subtitle">{{ profile.role }}</p>
      </div>
      <div class="hero-actions">
        <a :href="profile.cv" target="_blank" class="btn btn-primary">
          📥 Télécharger mon CV
        </a>
        <a :href="`mailto:${profile.email}`" class="btn btn-secondary">
          ✉️ Me contacter
        </a>
      </div>
    </div>

    <div class="tech-stack">
      <p class="tech-label">Stack technique</p>
      <div class="tech-list">
        <span v-for="tech in techStack" :key="tech" class="tech-badge">{{ tech }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Profile } from "@/types"

interface Props {
  profile: Profile
  techStack: string[]
}

defineProps<Props>()
</script>

<style scoped>
.section {
  padding: 6rem 0;
  margin-top: 80px;
}

.hero-banner {
  margin-bottom: 4rem;
}

.hero-top {
  margin-bottom: 2rem;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid var(--line);
  border-radius: 2rem;
  font-size: 0.875rem;
  color: var(--cyan);
  margin: 0 0 1rem 0;
}

.hero-title {
  margin: 0;
  font-size: clamp(2em, 8vw, 4em);
  font-weight: 900;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--muted);
  margin: 0.5rem 0 0 0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--line);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.28s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--cyan);
  color: var(--bg);
  border-color: var(--cyan);
}

.btn-primary:hover {
  background: rgba(34, 211, 238, 0.8);
}

.btn-secondary {
  background: transparent;
  color: var(--text);
}

.btn-secondary:hover {
  background: rgba(34, 211, 238, 0.1);
  border-color: var(--cyan);
  color: var(--cyan);
}

.tech-stack {
  padding: 2rem;
  background: rgba(34, 211, 238, 0.05);
  border: 1px solid var(--line);
  border-radius: 0.5rem;
}

.tech-label {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid var(--line);
  border-radius: 2rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .section {
    padding: 4rem 0;
    margin-top: 0;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    justify-content: center;
    width: 100%;
  }
}
</style>
