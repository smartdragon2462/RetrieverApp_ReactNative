const getCountryCode = language => {
  const langMap = {
    DA: 'da',
    DK: 'da',
    EN: 'en',
    FI: 'fi',
    NO: 'nb',
    SE: 'sv',
    SV: 'sv'
  };

  function retrieversRandomUseOfCountryAndLanguageCodesToLanguage(country) {
    return langMap[country.toUpperCase()] || 'en';
  }

  return retrieversRandomUseOfCountryAndLanguageCodesToLanguage(language);
};

export default getCountryCode;
