export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

export interface AdminStats {
  total: number;
  active: number;
  inactive: number;
  avgPrice: number;
}
