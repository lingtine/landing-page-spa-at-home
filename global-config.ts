interface AreaServed {
    name: string;
    nameEn: string;
    nameKo: string;
}

interface Config {
    nameWebsite: string;
    phoneNumber: string;
    email: string;
    address: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    geo: { latitude: number; longitude: number };
    priceRange: string;
    openingHours: string;
    openingHoursSpec: {
        dayOfWeek: string[];
        opens: string;
        closes: string;
    };
    areaServed: AreaServed[];
    logo: string;
    logoWhite: string;
    logoBlack: string;
    zalo: string;
    facebook: string;
}

const config: Config = {
    nameWebsite: "Iku Massage",
    phoneNumber: "0345727534",
    email: "info@idmassage.com",
    address: "482 Nguyễn Văn Khối, Phường 9, Quận Gò Vấp, TP.HCM",
    addressLocality: "Ho Chi Minh City",
    addressRegion: "HCM",
    postalCode: "700000",
    addressCountry: "VN",
    geo: { latitude: 10.844901708243745, longitude: 106.64654352548798 },
    priceRange: "₫₫",
    openingHours: "Mo-Su 08:00-23:30",
    openingHoursSpec: {
        dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
        ],
        opens: "08:00",
        closes: "23:30",
    },
    areaServed: [
        { name: "Quận Gò Vấp", nameEn: "Go Vap District", nameKo: "고밥군" },
        { name: "Quận 1", nameEn: "District 1", nameKo: "1군" },
        { name: "Quận 3", nameEn: "District 3", nameKo: "3군" },
        { name: "Quận Bình Thạnh", nameEn: "Binh Thanh District", nameKo: "빈타인군" },
        { name: "Quận Phú Nhuận", nameEn: "Phu Nhuan District", nameKo: "푸년군" },
        { name: "Quận Tân Bình", nameEn: "Tan Binh District", nameKo: "떤빈군" },
        { name: "Quận Tân Phú", nameEn: "Tan Phu District", nameKo: "떤푸군" },
        { name: "Quận 7", nameEn: "District 7", nameKo: "7군" },
        { name: "Quận 10", nameEn: "District 10", nameKo: "10군" },
        { name: "Quận 11", nameEn: "District 11", nameKo: "11군" },
        { name: "Thành phố Thủ Đức", nameEn: "Thu Duc City", nameKo: "투득시" },
    ],
    logo: "/images/logo.png",
    logoWhite: "/images/logo-white.png",
    logoBlack: "/images/logo-black.png",
    zalo: "https://zalo.me/0345727534",
    facebook: "https://www.facebook.com/ikumassage/",
};


export default config;
