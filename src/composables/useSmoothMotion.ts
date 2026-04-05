import { onMounted, ref } from "vue"

export function useSmoothMotion() {
  let revealObserver: IntersectionObserver | null = null

  const setupSmoothMotion = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("revealed")
            revealObserver?.unobserve(entry.target)
          })
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
      )
    }

    const panelSelectors = [
      ".section",
      ".project-preview",
      ".long-project-card",
      ".skill-card",
      ".power-pr-card",
      ".run-track-card"
    ]
    const targets = document.querySelectorAll(panelSelectors.join(", "))

    targets.forEach((target, index) => {
      if (!target.classList.contains("reveal-ready")) {
        target.classList.add("reveal-ready")
        ;(target as HTMLElement).style.setProperty(
          "--reveal-delay",
          `${Math.min(index * 38, 320)}ms`
        )
      }
      revealObserver?.observe(target)
    })
  }

  return { setupSmoothMotion }
}
