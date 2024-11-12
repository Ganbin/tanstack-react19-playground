import { queryClient } from "../App";
import type { Item } from "./get-items";

const createItem = async (item: Omit<Item, "id">): Promise<Item> => {
  console.log("createItem start");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Keep the artificial delay

  const storedItems = localStorage.getItem("items-list");
  const items: Item[] = storedItems ? JSON.parse(storedItems) : [];

  if (items.length > 10) {
    items.length = 0;
  }

  const newItem = { id: Date.now(), ...item };
  items.push(newItem);

  localStorage.setItem("items-list", JSON.stringify(items));

  queryClient.invalidateQueries({ queryKey: ["items"] });

  console.log("createItem end");
  return newItem;
};

export { createItem };
