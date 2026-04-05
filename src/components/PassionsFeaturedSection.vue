<template>
  <div class="passions-section" data-section="passions">
    <div class="container">
      <!-- Section Header with animated line -->
      <div class="passions-header">
        <div class="header-line"></div>
        <h2>Mes Passions</h2>
        <div class="header-line"></div>
      </div>

      <div class="passions-grid">
      <!-- Running Card with Strava Link -->
      <div class="passion-card running-card" @mouseenter="hoveredCard = 'running'" @mouseleave="hoveredCard = null">
        <div class="card-background">
          <div class="card-blur"></div>
        </div>

        <div class="card-content">
          <div class="card-animation">
            <img src="https://images.pexels.com/photos/5961837/pexels-photo-5961837.jpeg?auto=compress&cs=tinysrgb&w=200&fit=max" alt="Course à Pied" />
          </div>

          <h3>Course à Pied</h3>
          <p class="passion-description">
            Athlète passionné par la course longue distance et l'amélioration continue des performances
          </p>

          <div class="passion-links">
            <a href="https://www.strava.com/athlete/training?sport_type=Run" target="_blank" rel="noopener noreferrer" class="link-button">
              Voir sur Strava
              <span class="link-arrow">→</span>
            </a>
          </div>
        </div>

        <div :class="['card-hover-effect', { active: hoveredCard === 'running' }]"></div>
      </div>

        <!-- Powerlifting Card -->
        <div class="passion-card lifting-card" @mouseenter="hoveredCard = 'lifting'" @mouseleave="hoveredCard = null">
          <div class="card-background">
            <div class="card-blur"></div>
          </div>

          <div class="card-content">
            <div class="card-animation">
              <img src="https://images.pexels.com/photos/4720793/pexels-photo-4720793.jpeg?auto=compress&cs=tinysrgb&w=200&fit=max" alt="Powerlifting" />
            </div>

            <h3>Powerlifting</h3>
            <p class="passion-description">
              Compétiteur sérieux avec des records personnels impressionnants dans les trois mouvements
            </p>

            <div class="passion-links">
              <a href="https://hevy.com/profile" target="_blank" rel="noopener noreferrer" class="link-button hevy-button">
                <img src="/logos/hevy.png" alt="Hevy" class="link-button-icon" />
                Voir sur Hevy
                <span class="link-arrow">→</span>
              </a>
            </div>
          </div>

          <div :class="['card-hover-effect', { active: hoveredCard === 'lifting' }]"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { SportData } from "@/types"

const props = defineProps<{
  sportData: SportData
}>()

const hoveredCard = ref<"running" | "lifting" | null>(null)
</script>

<style scoped>
.passions-section {
  width: 100%;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 107, 74, 0.03) 100%);
}

.container {
  position: relative;
  z-index: 1;
}

/* Section Header */
.passions-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  animation: fade-in-up 1s ease-out;
}

.passions-header h2 {
  font-size: 3rem;
  margin: 0;
  color: #ffffff;
  white-space: nowrap;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 107, 74, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(255, 107, 74, 0.6), transparent);
  box-shadow: 0 0 20px rgba(255, 107, 74, 0.3);
}

/* Passion Cards Grid */
.passions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
  animation: fade-in-up 1s ease-out 0.2s both;
}

.passion-card {
  position: relative;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.7) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 74, 0.15);
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: card-entrance 0.6s ease-out backwards;

  &:nth-child(1) {
    animation-delay: 0.3s;
  }

  &:nth-child(2) {
    animation-delay: 0.5s;
  }
}

@keyframes card-entrance {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(20deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

.card-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.card-blur {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 107, 74, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.passion-card:hover {
  border-color: rgba(255, 107, 74, 0.4);
  transform: translateY(-12px);
  box-shadow: 0 30px 80px rgba(255, 107, 74, 0.25), 0 0 60px rgba(255, 107, 74, 0.1);
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.8) 100%);

  .card-blur {
    opacity: 1;
  }
}

.passion-card.lifting-card:hover {
  box-shadow: 0 20px 60px rgba(255, 107, 74, 0.15);
}

/* Card Content */
.card-content {
  position: relative;
  z-index: 1;
}

.card-header-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.platform-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 107, 74, 0.15);
  border: 1px solid rgba(255, 107, 74, 0.3);
  border-radius: 0.5rem;
  color: #ff6b4a;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 800;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 107, 74, 0.3);
    border-color: #ff6b4a;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(255, 107, 74, 0.2);
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(1.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.card-animation {
  font-size: 80px;
  margin-bottom: 1rem;
  display: inline-block;
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.9) saturate(1.1);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  svg {
    width: 100%;
    height: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 107, 74, 0.15) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
}

.passion-card:hover .card-animation img {
  filter: brightness(1.1) saturate(1.2);
  transform: scale(1.05);
}

.card-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  color: #ff6b4a;
  animation: icon-float 3s ease-in-out infinite;
}

@keyframes icon-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.passion-card.lifting-card .card-icon {
  color: #ff6b4a;
}

.card-content h3 {
  font-size: 1.75rem;
  margin: 0.5rem 0 1rem 0;
  font-weight: 700;
  color: #ffffff;
}

.passion-description {
  margin: 0 0 1.5rem 0;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Passion Stats */
.passion-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 900;
  color: #ff6b4a;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

/* Animated Links */
.passion-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.link-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.2) 0%, rgba(255, 107, 74, 0.08) 100%);
  border: 1.5px solid rgba(255, 107, 74, 0.4);
  border-radius: 0.75rem;
  color: #ff6b4a;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 107, 74, 0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(255, 107, 74, 0.3) 0%, rgba(255, 107, 74, 0.15) 100%);
    border-color: #ff6b4a;
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(255, 107, 74, 0.25);

    &::before {
      left: 100%;
    }

    .link-arrow {
      transform: translateX(4px);
    }
  }
}

.link-button-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(1.2);
}

.link-arrow {
  transition: transform 0.3s ease;
}

.link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(255, 107, 74, 0.08);
  border: 1px solid rgba(255, 107, 74, 0.2);
  border-radius: 0.5rem;
  color: #ff6b4a;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 107, 74, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(255, 107, 74, 0.15);
    border-color: #ff6b4a;
    transform: translateX(4px);
    box-shadow: 0 10px 20px rgba(255, 107, 74, 0.15);

    &::before {
      left: 100%;
    }
  }

  &:hover .link-arrow {
    transform: translateX(4px);
  }
}

.passion-card.lifting-card .link-item {
  background: rgba(255, 107, 74, 0.08);
  border-color: rgba(255, 107, 74, 0.2);
  color: #ff6b4a;

  &:hover {
    background: rgba(255, 107, 74, 0.15);
    border-color: #ff6b4a;
    box-shadow: 0 10px 20px rgba(255, 107, 74, 0.15);
  }
}

.card-hover-effect {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;

  &.active {
    opacity: 1;
  }
}

/* Runs Carousel - REMOVED */

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

/* Responsive */
@media (max-width: 768px) {
  .passions-header {
    flex-direction: column;
    gap: 1rem;
  }

  .header-line {
    width: 100%;
  }

  .passions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
