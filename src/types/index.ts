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
  status: string
  github: string
  image: string
  competencies?: ProjectCompetency[]
}

export interface ProjectCompetency {
  code: string
  level: number
  role: string[]
  deliverables: string[]
}

export interface Skill {
  icon: string
  label: string
  val: string
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

export interface PowerliftingLift {
  label: string
  value: string
  unit: string
  icon: string
  colorClass: string
}

export interface TrailRun {
  name: string
  dist: string
  status: string
  elevation: string
  location: string
  pace: string
  duration: string
}

export interface SportData {
  images: {
    powerlifting: string
    powerliftingAlt: string
    squatCompetition: string
    benchCompetition: string
    deadliftCompetition: string
    runningFallback: string
  }
  powerlifting: PowerliftingLift[]
  trail: TrailRun
}

export interface AppData {
  profile: Profile
  techStack: string[]
  projects: Project[]
  skills: Skill[]
  competences: Competences
  sport: SportData
}

export interface Tab {
  id: string
  label: string
}
