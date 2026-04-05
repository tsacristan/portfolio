<template>
  <div class="section">
    <div class="section-container">
      <div class="section-header">
        <h2>Compétences</h2>
        <p class="section-subtitle">Domaines d'expertise et niveaux de maîtrise</p>
      </div>

      <!-- Deck Carousel -->
      <div class="deck-wrapper">
        <!-- Left Arrow -->
        <button class="deck-arrow deck-arrow-left" @click="previousCard" :disabled="currentIndex === 0" aria-label="Compétence précédente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- Cards Display -->
        <div class="deck-display">
          <div class="deck-stack">
            <!-- Back card peek -->
            <div v-if="currentIndex > 0" class="card card-peek card-peek-back">
              <div class="card-back-spine"></div>
            </div>

            <!-- Main card -->
            <div 
              class="card card-main"
              :key="currentIndex"
            >
              <div class="card-header">
                <div class="header-left">
                  <span class="comp-badge">{{ competences.items[currentIndex].code }}</span>
                  <h3 class="comp-title">{{ competences.items[currentIndex].title }}</h3>
                </div>
                <span class="comp-count">{{ currentIndex + 1 }}/{{ competences.items.length }}</span>
              </div>

              <div class="card-content">
                <p class="comp-indicator">{{ competences.items[currentIndex].indicator }}</p>

                <!-- Level Display -->
                <div class="level-section">
                  <span class="level-label">Niveau de maîtrise</span>
                  <div class="level-track">
                    <div class="level-fill" :style="{ width: (competences.items[currentIndex].level / 4) * 100 + '%' }"></div>
                  </div>
                  <span class="level-text">{{ getLevelTitle(competences.items[currentIndex].level) }} ({{ competences.items[currentIndex].level }}/4)</span>
                </div>

                <!-- Evidence Projects -->
                <div v-if="getEvidenceForCompetency(competences.items[currentIndex].code).length > 0" class="evidence-block">
                  <span class="evidence-label">Projets démontrés</span>
                  <ul class="evidence-list">
                    <li v-for="proj in getEvidenceForCompetency(competences.items[currentIndex].code)" :key="proj.projectId">
                      {{ proj.projectTitle }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Next card peek -->
            <div v-if="currentIndex < competences.items.length - 1" class="card card-peek card-peek-next">
              <div class="card-back-spine"></div>
            </div>
          </div>
        </div>

        <!-- Right Arrow -->
        <button class="deck-arrow deck-arrow-right" @click="nextCard" :disabled="currentIndex === competences.items.length - 1" aria-label="Compétence suivante">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Navigation Dots -->
      <div class="deck-nav">
        <button 
          v-for="(comp, index) in competences.items" 
          :key="comp.code"
          class="nav-dot"
          :class="{ active: index === currentIndex }"
          @click="currentIndex = index"
          :aria-label="`Aller à ${comp.title}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Competences, Skill, Project } from "@/types"

interface Props {
  competences: Competences
  skills: Skill[]
  projects?: Project[]
}

const props = defineProps<Props>()

// Carousel state
const currentIndex = ref(0)

// Get level title
const getLevelTitle = (level: number): string => {
  const levelObj = props.competences.levels.find(l => l.level === level)
  return levelObj?.title || "Inconnu"
}

// Navigation
const nextCard = () => {
  if (currentIndex.value < props.competences.items.length - 1) {
    currentIndex.value++
  }
}

const previousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Keyboard navigation
const handleKeypress = (e: KeyboardEvent) => {
  if (e.key === "ArrowRight") nextCard()
  if (e.key === "ArrowLeft") previousCard()
}

onMounted(() => {
  window.addEventListener("keydown", handleKeypress)
})

// Get evidence for a specific competency
interface Evidence {
  projectId: string
  projectTitle: string
  level: number
  role: string[]
  deliverables: string[]
  github: string
}

const getEvidenceForCompetency = (code: string): Evidence[] => {
  const evidence: Evidence[] = []

  if (!props.projects) return evidence

  props.projects.forEach(project => {
    if (!project.competencies) return

    const compEvidence = project.competencies.find(c => c.code === code)
    if (compEvidence) {
      evidence.push({
        projectId: project.id,
        projectTitle: project.title,
        level: compEvidence.level,
        role: compEvidence.role,
        deliverables: compEvidence.deliverables,
        github: project.github
      })
    }
  })

  return evidence
}
</script>

<style scoped>
.section {
  padding: 4rem 2rem;
  width: 100%;
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 3rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.15em;
}

.section-subtitle {
  margin: 0;
  font-size: 1.1rem;
  color: var(--muted);
  font-weight: 400;
  letter-spacing: 0.08em;
}

/* Deck Wrapper */
.deck-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.deck-display {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 540px;
  perspective: 1200px;
}

.deck-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Arrow Buttons */
.deck-arrow {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 107, 74, 0.2);
  background: transparent;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  transition: all 0.25s ease;
}

.deck-arrow:hover:not(:disabled) {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  background: rgba(255, 107, 74, 0.1);
  box-shadow: 0 2px 8px rgba(255, 107, 74, 0.15);
}

.deck-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.deck-arrow svg {
  width: 20px;
  height: 20px;
}

/* Cards */
.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background: #1a1a1a;
  border: 1px solid rgba(255, 107, 74, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card-peek {
  transform-origin: center;
  opacity: 0.6;
}

.card-peek-back {
  transform: translateX(-16px) translateY(16px) scaleX(0.95);
}

.card-peek-next {
  transform: translateX(16px) translateY(16px) scaleX(0.95);
}

.card-main {
  z-index: 10;
  animation: cardSlide 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
}

@keyframes cardSlide {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card-back-spine {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(148, 163, 184, 0.1), rgba(148, 163, 184, 0.15), rgba(148, 163, 184, 0.1));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: rgba(148, 163, 184, 0.3);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 107, 74, 0.1);
}

.header-left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.comp-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 107, 74, 0.1);
  border: 1px solid rgba(255, 107, 74, 0.2);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--neon-cyan);
  flex-shrink: 0;
}

.comp-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.comp-count {
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 500;
  flex-shrink: 0;
}

/* Card Content */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
}

.comp-indicator {
  margin: 0;
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.6;
}

/* Level Section */
.level-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.level-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.level-track {
  height: 6px;
  background: rgba(255, 107, 74, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background: var(--neon-cyan);
  border-radius: 3px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.level-text {
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 500;
}

/* Evidence Block */
.evidence-block {
  padding: 1rem;
  background: rgba(255, 107, 74, 0.08);
  border-left: 3px solid var(--neon-cyan);
  border-radius: 0.5rem;
}

.evidence-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--neon-cyan);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.evidence-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.evidence-list li {
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.evidence-list li::before {
  content: "→";
  color: var(--neon-cyan);
  font-weight: 700;
}

/* Navigation */
.deck-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 107, 74, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.nav-dot:hover {
  background: rgba(255, 107, 74, 0.4);
}

.nav-dot.active {
  background: var(--neon-cyan);
  width: 28px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(255, 107, 74, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: 2.5rem 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section h2 {
    font-size: 2rem;
  }

  .deck-wrapper {
    gap: 1rem;
  }

  .deck-arrow {
    width: 40px;
    height: 40px;
  }

  .deck-display {
    max-width: 380px;
    height: 480px;
  }

  .card-main {
    padding: 1.5rem;
    gap: 1.25rem;
  }

  .comp-title {
    font-size: 1.1rem;
  }

  .card-header {
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
  }

  .comp-count {
    font-size: 0.8rem;
  }
}

@media (max-width: 640px) {
  .deck-wrapper {
    flex-direction: column;
    gap: 0;
  }

  .deck-arrow {
    position: absolute;
    width: 44px;
    height: 44px;
    z-index: 20;
    background: white;
  }

  .deck-arrow-left {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .deck-arrow-right {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .deck-display {
    max-width: 100%;
    height: 420px;
  }

  .deck-nav {
    margin-top: 2rem;
  }
}
</style>
