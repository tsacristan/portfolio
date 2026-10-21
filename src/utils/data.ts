import type { AppData } from "@/types"

// Préfixe des fichiers de /public (base "/portfolio/" sur GitHub Pages)
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const appData: AppData = {
  profile: {
    name: "Thurian Sacristan",
    role: "Étudiant en BUT Informatique",
    tagline: "Dev fullstack & mobile",
    email: "thuriansacristan@gmail.com",
    location: "Bretagne (Rennes) • Limoges",
    github: "https://github.com/tsacristan",
    // Laisser vide tant qu'il n'y a pas de profil : les liens LinkedIn sont alors masqués
    linkedin: "",
    cv: asset("CV_Sacristan_Thurian.pdf")
  },

  techStack: [
    "Java",
    "Kotlin",
    "Python",
    "SQL",
    "TypeScript",
    "Vue 3",
    "HTML / CSS",
    "C#",
    ".NET MAUI",
    "Git",
    "Linux"
  ],

  // context / team / year / myRole : à compléter projet par projet (badges masqués si vides)
  projects: [
    {
      id: "01",
      title: "Moteur de jeux (Java)",
      type: "Jeu",
      languages: ["Java"],
      tech: "Java / POO / Algorithmique",
      desc: "Développement d'un Latice et d'un Scrabble en Java : règles métier, gestion des tours et interface.",
      longDesc:
        "Conception d'un jeu Java structuré en POO avec implémentation des classes métier, gestion des tours et interface utilisateur cohérente.",
      impact: "Architecture modulaire et réutilisable pour d'autres jeux de plateau.",
      github: "https://github.com/tsacristan/latice",
      image: "",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Conception architecture en POO", "Implémentation des règles métier", "Tests unitaires"],
          deliverables: ["Code source sur GitHub"]
        },
        {
          code: "C2",
          level: 2,
          role: ["Implémentation d'algorithmes de jeu", "Choix des structures de données"],
          deliverables: ["Classes métier"]
        }
      ]
    },
    {
      id: "02",
      title: "PisTask",
      type: "Application mobile",
      languages: ["Kotlin"],
      tech: "Kotlin / Android / MVVM",
      desc: "Application Android de gestion de tâches en Kotlin, architecture MVVM.",
      longDesc:
        "Application Android native pour créer et suivre des tâches. Architecture MVVM et persistance locale avec Room.",
      impact: "Développement mobile natif et mise en pratique d'une architecture en couches.",
      github: "https://github.com/tsacristan/PisTask",
      image: "",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Développement de l'interface mobile", "Gestion du cycle de vie Android"],
          deliverables: ["Code source Kotlin sur GitHub"]
        },
        {
          code: "C4",
          level: 2,
          role: ["Modélisation des entités Room", "Requêtes de persistance locale"],
          deliverables: ["Schéma Room"]
        }
      ]
    },
    {
      id: "03",
      title: "Netflix Clone",
      type: "Site web",
      languages: ["JavaScript", "HTML / CSS"],
      tech: "JavaScript / Frontend",
      desc: "Reproduction de l'interface Netflix avec navigation et contenu dynamique.",
      longDesc:
        "Interface web reproduisant l'expérience Netflix : navigation fluide, contenu chargé dynamiquement et design responsive.",
      impact: "Maîtrise du JavaScript côté client et de l'intégration d'une interface complexe.",
      github: "https://github.com/tsacristan/netflix-project",
      image: "",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Développement frontend", "Intégration d'une API externe", "Design responsive"],
          deliverables: ["Code source sur GitHub"]
        }
      ]
    },
    {
      id: "04",
      title: "RomanApp",
      type: "Application mobile",
      languages: ["C#"],
      tech: "C# / .NET MAUI",
      desc: "Application mobile multiplateforme développée avec .NET MAUI.",
      longDesc:
        "Application mobile cross-platform en C# avec .NET MAUI, une seule base de code pour Android et iOS, organisée en MVVM.",
      impact: "Découverte du développement multiplateforme avec un codebase unique.",
      github: "https://github.com/RomanJ07/RomanThurianApp",
      image: "",
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Développement mobile multiplateforme", "Architecture MVVM"],
          deliverables: ["Code source sur GitHub"]
        },
        {
          code: "C6",
          level: 3,
          role: ["Travail sur un dépôt partagé", "Gestion de version Git"],
          deliverables: ["Historique Git"]
        }
      ]
    },
    {
      id: "05",
      title: "Vytre",
      type: "Application web",
      languages: ["TypeScript"],
      tech: "Vue 3 / Express / Prisma / TypeScript",
      desc: "Éditeur de procédures opérationnelles avec mode lecteur, drag & drop et gestion multimédia.",
      longDesc:
        "Application fullstack pour créer et consulter des procédures opérationnelles structurées. Éditeur riche (TipTap), drag & drop, recadrage d'images et mode lecteur. Frontend Vue 3 + Pinia, backend Express + Prisma, validation Zod.",
      impact: "Architecture fullstack typée de bout en bout, avec validation des données côté serveur.",
      github: "https://github.com/Lamazaii/vytre",
      image: asset("images/vytre.png"),
      competencies: [
        {
          code: "C1",
          level: 3,
          role: ["Architecture fullstack", "Conception de l'API REST", "Fonctionnalités d'édition"],
          deliverables: ["Code source complet sur GitHub"]
        },
        {
          code: "C2",
          level: 2,
          role: ["Logique de drag & drop", "Gestion d'état avec Pinia"],
          deliverables: ["Store Pinia"]
        },
        {
          code: "C4",
          level: 3,
          role: ["Modélisation de la base avec Prisma", "Migrations et relations"],
          deliverables: ["Schéma Prisma", "Migrations"]
        },
        {
          code: "C6",
          level: 3,
          role: ["Gestion de version Git en équipe", "Branches et revues"],
          deliverables: ["Historique Git", "README"]
        }
      ]
    }
  ],

  competences: {
    pnLink:
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licenceprofessionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf",
    items: [
      {
        code: "C1",
        title: "Réaliser un développement d'application",
        indicator: "Concevoir, coder et tester une application",
        level: 3,
        evidence: "SAE, TP et projets personnels"
      },
      {
        code: "C2",
        title: "Optimiser des applications",
        indicator: "Mettre en œuvre des algorithmes, choisir les structures de données",
        level: 2,
        evidence: "Cours d'algorithmique et de POO"
      },
      {
        code: "C3",
        title: "Administrer des systèmes",
        indicator: "Installer et configurer un OS, sécuriser un poste",
        level: 2,
        evidence: "TP systèmes et réseaux sous Linux"
      },
      {
        code: "C4",
        title: "Gérer des données",
        indicator: "Modéliser, interroger et administrer une base de données",
        level: 3,
        evidence: "SAE base de données (SQL)"
      },
      {
        code: "C5",
        title: "Conduire un projet",
        indicator: "Méthode agile, planification, communication",
        level: 2,
        evidence: "Projets de groupe en SAE"
      },
      {
        code: "C6",
        title: "Collaborer",
        indicator: "Travail en équipe, Git, communication",
        level: 3,
        evidence: "Projets de groupe en SAE"
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
    stravaUrl: "",
    hevyUrl: ""
  }
}
