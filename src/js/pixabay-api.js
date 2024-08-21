import axios from 'axios';

export async function getPictures(page = 1, query, per_page) {
  const API_KEY = '42027897-ca60981f5971518ff8fefcb8b';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearcg: true,
    page: page,
    per_page: `${per_page}`,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);

  return response.data;
}
