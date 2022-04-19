const axios = require("axios");
const rdaUrl = "https://www.rdap.net/domain";
//https://ipfind.com/
const reverseUrl = "https://api.ipfind.com?ip=#&auth=";
const reverseKey = "52f16235-f137-49e2-b19b-4127b2ae88a1";
//https://ip-api.com/
const ipUrl = "http://ip-api.com/json";
//https://www.virustotal.com/api/v3/domains/{domain}
const virusTotalDomainUrl = "https://www.virustotal.com/api/v3/ip_addresses";
const virusTotalIpUrl = "https://www.virustotal.com/api/v3/ip_addresses";
const virusTotalKey =
  "4ea41690d28216c482f29999ca8c6f5c6ea16c3f1e9e7193bc5e8e541d8e7958";

const sources = async (domain, ip) => {
  const ipServices = [
    {
      url: `https://www.rdap.net/ip/${ip}`,
    },
    {
      url: `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
      options: {
        headers: {
          "x-apikey": virusTotalKey,
        },
      },
    },
  ];

  const domainServices = [
    {
      url: `https://www.rdap.net/domain/${ip}`,
    },
    {
      url: `https://www.virustotal.com/api/v3/ip_addresses/${domain}`,
      options: {
        headers: {
          "x-apikey": virusTotalKey,
        },
      },
    },
  ];

  let result = await Promise.allSettled(
    ipServices.map((service) =>
      axios.get(service.url, service.options ? service.options : undefined)
    )
  );

  console.log(result.map(response =>  {
    return {url: response.value.config.url , data: response.value.data}
  }))
  /*
  then(
    axios.spread((...allData) => {
      console.log({ allData });
    })
  );
    let response =  await axios.get(`${rdaUrl}/${domain}`);
    //console.log(response.data)
    //response =  await axios.get(`${reverseUrl.replace('#',ip)}${reverseKey}`);
    //console.log(response.data)
    //response =  await axios.get(`${ipUrl}/${ip}`);
    //console.log(response.data)
    response =  await axios.get(`${virusTotalDomainUrl}/${domain}`, {
        headers: {
          'x-apikey': virusTotalKey
        }
      });
    response =  await axios.get(`${virusTotalIpUrl}/${ip}`, {
        headers: {
          'x-apikey': virusTotalKey
        }
      });
    console.log(response.data)*/
  return '';
};
sources("google.com", "172.217.165.206");
