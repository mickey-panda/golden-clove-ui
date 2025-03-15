const PrivacyPolicyComponent = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Privacy Policy</h1>
        <p className="mt-4 text-gray-700">
          At Golden Clove, we respect your privacy and are committed to protecting your personal 
          information. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Information We Collect</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Personal details (name, email, phone number) provided during registration.</li>
          <li>Payment information for order processing (secured by third-party gateways).</li>
          <li>Website usage data, such as browsing behavior and IP address.</li>
        </ul>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>To process and deliver your orders.</li>
          <li>To improve our services based on user feedback.</li>
          <li>To send promotional emails (if you opt-in).</li>
        </ul>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Data Protection</h2>
        <p className="mt-2 text-gray-700">
          We implement strict security measures to prevent unauthorized access to your information. Your 
          payment details are processed through trusted third-party services.
        </p>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Your Rights</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>You can request to view, update, or delete your personal data.</li>
          <li>You can opt out of marketing communications at any time.</li>
        </ul>
  
        <p className="mt-6 text-gray-700">
          For any privacy-related queries, please contact <strong>privacy@goldenclove.com</strong>.
        </p>
      </div>
    );
  };
  
  export default PrivacyPolicyComponent;
  