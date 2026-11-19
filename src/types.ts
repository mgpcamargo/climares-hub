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
  scale?: string; // e.g. "0.1° diário", "Municipal SP", "Bacia"
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
  primaryAxis: AxisId;
  secondaryAxes: AxisId[];
  bio: TextValue;
  email?: string;
  orcid?: string;
  lattesUrl?: string;
  scholarUrl?: string;
  githubUrl?: string;
  bvFapespUrl?: string;
  methods: string[];
  regions: string[]; // Region IDs
  hazards: string[]; // Hazard IDs
  offers: CapabilityItem[];
  needs: CapabilityItem[];
  availability: AvailabilityTag[];
  publications: Publication[];
  /** True for representative postdoc/PhD demo profiles so users clearly distinguish public PIs from seeded ECR examples */
  isDemoProfile?: boolean;
}

export type EdgeKind = 'coauthored' | 'project' | 'supervision';

export interface CollaborationEdge {
  id: string;
  source: string;
  target: string;
  kind: EdgeKind;
  weight: number; // 1..5
  label: TextValue;
  year?: number;
}

export interface StudyRegion {
  id: string;
  name: Localized;
  state: string;
  biome: Localized;
  lat: number;
  lng: number;
  summary: Localized;
}

export interface Hazard {
  id: string;
  name: Localized;
  shortName: Localized;
  color: string;
}

export type AssetKind = 'dataset' | 'tool' | 'model' | 'protocol' | 'policy_brief';

export interface CommonsAsset {
  id: string;
  name: string;
  kind: AssetKind;
  description: TextValue;
  axisId: AxisId;
  maintainerIds: string[];
  regions: string[];
  hazards: string[];
  domain: CapabilityDomain;
  format: string;
  access: 'open' | 'internal' | 'request';
  url?: string;
  usedByAxes: AxisId[];
  neededByAxes: AxisId[];
}

export interface CrossAxisMission {
  id: string;
  title: TextValue;
  summary: TextValue;
  status: 'active' | 'forming' | 'urgent';
  leadId: string;
  memberIds: string[];
  activeAxes: AxisId[];
  openAxes: AxisId[]; // Explicitly missing axes!
  regions: string[];
  hazards: string[];
  targetOutput: TextValue;
  deadline?: string;
}

export interface BridgeReason {
  type: 'handshake' | 'region' | 'hazard' | 'method' | 'secondary_axis';
  text: Localized;
  weight: number;
}

export interface LatentBridge {
  id: string;
  sourceId: string;
  targetId: string;
  sourceAxis: AxisId;
  targetAxis: AxisId;
  score: number; // 0..100
  reasons: BridgeReason[];
  sharedRegions: string[];
  sharedHazards: string[];
  matchedHandshakes: {
    providerId: string;
    seekerId: string;
    offer: CapabilityItem;
    need: CapabilityItem;
  }[];
  alreadyConnected: boolean;
}

export interface HandshakeMatch {
  id: string;
  provider: Researcher;
  seeker: Researcher;
  offer: CapabilityItem;
  need: CapabilityItem;
  score: number;
  sharedRegions: string[];
  sharedHazards: string[];
  crossAxis: boolean;
}

export type HubView =
  | 'graph'
  | 'constellation'
  | 'handshakes'
  | 'map'
  | 'directory'
  | 'missions';
