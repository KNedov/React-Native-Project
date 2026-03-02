export const CATEGORIES = [
    {
        categoryId: "Phones",
        title: "Phones",
        icon: "phone-portrait-outline",
    },
    {
        categoryId: "Tablets",
        title: "Tablets",
        icon: "tablet-landscape-outline",
    },
    {
        categoryId: "Monitors",
        title: "Monitors",
        icon: "tv-outline",
    },
    {
        categoryId: "Laptops",
        title: "Laptops",
        icon: "laptop-outline",
    },
    {
        categoryId: "Computers",
        title: "Computers",
        icon: "journal-outline",
    },
    {
        categoryId: "Televisions",
        title: "Televisions",
        icon: "tv-sharp",
    },
];

export const deliveryMethods = [
    {
        id: "standard",
        name: "Standard Delivery",
        price: 5.99,
        time: "3-5 business days",
    },
    {
        id: "express",
        name: "Express Delivery",
        price: 12.99,
        time: "1-2 business days",
    },
    {
        id: "pickup",
        name: "Store Pickup",
        price: 0,
        time: "Free pickup in store",
    },
];

export const DELIVERY_FIELDS = [
    { field: "fullName", 
      label: "Full Name", 
      placeholder: "John Doe" 
    },
    {
        field: "email",
        label: "Email",
        placeholder: "john@example.com",
        options: { keyboardType: "email-address" },
    },
    {
        field: "phone",
        label: "Phone Number",
        placeholder: "+359 888 123 456",
        options: { keyboardType: "phone-pad" },
    },
    { field: "address", 
      label: "Address", 
      placeholder: "123 Main St" 
    },
];
export const CARD_FIELDS = [
    {
        field: "cardNumber",
        label: "Card Number",
        placeholder: "1234 5678 9012 3456",
        keyboardType: "numeric",
        maxLength: 19,
    },
    {
        field: "cardName",
        label: "Name on Card",
        placeholder: "JOHN DOE",
    },
];
