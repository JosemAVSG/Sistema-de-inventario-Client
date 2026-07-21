import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProveedorsRequest,
  getProveedorRequest,
  createProveedorRequest,
  updateProveedorRequest,
  deletegetProveedorRequest,
} from '@/services/Proveedor';

export const useProviders = () =>
  useQuery({
    queryKey: ['providers'],
    queryFn: () => getProveedorsRequest().then((r) => r.data),
  });

export const useProvider = (id) =>
  useQuery({
    queryKey: ['providers', id],
    queryFn: () => getProveedorRequest(id).then((r) => r.data),
    enabled: !!id,
  });

export const useCreateProvider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createProveedorRequest(data).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['providers'] }),
  });
};

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateProveedorRequest(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['providers'] }),
  });
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletegetProveedorRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['providers'] }),
  });
};
