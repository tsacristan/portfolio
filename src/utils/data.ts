import type { AppData } from "@/types"

export const appData: AppData = {
  profile: {
    name: "Thurian Sacristan",
    role: "Étudiant BUT Informatique",
    tagline: "Développement Logiciel // Athlète Hybride // Optimisation de Systèmes",
    email: "thuriansacristan@gmail.com",
    location: "Bretagne, Rennes",
    github: "https://github.com/tsacristan",
    linkedin: "#",
    cv: "./CV_Sacristan_Thurian.pdf"
  },

  techStack: [
    "Java",
    "Python",
    "SQL",
    "JavaScript",
    "HTML",
    "CSS",
    "C#",
    ".NET MAUI",
    "GitHub",
    "GitKraken",
    "Azure Data Studio",
    "Linux"
  ],

  projects: [
    {
      id: "01",
      title: "Moteur de Jeux (Java)",
      tech: "Java / Algorithmique",
      desc: "Développement complet d'un Lattice et d'un Scrabble avec logique métier et UI.",
      longDesc:
        "Conception d'un moteur de jeux Java structuré en POO avec implémentation de classes métier, gestion des tours et interfaces utilisateur cohérentes.",
      impact: "Architecture modulaire et réutilisable pour multiples jeux.",
      status: "Running_Stable",
      github: "https://github.com/tsacristan/latice",
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&h=400&fit=crop",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Conception architecture en POO", "Implémentation des règles métier", "Tests unitaires"],
          deliverables: ["Code source sur GitHub", "Architecture UML", "Documentation de l'API"]
        },
        {
          code: "C2",
          level: 3,
          role: ["Implémentation d'algorithmes de jeu", "Optimisation des structures de données"],
          deliverables: ["Classes métier optimisées", "Analyse de complexité"]
        }
      ]
    },
    {
      id: "02",
      title: "PisTask - Gestion de Tâches",
      tech: "Kotlin / Mobile",
      desc: "Application mobile de gestion de tâches développée en Kotlin avec architecture MVVM.",
      longDesc:
        "Application Android native avec interface moderne pour la gestion et suivi de tâches. Architecture MVVM, intégration Room DB pour persistance locale.",
      impact: "Maîtrise du développement mobile natif et des patterns architecturaux modernes.",
      status: "Running_Stable",
      github: "https://github.com/tsacristan/PisTask",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Développement frontend mobile", "Gestion du cycle de vie Android", "Tests d'UI"],
          deliverables: ["APK fonctionnelle", "Code source Kotlin", "Tests instrumentation"]
        },
        {
          code: "C4",
          level: 2,
          role: ["Modélisation des entités Room", "Requêtes persistance locale"],
          deliverables: ["Schéma Room DB", "Migrations DB"]
        }
      ]
    },
    {
      id: "03",
      title: "Netflix Clone",
      tech: "JavaScript / Frontend",
      desc: "Clone de l'interface Netflix avec navigation et contenu dynamique.",
      longDesc:
        "Interface web reproduisant l'expérience Netflix avec système de navigation fluide, gestion de contenu dynamique et design responsive.",
      impact: "Maîtrise du JavaScript moderne et création d'interfaces complexes et performantes.",
      status: "Running_Stable",
      github: "https://github.com/tsacristan/netflix-project",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Développement frontend", "Intégration API externe", "Gestion d'état"],
          deliverables: ["Code source GitHub", "Site web déployé", "Documentation"]
        },
        {
          code: "C2",
          level: 2,
          role: ["Optimisation des performances", "Rendu optimisé des listes"],
          deliverables: ["Lighthouse scores", "Audit performance"]
        }
      ]
    },
    {
      id: "04",
      title: "RomanApp - Application Mobile",
      tech: "C# / .NET MAUI",
      desc: "Application mobile multiplateforme développée avec .NET MAUI.",
      longDesc:
        "Application mobile cross-platform utilisant C# et .NET MAUI pour fonctionner sur iOS et Android. Architecture moderne avec MVVM pattern et gestion d'état optimisée.",
      impact: "Développement mobile multiplateforme avec un seul codebase cross-platform.",
      status: "Running_Stable",
      github: "https://github.com/RomanJ07/RomanApp.git",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Développement mobile multiplateforme", "Architecture MVVM", "UI/UX cross-platform"],
          deliverables: ["Code source GitHub", "Applications iOS/Android", "Documentation technique"]
        },
        {
          code: "C2",
          level: 2,
          role: ["Optimisation performance mobile", "Gestion mémoire"],
          deliverables: ["Profiling performance", "Analyse d'optimisation"]
        }
      ]
    },
    {
      id: "05",
      title: "Vytre",
      tech: "Vue 3 / Express / Prisma / TypeScript",
      desc: "Éditeur de procédures opérationnelles avec mode lecteur, drag & drop et gestion multimédia.",
      longDesc:
        "Application fullstack moderne pour créer et gérer des documents opérationnels structurés. Mode éditeur avec TipTap (formatage riche), drag & drop fluide, gestion d'images (crop/zoom), mode lecteur optimisé. Frontend: Vue 3 Composition + Pinia, Backend: Express + Prisma, validation Zod complète.",
      impact: "Architecture fullstack type-safe avec validation robuste, interface intuitive et gestion multimédia avancée.",
      status: "Running_Stable",
      github: "https://github.com/Lamazaii/vytre",
      image: "/src/assets/images/vytre.png",
      competencies: [
        {
          code: "C1",
          level: 4,
          role: ["Architecture fullstack", "Conception API REST", "Implémentation features complexes"],
          deliverables: ["Code source complet", "API documentation Swagger", "Tests Jest/Vitest", "Déploiement"]
        },
        {
          code: "C2",
          level: 3,
          role: ["Optimisation requêtes DB", "Algorithmes drag & drop", "Gestion état Pinia"],
          deliverables: ["Schéma Prisma optimisé", "Benchmarks performance"]
        },
        {
          code: "C4",
          level: 4,
          role: ["Modélisation BD Prisma", "Migrations et relations", "Requêtes complexes"],
          deliverables: ["Schéma Prisma complet", "Scripts migrations", "Documentation DB"]
        },
        {
          code: "C6",
          level: 3,
          role: ["Gestion de version Git", "Commits documentés", "Collaboration"],
          deliverables: ["Historique Git propre", "Branches organisées", "Documentation README complète"]
        }
      ]
    }
  ],

  skills: [
    { icon: "cpu", label: "Architecture", val: "90%" },
    { icon: "database", label: "Backend", val: "88%" },
    { icon: "globe", label: "Frontend", val: "84%" },
    { icon: "server", label: "Systèmes", val: "87%" }
  ],

  competences: {
    pnLink:
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licenceprofessionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf",
    items: [
      {
        code: "C1",
        title: "Réaliser un développement d'application",
        indicator: "Concevoir / coder / tester une application",
        level: 3,
        evidence: "TP, SAE, projet web"
      },
      {
        code: "C2",
        title: "Optimiser des applications",
        indicator: "Mettre en œuvre des algos, choisir structures de données",
        level: 2,
        evidence: "Algo, POO, projet perso"
      },
      {
        code: "C3",
        title: "Administrer des systèmes",
        indicator: "Installer, configurer un OS, sécurisation",
        level: 2,
        evidence: "TP systèmes, projet Docker"
      },
      {
        code: "C4",
        title: "Gérer des données",
        indicator: "Modéliser, interroger, administrer une BD",
        level: 3,
        evidence: "SAE SQL, projet PHP"
      },
      {
        code: "C5",
        title: "Conduire un projet",
        indicator: "Méthode Agile, gestion de planning, communication",
        level: 2,
        evidence: "Projet tuteuré"
      },
      {
        code: "C6",
        title: "Collaborer",
        indicator: "Travail d'équipe, Git, communication",
        level: 3,
        evidence: "Projet en groupe"
      }
    ],
    levels: [
      { level: 1, title: "Initiation", description: "Je découvre, j'ai besoin d'être guidé." },
      { level: 2, title: "Maîtrise partielle", description: "Je sais faire avec aides ou exemples." },
      { level: 3, title: "Autonomie", description: "Je sais faire seul, je comprends les enjeux." },
      { level: 4, title: "Maîtrise avancée", description: "Je peux expliquer, améliorer, adapter." }
    ],
    evidenceExample: {
      target: "Compétence ciblée : C4 – Gérer des données de l'information",
      project: "SAE 2.04 – Conception et interrogation d'une base SQL",
      description: [
        "Conception d'une BD pour gérer des réservations de salles.",
        "Application des normalisations (1NF à 3NF).",
        "Implémentation sous MySQL."
      ],
      role: [
        "Création du MCD + MLD",
        "Rédaction des requêtes SQL complexes (jointures + agrégations)",
        "Tests et optimisation des performances"
      ],
      deliverables: [
        "MCD/MLD exportés sous Looping",
        "Script SQL",
        "Capture d'écran des résultats de requêtes",
        "Lien GitHub du dépôt"
      ],
      demonstrated:
        "Capacité à modéliser et interroger une base de données relationnelle."
    }
  },

  sport: {
    images: {
      powerlifting:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1400&h=900&fit=crop",
      runningFallback:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1400&h=900&fit=crop"
    },
    powerlifting: {
      totalLifts: 156,
      personalBest: 225
    }
  }
}
