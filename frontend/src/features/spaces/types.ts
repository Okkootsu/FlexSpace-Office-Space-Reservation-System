export enum SpaceType {
  HotDesk = 1,
  DedicatedDesk = 2,
  MeetingRoom = 3,
  PrivateOffice = 4,
}

export interface Space {
  id: string;
  title: string;
  description: string;
  type: SpaceType;
  capacity: number;
  hourlyPrice: number;
  currency: string;
  city: string;
  district: string;
  amenities: string[];
}

export interface GetSpacesParams {
  city?: string;
  type?: SpaceType;
  minCapacity?: number;
}

export interface CreateSpacePayload {
  hostId: string;
  title: string;
  description: string;
  type: SpaceType;
  capacity: number;
  hourlyPriceAmount: number;
  currency: string;
  city: string;
  district: string;
  street: string;
  postalCode?: string;
  amenities: string[];
}