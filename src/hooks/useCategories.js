import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCategorysRequest,
  getCategoryRequest,
  createCategorysRequest,
  updateCategorysRequest,
  deletegetCategorysRequest,
} from '@/services/categorias';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategorysRequest().then((r) => r.data),
  });

export const useCategory = (id) =>
  useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryRequest(id).then((r) => r.data),
    enabled: !!id,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCategorysRequest(data).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCategorysRequest(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletegetCategorysRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
};
