<template>
  <div class="hero-section">
    <div class="container">
      <!-- Animated Background -->
      <div class="hero-gradient"></div>
      <div class="hero-blur-1"></div>
      <div class="hero-blur-2"></div>

      <!-- Main Content -->
      <div class="hero-content">
        <!-- Titre principal spacieux -->
        <h1 class="hero-title">
          <span class="title-word" v-for="(word, i) in titleWords" :key="i" :style="{ '--word-index': i }">
            {{ word }}
          </span>
        </h1>

        <!-- Sous-titre épuré avec espacement -->
        <p class="hero-subtitle">
          Développeur Frontend & Athlète Hybride
          <span class="subtitle-secondary">Créer des expériences numériques belles et performantes</span>
        </p>

        <!-- CTA Buttons avec hover effects -->
        <div class="hero-cta">
          <button class="btn-primary" @click="scrollTo('projects')">
            Découvrez mes projets
          </button>
        </div>
      </div>

      <!-- Floating stats -->
      <div class="hero-stats">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <div class="scroll-dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Profile } from "@/types"

interface Props {
  profile: Profile
}

defineProps<Props>()

const titleWords = ["Thurian", "Sacristan"]

const stats = [
  { value: "3+", label: "Projets" },
  { value: "6", label: "Compétences" },
  { value: "2026", label: "Graduation" },
  { value: "100%", label: "Passion" }
]

const scrollTo = (section: string) => {
  const element = document.querySelector(`[data-section="${section}"]`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

onMounted(() => {
  // Premium minimal animations on load
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4rem 0;
}

.container {
  position: relative;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 2;
}

/* Animated Backgrounds - Dark Theme Minimal */
.hero-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0a0a0a;
  z-index: -2;
  pointer-events: none;
}

.hero-blur-1 {
  position: fixed;
  top: -10%;
  left: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(255, 107, 74, 0.1), transparent 70%);
  border-radius: 50%;
  filter: blur(120px);
  animation: float-slow 20s ease-in-out infinite;
  z-index: -1;
  pointer-events: none;
}

.hero-blur-2 {
  position: fixed;
  bottom: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 107, 74, 0.05), transparent 70%);
  border-radius: 50%;
  filter: blur(120px);
  animation: float-slow 25s ease-in-out infinite reverse;
  z-index: -1;
  pointer-events: none;
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-50px) translateX(30px);
  }
}

/* Hero Content */
.hero-content {
  text-align: center;
  animation: fade-in-up 1s ease-out;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-line {
  display: none;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.line-accent {
  color: var(--indigo);
}

/* Hero Title - Ultra Minimal & Spacious */
.hero-title {
  font-size: clamp(3.5rem, 14vw, 8rem);
  font-weight: 800;
  line-height: 1.05;
  margin: 0 0 3rem 0;
  letter-spacing: 0.12em;
  color: var(--text);
  animation: fade-in-up 0.8s ease-out;
  word-spacing: 2rem;
}

.title-word {
  display: inline-block;
  animation: word-reveal 0.8s ease-out forwards;
  animation-delay: calc(var(--word-index) * 0.2s);
  opacity: 0;
  margin-right: 0;

  &:not(:last-child) {
    margin-right: 0.5em;
  }
}

@keyframes word-reveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient-shift-modern {
  0%, 100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

.title-word {
  display: inline-block;
  animation: word-reveal 0.8s ease-out forwards;
  animation-delay: calc(var(--word-index) * 0.15s);
  opacity: 0;

  &:not(:last-child) {
    margin-right: 0.3em;
  }
}

@keyframes word-reveal {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(90deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

/* Hero Subtitle */
.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text);
  margin: 0 0 5rem 0;
  animation: fade-in-up 1s ease-out 0.2s both;
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1.7;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.subtitle-secondary {
  display: block;
  color: var(--muted);
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 400;
  letter-spacing: 0.06em;
}

/* CTA Buttons - Dark Theme Minimal */
.hero-cta {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 10rem;
  animation: fade-in-up 1s ease-out 0.4s both;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 0;
  border: none;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.05rem;
  position: relative;
  overflow: hidden;
  background: transparent;
  color: var(--text);
  letter-spacing: 0.08em;
  border-bottom: 2px solid var(--text);
}

.btn-primary {
  border-bottom-color: var(--neon-cyan);
  color: var(--neon-cyan);
  animation: fade-in-up 1s ease-out 0.5s both;

  &:hover {
    opacity: 0.7;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    opacity: 0.5;
  }
}

.btn-secondary {
  display: none;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.btn-secondary:hover .arrow-icon {
  transform: translate(3px, -3px);
}

/* Hero Stats - Hidden in Minimal Design */
.hero-stats {
  display: none;
}

.stat-item {
  text-align: center;
  animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.stat-item:nth-child(1) { animation-delay: 1.2s; }
.stat-item:nth-child(2) { animation-delay: 1.4s; }
.stat-item:nth-child(3) { animation-delay: 1.6s; }
.stat-item:nth-child(4) { animation-delay: 1.8s; }

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* Scroll Indicator - Animated Minimal */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: fade-in 1s ease-out 2s both;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-indicator::before {
  content: "Scroll";
  font-size: 0.8rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  font-weight: 400;
}

.scroll-dot {
  width: 6px;
  height: 6px;
  background: var(--neon-cyan);
  border-radius: 50%;
  animation: bounce 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(255, 107, 74, 0.4);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(10px);
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
  }

  .hero-title {
    text-align: center;
  }

  .hero-cta {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
