<template>
  <div id="app" class="app">
    <div class="bg-grid bg-grid-small"></div>
    <div class="bg-grid bg-grid-large"></div>

    <Header :profile="appData.profile" :tabs="tabs" :active-tab="activeTab" @navigate="scrollToSection" />

    <!-- Hero Section -->
    <section id="hero" class="page-section">
      <HeroSection :profile="appData.profile" />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="page-section">
      <DesktopProjectsSection :app-data="appData" />
    </section>

    <!-- Competences Section -->
    <section id="competences" class="page-section">
      <CompetencesSection :competences="appData.competences" :skills="appData.skills" :projects="appData.projects" />
    </section>

    <!-- Passions Section -->
    <section id="passions" class="page-section">
      <PassionsFeaturedSection :sport-data="appData.sport" />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="page-section">
      <ContactSection :profile="appData.profile" />
    </section>

    <Footer :profile="appData.profile" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useSmoothMotion } from "@/composables/useSmoothMotion"
import type { Tab } from "@/types"
import { appData } from "@/utils/data"

import Header from "@/components/Header.vue"
import HeroSection from "@/components/HeroSection.vue"
import DesktopProjectsSection from "@/components/DesktopProjectsSection.vue"
import CompetencesSection from "@/components/CompetencesSection.vue"
import PassionsFeaturedSection from "@/components/PassionsFeaturedSection.vue"
import ContactSection from "@/components/ContactSection.vue"
import Footer from "@/components/Footer.vue"

const tabs: Tab[] = [
  { id: "hero", label: "Accueil" },
  { id: "projects", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "passions", label: "Mes passions" },
  { id: "contact", label: "Contact" }
]

const activeTab = ref<string>("hero")
const { setupSmoothMotion } = useSmoothMotion()

let intersectionObserver: IntersectionObserver | null = null

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

onMounted(() => {
  // Setup smooth motion animations for all elements
  setupSmoothMotion()

  // Create Intersection Observer to track which section is in view
  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0
  }

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeTab.value = entry.target.id
      }
    })
  }, observerOptions)

  // Observe all sections
  const sections = document.querySelectorAll("section[id]")
  sections.forEach((section) => {
    intersectionObserver?.observe(section)
  })
})

onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

#app {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.bg-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.02;
  background-image: linear-gradient(var(--cyan) 1px, transparent 1px),
    linear-gradient(90deg, var(--cyan) 1px, transparent 1px);
}

.bg-grid-small {
  background-size: 40px 40px;
}

.bg-grid-large {
  opacity: 0.01;
  background-size: 200px 200px;
}

.page-section {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<style>
@import url("@/styles/globals.css");
</style>
