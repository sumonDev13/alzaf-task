import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputFieldProps } from './InputField';

interface PasswordFieldProps extends InputFieldProps {
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  required,
  showPassword,
  placeholder,
  onTogglePassword,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative">
      <input
        id={id}
        name={id}
        type={showPassword ? 'text' : 'password'}
        required={required}
        placeholder={placeholder}
        className="appearance-none h-[36px] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={onTogglePassword}
      >
        {showPassword ? 
          <AiFillEyeInvisible className="h-5 w-5 text-gray-400" /> : 
          <AiFillEye className="h-5 w-5 text-gray-400" />
        }
      </button>
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);
