export type pagingState = {
  curPage: number;
  numPages: number;
  startAtItem: number;
  endAtItem: number;
  totalItems: number;
};
export type type_linkList = {
  linkText: string;
  linkUrl: string;
  groupCodeSlug: string;
};
export type searchFilters = {
  categoryClass: string;
  category: string | null;
  sortBy: string | null;
  make: string | null;
  maxPrice: number | null;
  keyword: any;
  province: string | null;
  yearMin: number | null;
  yearMax: number | null;
  hoursMax: number | null;
  city: string | null;
  // dealerName: string | null;
  certifiedOnly: boolean;
  battlefieldInventory: boolean;
  consignmentOnly: boolean;
  rentalFleetAvailability: boolean;
  rentalFleetWithImages: boolean;
  viewFaves: boolean;
  viewDeals: boolean;
};
export type types_seoData = {
  CatCode: string;
  CatCodeSlug: string;
  CtaImage?: string;
  EN: {
    Name: string;
    Meta: string;
    Desc: any;
    ExtraText: any | null;
  };
  FR: {
    Name: string;
    Meta: string;
    Desc: any;
    ExtraText: any | null;
  };
};
export type Type_jsonCategoryGroup = {
  count: number;
  equipments: [];
  "group-code": string;
  "group-display-name": string;
  "group-name": string;
};
export type Type_jsonModelDetails = {
  id: string;
  "dealer-id": string;
  "dealer-name": string;
  "unit-number": string;
  "stock-number": string;
  "product-family-code": string;
  "product-family": string;
  "product-family-display-name": string;
  "manufacturer-code": string;
  manufacturer: string;
  model: string;
  "serial-number": string;
  year: string;
  hours: number;
  city: string;
  "postal-code": string;
  state: string;
  sku: string;
  "inspection-link": string;
  country: string;
  link: string;
  rating: string;
  certification: string;
  availability: string;
  "update-date": string;
  "create-date": string;
  "status-code": string;
  status: string;
  "availability-code": string;
  price: {
    currency: string;
    text: string;
  } | null;
  "product-family-categories": {
    "category-class": {
      name: string;
    };
    category: {
      name: string;
      "category-code": string;
      "category-display-name": string;
      "image-on": string;
      "image-off": string;
    };
  };
  contacts: {
    "first-name": string;
    "last-name": string;
    phone: string;
    email: string;
    state: string;
  }[];
  features: {
    lang: string;
    id: string;
    text: string;
  }[];
  condition;
  photos: {
    "updated-date": string;
    text: string;
    uri: string;
  }[];
  videos;
  comments: string | null;
};

export interface InspectionReportData {
  enterDate: string;
  inspectionId: number;
  items: {
    color: string;
    name: string;
    value: string;
  }[];
  name: string;
}
