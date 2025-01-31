'use client';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { InputField } from '@/components/forms/InputField';
import { PasswordField } from '@/components/forms/PasswordField';
import { SocialButton } from '@/components/buttons/SocialButtons';
import { BottomNav } from '@/components/ui/MobileMenu';
import { FormData,FormErrors } from '@/lib/types/form';


const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    birthday: {
      month: '',
      day: '',
      year: ''
    },
    gender: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleChange =
    (field: keyof Omit<FormData, 'birthday'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBirthdayChange = (part: 'month' | 'day' | 'year') => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      birthday: {
        ...prev.birthday,
        [part]: e.target.value,
      },
    }));

    if (errors.birthday) {
      setErrors(prev => ({ ...prev, birthday: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};


    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10,}$/;
      if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          'Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate birthday
    const { month, day, year } = formData.birthday;
    if (!month || !day || !year) {
      newErrors.birthday = 'Complete birthday information is required';
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    // Validate terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms to continue';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Registration form submitted:', formData);
      redirect('/');
    } else {
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-16">
        <div className="auth-card flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="flex-1">
            <h2 className="text-2xl mb-6">Welcome to Alzaf.com</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                error={errors.fullName}
                placeholder="Full Name"
                required
              />

              <InputField
                id="emailOrPhone"
                label="Phone Number or Email"
                value={formData.emailOrPhone}
                onChange={handleChange('emailOrPhone')}
                error={errors.emailOrPhone}
                placeholder="Phone or Email"
                required
              />

              <PasswordField
                id="password"
                label="Password"
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                required
                showPassword={showPassword}
                placeholder='Please Enter Your Password'
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                required
              />
            </form>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-right text-special">Login</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="flex space-x-8">
                <div className="flex-1">
                  <label htmlFor="month" className="block text-gray-600 font-medium mb-1">
                    Birthday<span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <select
                      id="month"
                      value={formData.birthday.month}
                      onChange={handleBirthdayChange('month')}
                      className={`px-2 py-2 h-[36px] border bg-transparent text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.birthday ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                    <select
                      value={formData.birthday.day}
                      onChange={handleBirthdayChange('day')}
                      className={`px-2 py-2 h-[36px] border bg-transparent text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.birthday ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day.toString()}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.birthday.year}
                      onChange={handleBirthdayChange('year')}
                      className={`px-2 py-2 h-[36px] border bg-transparent text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.birthday ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(
                        (year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  {errors.birthday && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
                  )}
                </div>

                <div className="flex-1">
                  <label htmlFor="gender" className="block text-gray-600 font-medium mb-1">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange('gender')}
                    className={`w-full px-2 py-2 h-[36px] text-gray-400 bg-transparent border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.gender ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange('termsAccepted')}
                className={`h-4 w-4 border-gray-300 rounded ${
                  errors.termsAccepted ? 'border-red-500' : ''
                }`}
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                I agree to receive exclusive offers and promotions via SMS.
                <span className="text-red-500">*</span>
              </label>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm ml-2">{errors.termsAccepted}</p>
              )}
            </div>

            <button
              type="submit"
              className="h-[40px] w-full bg-special hover:bg-gray-700 text-white font-medium py-2 px-4"
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col w-full gap-5 pt-1">
              <SocialButton
                provider="facebook"
                onClick={() => console.log('Facebook signup')}
              />
              <SocialButton
                provider="google"
                onClick={() => console.log('Google signup')}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNav showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
    </div>
  );
};

export default RegistrationPage;