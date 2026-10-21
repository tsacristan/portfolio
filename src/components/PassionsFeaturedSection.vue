<template>
  <section class="chapter">
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
        <article class="log" data-reveal>
          <header class="log-head">
            <span class="meta">Journal · Course</span>
            <span class="tag">{{ sportData.trail.location }}</span>
          </header>
          <h3 class="log-title">Trail</h3>
          <dl class="log-metrics">
            <div v-for="metric in trailMetrics" :key="metric.label">
              <dt class="meta">{{ metric.label }}</dt>
              <dd>{{ metric.value }}</dd>
            </div>
          </dl>
          <a v-if="sportData.stravaUrl" :href="sportData.stravaUrl" target="_blank" rel="noreferrer" class="btn">
            Strava <span aria-hidden="true">↗</span>
          </a>
        </article>

        <article class="log" data-reveal>
          <header class="log-head">
            <span class="meta">Journal · Force</span>
            <span class="tag">Records perso</span>
          </header>
          <h3 class="log-title">Powerlifting</h3>
          <dl class="log-metrics">
            <div v-for="lift in sportData.powerlifting" :key="lift.label">
              <dt class="meta">{{ lift.label }}</dt>
              <dd>{{ lift.value }}<small>{{ lift.unit }}</small></dd>
            </div>
            <div>
              <dt class="meta">Total</dt>
              <dd class="total">{{ total }}<small>kg</small></dd>
            </div>
          </dl>
          <a v-if="sportData.hevyUrl" :href="sportData.hevyUrl" target="_blank" rel="noreferrer" class="btn">
            Hevy <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { SportData } from "@/types"

const props = defineProps<{
  sportData: SportData
}>()

const trailMetrics = computed(() => [
  { label: "Distance", value: props.sportData.trail.dist },
  { label: "Dénivelé", value: props.sportData.trail.elevation },
  { label: "Durée", value: props.sportData.trail.duration },
  { label: "Allure", value: props.sportData.trail.pace }
])

const total = computed(() => props.sportData.powerlifting.reduce((sum, lift) => sum + Number(lift.value), 0))
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
  gap: 1.4rem;
  padding: 1.8rem;
  border: 1px solid var(--rule-strong);
  background: var(--ink-2);
}

.log-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-title {
  font-size: 2rem;
}

.log-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  border-top: 1px solid var(--rule);
}

.log-metrics > div {
  padding: 1rem 0;
  border-bottom: 1px solid var(--rule);
}

.log-metrics > div:nth-child(odd) {
  padding-right: 1rem;
  border-right: 1px solid var(--rule);
}

.log-metrics > div:nth-child(even) {
  padding-left: 1rem;
}

.log-metrics dd {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 1;
}

.log-metrics small {
  margin-left: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--muted);
}

.log-metrics .total {
  color: var(--signal);
}

.log .btn {
  align-self: flex-start;
}

@media (max-width: 800px) {
  .logs {
    grid-template-columns: 1fr;
  }
}
</style>
