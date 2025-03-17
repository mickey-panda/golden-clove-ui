const RefundPolicyComponent = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Refund Policy</h1>
        <p className="mt-4 text-gray-700">
          At Golden Clove, we strive to ensure the satisfaction of our customers. If you are not 
          satisfied with your purchase, you may be eligible for a refund or replacement, subject to the 
          following conditions.
        </p>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Eligibility for Refund</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Refunds are only applicable for defective, damaged, or incorrect items received.</li>
          <li>Requests must be made within 7 days of receiving the product.</li>
          <li>Products must be unused, in their original packaging, and returned with proof of purchase.</li>
        </ul>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Refund Process</h2>
        <p className="mt-2 text-gray-700">
          To request a refund, please contact us at <strong>support@goldenclove.com</strong> with 
          your order details and images of the defective product. Upon verification, a refund will be processed 
          within 7-10 business days.
        </p>
  
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Exceptions</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Opened or used products are not eligible for refunds.</li>
          <li>Refunds are not applicable for sale items or promotional offers.</li>
        </ul>
  
        <p className="mt-6 text-gray-700">
          If you have any concerns, please reach out to us at <strong>support@goldenclove.com</strong>.
        </p>
      </div>
    );
  };
  
  export default RefundPolicyComponent;
  