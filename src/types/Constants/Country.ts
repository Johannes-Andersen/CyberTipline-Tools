/**
 * ISO 3166-1 alpha-2 two-character country code.
 */
export enum Country {
  // Specials
  AnonymousProxy = 'A1',
  SatelliteProvider = 'A2',
  OtherCountry = 'O1',
  // Country codes
  Andorra = 'AD',
  UnitedArabEmirates = 'AE',
  Afghanistan = 'AF',
  AntiguaAndBarbuda = 'AG',
  Anguilla = 'AI',
  Albania = 'AL',
  Armenia = 'AM',
  NetherlandsAntilles = 'AN',
  Angola = 'AO',
  AsiaPacificRegion = 'AP',
  Antarctica = 'AQ',
  Argentina = 'AR',
  AmericanSamoa = 'AS',
  Austria = 'AT',
  Australia = 'AU',
  Aruba = 'AW',
  AlandIslands = 'AX',
  Azerbaijan = 'AZ',
  BosniaAndHerzegovina = 'BA',
  Barbados = 'BB',
  Bangladesh = 'BD',
  Belgium = 'BE',
  BurkinaFaso = 'BF',
  Bulgaria = 'BG',
  Bahrain = 'BH',
  Burundi = 'BI',
  Benin = 'BJ',
  SaintBartelemey = 'BL',
  Bermuda = 'BM',
  BruneiDarussalam = 'BN',
  Bolivia = 'BO',
  BonaireSintEustatiusAndSaba = 'BQ',
  Brazil = 'BR',
  Bahamas = 'BS',
  Bhutan = 'BT',
  BouvetIsland = 'BV',
  Botswana = 'BW',
  Belarus = 'BY',
  Belize = 'BZ',
  Canada = 'CA',
  CocosKeelingIslands = 'CC',
  CongoDemocraticRepublic = 'CD',
  CentralAfricanRepublic = 'CF',
  Congo = 'CG',
  Switzerland = 'CH',
  CoteDIvoire = 'CI',
  CookIslands = 'CK',
  Chile = 'CL',
  Cameroon = 'CM',
  China = 'CN',
  Colombia = 'CO',
  CostaRica = 'CR',
  Cuba = 'CU',
  CapeVerde = 'CV',
  ChristmasIsland = 'CX',
  Curacao = 'CW',
  Cyprus = 'CY',
  CzechRepublic = 'CZ',
  Germany = 'DE',
  Djibouti = 'DJ',
  Denmark = 'DK',
  Dominica = 'DM',
  DominicanRepublic = 'DO',
  Algeria = 'DZ',
  Ecuador = 'EC',
  Estonia = 'EE',
  Egypt = 'EG',
  WesternSahara = 'EH',
  Eritrea = 'ER',
  Spain = 'ES',
  Ethiopia = 'ET',
  Europe = 'EU',
  Finland = 'FI',
  Fiji = 'FJ',
  FalklandIslands = 'FK',
  Micronesia = 'FM',
  FaroeIslands = 'FO',
  France = 'FR',
  FranceMetropolitan = 'FX',
  Gabon = 'GA',
  UnitedKingdom = 'GB',
  Grenada = 'GD',
  Georgia = 'GE',
  FrenchGuiana = 'GF',
  Guernsey = 'GG',
  Ghana = 'GH',
  Gibraltar = 'GI',
  Greenland = 'GL',
  Gambia = 'GM',
  Guinea = 'GN',
  Guadeloupe = 'GP',
  EquatorialGuinea = 'GQ',
  Greece = 'GR',
  SouthGeorgia = 'GS',
  Guatemala = 'GT',
  Guam = 'GU',
  GuineaBissau = 'GW',
  Guyana = 'GY',
  HongKong = 'HK',
  HeardIsland = 'HM',
  Honduras = 'HN',
  Croatia = 'HR',
  Haiti = 'HT',
  Hungary = 'HU',
  Indonesia = 'ID',
  Ireland = 'IE',
  Israel = 'IL',
  IsleOfMan = 'IM',
  India = 'IN',
  BritishIndianOceanTerritory = 'IO',
  Iraq = 'IQ',
  Iran = 'IR',
  Iceland = 'IS',
  Italy = 'IT',
  Jersey = 'JE',
  Jamaica = 'JM',
  Jordan = 'JO',
  Japan = 'JP',
  Kenya = 'KE',
  Kyrgyzstan = 'KG',
  Cambodia = 'KH',
  Kiribati = 'KI',
  Comoros = 'KM',
  SaintKittsAndNevis = 'KN',
  NorthKorea = 'KP',
  SouthKorea = 'KR',
  Kuwait = 'KW',
  CaymanIslands = 'KY',
  Kazakhstan = 'KZ',
  Laos = 'LA',
  Lebanon = 'LB',
  SaintLucia = 'LC',
  Liechtenstein = 'LI',
  SriLanka = 'LK',
  Liberia = 'LR',
  Lesotho = 'LS',
  Lithuania = 'LT',
  Luxembourg = 'LU',
  Latvia = 'LV',
  Libya = 'LY',
  Morocco = 'MA',
  Monaco = 'MC',
  Moldova = 'MD',
  Montenegro = 'ME',
  SaintMartin = 'MF',
  Madagascar = 'MG',
  MarshallIslands = 'MH',
  Macedonia = 'MK',
  Mali = 'ML',
  Myanmar = 'MM',
  Mongolia = 'MN',
  Macao = 'MO',
  NorthernMarianaIslands = 'MP',
  Martinique = 'MQ',
  Mauritania = 'MR',
  Montserrat = 'MS',
  Malta = 'MT',
  Mauritius = 'MU',
  Maldives = 'MV',
  Malawi = 'MW',
  Mexico = 'MX',
  Malaysia = 'MY',
  Mozambique = 'MZ',
  Namibia = 'NA',
  NewCaledonia = 'NC',
  Niger = 'NE',
  NorfolkIsland = 'NF',
  Nigeria = 'NG',
  Nicaragua = 'NI',
  Netherlands = 'NL',
  Norway = 'NO',
  Nepal = 'NP',
  Nauru = 'NR',
  Niue = 'NU',
  NewZealand = 'NZ',
  Oman = 'OM',
  Panama = 'PA',
  Peru = 'PE',
  FrenchPolynesia = 'PF',
  PapuaNewGuinea = 'PG',
  Philippines = 'PH',
  Pakistan = 'PK',
  Poland = 'PL',
  SaintPierreAndMiquelon = 'PM',
  Pitcairn = 'PN',
  PuertoRico = 'PR',
  PalestinianTerritory = 'PS',
  Portugal = 'PT',
  Palau = 'PW',
  Paraguay = 'PY',
  Qatar = 'QA',
  Reunion = 'RE',
  Romania = 'RO',
  Serbia = 'RS',
  Russia = 'RU',
  Rwanda = 'RW',
  SaudiArabia = 'SA',
  SolomonIslands = 'SB',
  Seychelles = 'SC',
  Sudan = 'SD',
  Sweden = 'SE',
  Singapore = 'SG',
  SaintHelena = 'SH',
  Slovenia = 'SI',
  SvalbardAndJanMayen = 'SJ',
  Slovakia = 'SK',
  SierraLeone = 'SL',
  SanMarino = 'SM',
  Senegal = 'SN',
  Somalia = 'SO',
  Suriname = 'SR',
  SouthSudan = 'SS',
  SaoTomeAndPrincipe = 'ST',
  ElSalvador = 'SV',
  SintMaarten = 'SX',
  Syria = 'SY',
  Swaziland = 'SZ',
  TurksAndCaicosIslands = 'TC',
  Chad = 'TD',
  FrenchSouthernTerritories = 'TF',
  Togo = 'TG',
  Thailand = 'TH',
  Tajikistan = 'TJ',
  Tokelau = 'TK',
  TimorLeste = 'TL',
  Turkmenistan = 'TM',
  Tunisia = 'TN',
  Tonga = 'TO',
  Turkey = 'TR',
  TrinidadAndTobago = 'TT',
  Tuvalu = 'TV',
  Taiwan = 'TW',
  Tanzania = 'TZ',
  Ukraine = 'UA',
  Uganda = 'UG',
  UnitedStatesMinorOutlyingIslands = 'UM',
  UnitedStates = 'US',
  Uruguay = 'UY',
  Uzbekistan = 'UZ',
  VaticanCity = 'VA',
  SaintVincentAndTheGrenadines = 'VC',
  Venezuela = 'VE',
  BritishVirginIslands = 'VG',
  UsVirginIslands = 'VI',
  Vietnam = 'VN',
  Vanuatu = 'VU',
  WallisAndFutuna = 'WF',
  Samoa = 'WS',
  Kosovo = 'XK',
  Yemen = 'YE',
  Mayotte = 'YT',
  SouthAfrica = 'ZA',
  Zambia = 'ZM',
  Zimbabwe = 'ZW',
}
