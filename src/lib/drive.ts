const DRIVE_PATH_REGEX = /\/file\/d\/([a-zA-Z0-9_-]{10,})/;
const DRIVE_QUERY_ID_REGEX = /[?&]id=([a-zA-Z0-9_-]{10,})/;
const RAW_FILE_ID_REGEX = /^[a-zA-Z0-9_-]{10,120}$/;

export function extractDriveFileId(rawInput: string): string | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  if (/\/drive\/(?:u\/\d+\/)?folders\//i.test(trimmed)) {
    return null;
  }

  const hasProtocol = /^https?:\/\//i.test(trimmed);
  const looksLikeDomain =
    hasProtocol || /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/|\?|$)/.test(trimmed);

  if (looksLikeDomain) {
    try {
      const parsed = new URL(hasProtocol ? trimmed : `https://${trimmed}`);
      const host = parsed.hostname.toLowerCase();
      if (host !== 'drive.google.com' && host !== 'docs.google.com') {
        return null;
      }
    } catch {
      return null;
    }
  }

  if (trimmed.includes('/') || trimmed.includes('?') || trimmed.includes(':')) {
    const pathMatch = trimmed.match(DRIVE_PATH_REGEX);
    if (pathMatch?.[1]) {
      return pathMatch[1];
    }

    const queryMatch = trimmed.match(DRIVE_QUERY_ID_REGEX);
    if (queryMatch?.[1]) {
      return queryMatch[1];
    }

    return null;
  }

  if (RAW_FILE_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function slugifyText(text: string, fallback = 'item'): string {
  const normalized = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || fallback;
}
