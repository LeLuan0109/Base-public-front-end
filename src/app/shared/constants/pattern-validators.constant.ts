export const PATTERN = {
  phone: '^(\\+84|84|0[3|5|7|8|9])+([0-9]{8,18})\\b$',
  email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  telegram: '^(?![\\s]).{1,128}$',
  code: '^[A-Z0-9_]*$',
  username: '^[a-zA-Z0-9]+$',
  urlFacebook: '^(?:(?:http|https):\\/\\/)?(?:www.)?facebook.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-\\.]*)?(\/)?',
  urlTiktok: '^(?:(?:http|https):\\/\\/)?(?:www.)?tiktok.com\\/@([\\w.]{0,23}\\w)(?:\\/\\S*)?$',
  urlYoutube: '^(?:(?:http|https):\\/\\/)?(?:www.)?youtube.com\\/(channel\\/|user\\/|@)?[\\w-]+',
  domain: '^[a-z0-9.-]+\\.[a-z]{2,4}$',
  url: '^(https|http)?://(www){0,1}.+[a-z0-9.-]+\\.[a-z]{2,4}.*$',
  password: '^\\S.*[^.\\s]$'
};
