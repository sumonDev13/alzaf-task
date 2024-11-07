import React from 'react';

const BirthdayForm = () => {
  return (
    <div className="flex space-x-8">
      <div className="flex-1">
        <label htmlFor="month" className="block text-gray-600 font-medium mb-2">
          Birthday
        </label>
        <div className="flex space-x-2">
          <select
            id="month"
            className="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <select
            className="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
          <select
            className="px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Year</option>
            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex-1">
        <label htmlFor="gender" className="block text-gray-600 font-medium mb-2">
          Gender
        </label>
        <select
          id="gender"
          className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </select>
      </div>
    </div>
  );
};

export default BirthdayForm;