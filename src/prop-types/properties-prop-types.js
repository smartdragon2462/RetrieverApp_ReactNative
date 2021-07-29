import { shape, string, bool, oneOf, number } from 'prop-types';

export const propertiesAccessShape = shape({
  vehiclePersonSearch: bool,
  pulseWeight: bool,
  copyAndMoveMonitor: bool,
  extendedSPAR: bool,
  chat: bool,
  copyAndMovePulse: bool,
  esMonitorArchive: bool,
  unpublishAccessible: bool,
  pulseCompleteExport: bool,
  analysisUser: bool,
  monitorCompleteExport: bool,
  dandelion: bool,

  signalsWeb: bool,
  signalsAnnualReport: bool,
  signalsBusiness: bool,
  signalsMediaOpen: bool,
  signalsMediaClosed: bool,
  signalsMediaBroadcast: bool,
  signalsEditor: bool,
  signalsWatch: bool
});

export const propertiesTimezoneShape = shape({
  momentData: string,
  id: string
});

export const propertiesUrlShape = shape({
  actaPublica: string,
  allabrf: string,
  audience: string,
  bolagsverket: string,
  businessExport: string,
  dandelionUrl: string,
  doccy: string,
  fastighet: string,
  fastighetES: string,
  emaillogin: string,
  exporter: string,
  gatekeeper: string,
  industryReport: string,
  personreg: string,
  profiles: string,
  reportStorage: string,
  reportgenerator: string,
  salesMonitor: string,
  seapulse: string,
  shorturlconverter: string,
  userSettings: string,
  valuation: string,
  vehicles: string
});

export const propertiesRealEstateAccess = shape({
  fastighet_standard: bool,
  fastighet_standard2: bool,
  fds: bool,
  inteckningar: bool,
  lagfarenagare: bool,
  realestate_orgnr_search: bool,
  taxeringsuppgifter: bool
});

export const propertiesShape = shape({
  access: propertiesAccessShape,
  account: number,
  accountRole: string,
  chatName: string,
  country: oneOf(['SE', 'DK', 'FI', 'NO', 'EN']),
  invoicePlace: string,
  isWhiteListedIpAddress: bool,
  language: oneOf(['SV', 'DA', 'FI', 'NO', 'EN', 'NO', 'NB']),
  loginType: string,
  realEstateAccess: propertiesRealEstateAccess,
  md5: string,
  sessionId: string,
  timestamp: string,
  timezone: propertiesTimezoneShape,
  urls: propertiesUrlShape,
  useProjectIdForArchive: bool,
  userName: string
});
