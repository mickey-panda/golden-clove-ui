const RefundPolicyComponent = () => {
    return (
      <div className="bg-white p-6 md:p-8 max-w-3xl mx-auto rounded-lg">
        <h1 className="text-2xl font-light text-gray-800 text-center tracking-wide">Our Refund Commitment</h1>
        <p className="mt-3 text-sm text-gray-600 text-center">
          At Golden Clove, your satisfaction matters. Refunds or replacements apply under these terms.
        </p>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Eligibility</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>Valid for defective, damaged, or incorrect items.</li>
          <li>Request within 7 days of delivery.</li>
          <li>Items must be unused, in original packaging, with proof of purchase.</li>
        </ul>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Process</h2>
        <p className="mt-2 text-sm text-gray-600">
          Email <span className="font-medium">sales.goldenclove@gmail.com</span> with order details and defect images. Refunds process in 7-10 business days after verification.
        </p>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Exceptions</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>No refunds for opened or used items.</li>
          <li>Sale or promotional items excluded.</li>
        </ul>

        <p className="mt-5 text-sm text-gray-600 text-center">
          Questions? Contact <span className="font-medium">sales.goldenclove@gmail.com</span>.
        </p>
      </div>
    );
  };
  
  export default RefundPolicyComponent;
  