<template>
  <section class="hero">
    <div class="page hero-grid">
      <div class="hero-main">
        <p class="meta hero-kicker">
          <span class="kicker-dot" aria-hidden="true"></span>
          Portfolio · BUT Informatique
        </p>

        <h1 class="hero-name">
          <span v-for="word in nameWords" :key="word">{{ word }}</span>
        </h1>

        <p class="hero-lead">
          Je développe des applications web et mobiles, et je construis mon parcours vers la
          <mark>cybersécurité</mark> : systèmes, réseaux et sécurité applicative.
        </p>

        <div class="hero-actions">
          <button type="button" class="btn btn-signal" @click="emit('navigate', 'projects')">
            Voir les projets <span aria-hidden="true">↓</span>
          </button>
          <a class="btn" :href="profile.cv" target="_blank" rel="noreferrer">
            CV (PDF) <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <aside class="id-card" aria-label="Fiche d'identification">
        <header class="id-card-head">
          <span class="meta">Fiche d'identification</span>
          <span class="tag tag-signal">Public</span>
        </header>
        <dl class="id-list">
          <div v-for="row in idRows" :key="row.label" class="id-row">
            <dt class="meta">{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
        <div class="id-stats">
          <div v-for="stat in stats" :key="stat.label" class="id-stat">
            <span class="id-stat-value">{{ stat.value }}</span>
            <span class="meta">{{ stat.label }}</span>
          </div>
        </div>
      </aside>
    </div>

    <div class="stack-strip" aria-label="Technologies utilisées">
      <div class="page stack-inner">
        <span class="meta stack-label">Stack</span>
        <ul class="stack-list">
          <li v-for="tech in techStack" :key="tech">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Profile } from "@/types"
import { appData } from "@/utils/data"

interface Props {
  profile: Profile
  techStack: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: "navigate", sectionId: string): void }>()

const nameWords = props.profile.name.split(" ")

const idRows = [
  { label: "Formation", value: props.profile.role },
  { label: "Profil", value: props.profile.tagline },
  { label: "Cap", value: "Cybersécurité" },
  { label: "Localisation", value: props.profile.location }
]

// Chiffres calculés depuis les données pour rester cohérents avec le reste du site
const stats = [
  { value: String(appData.projects.length).padStart(2, "0"), label: "Projets" },
  { value: String(appData.competences.items.length).padStart(2, "0"), label: "Compétences" },
  { value: String(props.techStack.length).padStart(2, "0"), label: "Technos" }
]
</script>

<style scoped>
.hero {
  padding-top: calc(var(--header-h) + 5rem);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, 1fr);
  gap: 4rem;
  align-items: end;
  padding-bottom: 5rem;
}

.hero-kicker {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
  color: var(--paper-dim);
}

.kicker-dot {
  width: 8px;
  height: 8px;
  background: var(--signal);
}

.hero-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.4rem, 9vw, 7.5rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.045em;
}

.hero-name span:last-child {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--paper);
}

.hero-lead {
  max-width: 52ch;
  margin-top: 2rem;
  font-size: 1.15rem;
  color: var(--paper-dim);
}

.hero-lead mark {
  background: none;
  color: var(--paper);
  box-shadow: inset 0 -0.4em 0 rgba(255, 176, 32, 0.35);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

/* Fiche d'identification */
.id-card {
  border: 1px solid var(--rule-strong);
  background: var(--ink-2);
}

.id-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid var(--rule);
}

.id-list {
  margin: 0;
  padding: 0.4rem 1.2rem;
}

.id-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px dashed var(--rule);
}

.id-row:last-child {
  border-bottom: none;
}

.id-row dt {
  padding-top: 0.15rem;
}

.id-row dd {
  margin: 0;
  font-size: 0.95rem;
}

.id-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--rule);
}

.id-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem 1.2rem;
}

.id-stat + .id-stat {
  border-left: 1px solid var(--rule);
}

.id-stat-value {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--signal);
  line-height: 1;
}

/* Bandeau stack */
.stack-strip {
  border-top: 1px solid var(--rule);
  background: var(--ink-2);
}

.stack-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.1rem 0;
}

.stack-label {
  flex-shrink: 0;
  color: var(--signal);
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--paper-dim);
}

@media (max-width: 900px) {
  .hero {
    padding-top: calc(var(--header-h) + 3rem);
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-bottom: 3.5rem;
  }

  .stack-inner {
    align-items: flex-start;
  }
}
</style>
