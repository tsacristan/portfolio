<template>
  <div class="passions-desktop-section">
    <div class="container">
      <div class="section-header">
        <h2>Mes Passions</h2>
        <p class="section-subtitle">Allumez le PC pour découvrir running, powerlifting et trail</p>
      </div>

      <!-- Desktop Container -->
      <div class="desktop-wrapper">
        <!-- Desktop Screen -->
        <div :class="['desktop-frame', { 'powered-on': isPoweredOn }]">
          <!-- Power Button -->
          <button class="power-button" @click="togglePower" :title="isPoweredOn ? 'Éteindre' : 'Allumer'">
            <div :class="['power-dot', { active: isPoweredOn }]"></div>
          </button>

          <!-- Desktop Content -->
          <div v-if="isPoweredOn" class="desktop-content">
            <!-- Desktop Grid (Passion Icons) -->
            <div class="desktop-grid">
              <button
                v-for="passion in passions"
                :key="passion.id"
                class="desktop-icon"
                @click="openPassion(passion)"
              >
                <div class="icon-image">
                  <img :src="passion.image" :alt="passion.title" />
                </div>
                <span class="icon-label">{{ passion.title }}</span>
              </button>
            </div>

            <!-- Taskbar -->
            <div class="desktop-taskbar">
              <div class="taskbar-left">
                <button class="taskbar-icon">
                  <span>🏃</span>
                </button>
              </div>
              <div class="taskbar-center">
                <span v-if="openPassions.length > 0" class="taskbar-info">
                  {{ openPassions.length }} passion{{ openPassions.length > 1 ? "s" : "" }} ouverte{{ openPassions.length > 1 ? "s" : "" }}
                </span>
              </div>
              <div class="taskbar-right">
                <span class="taskbar-time">{{ currentTime }}</span>
              </div>
            </div>
          </div>

          <!-- Desktop Shutdown Screen -->
          <div v-else class="desktop-off">
            <div class="shutdown-screen">
              <p>L'ordinateur est éteint</p>
              <p class="text-small">Cliquez le bouton d'alimentation pour démarrer</p>
            </div>
          </div>
        </div>

        <!-- Floating Windows -->
        <transition-group name="window" tag="div" class="windows-container">
          <div
            v-for="(passion, index) in openPassions"
            :key="`window-${passion.id}`"
            :style="getWindowStyle(index)"
            class="floating-window"
          >
            <!-- Title Bar -->
            <div class="window-titlebar">
              <span class="window-title">{{ passion.title }}</span>
              <div class="window-controls">
                <button class="window-btn minimize" @click="minimizePassion(passion.id)">_</button>
                <button class="window-btn maximize" @click="maximizePassion(passion.id)">□</button>
                <button class="window-btn close" @click="closePassion(passion.id)">✕</button>
              </div>
            </div>

            <!-- Window Content -->
            <div class="window-content">
              <!-- Running Content -->
              <div v-if="passion.id === 'running'" class="passion-content">
                <div class="content-section">
                  <h3>🏃 Course à Pied</h3>
                  <p>Passionné par la course et l'entraînement en trail.</p>
                </div>
                <div class="actions">
                  <a href="https://www.strava.com/athlete/training?sport_type=Run" target="_blank" rel="noopener noreferrer" class="action-link">
                    →
                    Voir sur Strava
                  </a>
                </div>
              </div>

              <!-- Powerlifting Content -->
              <div v-else-if="passion.id === 'powerlifting'" class="passion-content">
                <div class="content-section">
                  <h3>💪 Mes Records</h3>
                  <div class="lifts-grid">
                    <div v-for="lift in sportData.powerlifting" :key="lift.label" class="lift-card">
                      <div class="lift-icon">
                        💪
                      </div>
                      <div class="lift-info">
                        <p class="lift-label">{{ lift.label }}</p>
                        <p class="lift-value">{{ lift.value }} <span class="lift-unit">{{ lift.unit }}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="actions">
                  <button class="action-link">
                    🎯 Progression: 92%
                  </button>
                </div>
              </div>

              <!-- Trail Content -->
              <div v-else-if="passion.id === 'trail'" class="passion-content">
                <div class="content-section">
                  <h3>🏔️ {{ sportData.trail.name }}</h3>
                  <div class="trail-info">
                    <div class="trail-stat">
                      <span class="label">Distance</span>
                      <span class="value">{{ sportData.trail.dist }}</span>
                    </div>
                    <div class="trail-stat">
                      <span class="label">Dénivelé</span>
                      <span class="value">{{ sportData.trail.elevation }}</span>
                    </div>
                    <div class="trail-stat">
                      <span class="label">Durée</span>
                      <span class="value">{{ sportData.trail.duration }}</span>
                    </div>
                    <div class="trail-stat">
                      <span class="label">Allure</span>
                      <span class="value">{{ sportData.trail.pace }}</span>
                    </div>
                  </div>
                  <p class="trail-location">📍 {{ sportData.trail.location }}</p>
                </div>
                <div class="actions">
                  <button class="action-link">
                    📍 Voir l'itinéraire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import type { SportData } from "@/types"
import { formatDistance, formatPace, formatRunDate } from "@/utils/formatters"

interface Props {
  sportData: SportData
}

defineProps<Props>()

interface OpenPassion {
  id: string
  title: string
  image: string
  minimized: boolean
  maximized: boolean
}

interface Passion {
  id: string
  title: string
  image: string
}

const passions: Passion[] = [
  {
    id: "running",
    title: "Running",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop"
  },
  {
    id: "powerlifting",
    title: "Powerlifting",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop"
  },
  {
    id: "trail",
    title: "Trail",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop"
  }
]

const isPoweredOn = ref(false)
const openPassions = ref<OpenPassion[]>([])
const currentTime = ref("14:25")
let timeInterval: NodeJS.Timeout | null = null

const togglePower = () => {
  isPoweredOn.value = !isPoweredOn.value
  if (!isPoweredOn.value) {
    openPassions.value = []
  }
}

const openPassion = (passion: Passion) => {
  const exists = openPassions.value.find((p) => p.id === passion.id)
  if (!exists) {
    openPassions.value.push({
      id: passion.id,
      title: passion.title,
      image: passion.image,
      minimized: false,
      maximized: false
    })
  }
}

const closePassion = (passionId: string) => {
  openPassions.value = openPassions.value.filter((p) => p.id !== passionId)
}

const minimizePassion = (passionId: string) => {
  const passion = openPassions.value.find((p) => p.id === passionId)
  if (passion) {
    passion.minimized = !passion.minimized
  }
}

const maximizePassion = (passionId: string) => {
  const passion = openPassions.value.find((p) => p.id === passionId)
  if (passion) {
    passion.maximized = !passion.maximized
  }
}

const getWindowStyle = (index: number) => {
  const baseX = 100 + index * 30
  const baseY = 150 + index * 30
  return {
    left: `${baseX}px`,
    top: `${baseY}px`,
    zIndex: 100 + index,
    opacity: openPassions.value[index]?.minimized ? "0.5" : "1"
  }
}

const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  currentTime.value = `${hours}:${minutes}`
}

onMounted(() => {
  timeInterval = setInterval(updateTime, 60000)
  updateTime()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.passions-desktop-section {
  position: relative;
  padding: 4rem 2rem;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fade-in-up 1s ease-out;
}

.section-header h2 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #22d3ee, #d946ef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: var(--muted);
  font-size: 1rem;
}

/* Desktop Wrapper */
.desktop-wrapper {
  perspective: 1000px;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

/* Desktop Frame */
.desktop-frame {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 3px solid #444;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  aspect-ratio: 16 / 9;
}

.desktop-frame.powered-on {
  background: linear-gradient(135deg, #0f3460 0%, #1a5f7a 100%);
}

.power-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(34, 211, 238, 0.1);
  border: 2px solid var(--cyan);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.power-button:hover {
  background: rgba(34, 211, 238, 0.2);
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
}

.power-dot {
  width: 12px;
  height: 12px;
  background: transparent;
  border: 2px solid var(--cyan);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.power-dot.active {
  background: var(--cyan);
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
}

/* Desktop Content */
.desktop-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
}

/* Desktop Grid */
.desktop-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 30px;
  align-content: start;
  padding: 20px;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
}

.desktop-icon:hover {
  transform: scale(1.1);
}

.icon-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.icon-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon-label {
  font-size: 0.8rem;
  color: var(--text);
  text-align: center;
  word-break: break-word;
  max-width: 100px;
}

/* Desktop Taskbar */
.desktop-taskbar {
  height: 40px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 20px;
}

.taskbar-left,
.taskbar-center,
.taskbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.taskbar-left {
  flex: 0 0 auto;
}

.taskbar-center {
  flex: 1;
  justify-content: center;
}

.taskbar-right {
  flex: 0 0 auto;
}

.taskbar-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.taskbar-icon:hover {
  transform: scale(1.2);
}

.taskbar-info {
  font-size: 0.85rem;
  color: var(--muted);
}

.taskbar-time {
  font-size: 0.85rem;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

/* Shutdown Screen */
.desktop-off {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000 0%, #1a1a2e 100%);
}

.shutdown-screen {
  text-align: center;
}

.shutdown-screen p {
  margin: 0;
  color: var(--text);
  font-size: 1.2rem;
}

.text-small {
  font-size: 0.9rem;
  color: var(--muted);
  margin-top: 0.5rem;
}

/* Windows Container */
.windows-container {
  position: relative;
  width: 100%;
  height: 0;
}

/* Floating Windows */
.floating-window {
  position: absolute;
  width: 500px;
  max-height: 600px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.window-titlebar {
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.1), rgba(217, 70, 239, 0.1));
  border-bottom: 1px solid var(--line);
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: grab;
}

.window-titlebar:active {
  cursor: grabbing;
}

.window-title {
  color: var(--cyan);
  font-size: 0.95rem;
  font-weight: 600;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.window-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text);
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.window-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.window-btn.close:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgb(239, 68, 68);
  color: rgb(239, 68, 68);
}

/* Window Content */
.window-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.passion-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-section h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: var(--cyan);
}

/* Runs List */
.runs-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.run-item {
  padding: 12px;
  background: rgba(34, 211, 238, 0.08);
  border-left: 3px solid var(--cyan);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.run-info {
  flex: 1;
}

.run-name {
  margin: 0;
  color: var(--text);
  font-weight: 500;
  font-size: 0.95rem;
}

.run-date {
  margin: 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.run-stats {
  display: flex;
  gap: 15px;
  font-size: 0.85rem;
}

.stat {
  color: var(--text);
}

/* Lifts Grid */
.lifts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.lift-card {
  padding: 15px;
  background: rgba(217, 70, 239, 0.08);
  border-left: 3px solid var(--fuchsia);
  border-radius: 4px;
  display: flex;
  gap: 12px;
  align-items: center;
}

.lift-icon {
  width: 40px;
  height: 40px;
  background: rgba(217, 70, 239, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fuchsia);
}

.lift-info {
  flex: 1;
}

.lift-label {
  margin: 0 0 4px 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.lift-value {
  margin: 0;
  color: var(--text);
  font-size: 1.2rem;
  font-weight: 600;
}

.lift-unit {
  font-size: 0.85rem;
  color: var(--muted);
}

/* Trail Info */
.trail-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.trail-stat {
  padding: 12px;
  background: rgba(16, 185, 129, 0.08);
  border-left: 2px solid var(--emerald);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.trail-stat .label {
  color: var(--muted);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.trail-stat .value {
  color: var(--text);
  font-size: 1rem;
  font-weight: 600;
}

.trail-location {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
  text-align: center;
}

/* Actions */
.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.action-link {
  flex: 1;
  padding: 10px;
  background: rgba(34, 211, 238, 0.15);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-link:hover {
  background: rgba(34, 211, 238, 0.25);
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
}

/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.window-enter-active,
.window-leave-active {
  transition: all 0.3s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-frame {
    aspect-ratio: 4 / 3;
  }

  .desktop-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .floating-window {
    width: calc(100vw - 40px);
    max-height: 70vh;
  }
}
</style>
