import { MicAreas } from './mic-areas';
import { MicBodyMaterials } from './mic-body-materials';
import { MicGroup, MicGroupLetter } from './mic-groups';
import { MicSeries } from './mic-series';

export * from './mic-areas';
export * from './mic-body-materials';
export * from './mic-groups';
export * from './mic-series';
export * from './mic-year';

export type LibraryType = MicAreas | MicBodyMaterials | MicGroup | MicGroupLetter | MicSeries;
