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
} from '../../../public/icons';

// Define icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  "Women's & Girls Fashion": <WomenGirlsFaIcon />,
  'Health & Beauty': <HealthBeautyIcon />,
  'Watches, Bags, Jewellery': <WatchesIcon />,
  'Mens & Boys Fashion': <MenBoyFaIcon />,
  'Mother & Baby': <MotherBabyIcon />,
  'Electronics Devices': <ElectronicsDeviceIcon />,
  'TV & Home Appliances': <TvHomeIcon />,
  'Electronic Accessories': <ElectronicAccesoriesIcon />,
  Groceries: <GroceriesIcon />,
  'Home & Lifestyle': <HomeLifeStyleIcon />,
  'Sports & Outdoors': <SportsOutdoorsIcon />,
  Automobile: <AutomobileIcon />,
  'Computer and laptop': <ComputerLaptopIcon />,
  'Pet Supplies': <PetSupplies />,
};

const defaultIcon = <AutomobileIcon />;

const transformToMenuItem = (category: Category): MenuItem => {
  const createMenuItem = (title: string): MenuItem => ({
    icon: iconMap[title] || defaultIcon,
    name: title,
    dropdown: [],
  });

  const result: MenuItem = createMenuItem(category.title);

  if (category.childrens) {
    result.dropdown = category.childrens.map((child) => {
      const childItem = createMenuItem(child.title);

      if (child.childrens) {
        childItem.dropdown = child.childrens.map((subChild) => {
          const subChildItem = createMenuItem(subChild.title);

          if (subChild.childrens) {
            subChildItem.dropdown = subChild.childrens.map((grandChild) =>
              createMenuItem(grandChild.title),
            );
          }

          return subChildItem;
        });
      }

      return childItem;
    });
  }

  return result;
};

export const useCategories = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://api.shope.com.bd/api/v1/public/hero-categories',
        );
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
