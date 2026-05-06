export type Fixture = {
  id: string;
  name: string;
  article: string;
  series: string;
  watts: number;
  lumens: number;
  colorTemperature: number;
  cri: string;
  beamAngle: string;
  ipRating: string;
  dimensions: {
    length?: number;
    width?: number;
    diameter?: number;
    height: number;
  };
  sourceUrl: string;
};

export const MIN_FIXTURE_WATTS = 5;
export const MAX_FIXTURE_WATTS = 50;

export const fixtureCatalog: Fixture[] = [
  {
    id: 'back-led-595-standard-4000k',
    name: 'Накладной/встраиваемый светильник 595*595',
    article: '1782000010',
    series: 'BACK LED 595 STANDARD',
    watts: 40,
    lumens: 4000,
    colorTemperature: 4000,
    cri: '>80',
    beamAngle: 'D120',
    ipRating: 'IP40',
    dimensions: {
      length: 595,
      width: 595,
      height: 32,
    },
    sourceUrl:
      'https://www.ltcompany.com/series/back-led/back-led-595-standard-4000k',
  },
  {
    id: 'colibri-dl-led-15-4000k',
    name: 'Встраиваемый спот',
    article: '1170000760',
    series: 'COLIBRI DL LED',
    watts: 14,
    lumens: 1300,
    colorTemperature: 4000,
    cri: '>80',
    beamAngle: 'D120',
    ipRating: 'IP40',
    dimensions: {
      diameter: 186,
      height: 74,
    },
    sourceUrl:
      'https://www.ltcompany.com/series/colibri-dl-led/colibri-dl-led-15-4000k',
  },
  {
    id: 'liner-s-led-1200-th-s-4000k',
    name: 'Линейный подвесной 1200мм',
    article: '1473000300',
    series: 'LINER/S LED TH',
    watts: 32,
    lumens: 3200,
    colorTemperature: 4000,
    cri: '>80',
    beamAngle: 'D120',
    ipRating: 'IP40',
    dimensions: {
      length: 1130,
      width: 60,
      height: 110,
    },
    sourceUrl:
      'https://www.ltcompany.com/series/liner-s-led-th/liner-s-led-1200-th-s-4000k',
  },
  {
    id: 'arma-t-15w-d30-840-bk',
    name: 'Трековый светильник',
    article: '1102300210',
    series: 'ARMA/T',
    watts: 14,
    lumens: 1800,
    colorTemperature: 4000,
    cri: '>80',
    beamAngle: 'D30',
    ipRating: 'IP40',
    dimensions: {
      diameter: 88,
      height: 195,
    },
    sourceUrl: 'https://www.ltcompany.com/series/arma-t/arma-t-15w-d30-840-bk',
  },
];
