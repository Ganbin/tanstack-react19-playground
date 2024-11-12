import { queryOptions, useQuery } from "@tanstack/react-query";

type Item = {
  id: number;
  label: string;
  pending?: boolean;
};

const getItems = (): Promise<Item[]> => {
  return new Promise<Item[]>((resolve) => {
    const storedItems = localStorage.getItem("items-list");
    const items: Item[] = storedItems ? JSON.parse(storedItems) : [];

    resolve(items);
  });
};

const itemsQueryOptions = () => {
  return queryOptions({
    queryKey: ["items"],
    queryFn: () => getItems(),
  });
};

const useItems = () => {
  return useQuery(itemsQueryOptions());
};

export { useItems, type Item };
