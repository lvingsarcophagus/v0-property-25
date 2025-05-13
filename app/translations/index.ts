export type Language = "en" | "lt"

export type TranslationKey =
  | "home"
  | "listings"
  | "dashboard"
  | "login"
  | "signup"
  | "findYourDreamProperty"
  | "viewAllListings"
  | "featuredProperties"
  | "searchProperties"
  | "propertyListings"
  | "searchResults"
  | "backToListings"
  | "forSale"
  | "forRent"
  | "location"
  | "rooms"
  | "area"
  | "heating"
  | "contactBroker"
  | "scheduleViewing"
  | "propertyDetails"
  | "description"
  | "amenities"
  | "floor"
  | "yearBuilt"
  | "type"
  | "city"
  | "cityPart"
  | "street"
  | "houseNumber"
  | "price"
  | "viewDetails"
  | "buildingMaterial"
  | "ownerInfo"
  | "ownerName"
  | "ownerPhone"
  | "ownerDescription"
  | "invoiceInfo"
  | "ownerInvoice"
  | "renterInvoice"
  | "addPhotos"
  | "uploadPhotos"

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    home: "Home",
    listings: "Listings",
    dashboard: "Dashboard",
    login: "Login",
    signup: "Sign Up",
    findYourDreamProperty: "Find Your Dream Property",
    viewAllListings: "View All Listings",
    featuredProperties: "Featured Properties",
    searchProperties: "Search Properties",
    propertyListings: "Property Listings",
    searchResults: "Search Results",
    backToListings: "Back to Listings",
    forSale: "For Sale",
    forRent: "For Rent",
    location: "Location",
    rooms: "Rooms",
    area: "Area",
    heating: "Heating",
    contactBroker: "Contact Broker",
    scheduleViewing: "Schedule Viewing",
    propertyDetails: "Property Details",
    description: "Description",
    amenities: "Amenities",
    floor: "Floor",
    yearBuilt: "Year Built",
    type: "Type",
    city: "City",
    cityPart: "City Part",
    street: "Street",
    houseNumber: "House Number",
    price: "Price",
    viewDetails: "View Details",
    buildingMaterial: "Building Material",
    ownerInfo: "Owner Information",
    ownerName: "Owner Name",
    ownerPhone: "Phone Number",
    ownerDescription: "Owner Description",
    invoiceInfo: "Invoice Information",
    ownerInvoice: "Invoice from owner",
    renterInvoice: "Invoice from renters",
    addPhotos: "Add Photos",
    uploadPhotos: "Upload Photos",
  },
  lt: {
    home: "Pagrindinis",
    listings: "Skelbimai",
    dashboard: "Valdymo Skydelis",
    login: "Prisijungti",
    signup: "Registruotis",
    findYourDreamProperty: "Raskite savo svajonių būstą",
    viewAllListings: "Peržiūrėti visus skelbimus",
    featuredProperties: "Rekomenduojami būstai",
    searchProperties: "Ieškoti būstų",
    propertyListings: "Nekilnojamojo turto skelbimai",
    searchResults: "Paieškos rezultatai",
    backToListings: "Grįžti į skelbimus",
    forSale: "Parduodama",
    forRent: "Nuomojama",
    location: "Vieta",
    rooms: "Kambariai",
    area: "Plotas",
    heating: "Šildymas",
    contactBroker: "Susisiekti su brokeriu",
    scheduleViewing: "Suplanuoti apžiūrą",
    propertyDetails: "Būsto informacija",
    description: "Aprašymas",
    amenities: "Patogumai",
    floor: "Aukštas",
    yearBuilt: "Statybos metai",
    type: "Tipas",
    city: "Miestas",
    cityPart: "Miesto dalis",
    street: "Gatvė",
    houseNumber: "Namo/buto numeris",
    price: "Kaina",
    viewDetails: "Peržiūrėti detaliau",
    buildingMaterial: "Statybinė medžiaga",
    ownerInfo: "Savininko informacija",
    ownerName: "Savininko vardas",
    ownerPhone: "Telefono numeris",
    ownerDescription: "Savininko aprašymas",
    invoiceInfo: "Sąskaitų informacija",
    ownerInvoice: "Sąskaita iš savininko",
    renterInvoice: "Sąskaita iš nuomininkų",
    addPhotos: "Pridėti nuotraukas",
    uploadPhotos: "Įkelti nuotraukas",
  },
}

