export interface RouteModel {
  id?: string;
  originState: string;
  originCity: string;
  destinationState: string;
  destinationCity: string;
}

export interface CreateRouteDto {
  "originState": "string",
  "originCity": "string",
  "destinationState": "string",
  "destinationCity": "string"
}