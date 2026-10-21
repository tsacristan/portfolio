<template>
  <footer class="footer">
    <div class="page">
      <p class="wordmark" aria-hidden="true">{{ lastName }}</p>
      <div class="footer-inner">
        <p class="meta">© {{ year }} {{ profile.name }} — {{ profile.role }}</p>
        <button type="button" class="meta back-top" @click="scrollTop">Retour en haut ↑</button>
        <p class="meta">Fin du document</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Profile } from "@/types"

interface Props {
  profile: Profile
}

const props = defineProps<Props>()

const year = new Date().getFullYear()
const lastName = props.profile.name.split(" ").pop()

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--rule-strong);
  overflow: hidden;
}

/* Signature géante en contour */
.wordmark {
  margin: 2rem 0 -0.18em;
  font-family: var(--font-display);
  font-size: clamp(4rem, 17vw, 15rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 1px var(--rule-strong);
  user-select: none;
  transition: -webkit-text-stroke-color 0.4s ease;
}

.footer:hover .wordmark {
  -webkit-text-stroke-color: var(--signal);
}

.footer-inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--rule);
  background: var(--ink);
}

.back-top {
  transition: color 0.15s ease;
}

.back-top:hover {
  color: var(--signal);
}
</style>
