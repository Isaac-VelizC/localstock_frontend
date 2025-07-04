export const RUBROSDATA = [
  { code: 1, label: "Minimarkets" },
  { code: 2, label: "Ferreterías" },
  { code: 3, label: "Papeleria" },
  { code: 4, label: "Venta de Ropa" },
  { code: 5, label: "Otro" },
];

export const COUNTRIESPHONEDATA = [
  { code: "BO", label: "+591", name: "Bolivia" },
  { code: "AR", label: "+54", name: "Argentina" },
  { code: "CL", label: "+56", name: "Chile" },
  { code: "CO", label: "+57", name: "Colombia" },
  { code: "EC", label: "+593", name: "Ecuador" },
  { code: "MX", label: "+52", name: "México" },
  { code: "PY", label: "+595", name: "Paraguay" },
  { code: "PE", label: "+51", name: "Perú" },
  { code: "UY", label: "+598", name: "Uruguay" },
  { code: "VE", label: "+58", name: "Venezuela" },
  { code: "US", label: "+1", name: "Estados Unidos" }
];

export const CURRENCIES = [
  { value: 'BOB', label: 'Boliviano (BOB)' },       // Bolivia
  { value: 'ARS', label: 'Peso argentino (ARS)' },  // Argentina
  { value: 'CLP', label: 'Peso chileno (CLP)' },    // Chile
  { value: 'COP', label: 'Peso colombiano (COP)' },// Colombia
  { value: 'MXN', label: 'Peso mexicano (MXN)' },   // México
  { value: 'PYG', label: 'Guaraní (PYG)' },         // Paraguay
  { value: 'PEN', label: 'Sol (PEN)' },             // Perú
  { value: 'UYU', label: 'Peso uruguayo (UYU)' },   // Uruguay
  { value: 'VES', label: 'Bolívar (VES)' },         // Venezuela
  { value: 'USD', label: 'Dólar estadounidense (USD)' }  // Estados Unidos
];

// Lista de códigos ISO de países que usas
export const countryCodes = [
  'BO',
  'AR',
  'CL',
  'CO',
  'EC',
  'MX',
  'PY',
  'PE',
  'UY',
  'VE',
  'US',
] as const;

// Lista de códigos ISO de monedas
export const currencyCodes = [
  'BOB',
  'ARS',
  'CLP',
  'COP',
  'USD',
  'MXN',
  'PYG',
  'PEN',
  'UYU',
  'VES',
] as const;