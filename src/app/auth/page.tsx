'use client';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { InputField } from '@/components/forms/InputField';
import { PasswordField } from '@/components/forms/PasswordField';
import { SocialButton } from '@/components/buttons/SocialButtons';
import { BottomNav } from '@/components/ui/MobileMenu';
import { FormData } from '@/lib/types/form';
import { FormErrors } from '@/lib/types/form';

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Registration form submitted:', formData);
      redirect('/');
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

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <InputField
                id="birthday"
                label="Birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange('birthday')}
                error={errors.birthday}
                required
              />

              <div className="flex-1">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.gender}
                  onChange={handleChange('gender')}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange('termsAccepted')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                I agree to receive exclusive offers and promotions via SMS.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col w-full gap-4 pt-4">
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
