export interface PagedResult<T> {
  pageNumber: number;
  documentCount: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}

export interface QueryParam {
  pageNumber?: number;
  companyName?: string;
  vendorName?: string;
  startDate: string;
  endDate: string;
  pageSize: number;
}

export interface RedirectTo {
  to: string;
}

export interface LinkData {
  to: string;
  text: string;
}

export interface ListItemView {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ApiError{
  data: {
    title:string
  },
  status:number
}

export interface GenericResponse<T>{
  content: T[],
  error: any,
  errorMessage: string,
  hasError: boolean,
  isSuccess: boolean
}