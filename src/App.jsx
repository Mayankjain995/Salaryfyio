
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SalaryBreakdownPageComp from "./pages/SalaryBreakdownPage";
import TaxInfoPageComp from "./pages/TaxInfoPage";
import EducationPageComp from "./pages/EducationPage";

const App = () => {
  const [activePage, setActivePage] = useState("salary");
  const [darkMode, setDarkMode] = useState(false);
  const [salaryInput, setSalaryInput] = useState({
    basic: 50000,
    hra: 20000,
    special: 15000,
    pf: 1800,
    professionalTax: 200,
  });
  const [pendingSalaryInput, setPendingSalaryInput] = useState({
    basic: "50000",
    hra: "20000",
    special: "15000",
    pf: "1800",
    professionalTax: "200",
  });
  const [taxRegime, setTaxRegime] = useState("new");

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Keep the pending state aligned when base state changes
  useEffect(() => {
    const asStrings = Object.fromEntries(
      Object.entries(salaryInput).map(([k, v]) => [k, String(v)])
    );
    setPendingSalaryInput(asStrings);
  }, [salaryInput]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const commitPendingSalary = () => {
    const asNumbers = Object.fromEntries(
      Object.entries(pendingSalaryInput).map(([k, v]) => [k, v === "" ? 0 : parseInt(v, 10)])
    );
    setSalaryInput(asNumbers);
  };

  // (Calculations and education content moved into dedicated components/utils)

  const Navigation = () => null;

  const SalaryBreakdownPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Salary Breakdown</h1>
        <p className="text-gray-600 dark:text-gray-300">Understand your compensation structure clearly</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enter Your Salary Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(salaryInput).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                inputMode="numeric"
                // pattern="[0-9]*"
                value={pendingSalaryInput[key]}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  setPendingSalaryInput({ ...pendingSalaryInput, [key]: digitsOnly });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    commitPendingSalary();
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={commitPendingSalary}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Salary Components</h3>
          <div className="space-y-3">
            {salaryBreakdown.slice(0, 3).map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                <span className="font-medium text-gray-900 dark:text-white">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-gray-900 dark:text-white">Gross Salary</span>
              <span className="text-indigo-600 dark:text-indigo-400">₹{grossSalary.toLocaleString()}</span>
            </div>
          </div>

          <h4 className="font-medium text-gray-900 dark:text-white mt-4 mb-2">Deductions</h4>
          <div className="space-y-3">
            {salaryBreakdown.slice(3).map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                <span className="font-medium text-red-600 dark:text-red-400">-₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
            <div className="flex justify-between items-center font-bold text-xl">
              <span className="text-gray-900 dark:text-white">Net Salary</span>
              <span className="text-green-600 dark:text-green-400">₹{netSalary.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visual Breakdown</h3>
          <div className="relative h-64 mb-4">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {salaryBreakdown.map((item, index) => {
                const percentage = (item.value / grossSalary) * 100;
                return (
                  <div
                    key={item.name}
                    className={`${item.color} h-full`}
                    style={{
                      width: `${percentage}%`,
                      float: 'left',
                      height: '100%'
                    }}
                    title={`${item.name}: ${percentage.toFixed(1)}%`}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {salaryBreakdown.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className={`w-3 h-3 rounded-sm ${item.color} mr-2`}></div>
                <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TaxInfoPage = () => (
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
              onClick={() => setTaxRegime("old")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                taxRegime === "old"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Old Regime
            </button>
            <button
              onClick={() => setTaxRegime("new")}
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
                    const prevLimit = index === 0 ? 0 : taxSlabs[taxRegime][index-1].limit;
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

  const EducationPage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Financial Education</h1>
        <p className="text-gray-600 dark:text-gray-300">Empowering you with financial knowledge for better decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {educationContent.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                <item.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Financial Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <PieChart className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">SIP Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Estimate your mutual fund returns over time with systematic investing.</p>
            <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              Calculate
            </button>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <BarChart2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">EMI Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Calculate your loan repayment schedule and interest costs.</p>
            <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              Calculate
            </button>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Retirement Planner</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Estimate how much you need to save for a comfortable retirement.</p>
            <button className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              Plan
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Did You Know?</h3>
            <p className="text-indigo-800 dark:text-indigo-200">
              By investing just ₹5,000 per month in a mutual fund with 12% annual returns, you could accumulate over ₹1 crore in 30 years due to the power of compounding. Start early to maximize your wealth creation potential!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (activePage) {
      case "salary":
        return <SalaryBreakdownPage />;
      case "tax":
        return <TaxInfoPage />;
      case "education":
        return <EducationPage />;
      default:
        return <SalaryBreakdownPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <NavBar activePage={activePage} setActivePage={setActivePage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {(() => {
          switch (activePage) {
            case "salary":
              return (
                <SalaryBreakdownPageComp
                  salaryInput={salaryInput}
                  pendingSalaryInput={pendingSalaryInput}
                  setPendingSalaryInput={setPendingSalaryInput}
                  commitPendingSalary={commitPendingSalary}
                />
              );
            case "tax":
              return (
                <TaxInfoPageComp
                  taxRegime={taxRegime}
                  annualGross={(salaryInput.basic + salaryInput.hra + salaryInput.special) * 12}
                  onChangeRegime={setTaxRegime}
                />
              );
            case "education":
              return <EducationPageComp />;
            default:
              return (
                <SalaryBreakdownPageComp
                  salaryInput={salaryInput}
                  pendingSalaryInput={pendingSalaryInput}
                  setPendingSalaryInput={setPendingSalaryInput}
                  commitPendingSalary={commitPendingSalary}
                />
              );
          }
        })()}
      </main>
      <Footer />
    </div>
  );
};

export default App;