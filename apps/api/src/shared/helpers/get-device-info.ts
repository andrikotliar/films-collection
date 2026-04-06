type DeviceInfo = {
  os: string;
  browser: string;
};

const getBrowser = (userAgent: string) => {
  if (userAgent.includes('edg')) {
    return 'Edge';
  }

  if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
    return 'Chrome';
  }

  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return 'Safari';
  }

  if (userAgent.includes('firefox')) {
    return 'Firefox';
  }

  return 'Unknown';
};

const UNKNOWN_DEVICE: DeviceInfo = {
  os: 'Unknown',
  browser: 'Unknown',
};

export const getDeviceInfo = (userAgent?: string): DeviceInfo => {
  if (!userAgent) {
    return UNKNOWN_DEVICE;
  }

  const agent = userAgent.toLowerCase();

  const browser = getBrowser(agent);

  if (agent.includes('windows nt')) {
    return { os: 'Windows', browser };
  }

  if (agent.includes('mac os x') && !agent.includes('iphone') && !agent.includes('ipad')) {
    return { os: 'macOS', browser };
  }

  if (agent.includes('iphone') || agent.includes('ipad')) {
    return { os: 'iOS', browser };
  }

  if (agent.includes('android')) {
    return { os: 'Android', browser };
  }

  if (agent.includes('linux')) {
    return { os: 'Linux', browser };
  }

  return UNKNOWN_DEVICE;
};
