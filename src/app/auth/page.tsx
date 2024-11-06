"use client"
import React, { useState } from 'react';
import { redirect } from 'next/navigation'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Image from 'next/image'
import Link from "next/link";
import {IoGridOutline } from 'react-icons/io5';
import {TbMessage } from 'react-icons/tb'
import {TiHome  } from 'react-icons/ti'
import {MdOutlineShoppingCart } from 'react-icons/md'
import {FaRegUser } from 'react-icons/fa'


const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '',
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '',
    termsAccepted: '',
  });

  const [showSideMenu, setShowSideMenu] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.',
      }));
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match.',
      }));
      return;
    }

    // Clear errors and proceed with registration
    setErrors({
      fullName: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
      birthday: '',
      gender: '',
      termsAccepted: '',
    });
    console.log('Registration form submitted:', formData);
    // Add your registration logic here
    redirect('/')
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-16">
        <div className="auth-card flex flex-col md:flex-row gap-8 p-6 md:p-8">
          {/* Left Side */}
          <div className="flex-1">
            <h2 className="text-2xl mb-6">Welcome to Alzaf.com</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  placeholder='Full Name'
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">
                  Phone Number or Email
                </label>
                <input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  placeholder='Phone or Email'
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emailOrPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emailOrPhone: e.target.value }))}
                />
                {errors.emailOrPhone && <p className="mt-2 text-sm text-red-600">{errors.emailOrPhone}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 
                      <AiFillEyeInvisible className="h-5 w-5 text-gray-400" /> : 
                      <AiFillEye className="h-5 w-5 text-gray-400" />
                    }
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder='Confirm Password'
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-right text-special">Login</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.birthday}
                  onChange={(e) => setFormData((prev) => ({ ...prev, birthday: e.target.value }))}
                />
                {errors.birthday && <p className="mt-2 text-sm text-red-600">{errors.birthday}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.gender}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                I agree to the I’d like to receive exclusive offers and promotions via SMS.
              </label>
            </div>
            {errors.termsAccepted && <p className="mt-2 text-sm text-red-600">{errors.termsAccepted}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
             {/* OR divider */}
      <div className="relative flex py-4 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex flex-col w-full gap-4 pt-4">
      <button className="flex items-center justify-center w-full px-4 py-2 h-[35px] border border-special rounded hover:bg-gray-50">
        <Image alt='' src='/images/facebook.png' width={24} height={24} className="w-5 h-5 text-gray-600 mr-3" />
        <span className="text-gray-700">Sign up with Facebook</span>
      </button>
      
      <button className="flex items-center justify-center w-full px-4 py-2 h-[35px] border border-special rounded hover:bg-gray-50">
        <Image alt='' src='/images/google.png' width={24} height={24} className="w-5 h-5 text-gray-600 mr-3" />
        <span className="text-gray-700">Sign up with Google</span>
      </button>
    </div>
          </div>
        </div>
      </div>
      <div className="bg-white md:hidden z-[9999] w-full bottom-0 fixed">
        <ul className="px-5 py-2 pt-3 mx-auto max-w-[400px] flex items-center justify-between">
          <li onClick={()=>setShowSideMenu(!showSideMenu)} className={`${showSideMenu ? 'text-special' : 'text-[#707070]'} cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center`}>
            <IoGridOutline  size={21} />
            <span>Categories</span>
          </li>
          <li className="text-[#707070] cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
            <TbMessage size={22} />
            <span>Message</span>
          </li>
          <Link href='/'>
          <li className="text-[#707070] cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
            <TiHome size={24} />
            <span>Home</span>
          </li>
          </Link>
          <li className="text-[#707070] cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
            <MdOutlineShoppingCart size={24} />
            <span>Cart</span>
          </li>
          <Link href='/auth'>
          <li className="text-special cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
            <FaRegUser size={22} />
            <span>SignUp</span>
          </li>
          </Link>
           
        </ul>
      </div>
    </div>
  );
};

export default RegistrationPage;