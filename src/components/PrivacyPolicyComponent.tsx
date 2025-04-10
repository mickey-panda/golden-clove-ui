const PrivacyPolicyComponent = () => {
    return (
      <div className="bg-white p-6 md:p-8 max-w-3xl mx-auto rounded-lg">
        <h1 className="text-2xl font-light text-gray-800 text-center tracking-wide">Your Privacy, Our Pledge</h1>
        <p className="mt-3 text-sm text-gray-600 text-center">
          Golden Clove values your trust. This outlines how we handle your data with care.
        </p>

        <h2 className="mt-5 text-lg font-medium text-gray-800">What We Collect</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>Name, email, and phone number from registration.</li>
          <li>Payment details via secure third-party gateways.</li>
          <li>Browsing data, like IP address and usage patterns.</li>
        </ul>

        <h2 className="mt-5 text-lg font-medium text-gray-800">How We Use It</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>To fulfill and deliver your orders.</li>
          <li>To refine our services with your input.</li>
          <li>To share offers, if you choose to receive them.</li>
        </ul>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Safeguarding Your Data</h2>
        <p className="mt-2 text-sm text-gray-600">
          We use robust security to protect your information. Payments are handled by trusted partners.
        </p>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Your Choices</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>View, edit, or remove your data on request.</li>
          <li>Opt out of marketing anytime.</li>
        </ul>

        <p className="mt-5 text-sm text-gray-600 text-center">
          Questions? Reach <span className="font-medium">sales.goldenclove@gmail.com</span>.
        </p>
      </div>
    );
  };
  
  export default PrivacyPolicyComponent;
  