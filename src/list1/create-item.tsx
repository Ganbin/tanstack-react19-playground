import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import type { Item } from "./get-items";

const createItem = async (item: Omit<Item, "id">): Promise<Item> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Keep the artificial delay

  const storedItems = localStorage.getItem("items-list");
  const items: Item[] = storedItems ? JSON.parse(storedItems) : [];

  if (items.length > 10) {
    items.length = 0;
  }

  const newItem = { id: Date.now(), ...item };
  items.push(newItem);

  localStorage.setItem("items-list", JSON.stringify(items));

  return newItem;
};

const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["items"],
      });

      const snapshot = queryClient.getQueryData(["items"]);

      queryClient.setQueryData(["items"], (previousItems: Item[]) => [
        ...(previousItems ?? []),
        { ...variables, pending: true },
      ]);

      return () => {
        queryClient.setQueryData(["items"], snapshot);
      };
    },
    onError: (_err, _variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
};

export { useCreateItem };
