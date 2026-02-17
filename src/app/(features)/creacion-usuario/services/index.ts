import { post } from "@/config/axios.instance";
import { RegisterRequestDto } from "./dtos/register-request.dto";
import { RegisterResponseDto } from "./dtos/register-response.dto";
import ENDPOINTS from "@/config/endpoints";

export async function registerUser(data: RegisterRequestDto): Promise<RegisterResponseDto> {
  return post<RegisterResponseDto>(ENDPOINTS["create-pre-client"], data);
}
