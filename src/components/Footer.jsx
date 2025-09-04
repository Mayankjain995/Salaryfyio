import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Salaryfy.io</span>
          </div>
          <p className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
            Empowering financial literacy • Made with transparency in mind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


