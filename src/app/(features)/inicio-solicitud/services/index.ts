import { post } from "@/config/axios.instance";
import { StartApplicationRequestDto } from "./dtos/start-application-request.dto";
import ENDPOINTS from "@/config/endpoints";

export async function startApplication(data: StartApplicationRequestDto) {
  return post(ENDPOINTS["start-application"], data);
}
