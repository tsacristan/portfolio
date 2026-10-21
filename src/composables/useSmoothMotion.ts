// Fait apparaître les éléments [data-reveal] quand ils entrent dans l'écran
export function useSmoothMotion() {
  let revealObserver: IntersectionObserver | null = null

  const setupSmoothMotion = () => {
    const targets = document.querySelectorAll("[data-reveal]")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("revealed"))
      return
    }

    revealObserver ??= new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("revealed")
          revealObserver?.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    targets.forEach((target) => revealObserver?.observe(target))
  }

  return { setupSmoothMotion }
}
