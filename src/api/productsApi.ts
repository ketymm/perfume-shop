import axios from 'axios';
import type { Product, ProductsResponse } from '../types/product';

/** DummyJSON exposes a real "fragrances" product category — we use it
 *  as a stand-in catalogue API so the storefront has genuine, varied
 *  perfume data (names, prices, ratings, images, stock) to render. */
const client = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export async function fetchFragrances(limit = 30, skip = 0): Promise<ProductsResponse> {
  const { data } = await client.get<ProductsResponse>('/products/category/fragrances', {
    params: { limit, skip },
  });
  return data;
}

export async function fetchFragranceById(id: number): Promise<Product> {
  const { data } = await client.get<Product>(`/products/${id}`);
  return data;
}

export async function searchFragrances(query: string): Promise<ProductsResponse> {
  const { data } = await client.get<ProductsResponse>('/products/search', {
    params: { q: query },
  });
  return {
    ...data,
    products: data.products.filter((p) => p.category === 'fragrances'),
  };
}

export default client;
