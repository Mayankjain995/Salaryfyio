import { useState, useMemo } from "react";

const SIPCalculator = () => {
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("30");

  const { invested, maturity, gains } = useMemo(() => {
    const p = parseFloat(monthly || "0");
    const r = parseFloat(rate || "0") / 100 / 12; // monthly rate
    const n = parseInt(years || "0", 10) * 12; // months
    const maturityVal = r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const investedVal = p * n;
    return {
      invested: investedVal,
      maturity: maturityVal,
      gains: maturityVal - investedVal,
    };
  }, [monthly, rate, years]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Monthly Investment (₹)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value.replace(/\D/g, ""))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Expected Return (% p.a.)</label>
          <input
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ""))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Time Horizon (years)</label>
          <input
            type="text"
            inputMode="numeric"
            value={years}
            onChange={(e) => setYears(e.target.value.replace(/\D/g, ""))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-indigo-50 dark:bg-indigo-900/30 min-w-0">
          <div className="text-xs text-gray-600 dark:text-gray-300">Total Invested</div>
          <div className="text-xl md:text-lg font-semibold text-indigo-700 dark:text-indigo-300 truncate">₹{invested.toFixed(0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded bg-green-50 dark:bg-green-900/30 min-w-0">
          <div className="text-xs text-gray-600 dark:text-gray-300">Estimated Maturity</div>
          <div className="text-xl md:text-lg font-semibold text-green-700 dark:text-green-300 truncate">₹{maturity.toFixed(0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded bg-blue-50 dark:bg-blue-900/30 min-w-0 sm:col-span-2 md:col-span-1">
          <div className="text-xs text-gray-600 dark:text-gray-300">Wealth Gains</div>
          <div className="text-xl md:text-lg font-semibold text-blue-700 dark:text-blue-300 truncate">₹{gains.toFixed(0).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;


