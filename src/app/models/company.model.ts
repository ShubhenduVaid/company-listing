export interface CompanyAddress {
  premises: string;
  postal_code: string;
  country?: string;
  locality: string;
  region?: string;
  address_line_1: string;
  address_line_2?: string;
}

export interface CompanyMatches {
  title?: number[];
  snippet?: number[];
}

export interface CompanyLinks {
  self: string;
}

export interface CompanyItem {
  company_status?: string;
  address_snippet?: string;
  date_of_creation?: string;
  matches?: CompanyMatches;
  snippet?: string;
  description: string;
  links?: CompanyLinks;
  company_number: string;
  title: string;
  company_type?: string;
  address?: CompanyAddress;
  kind?: string;
  description_identifier?: string[];
  date_of_cessation?: string;
}

export interface CompanySearchResponse {
  page_number?: number;
  kind?: string;
  total_results: number;
  items: CompanyItem[];
}
