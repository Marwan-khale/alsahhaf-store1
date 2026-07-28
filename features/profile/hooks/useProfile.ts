"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/UserService";
import { queryKeys } from "@/hooks/queryKeys";
import { mutationKeys } from "@/hooks/mutationKeys";

/**
 * uid is passed in explicitly (e.g. from features/auth's useAuth()) rather
 * than read internally, keeping this data-layer hook independent from the
 * auth feature.
 */
export function useProfile(uid: string) {
  const queryClient = useQueryClient();

  const profile = useQuery({
    queryKey: queryKeys.profile.detail(uid),
    queryFn: () => userService.getById(uid),
    enabled: Boolean(uid),
  });

  const update = useMutation({
    mutationKey: mutationKeys.profile.update,
    mutationFn: (data: Parameters<typeof userService.updateProfile>[1]) =>
      userService.updateProfile(uid, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.detail(uid) });
    },
  });

  return { ...profile, update };
}
