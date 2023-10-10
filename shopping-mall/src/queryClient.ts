import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// import { getTodos, postTodo } from '../my-api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOBJ = { [key: string]: any };

const BASE_URL = 'https://fakestoreapi.com';

// Create a client
export const getClient = (() => {
  let client: QueryClient | null = null; 
  return () => {
    if (!client) client = new QueryClient({});
    return client;
  };
})();

export const fetcher = async ({
  method,
  path, 
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    const url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
      }
    }
    const res = await fetch(url, fetchOptions)
    const json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
};

export const Querykeys = {
  PRODUCTS: 'PRODUCTS',
};