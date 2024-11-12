import Items from "./items";

export function List1() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold dark:text-gray-200">
        List 1 - Tanstack Query Optimistic
      </h1>
      <Items />
    </div>
  );
}
