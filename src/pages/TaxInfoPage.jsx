import { Lightbulb, Shield } from "lucide-react";
import { taxSlabs, calculateTax } from "../utils/tax";

const TaxInfoPage = ({ taxRegime, annualGross, onChangeRegime }) => {
  const taxLiability = calculateTax(annualGross, taxRegime);
  const monthlyTax = taxLiability / 12;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tax Information</h1>
        <p className="text-gray-600 dark:text-gray-300">Understand India's income tax system and plan effectively</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">Tax Regime Comparison</h2>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => onChangeRegime && onChangeRegime("old")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                taxRegime === "old"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Old Regime
            </button>
            <button
              onClick={() => onChangeRegime && onChangeRegime("new")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                taxRegime === "new"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              New Regime
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Slabs ({taxRegime === "old" ? "Old" : "New"} Regime)</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Income Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tax Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Health & Education Cess</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {taxSlabs[taxRegime].map((slab, index) => {
                    const prevLimit = index === 0 ? 0 : taxSlabs[taxRegime][index - 1].limit;
                    const range = index === 0
                      ? `0 - ${slab.limit.toLocaleString()}`
                      : slab.limit === Infinity
                        ? `${(prevLimit + 1).toLocaleString()}+`
                        : `${(prevLimit + 1).toLocaleString()} - ${slab.limit.toLocaleString()}`;
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{range}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{slab.rate}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{slab.cess}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Tax Liability</h3>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Annual Gross Salary:</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{annualGross.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Annual Tax Liability:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">₹{taxLiability.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Monthly Tax:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">₹{monthlyTax.toFixed(0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300">Effective Tax Rate:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{((taxLiability / annualGross) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 rounded">
              <div className="flex">
                <Lightbulb className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Consider tax-saving investments under Section 80C (up to ₹1.5 lakh) to potentially reduce your tax liability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Deductions & Exemptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Section 80C (₹1.5 Lakh)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">PPF, EPF, Life Insurance, ELSS, NSC, 5-year FD</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Section 80D (Health Insurance)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">₹25,000 for self/family, ₹50,000 for senior citizens</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">HRA Exemption</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Based on rent paid, location, and salary components</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Section 80CCD(1B)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Additional ₹50,000 deduction for NPS contributions</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Section 24(b)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Home loan interest deduction up to ₹2 lakh</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Standard Deduction</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">₹50,000 available under both tax regimes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxInfoPage;


