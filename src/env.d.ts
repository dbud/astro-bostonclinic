type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime { }
}

declare module '*/business.yaml' {
  interface BusinessData {
    name: string;
    phones: string[];
    address: {
      street: string;
      postcode: string;
    };
    openingHours: string[];
  }

  const value: BusinessData;
  export default value;
}

declare module '*/treatments.yaml' {
  interface Option {
    name: string;
    price: number;
  }

  interface Treatment {
    name: string;
    description: string;
    options: Option[];
  }

  const value: Treatment[];
  export default value;
}
