interface Config {
    nameWebsite: string;
    phoneNumber: string;
    email: string;
    address: string;
    logo: string;
    logoWhite: string;
    logoBlack: string;
    zalo: string;
    facebook: string;
}

const config: Config = {
    nameWebsite: "Iku Massage", // Tên website
    phoneNumber: "0345727534",
    email: "info@idmassage.com",
    address: "482 Nguyễn Văn Khối, Phường 9, Quận Gò Vấp, TP.HCM",
    logo: "/images/logo.png",
    logoWhite: "/images/logo-white.png",
    logoBlack: "/images/logo-black.png",
    zalo: "https://zalo.me/0345727534",
    facebook: "https://facebook.com/idmassage",
};


export default config;