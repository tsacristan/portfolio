export interface Profile {
  name: string
  role: string
  tagline: string
  email: string
  location: string
  github: string
  linkedin: string
  cv: string
}

export interface Project {
  id: string
  title: string
  tech: string
  desc: string
  longDesc: string
  impact: string
  github: string
  image: string
  // Contexte affiché en badges (laisser vide pour masquer)
  context?: string
  team?: string
  year?: string
  myRole?: string
  competencies?: ProjectCompetency[]
}

export interface ProjectCompetency {
  code: string
  level: number
  role: string[]
  deliverables: string[]
}

export interface Competence {
  code: string
  title: string
  indicator: string
  level: number
  evidence: string
}

export interface CompetenceLevel {
  level: number
  title: string
  description: string
}

export interface EvidenceExample {
  target: string
  project: string
  description: string[]
  role: string[]
  deliverables: string[]
  demonstrated: string
}

export interface Competences {
  pnLink: string
  items: Competence[]
  levels: CompetenceLevel[]
  evidenceExample: EvidenceExample
}

export interface SportData {
  // Liens publics vers les profils (laisser vide pour masquer le bouton)
  stravaUrl: string
  hevyUrl: string
}

export interface AppData {
  profile: Profile
  techStack: string[]
  projects: Project[]
  competences: Competences
  sport: SportData
}

export interface Tab {
  id: string
  label: string
}
