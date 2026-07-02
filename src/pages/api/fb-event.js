import { getCookie } from 'cookies-next';

export default function FbEvent(req, res) {
  const {
    method,
    headers: { referer },
    body: { eventName, eventID, user },
  } = req;

  if (method !== 'POST') {
    return res.status(405).send({ message: 'Only POST request allowed' });
  }

  const { createHash } = require('crypto');
  const hash = (string) => createHash('SHA256').update(string || '').digest('hex');

  const url = `https://graph.facebook.com/v14.0/${process.env.PIXEL}/events?access_token=${process.env.FB_CAPI_TOKEN}`;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_id: eventID,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: referer,
        user_data: {
          fbc: getCookie('_fbc', { req, res }),
          fbp: getCookie('_fbp', { req, res }),
          em: [hash(user.em)],
          ph: [hash(user.ph)],
          external_id: [user.externalID],
          client_user_agent: req.headers['user-agent'],
          client_ip_address: req.ip || req.connection.remoteAddress,
        },
      },
    ],
    test_event_code: process.env.FB_CAPI_TEST_EVENT_CODE,
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log('FB CAPI error:', error));
}
