import { useState } from "react";

import { useCreateItem } from "./create-item";
import { Item, useItems } from "./get-items";

const Items = () => {
  const [label, setLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: createItem } = useCreateItem();
  const { data: items } = useItems();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          if (!formData.get("label")) {
            setErrorMessage("Label cannot be empty");
            return;
          }
          const item: Item = {
            id: Date.now(),
            label: formData.get("label") as string,
          };
          createItem(item);
          setLabel("");
          setErrorMessage("");
        }}
        className="space-y-4"
      >
        <div className="flex gap-4">
          <input
            name="label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter item label"
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 
                     bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                     focus:border-transparent outline-none transition-all text-gray-800 
                     dark:text-gray-200"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 
                     transition-colors duration-200 focus:ring-2 focus:ring-primary-500 
                     focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Add Item
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Items List
          </h2>
          <span
            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 
                         dark:text-primary-300 rounded-full text-sm"
          >
            {items?.length} items
          </span>
        </div>

        <div className="space-y-2">
          {items?.map((item, i) => (
            <div
              key={item.id || i}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border 
                       border-gray-100 dark:border-gray-700 hover:border-primary-200 
                       dark:hover:border-primary-800 transition-all"
            >
              <div className="flex justify-between items-center">
                {item.pending ? (
                  <p className="text-gray-200 dark:text-gray-600">
                    {item.label} (pending)
                  </p>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {item.label}
                  </p>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  #{item.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
