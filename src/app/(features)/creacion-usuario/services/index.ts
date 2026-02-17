import { post } from "@/config/axios.instance";
import { RegisterRequestDto } from "./dtos/register-request.dto";
import ENDPOINTS from "@/config/endpoints";

export async function registerUser(data: RegisterRequestDto) {
  return post(ENDPOINTS["create-pre-client"], data);
}
