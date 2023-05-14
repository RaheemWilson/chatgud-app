import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>, canRefetch: boolean = true) {
  const firstTimeRef = React.useRef(true);
  // const canRefetch = true

  useFocusEffect(
    React.useCallback(() => {
      canRefetch && refetch()
    }, [refetch, canRefetch])
  );
}
