// Prevent non-numeric key presses (for phone inputs)
export const restrictNumber = (e) => {
  const digitPeriodRegExp = new RegExp('\\d|\\,|\\.|\\$|\\(|\\)');
  if (
    e.ctrlKey ||
    e.altKey ||
    typeof e.key !== 'string' ||
    e.key.length !== 1
  ) {
    return;
  }
  if (!digitPeriodRegExp.test(e.key)) {
    e.preventDefault();
  }
};

export const emailRegExp =
  /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// Normalize a Mexican phone number to whatsapp format: 521XXXXXXXXXX
export const normalizeWhatsapp = (phone) =>
  '521' + phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');
