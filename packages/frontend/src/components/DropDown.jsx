import React, { useEffect } from "react";
import { useQuery } from "urql";
import { CATEGORIES_QUERY } from "../queries";

export default function DropDown({ isSell, setCategory }) {
  const [result] = useQuery({
    query: CATEGORIES_QUERY,
  });
  let categories = result.data?.categories ?? [];
  if (!isSell) {
    categories = [
      { id: "0x-1", name: "All" },
      ...(result.data?.categories ?? []),
    ];
  }

  useEffect(() => {
    if ((categories.length > 0) & isSell) {
      setCategory(categories[0]);
    }
  }, [categories.length]);

  return (
    <select
      className="rounded-md h-8 w-60 dark:bg-[#363952] text-white cursor-pointer opacity-4"
      onChange={(e) => setCategory(JSON.parse(e.target.value))}
    >
      {categories.map((category) => (
        <option
          className="text-white"
          key={category.id}
          value={JSON.stringify(category)}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}
