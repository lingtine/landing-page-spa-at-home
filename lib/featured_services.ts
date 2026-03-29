/**
 * Danh sách 4 dịch vụ nổi bật: id (slug) và đường dẫn ảnh.
 * Nội dung văn bản theo ngôn ngữ lấy từ messages (featuredServices.services[id]).
 */
export const FEATURED_SERVICE_IDS = [
  'massage-thai',
  'massage-aroma',
  'massage-da-nong',
  'massage-thuy-dien',
] as const;

export type FeaturedServiceId = (typeof FEATURED_SERVICE_IDS)[number];

const IMAGES: Record<FeaturedServiceId, string> = {
  'massage-thai': '/images/massa/masa_thai.webp',
  'massage-aroma': '/images/massa/aromatherapy_massage.webp',
  'massage-da-nong': '/images/massa/hot_stone.webp',
  'massage-thuy-dien': '/images/massa/swedish.webp',
};

export function getFeaturedServiceImage(id: string): string {
  return IMAGES[id as FeaturedServiceId] ?? '/images/logo.webp';
}

export function isFeaturedServiceSlug(slug: string): slug is FeaturedServiceId {
  return FEATURED_SERVICE_IDS.includes(slug as FeaturedServiceId);
}
