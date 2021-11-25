import { getImage, checkEnvironment } from "./HelperFunctions";
import { searchFilters } from "./Types";

export const ALLFAMSWORD_EN = "products";
export const ALLFAMSWORD_FR = "produits";
export const URLPOWER_EN = "power-systems";
export const URLPOWER_FR = "production-denergie";
export const URLPOWER_SLUG = "power-systems-production-d-energie";
export const URLHEAVY_EN = "heavy-equipment";
export const URLHEAVY_FR = "equipement-lourd";
export const URLFAVES_EN = "favourites";
export const URLFAVES_FR = "favoris";
export const URLCCU = "cat-certified-used-usagee-certifiee-cat";
export const URLCONSIGNMENT = "consignment-consignation";
export const CLASS_HEAVY = "class-heavy-equipment";
export const CLASS_POWER = "class-power-systems";
export const ITEMSPERPAGE = 16;

export const DEPLOY_ENV = {
  /*https://create-react-app.dev/docs/adding-custom-environment-variables/*/
  TCAT: "tcat-prod",
  BFE: "bfe-prod",
  BFERENTAL: "bfe-rental-prod",
};
export const isEnvironmentBFE: boolean = checkEnvironment(DEPLOY_ENV.BFE);
export const isEnvironmentTCAT: boolean = checkEnvironment(DEPLOY_ENV.TCAT);
export const isEnvironmentBFERENTAL: boolean = checkEnvironment(DEPLOY_ENV.BFERENTAL);
export const isEnvironmentBFE_or_BFERENTAL = checkEnvironment(DEPLOY_ENV.BFE) || checkEnvironment(DEPLOY_ENV.BFERENTAL);

export const DOMAINBASE = checkEnvironment(DEPLOY_ENV.BFE)
  ? "https://used.battlefieldequipment.ca"
  : "https://used.toromontcat.com";

export const PageTypes = {
  Home: 0,
  Listings: 1,
  Details: 2,
  CCU: 3,
  Consignment: 4,
  EmailConfirm: 5,
  UpdateSitemap: 6,
};
export const IMAGES = {
  LOGO_TCAT: getImage("logo.gif"),
  LOGO_BFE: getImage("bfe-logo.png"),
  LOGO_BFE_FR: getImage("bfe-logo-fr.png"),
  NOIMG_DEFAULTSRC: getImage("image-coming-soon.jpg"),
  NOIMG_DEFAULTSRC_BFERENTAL: getImage("image-coming-soon-bferental.jpg"),
  FLAG_CA: getImage("flag_ca.png"),
  FLAG_US: getImage("flag_us.png"),
  HOME_UNBEATABLEVALUE: getImage("unbeatablevalue500.png"),
  CTA_SECTION_IMAGE: getImage("usedmachineryformimage.jpg"),
  CCU1: getImage("ccu1.jpg"),
  CCU2: getImage("ccu2.jpg"),
  CCU3: getImage("ccu3.jpg"),
  ConsigmentImage: getImage("consignmentimg.jpg"),
  LOADING_GIF: getImage("loading-gears.gif"),
};

export const TEXT = (lang) => {
  return {
    callForPrice:
      lang === "en" ? "Contact us for price" : "Contactez-nous pour le prix",
  };
};

export const SORT = {
  YEAR_LO: "year-lo",
  YEAR_HI: "year-hi",
  HOURS_LO: "hours-lo",
  HOURS_HI: "hours-hi",
  MODEL_LO: "model-lo",
  MODEL_HI: "model-hi",
  PRICE_HI: "price-hi",
  PRICE_LO: "price-lo",
};

export const PARAMS = {
  PROVINCE: "province",
  CITY: "city",
  YEAR_MIN: "yrmin",
  YEAR_MAX: "yrmax",
  CLASS: "class",
  SORT: "sort",
  MAKE: "make",
  PRICE_MAX: "max",
  KEYWORD: "keyword",
  HOURS_MAX: "hrs",
  CERTIFIED: "certified",
  VIEW_FAVES: "fav",
  VIEW_DEALS: "deals",
  PAGE: "page",
  FORM: "form",
  AVAILABLE: "available",
  IMAGES: "images",
};

export const PHONENUMBERS = {
  HEAVY_TCAT: "1-888-850-1455",
  POWER_TCAT: "1-888-513-3694",
  BFE: "1-800-736-8228",
  BFERENTAL: "1-866-542-1989",
};

export const ELOQUAFORMS = {
  CONTACTFORM: {
    HEAVY: {
      CENTRAL: "toromontcat_used_equipment",
      QM: "toromontcat_used_equipment_qm",
    },
    POWER: {
      CENTRAL: "toromontcat_used_power_systems",
      QM: "toromontcat_power_systems_QM",
    },
  },
  FOOTERSUBSCRIBE: {
    HEAVY: {
      EN: "used_equipment_footer_signup_New",
      FR: "used_equipment_footer_french",
    },
    POWER: {
      EN: "used_power_footer_signup_New",
      FR: "used_powerystems_footer_FR",
    },
  },
};

export const HUBSPOTFORMIDS = {
  CONTACTFORM: {
    HEAVY: {
      EN: "4c808b24-ae08-46a7-b265-8c913b95f2df",
      FR: "1bac4921-bdf5-4b65-87d6-eaa61c6b6994",
    },
    POWER: {
      EN: "36c95e79-cb2d-45ec-a8c2-9ef704500c55",
      FR: "0b0b40aa-3841-4c05-a8bb-e2ada83bc5e3",
    },
  },
  FOOTERSUBSCRIBE: {
    HEAVY: {
      EN: "6ba78c3a-ced9-4ee9-8f5d-2c26b619fa43",
      FR: "7babf47e-0642-4896-915b-53706ed176f4",
    },
    POWER: {
      EN: "660bcf52-2e25-4a81-89ad-dcf54d98ea41",
      FR: "0917dfc4-fbbf-42d3-9ac9-8d53b547e652",
    },
  },
};

export const searchFiltersEmptyDefault: searchFilters = {
  categoryClass: CLASS_HEAVY,
  category: null,
  sortBy: null,
  make: null,
  maxPrice: null,
  keyword: null,
  province: null,
  yearMin: null,
  yearMax: null,
  hoursMax: null,
  city: null,
  certifiedOnly: false,
  battlefieldInventory: false,
  rentalFleetAvailability: false,
  rentalFleetWithImages: false,
  viewFaves: false,
  viewDeals: false,
};
