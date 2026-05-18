import { MessageCircle } from 'lucide-react';

import { createWhatsAppLink, BOOKING_MESSAGE } from '@/lib/booking';

type BookNowButtonProps = {
  label?: string;
  className?: string;
  message?: string;
  icon?: boolean;
  target?: '_blank' | '_self';
};

export default function BookNowButton({
  label = 'Book Now',
  className = '',
  message = BOOKING_MESSAGE,
  icon = true,
  target = '_blank',
}: BookNowButtonProps) {
  return (
    <a
      href={createWhatsAppLink(message)}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {icon ? <MessageCircle size={16} /> : null}
      <span>{label}</span>
    </a>
  );
}
