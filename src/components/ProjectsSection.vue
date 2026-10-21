<template>
  <section class="chapter">
    <span class="chapter-num" aria-hidden="true">02</span>
    <div class="page">
      <header class="chapter-head" data-reveal>
        <span class="chapter-index">§02 — Registre</span>
        <div>
          <h2 class="chapter-title">Projets</h2>
          <p class="chapter-lead">
            {{ projects.length }} projets, du jeu en Java à l'application fullstack. Ouvrez une ligne pour voir le
            contexte, mon rôle et les compétences mobilisées.
          </p>
        </div>
      </header>

      <div class="register" role="list">
        <div class="register-head meta" aria-hidden="true">
          <span>Réf.</span>
          <span>Projet</span>
          <span>Stack</span>
          <span>Compétences</span>
          <span></span>
        </div>

        <article
          v-for="project in projects"
          :key="project.id"
          :class="['entry', { open: openId === project.id }]"
          role="listitem"
          data-reveal
        >
          <button
            type="button"
            class="entry-row"
            :aria-expanded="openId === project.id"
            :aria-controls="`project-${project.id}`"
            @click="toggle(project.id)"
          >
            <span class="entry-ref">P-{{ project.id }}</span>
            <span class="entry-title">
              <strong>{{ project.title }}</strong>
              <span class="entry-desc">{{ project.desc }}</span>
            </span>
            <span class="entry-stack">{{ project.tech }}</span>
            <span class="entry-comps">
              <span v-for="comp in project.competencies" :key="comp.code" class="tag">{{ comp.code }}</span>
            </span>
            <span class="entry-toggle" aria-hidden="true">{{ openId === project.id ? "−" : "+" }}</span>
          </button>

          <div
            v-if="openId === project.id"
            :id="`project-${project.id}`"
            :class="['entry-detail', { 'has-figure': project.image }]"
          >
            <figure v-if="project.image" class="entry-figure corners">
              <img :src="project.image" :alt="`Capture d'écran de ${project.title}`" loading="lazy" />
            </figure>

            <div class="entry-body">
              <ul v-if="contextChips(project).length" class="entry-context">
                <li v-for="chip in contextChips(project)" :key="chip" class="tag">{{ chip }}</li>
              </ul>

              <p class="entry-long">{{ project.longDesc }}</p>

              <dl class="entry-facts">
                <div v-if="project.myRole">
                  <dt class="meta">Mon rôle</dt>
                  <dd>{{ project.myRole }}</dd>
                </div>
                <div>
                  <dt class="meta">Ce que j'en retiens</dt>
                  <dd>{{ project.impact }}</dd>
                </div>
              </dl>

              <ul class="entry-evidence">
                <li v-for="comp in project.competencies" :key="comp.code">
                  <span class="evidence-code">{{ comp.code }}</span>
                  <span class="evidence-name">{{ competenceTitle(comp.code) }}</span>
                  <span class="evidence-level" :aria-label="`Niveau ${comp.level} sur 4`">
                    <i v-for="n in 4" :key="n" :class="{ on: n <= comp.level }"></i>
                  </span>
                  <span class="evidence-roles">{{ comp.role.join(" · ") }}</span>
                </li>
              </ul>

              <a :href="project.github" target="_blank" rel="noreferrer" class="btn entry-link">
                Code source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { Project, Competences } from "@/types"

interface Props {
  projects: Project[]
  competences: Competences
}

const props = defineProps<Props>()

// Le projet le plus complet (le dernier) est ouvert par défaut
const openId = ref<string | null>(props.projects[props.projects.length - 1]?.id ?? null)

const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}

const contextChips = (project: Project) =>
  [project.context, project.team, project.year].filter((chip): chip is string => Boolean(chip))

const competenceTitle = (code: string) => props.competences.items.find((c) => c.code === code)?.title ?? ""
</script>

<style scoped>
.register {
  border-top: 1px solid var(--rule-strong);
}

.register-head,
.entry-row {
  display: grid;
  grid-template-columns: 80px minmax(0, 2.2fr) minmax(0, 1.2fr) 170px 32px;
  gap: 1.5rem;
  align-items: center;
}

.register-head {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--rule);
}

.entry {
  position: relative;
  border-bottom: 1px solid var(--rule);
}

/* Barre ambrée qui s'étire au survol / à l'ouverture */
.entry::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1.25rem;
  width: 3px;
  background: var(--signal);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.entry:hover::before,
.entry.open::before {
  transform: scaleY(1);
}

.entry.open {
  background: linear-gradient(90deg, rgba(255, 176, 32, 0.05), transparent 45%);
}

.entry-row {
  width: 100%;
  padding: 1.4rem 0;
  text-align: left;
}

.entry-title strong {
  transition: transform 0.25s ease, color 0.25s ease;
}

.entry-row:hover .entry-title strong {
  transform: translateX(6px);
  color: var(--signal);
}

.entry-row:hover .entry-toggle {
  border-color: var(--signal);
  color: var(--signal);
}

.entry-ref {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--muted);
}

.entry.open .entry-ref {
  color: var(--signal);
}

.entry-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.entry-title strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.entry-desc {
  font-size: 0.9rem;
  color: var(--paper-dim);
}

.entry-stack {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--paper-dim);
}

.entry-comps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.entry-toggle {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--rule-strong);
  font-family: var(--font-mono);
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.entry.open .entry-toggle {
  background: var(--signal);
  border-color: var(--signal);
  color: var(--signal-ink);
}

/* Détail */
.entry-detail {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
  padding: 0.5rem 0 2.5rem 104px;
  animation: detail-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes detail-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.entry-detail.has-figure {
  grid-template-columns: 240px minmax(0, 1fr);
}

.entry-figure {
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--rule-strong);
  background: var(--ink-2);
  align-self: start;
}

.entry-figure img {
  width: 100%;
  height: auto;
}

.entry-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 760px;
}

.entry-context {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.entry-long {
  font-size: 1.02rem;
}

.entry-facts {
  display: grid;
  gap: 1rem;
  margin: 0;
}

.entry-facts dd {
  margin: 0.3rem 0 0;
  color: var(--paper-dim);
}

.entry-evidence {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--rule);
}

.entry-evidence li {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 0.25rem 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px dashed var(--rule);
}

.evidence-code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--signal);
}

.evidence-name {
  font-size: 0.92rem;
}

.evidence-level {
  display: flex;
  gap: 3px;
}

.evidence-level i {
  width: 14px;
  height: 6px;
  background: var(--rule-strong);
}

.evidence-level i.on {
  background: var(--signal);
}

.evidence-roles {
  grid-column: 2 / -1;
  font-size: 0.82rem;
  color: var(--muted);
}

.entry-link {
  align-self: flex-start;
}

@media (max-width: 900px) {
  .register-head {
    display: none;
  }

  .entry-row {
    grid-template-columns: 1fr 32px;
    grid-template-areas:
      "ref toggle"
      "title title"
      "stack stack"
      "comps comps";
    gap: 0.6rem;
  }

  .entry-ref { grid-area: ref; }
  .entry-title { grid-area: title; }
  .entry-stack { grid-area: stack; }
  .entry-comps { grid-area: comps; }
  .entry-toggle { grid-area: toggle; }

  .entry-detail,
  .entry-detail.has-figure {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 0 2rem;
  }

  .entry-figure {
    max-width: 200px;
  }
}
</style>
