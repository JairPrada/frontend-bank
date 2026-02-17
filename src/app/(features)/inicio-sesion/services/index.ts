import { post } from "@/config/axios.instance";
import { LoginRequestDto } from "./dtos/login-request.dto";
import { LoginResponseDto } from "./dtos/login-response.dto";
import ENDPOINTS from "@/config/endpoints";

export async function login(data: LoginRequestDto): Promise<LoginResponseDto> {
  return post<LoginResponseDto>(ENDPOINTS.login, data);
}
