export const DOCTOR_PHONE = '919032990138';

export const BOOKING_MESSAGE =
  'Hello Doctor, I would like to book an appointment.';

export function createWhatsAppLink(message: string = BOOKING_MESSAGE) {
  return `https://wa.me/${DOCTOR_PHONE}?text=${encodeURIComponent(message)}`;
}
