const RefundPolicyComponent = () => {
    return (
      <div className="bg-white p-6 md:p-8 max-w-3xl mx-auto rounded-lg">
        <h1 className="text-2xl font-light text-gray-800 text-center tracking-wide">Our Shipping and Refund Commitment</h1>
        <p className="mt-3 text-sm text-gray-600 text-center">
          At Golden Clove, your satisfaction matters. Shipping, Refunds or replacements apply under these terms.
        </p>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Shipping Policy</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>Once an order is placed, it will be confirmed within the next 12 hours.</li>
          <li>Orders will be shipped via our third-party shipping partners.</li>
          <li>Items will be shipped within 4-5 days.</li>
          <li>Delays in shipping may occur due to bank or government holidays, or other unforeseen circumstances.</li>
        </ul>

        <h2 className="mt-5 text-lg font-medium text-gray-800">Return and Refund Policy</h2>
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
          <li>Return or refund requests can be raised within 3 days of order delivery.</li>
          <li>Upon verification of eligibility, refunds will be processed within 3-4 working days.</li>
          <li>Refunds will be credited to the original payment method within 3-4 days of confirmation.</li>
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

        <p className="mt-5 text-sm text-gray-600 text-center">
          <span className="font-medium">Founder</span> : Gitanjali Panda
        </p>
        <p className="mt-5 text-sm text-gray-600 text-center">
          <span className="font-medium">Fssai</span> : 22025038000018
        </p>
      </div>
    );
  };
  
  export default RefundPolicyComponent;
  