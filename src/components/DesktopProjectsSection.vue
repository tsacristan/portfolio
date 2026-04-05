<template>
  <div class="projects-section" :class="{ 'fullscreen-active': monitorFullscreen }" data-section="projects">
    <div class="container">
      <div class="section-header">
        <h2>Mes Projets</h2>
        <p class="section-subtitle">Cliquez pour découvrir chaque projet</p>
      </div>

      <!-- Desktop Container -->
      <div class="desktop-wrapper" :class="{ 'fullscreen-mode': monitorFullscreen }">
        <!-- Desktop Screen -->
        <div ref="desktopFrameRef" :class="['desktop-frame', { 'powered-on': isPoweredOn }]">
          <!-- Power Button -->
          <button class="power-button" @click="togglePower" :title="isPoweredOn ? 'Éteindre' : 'Allumer'">
            <div :class="['power-dot', { active: isPoweredOn }]"></div>
          </button>

          <!-- Fullscreen Button -->
          <button v-if="isPoweredOn" class="fullscreen-button" @click="toggleMonitorFullscreen" :title="monitorFullscreen ? 'Quitter fullscreen' : 'Fullscreen'">
            <span>⛶</span>
          </button>

          <!-- Desktop Content -->
          <div v-if="isPoweredOn" class="desktop-content">
            <!-- Desktop Grid (Project Icons) -->
            <div class="desktop-grid">
              <button
                v-for="project in appData.projects"
                :key="project.id"
                class="desktop-icon"
                @click="openProject(project)"
              >
                <div class="icon-image">
                  <img :src="project.image" :alt="project.title" />
                </div>
                <span class="icon-label">{{ project.title }}</span>
              </button>
            </div>

            <!-- Taskbar -->
            <div class="desktop-taskbar">
              <div class="taskbar-left">
                <button class="taskbar-icon">
                  <span>📁</span>
                </button>
              </div>
              <div class="taskbar-center">
                <span v-if="openProjects.length > 0" class="taskbar-info">
                  {{ openProjects.length }} application{{ openProjects.length > 1 ? "s" : "" }} ouverte{{ openProjects.length > 1 ? "s" : "" }}
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

          <!-- Windows Container (inside desktop-frame) -->
          <transition-group name="window" tag="div" class="windows-container" v-if="isPoweredOn">
            <div v-for="project in openProjects" :key="project.id" class="window" :style="getWindowStyle(project.id)">
              <!-- Window Title Bar -->
              <div class="window-titlebar" @mousedown="startDrag($event, project.id)">
                <div class="window-buttons">
                  <button class="window-btn minimize" @click="minimizeWindow(project.id)">−</button>
                  <button class="window-btn maximize" @click="maximizeWindow(project.id)">□</button>
                  <button class="window-btn fullscreen" @click="toggleWindowFullscreen(project.id)">⛶</button>
                  <button class="window-btn close" @click="closeProject(project.id)">✕</button>
                </div>
                <div class="window-title">{{ project.title }}</div>
              </div>

              <!-- Window Content -->
              <div class="window-content">
                <div class="project-showcase">
                  <img :src="project.image" :alt="project.title" class="project-showcase-image" />
                  <div class="project-info">
                    <h3>{{ project.title }}</h3>
                    
                    <!-- Description -->
                    <div class="project-section">
                      <p class="description">{{ project.longDesc }}</p>
                    </div>
                    
                    <!-- Compétences/Technologies -->
                    <div class="project-section">
                      <strong class="section-label">Compétences:</strong>
                      <p class="tech-stack">{{ project.tech }}</p>
                    </div>
                    
                    <!-- Status -->
                    <div class="project-section">
                      <span class="stat">
                        <strong>Statut:</strong> <span class="badge">{{ project.status }}</span>
                      </span>
                    </div>
                    
                    <!-- Impact -->
                    <div class="project-section">
                      <p class="impact-text"><strong>Impact:</strong> {{ project.impact }}</p>
                    </div>
                    
                    <a :href="project.github" target="_blank" rel="noreferrer" class="project-btn">
                      Voir sur GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Monitor Stand -->
        <div class="monitor-stand"></div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import type { Project, AppData } from "@/types"
import { appData } from "@/utils/data"

interface WindowState {
  x: number
  y: number
  z: number
  minimized: boolean
  maximized: boolean
}

interface DragState {
  projectId: string | null
  startX: number
  startY: number
  offsetX: number
  offsetY: number
}

const isPoweredOn = ref(false)
const openProjects = ref<Project[]>([])
const windowStates = ref<Record<string, WindowState>>({})
const currentTime = ref("00:00")
const nextZIndex = ref(100)
const monitorFullscreen = ref(false)
const fullscreenWindowId = ref<string | null>(null)
const desktopFrameRef = ref<HTMLElement | null>(null)
const dragState = ref<DragState>({
  projectId: null,
  startX: 0,
  startY: 0,
  offsetX: 0,
  offsetY: 0
})

const getDesktopBounds = () => {
  if (!desktopFrameRef.value) {
    return { width: 800, height: 450 } // Fallback dimensions
  }
  const rect = desktopFrameRef.value.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height
  }
}

const getWindowStyle = (projectId: string) => {
  const state = windowStates.value[projectId]
  if (!state) return {}

  // Fullscreen window (takes entire desktop-frame)
  if (fullscreenWindowId.value === projectId) {
    return {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: 10000,
      borderRadius: "0"
    }
  }

  if (state.maximized) {
    return {
      left: "0",
      top: "0",
      width: "100%",
      height: "calc(100% - 50px)",
      zIndex: state.z
    }
  }

  // Regular window - free movement but clamped inside desktop-frame
  const bounds = getDesktopBounds()
  const windowWidth = 600
  const windowHeight = 400
  const taskbarHeight = 50
  
  // Clamp position to keep window inside desktop (accounting for taskbar at bottom)
  const maxX = Math.max(0, bounds.width - windowWidth)
  const maxY = Math.max(0, bounds.height - windowHeight - taskbarHeight)
  
  const clampedX = Math.max(0, Math.min(state.x, maxX))
  const clampedY = Math.max(0, Math.min(state.y, maxY))

  return {
    left: `${clampedX}px`,
    top: `${clampedY}px`,
    zIndex: state.z
  }
}

const togglePower = () => {
  isPoweredOn.value = !isPoweredOn.value
  if (!isPoweredOn.value) {
    openProjects.value = []
  }
}

const openProject = (project: Project) => {
  if (!openProjects.value.find((p) => p.id === project.id)) {
    openProjects.value.push(project)

    if (!windowStates.value[project.id]) {
      const offsetX = (openProjects.value.length - 1) * 30
      const offsetY = (openProjects.value.length - 1) * 30

      windowStates.value[project.id] = {
        x: 100 + offsetX,
        y: 150 + offsetY,
        z: nextZIndex.value++,
        minimized: false,
        maximized: false
      }
    }
  }

  // Bring to front
  if (windowStates.value[project.id]) {
    windowStates.value[project.id].z = nextZIndex.value++
  }
}

const closeProject = (projectId: string) => {
  openProjects.value = openProjects.value.filter((p) => p.id !== projectId)
  delete windowStates.value[projectId]
}

const minimizeWindow = (projectId: string) => {
  const state = windowStates.value[projectId]
  if (state) {
    state.minimized = !state.minimized
  }
}

const maximizeWindow = (projectId: string) => {
  const state = windowStates.value[projectId]
  if (state) {
    state.maximized = !state.maximized
  }
}

const toggleWindowFullscreen = (projectId: string) => {
  if (fullscreenWindowId.value === projectId) {
    fullscreenWindowId.value = null
  } else {
    fullscreenWindowId.value = projectId
  }
}

const toggleMonitorFullscreen = () => {
  monitorFullscreen.value = !monitorFullscreen.value
  
  // Block/unblock scroll on fullscreen
  if (monitorFullscreen.value) {
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.body.style.height = "100vh"
  } else {
    document.documentElement.style.overflow = ""
    document.body.style.overflow = ""
    document.body.style.height = ""
  }
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  })
}

const startDrag = (e: MouseEvent, projectId: string) => {
  if (fullscreenWindowId.value === projectId || !windowStates.value[projectId]) {
    return
  }
  
  dragState.value = {
    projectId,
    startX: e.clientX,
    startY: e.clientY,
    offsetX: windowStates.value[projectId].x,
    offsetY: windowStates.value[projectId].y
  }
  
  document.addEventListener("mousemove", onDragMove)
  document.addEventListener("mouseup", onDragEnd)
}

const onDragMove = (e: MouseEvent) => {
  if (!dragState.value.projectId) return
  
  const state = windowStates.value[dragState.value.projectId]
  if (!state) return
  
  const deltaX = e.clientX - dragState.value.startX
  const deltaY = e.clientY - dragState.value.startY
  
  // Clamp to desktop bounds using actual dimensions
  const bounds = getDesktopBounds()
  const windowWidth = 600
  const windowHeight = 400
  const taskbarHeight = 50
  
  const maxX = Math.max(0, bounds.width - windowWidth)
  const maxY = Math.max(0, bounds.height - windowHeight - taskbarHeight)
  
  const newX = Math.max(0, Math.min(dragState.value.offsetX + deltaX, maxX))
  const newY = Math.max(0, Math.min(dragState.value.offsetY + deltaY, maxY))
  
  state.x = newX
  state.y = newY
}

const onDragEnd = () => {
  dragState.value.projectId = null
  document.removeEventListener("mousemove", onDragMove)
  document.removeEventListener("mouseup", onDragEnd)
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})

// Cleanup overflow when component unmounts
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    document.documentElement.style.overflow = ""
    document.body.style.overflow = ""
    document.body.style.height = ""
  })
}
</script>

<style scoped>
.projects-section {
  width: 100%;
  padding: 6rem 0;
  position: relative;
}

.projects-section.fullscreen-active {
  padding: 0;
  overflow: hidden;
  height: 100vh;
}

.projects-section.fullscreen-active > .container {
  padding: 0;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fade-in-up 1s ease-out;
}

.projects-section.fullscreen-active .section-header {
  display: none;
}

.section-header h2 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #ff6b4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: var(--muted);
  font-size: 1.1rem;
}

/* Desktop Wrapper */
.desktop-wrapper {
  perspective: 1000px;
  animation: scale-in-delay 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.desktop-wrapper.fullscreen-mode {
  position: fixed;
  inset: 80px 0 0 0;
  width: 100%;
  height: calc(100vh - 80px);
  z-index: 9999;
  animation: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.desktop-wrapper.fullscreen-mode .desktop-frame {
  border-radius: 0;
  border: none;
  aspect-ratio: unset;
  height: 100%;
}

.desktop-wrapper.fullscreen-mode .monitor-stand {
  display: none;
}

@keyframes scale-in-delay {
  from {
    opacity: 0;
    transform: scale(0.9) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotateX(0);
  }
}

.desktop-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1e 100%);
  border: 20px solid #1a1a1e;
  border-radius: 20px;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.6s ease;

  &.powered-on {
    box-shadow: 0 50px 100px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

/* Power Button */
.power-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--cyan);
  background: rgba(34, 211, 238, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    border-color: var(--cyan);
    background: rgba(34, 211, 238, 0.2);
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
  }
}

.power-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--muted);
  transition: all 0.3s ease;

  &.active {
    background: #10b981;
    box-shadow: 0 0 15px #10b981;
  }
}

/* Desktop Content */
.desktop-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23020617" width="100" height="100"/><circle cx="50" cy="50" r="1" fill="%2322d3ee" opacity="0.1"/></svg>');
  background-size: 100px 100px;
}

.desktop-grid {
  flex: 1;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  align-content: start;
  overflow-y: auto;
  position: relative;
  z-index: 5;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  pointer-events: auto;

  &:hover {
    border-color: var(--cyan);
    background: rgba(34, 211, 238, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.icon-image {
  width: 100px;
  height: 100px;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.icon-label {
  font-size: 0.75rem;
  text-align: center;
  color: var(--text);
  word-break: break-word;
  font-weight: 600;
}

/* Taskbar */
.desktop-taskbar {
  height: 50px;
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid var(--line-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.taskbar-left,
.taskbar-right {
  display: flex;
  gap: 1rem;
}

.taskbar-icon {
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(34, 211, 238, 0.2);
  }
}

.taskbar-center {
  flex: 1;
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
}

.taskbar-info {
  animation: pulse 1s ease-in-out infinite;
}

.taskbar-time {
  font-size: 0.85rem;
  color: var(--cyan);
  font-weight: 600;
  font-family: "Courier New", monospace;
}

/* Desktop Off */
.desktop-off {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(34, 211, 238, 0.05), transparent);
}

.shutdown-screen {
  text-align: center;
  animation: fade-in 0.6s ease;

  p {
    margin: 0.5rem 0;
    color: rgba(212, 212, 212, 0.6);
    font-size: 1.1rem;
  }

  .text-small {
    font-size: 0.9rem;
    color: var(--muted);
  }
}

/* Monitor Stand */
.monitor-stand {
  width: 60%;
  height: 20px;
  margin: 0 auto -20px;
  background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

/* Fullscreen Button */
.fullscreen-button {
  position: absolute;
  bottom: 20px;
  right: 70px;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 2px solid var(--fuchsia);
  background: rgba(217, 70, 239, 0.1);
  color: var(--fuchsia);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;
  font-size: 1.2rem;

  &:hover {
    background: rgba(217, 70, 239, 0.2);
    box-shadow: 0 0 20px rgba(217, 70, 239, 0.5);
  }
}

.desktop-wrapper.fullscreen-mode .fullscreen-button {
  position: absolute;
}

/* Windows Container - constrained to desktop frame */
.windows-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.window {
  position: absolute;
  width: 600px;
  height: 400px;
  background: rgba(9, 9, 11, 0.95);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  pointer-events: all;
  animation: window-open 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);
}

@keyframes window-open {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.window-titlebar {
  height: 40px;
  background: linear-gradient(to right, rgba(34, 211, 238, 0.1), transparent);
  border-bottom: 1px solid var(--line-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  cursor: move;
  user-select: none;
}

.window-buttons {
  display: flex;
  gap: 0.5rem;
}

.window-btn {
  width: 28px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.25rem;
  color: var(--text);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.minimize:hover {
    background: rgba(34, 211, 238, 0.3);
  }

  &.maximize:hover {
    background: rgba(217, 70, 239, 0.3);
  }

  &.fullscreen:hover {
    background: rgba(16, 185, 129, 0.3);
  }

  &.close:hover {
    background: rgba(239, 68, 68, 0.3);
  }
}

.window-title {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Window Content */
.window-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.project-showcase {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
}

.project-showcase-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.project-info h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--text);
}

/* Project Sections */
.project-section {
  margin: 0.75rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(34, 211, 238, 0.2);
}

.project-section:last-child {
  border-bottom: none;
}

.section-label {
  display: block;
  color: var(--cyan);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.tech-stack {
  margin: 0;
  color: var(--cyan);
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.4;
}

.description {
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.9rem;
}

.impact-text {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

.stat {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--muted);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(34, 211, 238, 0.2);
  border: 1px solid var(--cyan);
  border-radius: 2rem;
  color: var(--cyan);
  font-size: 0.75rem;
  font-weight: 600;
}

.project-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--cyan);
  color: var(--bg);
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #06b6d4;
    transform: translateY(-2px);
  }
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

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

/* Responsive */
@media (max-width: 1024px) {
  .window {
    width: calc(100vw - 2rem);
    height: 60vh;
  }

  .project-showcase {
    grid-template-columns: 1fr;

    img {
      height: 200px;
    }
  }
}

.window-enter-active,
.window-leave-active {
  transition: all 0.3s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
