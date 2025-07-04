import type { UserCompletedOnboardingInterface } from '@/interfaces/Account';
import type { RegisterUserData, LoginUserData } from '@/interfaces/Auth';
//import type { AccountFormData } from '@/schema/AuthSchema';
import api from '@/services/axios';

export const verificationCodeAPI = (email: string) => api.post('auth/send-verification-code/', { email });
export const registerUser = (data: RegisterUserData) => api.post('auth/verify-code-register/', data);
export const loginUser = (data: LoginUserData) => api.post('auth/login/', data);
export const fetchCurrentUser = () => api.get('auth/user/');
//export const changePassword = (data: ChangePasswordData) => api.post('password/change/', data);
export const completedDataAccount = (data: UserCompletedOnboardingInterface) => api.put('auth/complete-onboarding/', data);
//export const updatseDataUser = (data: AccountFormData) => api.put('user/update/', data);
