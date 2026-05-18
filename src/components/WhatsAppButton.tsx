import BookNowButton from '@/components/BookNowButton';

export default function WhatsAppButton() {
  return (
    <BookNowButton
      label="Book Now"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] animate-pulse hover:scale-105 hover:animate-none transition-all duration-300"
    />
  );
}
