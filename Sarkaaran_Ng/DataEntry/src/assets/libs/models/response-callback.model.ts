import { ResponseType } from "../constants/text-constants";

export interface ToastResponse {
	responseType: ResponseType;
  message: string;
}
