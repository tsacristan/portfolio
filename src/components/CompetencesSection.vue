<template>
  <section class="chapter">
    <div class="page">
      <header class="chapter-head" data-reveal>
        <span class="chapter-index">§03 — Évaluation</span>
        <div>
          <h2 class="chapter-title">Compétences</h2>
          <p class="chapter-lead">
            Les six compétences du
            <a :href="competences.pnLink" target="_blank" rel="noreferrer" class="inline-link">référentiel BUT Informatique</a>,
            auto-évaluées sur quatre niveaux et reliées aux projets qui les prouvent.
          </p>
        </div>
      </header>

      <div class="matrix">
        <article v-for="item in competences.items" :key="item.code" class="cell" data-reveal>
          <header class="cell-head">
            <span class="cell-code">{{ item.code }}</span>
            <span class="meta">{{ levelTitle(item.level) }}</span>
          </header>

          <h3 class="cell-title">{{ item.title }}</h3>
          <p class="cell-indicator">{{ item.indicator }}</p>

          <div class="cell-level" :aria-label="`Niveau ${item.level} sur 4`">
            <i v-for="n in 4" :key="n" :class="{ on: n <= item.level }"></i>
            <span class="meta">{{ item.level }}/4</span>
          </div>

          <div class="cell-evidence">
            <span class="meta">Preuves</span>
            <ul v-if="projectsFor(item.code).length">
              <li v-for="project in projectsFor(item.code)" :key="project.id">
                <span class="evidence-ref">P-{{ project.id }}</span> {{ project.title }}
              </li>
            </ul>
            <p v-else>{{ item.evidence }}</p>
          </div>
        </article>
      </div>

      <dl class="legend" data-reveal>
        <div v-for="level in competences.levels" :key="level.level" class="legend-item">
          <dt>
            <span class="legend-bar">
              <i v-for="n in 4" :key="n" :class="{ on: n <= level.level }"></i>
            </span>
            {{ level.title }}
          </dt>
          <dd>{{ level.description }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Competences, Project } from "@/types"

interface Props {
  competences: Competences
  projects: Project[]
}

const props = defineProps<Props>()

const levelTitle = (level: number) => props.competences.levels.find((l) => l.level === level)?.title ?? ""

const projectsFor = (code: string) =>
  props.projects.filter((project) => project.competencies?.some((c) => c.code === code))
</script>

<style scoped>
.inline-link {
  color: var(--paper);
  text-decoration: underline;
  text-decoration-color: var(--signal);
  text-underline-offset: 3px;
}

.matrix {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--rule-strong);
  border-left: 1px solid var(--rule);
}

.cell {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.6rem;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  transition: background-color 0.15s ease;
}

.cell:hover {
  background: var(--ink-2);
}

.cell-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cell-code {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1;
  color: var(--signal);
}

.cell-title {
  font-size: 1.2rem;
  letter-spacing: -0.01em;
}

.cell-indicator {
  font-size: 0.9rem;
  color: var(--paper-dim);
}

.cell-level,
.legend-bar {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cell-level i {
  flex: 1;
  height: 8px;
  background: var(--rule-strong);
}

.cell-level i.on,
.legend-bar i.on {
  background: var(--signal);
}

.cell-level .meta {
  margin-left: 0.6rem;
}

.cell-evidence {
  margin-top: auto;
  padding-top: 0.9rem;
  border-top: 1px dashed var(--rule);
  font-size: 0.88rem;
}

.cell-evidence ul {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.3rem;
}

.cell-evidence p {
  margin-top: 0.5rem;
  color: var(--paper-dim);
}

.evidence-ref {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.legend {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 2.5rem 0 0;
}

.legend-item dt {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.legend-bar i {
  width: 10px;
  height: 6px;
  background: var(--rule-strong);
}

.legend-item dd {
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  color: var(--muted);
}

@media (max-width: 960px) {
  .matrix {
    grid-template-columns: repeat(2, 1fr);
  }

  .legend {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .matrix,
  .legend {
    grid-template-columns: 1fr;
  }
}
</style>
