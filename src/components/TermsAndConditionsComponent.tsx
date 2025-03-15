const TermsAndConditionsComponent = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Terms and Conditions</h1>
        <p className="mt-4 text-gray-700">
          By using the Golden Clove website and services, you agree to the following terms and conditions.
        </p>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">User Responsibilities</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>You must be at least 18 years old to make a purchase.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>Unauthorized resale of our products is strictly prohibited.</li>
        </ul>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Orders and Payments</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>All payments must be made via our secure payment gateway.</li>
          <li>Golden Clove reserves the right to cancel orders due to stock unavailability or fraudulent activity.</li>
        </ul>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Liabilities</h2>
        <p className="mt-2 text-gray-700">
          Golden Clove shall not be liable for any indirect damages arising from product usage. Any legal 
          disputes will be resolved in accordance with the laws of India.
        </p>
  
        <p className="mt-6 text-gray-700">
          If you have questions regarding our terms, contact <strong>legal@goldenclove.com</strong>.
        </p>
      </div>
    );
  };
  
  export default TermsAndConditionsComponent;
  