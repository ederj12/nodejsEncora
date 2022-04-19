export const configIpSources = (ip: string, sourcesRequested: Array<string>) => {
  const sourcesConfig = [
    {
      id: process.env.RDAP,
      url: `https://www.rdap.net/ip/${ip}`,
    },
    {
      id: process.env.VIRUSTOTAL,
      url: `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
      options: {
        headers: {
          "x-apikey": process.env.VIRUSTOTALKEY,
        },
      },
    },
  ];
  const sources: any[] = [];
  sourcesRequested.forEach((source) => {
    let config = sourcesConfig.find((config) => config.id == source);
    if (config) sources.push(config);
  });

  return sources;
};

export const configDomainSources = (
  domain: string,
  sourcesRequested: Array<string>
) => {
  const sourcesConfig = [
    {
      id: process.env.RDAP,
      url: `https://www.rdap.net/domain/${domain}`,
    },
    {
      id: process.env.VIRUSTOTAL,
      url: `https://www.virustotal.com/api/v3/domains/${domain}`,
      options: {
        headers: {
          "x-apikey": process.env.VIRUSTOTALKEY,
        },
      },
    },
  ];

  const sources: any[] = [];
  sourcesRequested.forEach((source) => {
    let config = sourcesConfig.find((config) => config.id == source);
    if (config) sources.push(config);
  });

  return sources;
};
