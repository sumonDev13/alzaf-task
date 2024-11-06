export interface FormData {
    fullName: string;
    emailOrPhone: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    gender: string;
    termsAccepted: boolean;
  }
  
export interface FormErrors {
    [key: string]: string;
  }