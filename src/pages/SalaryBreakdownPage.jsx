const SalaryBreakdownPage = ({
  salaryInput,
  pendingSalaryInput,
  setPendingSalaryInput,
  commitPendingSalary,
}) => {
  const grossSalary =
    salaryInput.basic + salaryInput.hra + salaryInput.special;
  const salaryBreakdown = [
    { name: "Basic Salary", value: salaryInput.basic, color: "bg-blue-500" },
    { name: "HRA", value: salaryInput.hra, color: "bg-green-500" },
    { name: "Special Allowance", value: salaryInput.special, color: "bg-purple-500" },
    { name: "PF", value: salaryInput.pf, color: "bg-red-500" },
    { name: "Professional Tax", value: salaryInput.professionalTax, color: "bg-yellow-500" },
  ];
  const totalDeductions = salaryInput.pf + salaryInput.professionalTax;
  const netSalary = grossSalary - totalDeductions;

  return (
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
              {salaryBreakdown.map((item) => {
                const percentage = (item.value / grossSalary) * 100;
                return (
                  <div
                    key={item.name}
                    className={`${item.color} h-full`}
                    style={{ width: `${percentage}%`, float: 'left', height: '100%' }}
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
};

export default SalaryBreakdownPage;


