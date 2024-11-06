import Image from 'next/image';

interface SocialButtonProps {
  provider: 'facebook' | 'google';
  onClick: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-center w-full px-4 py-2 h-[35px] border border-special rounded hover:bg-gray-50"
  >
    <Image 
      alt={`${provider} logo`} 
      src={`/images/${provider}.png`} 
      width={24} 
      height={24} 
      className="w-5 h-5 text-gray-600 mr-3" 
    />
    <span className="text-gray-700">Sign up with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
  </button>
);