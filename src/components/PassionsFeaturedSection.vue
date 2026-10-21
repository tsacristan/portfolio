<template>
  <section class="chapter">
    <span class="chapter-num" aria-hidden="true">04</span>
    <div class="page">
      <header class="chapter-head" data-reveal>
        <span class="chapter-index">§04 — Hors écran</span>
        <div>
          <h2 class="chapter-title">Endurance &amp; force</h2>
          <p class="chapter-lead">
            Le trail et le powerlifting m'apprennent ce que j'applique aussi au code : de la régularité, des objectifs
            mesurables et de la patience.
          </p>
        </div>
      </header>

      <div class="logs">
        <component
          :is="sportData.stravaUrl ? 'a' : 'article'"
          :href="sportData.stravaUrl || undefined"
          target="_blank"
          rel="noreferrer"
          class="log corners hatch"
          data-reveal
        >
          <header class="log-head">
            <span class="meta">Journal · Course</span>
            <img :src="logos.strava" alt="Strava" class="log-logo" width="44" height="44" />
          </header>
          <h3 class="log-title">Trail</h3>
          <span class="log-mark" aria-hidden="true">RUN</span>
          <p class="log-text">Sorties longues et dénivelé, suivies sur Strava.</p>
          <span v-if="sportData.stravaUrl" class="log-link">Voir mon profil Strava <span aria-hidden="true">↗</span></span>
        </component>

        <component
          :is="sportData.hevyUrl ? 'a' : 'article'"
          :href="sportData.hevyUrl || undefined"
          target="_blank"
          rel="noreferrer"
          class="log corners hatch"
          data-reveal
        >
          <header class="log-head">
            <span class="meta">Journal · Force</span>
            <img :src="logos.hevy" alt="Hevy" class="log-logo" width="44" height="44" />
          </header>
          <h3 class="log-title">Powerlifting</h3>
          <span class="log-mark" aria-hidden="true">LIFT</span>
          <p class="log-text">Squat, bench et deadlift, séances suivies sur Hevy.</p>
          <span v-if="sportData.hevyUrl" class="log-link">Voir mon profil Hevy <span aria-hidden="true">↗</span></span>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SportData } from "@/types"

defineProps<{
  sportData: SportData
}>()

const logos = {
  strava: `${import.meta.env.BASE_URL}logos/strava.svg`,
  hevy: `${import.meta.env.BASE_URL}logos/hevy.png`
}
</script>

<style scoped>
.logs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.log {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px;
  padding: 2rem;
  border: 1px solid var(--rule-strong);
  background-color: var(--ink-2);
  overflow: hidden;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.25s ease;
}

a.log:hover {
  border-color: var(--signal);
  background-color: var(--ink-3);
  transform: translateY(-3px);
}

/* Mot géant en filigrane */
.log-mark {
  position: absolute;
  right: -0.06em;
  bottom: -0.2em;
  font-family: var(--font-display);
  font-size: 9rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px var(--rule-strong);
  pointer-events: none;
  transition: -webkit-text-stroke-color 0.25s ease, transform 0.4s ease;
}

a.log:hover .log-mark {
  -webkit-text-stroke-color: rgba(255, 176, 32, 0.45);
  transform: translateX(-8px);
}

.log-link span {
  display: inline-block;
  transition: transform 0.2s ease;
}

a.log:hover .log-link span {
  transform: translate(4px, -2px);
}

.log-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-logo {
  width: 52px;
  height: 52px;
  border: 1px solid var(--rule-strong);
  transition: transform 0.25s ease;
}

a.log:hover .log-logo {
  transform: rotate(-6deg) scale(1.06);
}

.log-head,
.log-title,
.log-text,
.log-link {
  position: relative;
  z-index: 1;
}

.log-link {
  margin-top: auto;
  max-width: 60%;
}

.log-title {
  font-size: 2.2rem;
}

.log-text {
  color: var(--paper-dim);
}

.log-link {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--signal);
}

@media (max-width: 800px) {
  .logs {
    grid-template-columns: 1fr;
  }
}
</style>
