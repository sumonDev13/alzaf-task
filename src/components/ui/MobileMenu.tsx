import Link from 'next/link';
import { IoGridOutline } from 'react-icons/io5';
import { TbMessage } from 'react-icons/tb';
import { TiHome } from 'react-icons/ti';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { NavItem } from '@/lib/types/nav';


const NavLink: React.FC<{
  item: NavItem;
  className: string;
}> = ({ item, className }) => {
  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <li onClick={item.onClick} className={className}>
      {item.icon}
      <span>{item.label}</span>
    </li>
  );
};

export const BottomNav: React.FC<{
  showSideMenu: boolean;
  setShowSideMenu: (show: boolean) => void;
}> = ({ showSideMenu, setShowSideMenu }) => {
  const navItems: NavItem[] = [
    {
      icon: <IoGridOutline size={21} />,
      label: "Categories",
      onClick: () => setShowSideMenu(!showSideMenu),
      isActive: showSideMenu
    },
    {
      icon: <TbMessage size={22} />,
      label: "Message"
    },
    {
      icon: <TiHome size={24} />,
      label: "Home",
      href: "/"
    },
    {
      icon: <MdOutlineShoppingCart size={24} />,
      label: "Cart"
    },
    {
      icon: <FaRegUser size={22} />,
      label: "SignUp",
      href: "/auth",
      isActive: true
    }
  ];

  return (
    <div className="bg-white md:hidden z-[9999] w-full bottom-0 fixed">
      <ul className="px-5 py-2 pt-3 mx-auto max-w-[400px] flex items-center justify-between">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            item={item}
            className={`${
              item.isActive ? 'text-special' : 'text-[#707070]'
            } cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center`}
          />
        ))}
      </ul>
    </div>
  );
};