import {
  type QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { API } from "../lib/axios";

export function useCreateQuery<T>(
  key: QueryKey,
  url: string,
  dataKey?: any,
  params?: object,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await API.get(url, { params });
      console.log(data);
      return dataKey ? data[dataKey] : (data as T);
    },
    ...options,
  });
}

export function useCreateSuspenseQuery<T>(
  key: QueryKey,
  url: string,
  dataKey?: any,
  params?: object,
  options?: Omit<UseSuspenseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useSuspenseQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await API.get(url, { params });
      return dataKey ? data[dataKey] : (data as T);
    },
    ...options,
  });
}

export function useCreateMutation<T>(
  url: string,
  method: "put" | "patch" | "delete" | "post",
  invalidateQueries?: string[][],
  dataKey?: any
) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await API[method](url, payload);
      return dataKey ? (data[dataKey] as T) : (data as T);
    },
    onSuccess: () => {
      if (invalidateQueries?.length) {
        invalidateQueries.forEach((query) => {
          client.invalidateQueries({
            queryKey: [...query],
          });
        });
      }
    },
  });
}
