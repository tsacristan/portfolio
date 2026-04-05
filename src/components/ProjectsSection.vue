<template>
  <section class="section reveal-ready">
    <h2>Mes Projets</h2>
    <div class="projects-grid">
      <article v-for="project in projects" :key="project.id" class="project-card reveal-ready">
        <img :src="project.image" :alt="project.title" class="project-image" />
        <div class="project-content">
          <div class="project-header">
            <span class="project-id">{{ project.id }}</span>
            <h3 class="project-title">{{ project.title }}</h3>
          </div>
          <p class="project-tech">{{ project.tech }}</p>
          <p class="project-desc">{{ project.desc }}</p>
          <a :href="project.github" target="_blank" rel="noreferrer" class="project-link">
            Voir le projet →
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from "@/types"

interface Props {
  projects: Project[]
}

defineProps<Props>()
</script>

<style scoped>
.section {
  width: 100%;
  padding: 6rem 2rem;
  background: #0a0a0a;
}

.section h2 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin: 0 0 3rem 0;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #ff6b4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  animation: fade-in-up 0.8s ease-out;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  border: 1.5px solid rgba(255, 107, 74, 0.25);
  border-radius: 2rem;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.08) 0%, rgba(255, 107, 74, 0.02) 100%);
  backdrop-filter: blur(10px);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.project-card:hover {
  border-color: rgba(255, 107, 74, 0.6);
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.15) 0%, rgba(255, 107, 74, 0.05) 100%);
  transform: translateY(-12px);
  box-shadow: 0 30px 70px rgba(255, 107, 74, 0.25), 0 0 50px rgba(255, 107, 74, 0.1);
}

.project-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: all 0.35s ease;
  filter: brightness(0.95);
}

.project-card:hover .project-image {
  filter: brightness(1.1) contrast(1.1);
}

.project-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.project-id {
  display: inline-block;
  min-width: 2.5rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.2) 0%, rgba(255, 107, 74, 0.1) 100%);
  border: 1.5px solid rgba(255, 107, 74, 0.4);
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.875rem;
  color: #ff6b4a;
  text-align: center;
}

.project-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
}

.project-tech {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.project-desc {
  margin: 0;
  flex-grow: 1;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff6b4a;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  width: fit-content;
  position: relative;
}

.project-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #ff6b4a;
  transition: width 0.35s ease;
}

.project-link:hover {
  gap: 1rem;
  color: #ff5533;
}

.project-link:hover::after {
  width: 100%;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .section {
    padding: 4rem 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .section h2 {
    font-size: 2rem;
  }

  .project-card {
    border-radius: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 3rem 1rem;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-image {
    height: 180px;
  }
}
</style>
