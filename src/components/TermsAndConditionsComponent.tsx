const TermsAndConditionsComponent = () => {
    return (
      <div className="bg-white p-6 md:p-8 max-w-3xl mx-auto rounded-lg">
        <h1 className="text-2xl font-light text-gray-800 text-center tracking-wide">Our Agreement</h1>
        <p className="mt-3 text-sm text-gray-600 text-center">
          Engaging with Golden Clove’s services means you accept these terms.
        </p>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Your Responsibilities</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>You must be with in India in order to place an order successfully.</li>
          <li>Secure your phone number login details. Never share the OTP with others.</li>
          <li>Reselling our spices without permission is not allowed.</li>
        </ul>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Orders & Payments</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>Payments are processed securely through PhonePe.</li>
          <li>We reserve the right to cancel orders due to stock or fraud issues.</li>
          <li>We do not store your financial information since payment is handled by third party.</li>
        </ul>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Liability</h2>
        <p className="mt-2 text-sm text-gray-600">
          Golden Clove isn’t liable for indirect damages from use. Disputes are governed by Indian law.
        </p>

        <p className="mt-5 text-sm text-gray-600 text-center">
          Need clarity? Contact <span className="font-medium">sales.goldenclove@gmail.com</span>.
        </p>
      </div>
    );
  };
  
  export default TermsAndConditionsComponent;
  