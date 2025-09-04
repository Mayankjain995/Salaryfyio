import { Info, PieChart, BarChart2, TrendingUp } from "lucide-react";
import SIPCalculator from "../components/SIPCalculator";
import { educationContent } from "../data/educationContent";

const EducationPage = () => {
  return (
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
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <div className="flex items-center mb-3">
              <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">SIP Calculator</h3>
            </div>
            <SIPCalculator />
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
};

export default EducationPage;


