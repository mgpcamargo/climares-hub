export type Lang = 'pt' | 'en';

export interface Localized {
  pt: string;
  en: string;
}

export type TextValue = string | Localized;

export type AxisId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type AxisCluster = 'physical' | 'systems' | 'society' | 'crosscutting';

export interface AxisInfo {
  id: AxisId;
  code: string; // e.g. "E01"
  name: Localized;
  shortName: Localized;
  cluster: AxisCluster;
  color: string;
  bgTint: string;
  description: Localized;
  leadPIs: string[];
  hostUnits: string[];
}

export type CareerRole =
  | 'coordinator'
  | 'pi'
  | 'associate'
  | 'postdoc'
  | 'phd'
  | 'msc'
  | 'ic'
  | 'tech';

export type AvailabilityTag =
  | 'coauthor'
  | 'dataset_share'
  | 'fieldwork'
  | 'committee'
  | 'policy_brief'
  | 'mentoring';

export type CapabilityDomain =
  | 'climate_projections'
  | 'extreme_hazards'
  | 'hydrology_water'
  | 'energy_grid'
  | 'agro_food'
  | 'health_epi'
  | 'economic_modeling'
  | 'social_governance'
  | 'amazon_bioeconomy'
  | 'climate_innovation'
  | 'education_comm'
  | 'geospatial_code';

export interface CapabilityItem {
  id: string;
  domain: CapabilityDomain;
  label: TextValue;
  detail?: TextValue;
  scale?: string;
}

export interface Publication {
  title: string;
  year: number;
  journal: string;
  doi?: string;
  coAuthorIds?: string[];
  crossAxis?: boolean;
}

export interface Researcher {
  id: string;
  name: string;
  role: CareerRole;
  institution: string;
  unit: string;
  city: string;
  homeState?: string; // e.g. "SP", "PA", "RS"
  primaryAxis: AxisId;
  secondaryAxes: AxisId[];
  photoUrl?: string;
  bio: TextValue;
  email?: string;
  orcid?: string;
  openalexId?: string;
  worksCount?: number;
  citedByCount?: number;
  empiricalTopics?: string[];
  studiedStates?: string[];
  profileClaimed?: boolean;
  lattesUrl?: string;
  scholarUrl?: string;
  githubUrl?: string;
  bvFapespUrl?: string;
  methods: string[];
  regions: string[];
  hazards: string[];
  offers: CapabilityItem[];
  needs: CapabilityItem[];
  availability: AvailabilityTag[];
  publications: Publication[];
}

export type EdgeKind = 'coauthored' | 'project' | 'supervision';

export interface CollaborationEdge {
  id: string;
  source: string;
  target: string;
  kind: EdgeKind;
  weight: number;
  paperCount?: number;
  samplePaperTitle?: string;
  samplePaperDoi?: string;
  label: TextValue;
  year?: number;
}

export interface StudyRegion {
  id: string;
  name: Localized;
  shortName: Localized;
  emoji: string;
  state: string;
  states: string[];
  biome: Localized;
  lat: number;
  lng: number;
  summary: Localized;
}

export interface Hazard {
  id: string;
  name: Localized;
  shortName: Localized;
  emoji: string;
  color: string;
}

export interface BridgeReason {
  type: 'topic' | 'region' | 'handshake' | 'hazard';
  text: Localized;
  shortTag: Localized;
  weight: number;
}

export interface LatentBridge {
  id: string;
  sourceId: string;
  targetId: string;
  sourceAxis: AxisId;
  targetAxis: AxisId;
  score: number;
  reasons: BridgeReason[];
  sharedTopics: string[];
  sharedRegions: string[];
  alreadyConnected: boolean;
}

export type MuralFolderId =
  | 'all'
  | 'general'
  | 'admin'
  | 'axis-1'
  | 'axis-2'
  | 'axis-3'
  | 'axis-4'
  | 'axis-5'
  | 'axis-6'
  | 'axis-7'
  | 'axis-8'
  | 'axis-9'
  | 'axis-10'
  | 'axis-11';

export type MuralPostKind = 'discussion' | 'offer' | 'need' | 'paper';

export interface MuralReply {
  id: string;
  authorName: string;
  authorResearcherId?: string;
  authorAvatarUrl?: string;
  createdAt: string;
  body: string;
}

export interface MuralPost {
  id: string;
  issueNumber?: number;
  issueUrl?: string;
  folderId: Exclude<MuralFolderId, 'all'>;
  kind: MuralPostKind;
  title: string;
  authorName: string;
  authorResearcherId?: string;
  authorUnit?: string;
  authorAxis?: AxisId;
  authorAvatarUrl?: string;
  isSystemSeed?: boolean;
  createdAt: string;
  body: string;
  tags: string[];
  pinned?: boolean;
  repliesCount: number;
  replies?: MuralReply[];
}

export type HubView = 'people' | 'graph' | 'map' | 'mural';
