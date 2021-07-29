/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
export default () => {
  function getServiceNameFromServiceId(id) {
    return {
      1: 'monitor',
      2: 'archive',
      3: 'analysis',
      6: 'businessinfo',
      7: 'pulse',
      8: 'custom'
    }[id];
  }

  const currentServiceName = () => {
    const service =
      // document.getElementById('#serviceStr').val() ||
      JSON.parse(localStorage.getItem('state')).serviceName;

    if (!service) return 'monitor';
    if (service) return service;
    if (
      location.pathname.startsWith('/services/archive/search/profiles') ||
      location.pathname.startsWith('/services/dandelion')
    )
      return 'archive';
    return location.href
      .match(/\/services\/([a-z]+)(?:\.html|$|\/|\?)/)[1]
      .replace('administrator', 'monitor');
  };

  const tempSolution = () => {
    return 'monitor';
  };

  return {
    currentServiceName,
    tempSolution,
    getServiceNameFromServiceId
  };
};
