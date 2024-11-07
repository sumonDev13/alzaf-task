export interface FormData {
    fullName: string;
    emailOrPhone: string;
    password: string;
    confirmPassword: string;
    birthday: {
      month: string;
      day: string;
      year: string;
    };
    gender: string;
    termsAccepted: boolean;
  }
  
export interface FormErrors {
    [key: string]: string;
  }