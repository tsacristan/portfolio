<template>
  <section class="chapter">
    <div class="page">
      <header class="chapter-head" data-reveal>
        <span class="chapter-index">§05 — Contact</span>
        <div>
          <h2 class="chapter-title">Travaillons ensemble</h2>
          <p class="chapter-lead">Stage, alternance ou projet : écrivez-moi.</p>
        </div>
      </header>

      <div class="contact-grid">
        <ul class="channels" data-reveal>
          <li>
            <a :href="`mailto:${profile.email}`" class="channel">
              <span class="meta">Email</span>
              <span class="channel-value">{{ profile.email }}</span>
              <span class="channel-arrow" aria-hidden="true">→</span>
            </a>
          </li>
          <li>
            <a :href="profile.github" target="_blank" rel="noreferrer" class="channel">
              <span class="meta">GitHub</span>
              <span class="channel-value">@{{ githubHandle }}</span>
              <span class="channel-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li v-if="profile.linkedin">
            <a :href="profile.linkedin" target="_blank" rel="noreferrer" class="channel">
              <span class="meta">LinkedIn</span>
              <span class="channel-value">Profil professionnel</span>
              <span class="channel-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a :href="profile.cv" target="_blank" rel="noreferrer" download class="channel">
              <span class="meta">CV</span>
              <span class="channel-value">Télécharger le PDF</span>
              <span class="channel-arrow" aria-hidden="true">↓</span>
            </a>
          </li>
          <li>
            <div class="channel">
              <span class="meta">Basé à</span>
              <span class="channel-value">{{ profile.location }}</span>
            </div>
          </li>
        </ul>

        <form class="form" data-reveal @submit.prevent="submitForm">
          <label class="field">
            <span class="meta">Nom</span>
            <input v-model="form.name" type="text" autocomplete="name" required />
          </label>
          <label class="field">
            <span class="meta">Email</span>
            <input v-model="form.email" type="email" autocomplete="email" required />
          </label>
          <label class="field">
            <span class="meta">Message</span>
            <textarea v-model="form.message" rows="5" required></textarea>
          </label>
          <button type="submit" class="btn btn-signal" :disabled="isSubmitting">
            {{ isSubmitting ? "Envoi…" : "Envoyer" }} <span aria-hidden="true">→</span>
          </button>
          <p v-if="submitMessage" :class="['form-status', { success: isSuccess }]" role="status">
            {{ submitMessage }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import type { Profile } from "@/types"

interface Props {
  profile: Profile
}

const props = defineProps<Props>()

const githubHandle = computed(() => props.profile.github.split("/").filter(Boolean).pop())

const form = ref({
  name: "",
  email: "",
  message: ""
})

const isSubmitting = ref(false)
const submitMessage = ref("")
const isSuccess = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  submitMessage.value = ""

  try {
    const response = await fetch("https://formspree.io/f/xlgooybz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        _subject: `Nouveau message de ${form.value.name}`
      })
    })

    if (response.ok) {
      submitMessage.value = "Message envoyé. Merci !"
      isSuccess.value = true
      form.value = { name: "", email: "", message: "" }
      setTimeout(() => {
        submitMessage.value = ""
      }, 5000)
    } else {
      submitMessage.value = "Erreur lors de l'envoi. Réessayez."
      isSuccess.value = false
    }
  } catch (error) {
    submitMessage.value = "Erreur de connexion. Réessayez."
    isSuccess.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 4rem;
  align-items: start;
}

.channels {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--rule-strong);
}

.channel {
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--rule);
}

a.channel:hover .channel-value {
  color: var(--signal);
}

a.channel:hover .channel-arrow {
  transform: translateX(4px);
}

.channel-value {
  font-size: 1.05rem;
  overflow-wrap: anywhere;
  transition: color 0.15s ease;
}

.channel-arrow {
  font-family: var(--font-mono);
  color: var(--muted);
  transition: transform 0.15s ease;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.8rem;
  border: 1px solid var(--rule-strong);
  background: var(--ink-2);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field input,
.field textarea {
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--rule-strong);
  border-radius: 0;
  background: var(--ink);
  color: var(--paper);
  font: inherit;
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--signal);
}

.form .btn {
  align-self: flex-start;
}

.form .btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.form-status {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--alert);
}

.form-status.success {
  color: var(--signal);
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
