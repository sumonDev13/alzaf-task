'use client';

import Link from 'next/link';
import { useCategories } from '@/lib/api/useCategory';
import React, { useState } from 'react';
import Slider from '@/utils/slider/Slider';
import { RightIcon } from '../../../public/icons';
import { IoGridOutline } from 'react-icons/io5';
import { TbMessage } from 'react-icons/tb';
import { TiHome } from 'react-icons/ti';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { images } from '@/utils/banner/banner';

const Hero = () => {
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [subSubMenu, setActiveSubSubMenu] = useState<number | null>(null);

  const [showSideMenu, setShowSideMenu] = useState(false);

  const { menus } = useCategories();
  return (
    <section className="bg-[#EDEDED]">
      <div className="relative md:mt-[12px] ">
        <Slider images={images} />
        <div className=" custom-container w-full top-0 z-[9999]">
          <ul
            className={`w-full fixed ${
              showSideMenu ? 'left-0 md:left-auto' : 'left-[-100%] md:left-auto'
            } md:absolute top-0 max-w-[230px] bg-white p-[10px] md:p-[6px] flex flex-col duration-200 gap-y-3 bottom-0 md:bottom-auto z-[99999]`}
          >
            <div className="flex md:hidden w-full justify-between border-b pt-[10px] pb-[11px] items-center mb-[10px]">
              <h1 className=" pb-[10px] text-[18px] font-semibold text-primary">
                Categories
              </h1>
              <button
                onClick={() => setShowSideMenu(false)}
                className="cursor-pointer hover:text-special text-gray-500 pb-[10px]"
              >
                <IoClose size={26} />
              </button>
            </div>
            {/* maping all manus */}
            {menus.map((menu, index: number) => (
              <li
                key={index}
                className="hover:text-special flex items-center gap-2 text-secondary cursor-pointer"
                onMouseEnter={() => setActiveSubMenu(index)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <span className="">{menu.icon}</span>
                <p className="flex items-center justify-between pr-5 w-full capitalize">
                  <span>{menu.name}</span>
                  {menu.dropdown.length > 0 && <RightIcon />}
                </p>

                {activeSubMenu === index && menu.dropdown.length > 0 && (
                  <ul className="w-full absolute top-[159px] border-l-2 duration-300 border-special md:border-none md:top-0 left-[11px] md:left-[95%] bottom-0 max-w-[210px] md:max-w-[230px] bg-white p-[6px] flex flex-col gap-y-3 ">
                    {menu.dropdown.map((submenu, subIndex: number) => (
                      <li
                        key={subIndex}
                        className="hover:text-special flex items-center gap-2 text-secondary cursor-pointer"
                        onMouseEnter={() => setActiveSubSubMenu(subIndex)}
                        onMouseLeave={() => setActiveSubSubMenu(null)}
                      >
                        <span>{submenu.icon}</span>
                        <p className="flex items-center justify-between pr-5 w-full capitalize">
                          {submenu.name}
                          {submenu.dropdown.length > 0 && <RightIcon />}
                        </p>

                        {subSubMenu === subIndex && submenu.dropdown.length > 0 && (
                          <ul className="w-full absolute top-[159px] md:top-0 bottom-0 max-w-[205px] md:max-w-[230px] bg-white p-[6px] flex flex-col gap-y-3 duration-200  left-[12px] border-l-2 border-special md:border-none md:left-[95%] ">
                            {submenu.dropdown.map((subsubmenu, subsubIndex: number) => (
                              <li
                                key={subsubIndex}
                                className="hover:text-special flex items-center gap-2 text-secondary cursor-pointer"
                              >
                                <span>{subsubmenu.icon}</span>
                                <p className="capitalize">{subsubmenu.name}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white md:hidden z-[9999] w-full bottom-0 fixed">
          <ul className="px-5 py-2 pt-3 mx-auto max-w-[400px] flex items-center justify-between">
            <li
              onClick={() => setShowSideMenu(!showSideMenu)}
              className={`${
                showSideMenu ? 'text-special' : 'text-[#707070]'
              } cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center`}
            >
              <IoGridOutline size={21} />
              <span>Categories</span>
            </li>
            <li className="text-[#707070] cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
              <TbMessage size={22} />
              <span>Message</span>
            </li>
            <li className="text-special cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
              <TiHome size={24} />
              <span>Home</span>
            </li>
            <li className="text-[#707070] cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
              <MdOutlineShoppingCart size={24} />
              <span>Cart</span>
            </li>
            <Link href="/auth">
              <li className="text-[#707070] cursor-pointer hover:text-special duration-100 font-medium flex flex-col items-center">
                <FaRegUser size={22} />
                <span>SignUp</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
