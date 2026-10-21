<template>
  <section class="hero">
    <div class="page hero-grid">
      <div class="hero-main">
        <p class="meta hero-kicker">
          <span class="kicker-dot" aria-hidden="true"></span>
          Portfolio · BUT Informatique
        </p>

        <h1 class="hero-name">
          <span v-for="(word, i) in nameWords" :key="word" class="name-line" :style="{ '--i': i }">
            <span class="name-word">{{ word }}</span>
          </span>
        </h1>

        <p class="hero-lead">
          Je développe des applications web et mobiles, et je recherche à continuer vers un master en
          <mark class="redact">cybersécurité</mark>.
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

      <aside class="id-card corners" aria-label="Fiche d'identification">
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
        <footer class="id-card-foot">
          <span class="barcode" aria-hidden="true"></span>
          <span class="meta">Réf. TS-BUT-INFO</span>
        </footer>
      </aside>
    </div>

    <div class="stack-strip" aria-label="Technologies utilisées">
      <span class="meta stack-label">Stack</span>
      <div class="marquee">
        <ul class="marquee-track">
          <li v-for="tech in techStack" :key="tech">{{ tech }}</li>
        </ul>
        <ul class="marquee-track" aria-hidden="true">
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
  position: relative;
  padding-top: calc(var(--header-h) + 5rem);
  overflow: hidden;
}

/* Halo ambré très discret derrière le nom */
.hero::before {
  content: "";
  position: absolute;
  top: -20%;
  left: -10%;
  width: 70vw;
  height: 70vw;
  max-width: 900px;
  max-height: 900px;
  background: radial-gradient(circle, rgba(255, 176, 32, 0.08), transparent 62%);
  pointer-events: none;
}

.hero-grid {
  position: relative;
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

/* Chaque ligne du nom monte depuis un masque */
.name-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
}

.name-word {
  display: inline-block;
  animation: rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(0.1s + var(--i) * 0.12s);
}

.name-line:last-child .name-word {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--paper);
  transition: color 0.3s ease;
}

.name-line:last-child:hover .name-word {
  color: var(--signal);
  -webkit-text-stroke-color: var(--signal);
}

@keyframes rise {
  from {
    transform: translateY(105%);
  }
  to {
    transform: none;
  }
}

.hero-lead {
  max-width: 52ch;
  margin-top: 2rem;
  font-size: 1.15rem;
  color: var(--paper-dim);
  animation: fade 0.8s ease 0.4s both;
}

/* Mot caviardé qui se dévoile */
.redact {
  position: relative;
  background: none;
  color: var(--paper);
  white-space: nowrap;
  box-shadow: inset 0 -0.38em 0 rgba(255, 176, 32, 0.3);
}

.redact::after {
  content: "";
  position: absolute;
  inset: -0.05em -0.15em;
  background: var(--paper);
  transform-origin: right;
  animation: unredact 0.6s cubic-bezier(0.7, 0, 0.3, 1) 1.1s both;
}

@keyframes unredact {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
  animation: fade 0.8s ease 0.55s both;
}

/* Fiche d'identification */
.id-card {
  border: 1px solid var(--rule-strong);
  background: rgba(20, 23, 28, 0.85);
  backdrop-filter: blur(6px);
  animation: fade 0.8s ease 0.3s both;
}

.id-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  border-top: 1px solid var(--rule);
}

.barcode {
  width: 120px;
  height: 22px;
  background: repeating-linear-gradient(
    90deg,
    var(--paper-dim) 0 1px,
    transparent 1px 3px,
    var(--paper-dim) 3px 5px,
    transparent 5px 6px,
    var(--paper-dim) 6px 7px,
    transparent 7px 10px
  );
  opacity: 0.55;
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

/* Bandeau stack qui défile */
.stack-strip {
  position: relative;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  background: var(--ink-2);
}

.stack-label {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  background: var(--signal);
  color: var(--signal-ink);
  font-weight: 600;
}

.marquee {
  display: flex;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.marquee-track {
  display: flex;
  flex-shrink: 0;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 1.1rem 1.25rem 1.1rem 2.5rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--paper-dim);
  white-space: nowrap;
  animation: marquee 32s linear infinite;
}

.marquee-track li::after {
  content: "/";
  margin-left: 2.5rem;
  color: var(--signal);
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee {
  to {
    transform: translateX(-100%);
  }
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

  .marquee-track {
    font-size: 1rem;
  }
}
</style>
