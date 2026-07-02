import { getCookie } from 'cookies-next';

// ─── Facebook Pixel (client-side) + CAPI (server-side via /api/fb-event) ─────
export default function fbEvent(
  eventName,
  userData = { phone: '', email: '', externalID: '' },
  eventID = Date.now(),
) {
  const payload = JSON.stringify({
    eventName,
    eventID,
    user: {
      ph: userData.phone || '',
      em: userData.email || '',
      externalID: userData.externalID,
    },
  });

  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, { fbc: getCookie('_fbc') }, { eventID });
  }

  return fetch('/api/fb-event', {
    method: 'POST',
    body: payload,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('fbEvent error:', err));
}

// ─── Google Ads Conversion ────────────────────────────────────────────────────
export function gtagSendEvent(conversionId, data = {}) {
  if (typeof gtag === 'undefined') return false;

  const fullName = data.fullName ?? '';
  const phone = data.phone ?? '';
  const [firstName = '', lastName = ''] = fullName.split(' ');

  gtag('set', 'user_data', {
    phone_number: phone.trim(),
    address: {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    },
  });

  gtag('event', 'conversion', {
    send_to: `AW-XXXXXXXXXX/${conversionId}`,
    event_callback: () => {},
  });

  return false;
}
