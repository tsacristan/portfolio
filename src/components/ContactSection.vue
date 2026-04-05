<template>
  <div class="section reveal-ready">
    <div class="contact-container">
      <h2>Prêt à travailler ensemble?</h2>
      <p class="contact-subtitle">
        Je serais ravi de discuter de vos projets, collaborier ou explorer de nouvelles opportunités.
      </p>

      <div class="contact-grid">
        <!-- Contact Methods -->
        <div class="contact-methods">
          <a :href="`mailto:${profile.email}`" class="contact-card">
            <div class="contact-icon">
              ✉️
            </div>
            <h3>Email</h3>
            <p>{{ profile.email }}</p>
          </a>

          <a :href="profile.github" target="_blank" rel="noreferrer" class="contact-card">
            <div class="contact-icon">
              🐙
            </div>
            <h3>GitHub</h3>
            <p>@tsacristan</p>
          </a>

          <a :href="profile.linkedin" target="_blank" rel="noreferrer" class="contact-card">
            <div class="contact-icon">
              💼
            </div>
            <h3>LinkedIn</h3>
            <p>Professeur professionnel</p>
          </a>

          <div class="contact-card">
            <div class="contact-icon">
              📍
            </div>
            <h3>Localisation</h3>
            <p>{{ profile.location }}</p>
          </div>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Votre nom"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="Votre email"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <textarea 
              v-model="form.message" 
              placeholder="Votre message..."
              rows="4"
              required
              class="form-input"
            ></textarea>
          </div>
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
          </button>
          <p v-if="submitMessage" :class="['submit-message', { success: isSuccess }]">
            {{ submitMessage }}
          </p>
        </form>
      </div>

      <div class="cv-section">
        <a :href="profile.cv" target="_blank" class="btn-cv">
          📄 Télécharger CV Complet
        </a>
      </div>

      <!-- Social Links -->
      <div class="social-links">
        <a :href="`mailto:${profile.email}`" class="social-icon" :title="`Email: ${profile.email}`">
          ✉️
        </a>
        <a :href="profile.github" target="_blank" rel="noreferrer" class="social-icon" title="GitHub">
          🐙
        </a>
        <a :href="profile.linkedin" target="_blank" rel="noreferrer" class="social-icon" title="LinkedIn">
          💼
        </a>
        <div class="social-icon location-info">
          📍 {{ profile.location }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Profile } from "@/types"

interface Props {
  profile: Profile
}

defineProps<Props>()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const isSuccess = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/xlgooybz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        _subject: `Nouveau message de ${form.value.name}`,
      }),
    })

    if (response.ok) {
      submitMessage.value = '✅ Message envoyé avec succès!'
      isSuccess.value = true
      form.value = { name: '', email: '', message: '' }
      setTimeout(() => {
        submitMessage.value = ''
      }, 5000)
    } else {
      submitMessage.value = '❌ Erreur lors de l\'envoi. Réessayez.'
      isSuccess.value = false
    }
  } catch (error) {
    submitMessage.value = '❌ Erreur de connexion. Réessayez.'
    isSuccess.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.section {
  width: 100%;
  padding: 6rem 2rem;
  background: #0a0a0a;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: fade-in-up 0.8s ease-out forwards;
}

.contact-container h2 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #ff6b4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  animation: fade-in-up 0.8s ease-out 0.1s forwards;
  opacity: 0;
}

.contact-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 4rem;
  animation: fade-in-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  animation: fade-in-up 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  align-content: start;
}

.contact-card {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.15) 0%, rgba(255, 107, 74, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 107, 74, 0.25);
  border-radius: 2rem;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}

.contact-card:hover::before {
  left: 100%;
}

.contact-card:hover {
  border-color: rgba(255, 107, 74, 0.6);
  transform: translateY(-12px);
  box-shadow: 0 30px 70px rgba(255, 107, 74, 0.25), 0 0 50px rgba(255, 107, 74, 0.1);
}

.contact-card h3 {
  font-size: 1.25rem;
  margin: 1rem 0 0.5rem;
  color: #ffffff;
}

.contact-card p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  word-break: break-word;
}

.contact-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.2) 0%, rgba(255, 107, 74, 0.1) 100%);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 107, 74, 0.3);
  font-size: 2.5rem;
  color: #ff6b4a;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact-card:hover .contact-icon {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 15px 40px rgba(255, 107, 74, 0.3);
  border-color: rgba(255, 107, 74, 0.5);
}

/* Contact Form */
.contact-form {
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.1) 0%, rgba(255, 107, 74, 0.03) 100%);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 107, 74, 0.25);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 1rem 1.25rem;
  background: rgba(26, 26, 26, 0.8);
  border: 1.5px solid rgba(255, 107, 74, 0.2);
  border-radius: 1.25rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 107, 74, 0.6);
  background: rgba(26, 26, 26, 1);
  box-shadow: 0 0 20px rgba(255, 107, 74, 0.2);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.btn-submit {
  padding: 1.125rem 2rem;
  background: linear-gradient(135deg, #ff6b4a 0%, #ff5533 100%);
  border: none;
  border-radius: 1.25rem;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(255, 107, 74, 0.3);
}

.btn-submit::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(255, 107, 74, 0.4);
}

.btn-submit:hover:not(:disabled)::before {
  left: 100%;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  background: rgba(255, 107, 74, 0.1);
  border: 1px solid rgba(255, 107, 74, 0.3);
  color: #ff6b4a;
}

.submit-message.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

/* CV Section */
.cv-section {
  text-align: center;
}

.btn-cv {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.15) 0%, rgba(255, 107, 74, 0.05) 100%);
  border: 2px solid rgba(255, 107, 74, 0.4);
  border-radius: 1.5rem;
  color: #ff6b4a;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 40px rgba(255, 107, 74, 0.2);
}

.btn-cv::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 74, 0.2), transparent);
  transition: left 0.6s ease;
}

.btn-cv:hover {
  border-color: rgba(255, 107, 74, 0.7);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(255, 107, 74, 0.3);
  color: #ff5533;
}

.btn-cv:hover::before {
  left: 100%;
}

/* Social Links */
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1.5px solid rgba(255, 107, 74, 0.2);
  animation: fade-in-up 0.8s ease-out 0.5s both;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.15) 0%, rgba(255, 107, 74, 0.05) 100%);
  border: 1.5px solid rgba(255, 107, 74, 0.3);
  border-radius: 1rem;
  color: #ff6b4a;
  font-size: 1.8rem;
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  line-height: 1;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.social-icon:hover {
  border-color: rgba(255, 107, 74, 0.6);
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.25) 0%, rgba(255, 107, 74, 0.1) 100%);
  transform: translateY(-8px) scale(1.1);
  box-shadow: 0 15px 40px rgba(255, 107, 74, 0.3);
  color: #ff5533;
}

.social-icon:hover::before {
  left: 100%;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: auto;
  padding: 0 1rem;
  font-size: 0.95rem;
  cursor: default;
}

.location-info:hover {
  transform: scale(1.05);
  border-color: rgba(255, 107, 74, 0.4);
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.2) 0%, rgba(255, 107, 74, 0.08) 100%);
}

/* Animations */
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

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: 4rem 1.5rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-methods {
    grid-template-columns: 1fr 1fr;
  }

  .contact-container h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 3rem 1rem;
  }

  .contact-methods {
    grid-template-columns: 1fr;
  }

  .contact-card {
    padding: 1.5rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .contact-icon {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .btn-cv {
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }

  .social-links {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .social-icon {
    width: 45px;
    height: 45px;
    font-size: 1.25rem;
  }

  .location-info {
    padding: 0 0.75rem;
    font-size: 0.85rem;
  }
}
</style>
