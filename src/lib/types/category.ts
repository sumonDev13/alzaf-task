import { ReactNode } from 'react';

export interface CategoryChild {
  id: number;
  title: string;
  parent_id: number | null;
  category_id: number;
  image: string | null;
  link: string;
  childrens?: CategoryChild[];
}

export interface Category {
  id: number;
  title: string;
  parent_id: null;
  category_id: number;
  icon: string;
  link: string;
  childrens?: CategoryChild[];
}

export interface MenuItem {
  icon: ReactNode;
  name: string;
  dropdown: MenuItem[];
}