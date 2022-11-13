export default function Thead({ isSeller, isBuyer }) {
  const isNotBoth = !(isSeller || isBuyer);
  return (
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-slate-500 text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
          ID
        </th>
        {(isBuyer || isNotBoth) && (
          <th className="px-5 py-3 border-b-2 border-slate-500 text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
            Seller
          </th>
        )}
        {(isSeller || isNotBoth) && (
          <th className="px-5 py-3 border-b-2 border-slate-500  text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
            Buyer
          </th>
        )}
        <th className="px-5 py-3 border-b-2 border-slate-500  text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
          Product
        </th>
        <th className="px-5 py-3 border-b-2 border-slate-500  text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
          Ordered at
        </th>
        <th className="px-5 py-3 border-b-2 border-slate-500  text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
          Amount
        </th>
        <th className="px-5 py-3 border-b-2 border-slate-500 text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
          Quantity
        </th>
        <th className="px-5 py-3 border-b-2 border-slate-500  text-left text-xs font-semibold text-white uppercase tracking-wider dark:bg-[#363952]">
          Status
        </th>
      </tr>
    </thead>
  );
}
