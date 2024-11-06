export interface NavItem {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
  }