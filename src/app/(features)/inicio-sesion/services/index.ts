import { post } from "@/config/axios.instance";
import { LoginRequestDto } from "./dtos/login-request.dto";
import ENDPOINTS from "@/config/endpoints";

export async function login(data: LoginRequestDto) {
  return post(ENDPOINTS.login, data);
}
