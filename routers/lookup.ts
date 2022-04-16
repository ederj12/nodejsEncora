import express from "express";
import axios from "axios";
const router: express.Router = express.Router();

type ValidData = {
  validIp: boolean;
  validDomain: boolean;
};

function validateData(ip: string, domain: string): ValidData {
    let validData: ValidData = { validIp: false, validDomain: false };
  
    if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ip))
      validData.validIp = true;
  
    if (
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(
        domain
      )
    )
      validData.validDomain = true;
  
    return validData;
  }
  
  function setIpServices(ip: string) {
    const services = [
      {
        url: `https://www.rdap.net/ip/${ip}`,
      },
      {
        url: `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
        options: {
          headers: {
            "x-apikey": process.env.VIRUSTOTALKEY,
          },
        },
      },
    ];
  
    return services;
  }
  
  function setDomainServices(domain: string) {
    const services = [
      {
        url: `https://www.rdap.net/domain/${domain}`,
      },
      {
        url: `https://www.virustotal.com/api/v3/domains/${domain}`,
        options: {
          headers: {
            "x-apikey": process.env.VIRUSTOTALKEY,
          },
        },
      },
    ];
  
    return services;
  }
  
  async function sources(services: any) {
    let result: any = await Promise.allSettled(
      services.map((service: any) =>
        axios.get(service.url, service.options ? service.options : undefined)
      )
    );
  
    return result.map((response: any) => {
      if (response.status == "fulfilled") {
        const { config, data } = response.value;
        return { url: config.url, data };
      } else {
        const { message, config } = response.reason;
        return { message, config };
      }
    });
  }

router.get("/", async (req, res, next) => {
  const ip: string = req.query.ip as string;
  const domain: string = req.query.domain as string;
  let domainInfo = {};
  let ipInfo = {};

  const validatedData: ValidData = validateData(ip, domain);

  if (validatedData.validDomain) {
    const domainServices = setDomainServices(domain);
    domainInfo = await sources(domainServices); //add workers here
  }

  if (validatedData.validIp) {
    const ipServices = setIpServices(ip);
    ipInfo = await sources(ipServices); //add workers here
  }

  return res.json({ ipInfo, domainInfo });
});

export default router;
