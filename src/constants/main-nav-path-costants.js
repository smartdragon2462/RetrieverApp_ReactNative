import getCoreApiRoot from '../utils/api-root.js';

export const MONITOR_HITS = `${getCoreApiRoot()}/services/monitor`;
export const MONITOR_TRENDS = `${getCoreApiRoot()}/services/monitor/trends`;
export const MONITOR_ANALYSIS = `${getCoreApiRoot()}/services/monitor/analysis`;
export const MONITOR_SETUP = `${getCoreApiRoot()}/services/monitor/setup`;

export const PULSE_HITS = `${getCoreApiRoot()}/services/pulse/trends`;
export const PULSE_ARCHIVE = `${getCoreApiRoot()}/services/pulse/archive`;
export const PULSE_ANALYSIS = `${getCoreApiRoot()}/services/pulse/analysis`;
export const PULSE_SETUP = `${getCoreApiRoot()}/services/pulse/admin`;

export const RESEARCH_NEWS_ARCHIVE = `${getCoreApiRoot()}/services/archive`;
// export const MONITOR_ARCHIVE ='';
export const RESEARCH_ANALYSIS = `${getCoreApiRoot()}/services/archive/analysis`;

export const TARGET = `${getCoreApiRoot()}/services/target`;

export const BUSINESS_COMPANIES = `${getCoreApiRoot()}/services/businessinfo`;
export const BUSINESS_REALESTATE = `${getCoreApiRoot()}/services/businessinfo/fastighet`;
export const BUSINESS_PERSON = `${getCoreApiRoot()}/services/businessinfo/personreg`;
export const BUSINESS_VEHICLES = `${getCoreApiRoot()}/services/businessinfo/vehicles`;
export const BUSINESS_SIGNALS = `${getCoreApiRoot()}/services/businessinfo/signals/insight`;
export const BUSINESS_PROFILES = `${getCoreApiRoot()}/services/businessinfo/setup/profiles`;

export const REALESTATE_BINK = `${getCoreApiRoot()}/services/custom/`;
export const REALESTATE_PAPER = `${getCoreApiRoot()}/services/custom/?url=http://www.retriever-info.com/omh/avis.html`;

export const INSIGHTS_EFKM = '/services/insights/?viewId=7';
export const INSIGHTS_ENERGISTYRELSEN = '/services/insights/?viewId=14';
