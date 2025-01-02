export interface IGym {
    id: string,
    Created: Date,
    placeId: string,
    userId: string | null | undefined,
    title: string,
    address: string,
    lat: string,
    long: string

}

export const DEFAULT_GYM = {
    Created: new Date(),
    placeId: '',
    userId: '',
    title: '',
    address: '',
    lat: '',
    long: '',
    id: ''
} as IGym;

export interface IGymDetails {
    name: string;
    address: string;
    placeId: string;
    lat: number;
    long: number;
    owners: string[];
    is_verified: boolean;
    Created: Date;
  }
  
