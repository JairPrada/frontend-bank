import { post } from "@/config/axios.instance";
import { ValidateOtpRequestDto } from "./dtos/validate-otp-request.dto";

export async function validateOtp(data: ValidateOtpRequestDto) {
  return post("/validate-otp", data);
}
