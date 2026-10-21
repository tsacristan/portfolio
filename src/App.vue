<template>
  <Header :profile="appData.profile" :tabs="tabs" :active-tab="activeTab" @navigate="scrollToSection" />

  <main>
    <HeroSection id="hero" :profile="appData.profile" :tech-stack="appData.techStack" @navigate="scrollToSection" />
    <ProjectsSection id="projects" :projects="appData.projects" :competences="appData.competences" />
    <CompetencesSection id="competences" :competences="appData.competences" :projects="appData.projects" />
    <PassionsFeaturedSection id="passions" :sport-data="appData.sport" />
    <ContactSection id="contact" :profile="appData.profile" />
  </main>

  <Footer :profile="appData.profile" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useSmoothMotion } from "@/composables/useSmoothMotion"
import type { Tab } from "@/types"
import { appData } from "@/utils/data"

import Header from "@/components/Header.vue"
import HeroSection from "@/components/HeroSection.vue"
import ProjectsSection from "@/components/ProjectsSection.vue"
import CompetencesSection from "@/components/CompetencesSection.vue"
import PassionsFeaturedSection from "@/components/PassionsFeaturedSection.vue"
import ContactSection from "@/components/ContactSection.vue"
import Footer from "@/components/Footer.vue"

const tabs: Tab[] = [
  { id: "hero", label: "Identité" },
  { id: "projects", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "passions", label: "Hors écran" },
  { id: "contact", label: "Contact" }
]

const activeTab = ref<string>("hero")
const { setupSmoothMotion } = useSmoothMotion()

let sectionObserver: IntersectionObserver | null = null

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

onMounted(() => {
  setupSmoothMotion()

  // Met à jour l'onglet actif selon la section au milieu de l'écran
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeTab.value = entry.target.id
      })
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  )

  tabs.forEach((tab) => {
    const section = document.getElementById(tab.id)
    if (section) sectionObserver?.observe(section)
  })
})

onUnmounted(() => {
  sectionObserver?.disconnect()
})
</script>

<style>
@import url("@/styles/globals.css");
</style>
