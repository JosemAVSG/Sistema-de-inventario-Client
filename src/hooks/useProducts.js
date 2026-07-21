import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getproductsRequest,
  getproductRequest,
  createproductsRequest,
  updateproductsRequest,
  deletegetproductsRequest,
} from '@/services/products';

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: () => getproductsRequest().then((r) => r.data),
  });

export const useProduct = (id) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: () => getproductRequest(id).then((r) => r.data),
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createproductsRequest(data).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateproductsRequest(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletegetproductsRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
