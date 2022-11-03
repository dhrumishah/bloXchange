import React from "react";
import { useQuery } from 'urql';
import { CATEGORIES_QUERY } from "../queries"

export default function DropDown({ isSell }) {
  const [result] = useQuery({
    query: CATEGORIES_QUERY
  })
  let categories = result.data?.categories ?? []
  if (!isSell) {
    categories = [{ id: '0x-1', name: 'All' }, ...(result.data?.categories ?? [])];
  }
  return (
    <select className="rounded-md h-8 w-60 dark:bg-[#363952] text-black cursor-pointer opacity-4">
      {categories.map(category => (<option className="text-black" key={category.id}>{category.name}</option>))}
    </select>
  );
}
