export interface Address {
  premises?: string;
  postal_code: string;
  country?: string;
  locality: string;
  region?: string;
  address_line_1: string;
  address_line_2?: string;
}

export interface DateOfBirth {
  month: number;
  year: number;
}

export interface OfficerLinks {
  appointments: string;
}

export interface Officer {
  address?: Address;
  name: string;
  appointed_on?: string;
  officer_role?: string;
  links?: {
    officer: OfficerLinks;
  };
  date_of_birth?: DateOfBirth;
  occupation?: string;
  country_of_residence?: string;
  nationality?: string;
  resigned_on?: string;
}

export interface OfficersSearchResponse {
  etag?: string;
  links?: {
    self: string;
  };
  kind?: string;
  items_per_page: number;
  items: Officer[];
}
