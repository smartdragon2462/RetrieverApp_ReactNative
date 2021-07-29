import getCoreApiRoot from '../utils/api-root.js';

// microservices
export const URL_ACTAPUBLICA = 'https://ws.retriever-info.com/acta-publica';
export const URL_ALLABRF = 'https://ws.retriever-info.com/allabrf';
export const URL_AUDIENCE = 'https://ws.retriever-info.com/audience-aggregator';
export const URL_BOLAGSVERKET =
  'https://ws.retriever-info.com/businessBolagsverket';
export const URL_BUSINESS_ES = 'https://ws.retriever-info.com/businessES';
export const URL_BUSINESS_EXPORT =
  'https://ws.retriever-info.com/businessExport';
export const URL_BUSINESS_EXPORTER =
  'https://ws.retriever-info.com/businessExporter';
export const URL_DANDELION = 'https://ws.retriever-info.com/dandelion';
export const URL_DOCCY = 'https://ws.retriever-info.com/doccy';
export const URL_EMAIL_LOGIN = 'https://ws.retriever-info.com/EmailLogin';
export const URL_EXPORTER = 'https://ws.retriever-info.com/export';
export const URL_FASTIGHET = 'https://ws.retriever-info.com/fastighetv2';
export const URL_FASTIGHET_ES = 'https://ws.retriever-info.com/fastighetES';
export const URL_GATEKEEPER = 'https://ws.retriever-info.com/gatekeeper';
export const URL_INDUSTRY_REPORT =
  'https://ws.retriever-info.com/industryReport';
export const URL_PERSON_REG = 'https://ws.retriever-info.com/SPAR-ws';
export const URL_REPORT_STORAGE = 'https://ws.retriever-info.com/reportStorage';
export const URL_REPORT_GENERATOR =
  'https://ws.retriever-info.com/report-generator';
export const URL_SALES_MONITOR = 'https://ws.retriever-info.com/salesMonitor';
export const URL_SEAPULSE = 'https://ws.retriever-info.com/seapulse';
export const URL_SHORT_URL_CONVERTER =
  'https://ws.retriever-info.com/urlconverter';
export const URL_USER_SETTINGS = 'https://ws.retriever-info.com/user-settings';
export const URL_VALUATION = 'https://ws.retriever-info.com/businessValuation';
export const URL_VEHICLES = 'https://ws.retriever-info.com/vehicles';
export const URL_FAVORITE_PROFILES =
  'https://ws.retriever-info.com/user-settings/favorite-profiles';

// legacy (core)
export const URL_APP_LOGIN = `${getCoreApiRoot()}/services/j_app_security_check`;
export const URL_PROFILES = `${getCoreApiRoot()}/services/profiles`;
export const URL_LOGOUT = `${getCoreApiRoot()}/services/logout`;
