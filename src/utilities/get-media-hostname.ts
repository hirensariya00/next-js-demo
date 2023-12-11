//@ts-nocheck

import { CommonUtilities } from "./common";

const envSuffixes = {
  dev: "-dev",
  staging: "-staging",
  prod: ""
};

function getMediaDomainByEnv(domainHash, environmentType) {
  const envSuffix = envSuffixes[environmentType] || envSuffixes.prod;
  return `https://${domainHash}.myexperro${envSuffix}.com`;
}

function getUIBuilderMediaHost(domain, fallbackDomain) {
  if(domain) {
    const [domainHash, domainType] = domain.split('.');
    const envType = domainType.split('-')[1];
    return getMediaDomainByEnv(domainHash.split('-')[0], envType);
  } else {
    return fallbackDomain;
  }
}

function isExperroDomain(domain) {
  return ['experro-dev.app', 'myexperro-dev.com', 'experro-staging.app', 'myexperro-staging.com', 'experro.app', 'myexperro.com']
    .some(allowedDomain => domain.indexOf(allowedDomain) > -1);
}

function getAppMediaHost(hostName, fallbackDomain) {
  const isRenderingOnServer =
  CommonUtilities.isRenderingOnServer() ||
  CommonUtilities.isRenderingInHeadlessBrowser();
  if(isExperroDomain(hostName) && !isRenderingOnServer) {
    return getUIBuilderMediaHost(hostName, fallbackDomain);
  }
  return ``;
}

export { getUIBuilderMediaHost, getAppMediaHost }
