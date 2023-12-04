import requests from "../../main/apiConfig";
import { GenericResponse } from "../../models/shared";
import { CreateRouteDto, RouteModel } from "../../models/trans-tracker/routes";
import { TransTrackerUrl } from "./baseSetting";

export const Driver = {
  GetRoutes: () => requests.get<GenericResponse<RouteModel[]>>(TransTrackerUrl("/Routes/GetRoutes")),

  GetRoute: (routeId: string) => requests.get<GenericResponse<RouteModel>>(TransTrackerUrl(`/Routes/GetRoute/${routeId}`)),

  CreateRoute: (payload: CreateRouteDto) => requests.post(TransTrackerUrl("/"))
};