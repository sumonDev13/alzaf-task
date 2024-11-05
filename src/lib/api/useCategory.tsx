import { useState, useEffect } from 'react';
import { Category, MenuItem } from '../types/category';
import {
  AutomobileIcon,
  ComputerLaptopIcon,
  ElectronicAccesoriesIcon,
  ElectronicsDeviceIcon,
  GroceriesIcon,
  HealthBeautyIcon,
  HomeLifeStyleIcon,
  MenBoyFaIcon,
  MotherBabyIcon,
  PetSupplies,
  SportsOutdoorsIcon,
  TvHomeIcon,
  WatchesIcon,
  WomenGirlsFaIcon,
} from "../../../public/icons";

const iconMap: { [key: string]: React.ReactNode } = {
  "Women's & Girls Fashion": <WomenGirlsFaIcon />,
  "Health & Beauty": <HealthBeautyIcon />,
  "Watches, Bags, Jewellery": <WatchesIcon />,
  "Mens & Boys Fashion": <MenBoyFaIcon />,
  "Mother & Baby": <MotherBabyIcon />,
  "Electronics Devices": <ElectronicsDeviceIcon />,
  "TV & Home Appliances": <TvHomeIcon />,
  "Electronic Accessories": <ElectronicAccesoriesIcon />,
  "Groceries": <GroceriesIcon />,
  "Home & Lifestyle": <HomeLifeStyleIcon />,
  "Sports & Outdoors": <SportsOutdoorsIcon />,
  "Automobile": <AutomobileIcon />,
  "Computer and laptop": <ComputerLaptopIcon />,
  "Pet Supplies": <PetSupplies />,
};

const transformToMenuItem = (category: Category): MenuItem => {
  return {
    icon: iconMap[category.title] || <AutomobileIcon />, // Default icon as fallback
    name: category.title,
    dropdown: category.childrens
      ? category.childrens.map((child) => ({
          name: child.title,
          dropdown: child.childrens 
            ? child.childrens.map((subChild) => ({
                name: subChild.title,
                dropdown: subChild.childrens 
                  ? subChild.childrens.map((grandChild) => ({
                      name: grandChild.title,
                      dropdown: [],
                    }))
                  : [],
              }))
            : [],
        }))
      : [],
  };
};

export const useCategories = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.shope.com.bd/api/v1/public/hero-categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        const transformedMenus = data.map(transformToMenuItem);
        setMenus(transformedMenus);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { menus, loading, error };
};