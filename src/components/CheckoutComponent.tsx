"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAddress, getAddresses } from "@/dbActions/addresses-action";
import { AddressTypeEnum } from "@/db/schema/enums";
import { useNotification } from "@/contexts/NotificationProvider";

export type AddressType = (typeof AddressTypeEnum)[keyof typeof AddressTypeEnum];


interface Address {
  addressId: number;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const CheckoutComponent = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    addressId: 0,
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
  });

  const{addNotification} = useNotification();



  useEffect(() => {
    if (user) {
      getAddresses(user.uid)
        .then((result) =>
          setAddresses(
            result.map((address) => ({
              ...address,
              addressLine2: address.addressLine2 ?? "", // Handle null values
            }))
          )
        )
        .catch(console.error);
    }
  }, [user]);

  const handleAddNewAddress = async () => {
    if(user){
        addAddress(user.uid, newAddress)
        .then((result)=>{
            setAddresses((prevAddresses) => [...prevAddresses, result[0]]);
            setAddingNew(false);
            addNotification("success","New address added successfully.");
        })
        .catch((error) => {
            console.log(error);
            addNotification("error","Could not add the new address.");
        })
    }else{
        addNotification("info","Login to add a new address.");
    }
    
  }
  
  const handleSelectAddress = (id: number) => {
    setSelectedAddress(id);
    sessionStorage.setItem("selectedAddressId",id.toString());
  };

  return (
    <div className="max-w-lg w-full p-2 flex flex-col h-full">
      {/* Address List Section */}
      {!addingNew && (
        <>
          <div className="flex-grow overflow-hidden">
            <div className="h-full overflow-y-auto px-2 py-1">
              <div className="space-y-4">
                {addresses.map((address) => (
                  <motion.div
                    key={address.addressId}
                    className={`p-4 border rounded-lg shadow-md cursor-pointer transition ${
                      selectedAddress === address.addressId
                        ? "border-yellow-500 bg-yellow-50 shadow-lg scale-101"
                        : "border-gray-300 bg-white hover:border-yellow-400 hover:shadow-lg"
                    }`}
                    onClick={() => handleSelectAddress(address.addressId)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">{address.fullName}</p>
                        <p className="text-sm text-gray-600">{address.phoneNumber}</p>
                        <p className="text-sm text-gray-800">
                          {address.addressLine1}
                          {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
                          {address.city}, {address.state}, {address.country} -{" "}
                          {address.zipCode}
                        </p>
                      </div>
                      {selectedAddress === address.addressId && (
                        <FaCheckCircle className="text-yellow-500 text-xl" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Add New Address Button */}
          <div className="p-2 bg-white">
            <motion.button
              className="flex items-center justify-center w-full py-2 mt-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
              onClick={() => setAddingNew(true)}
              whileHover={{ scale: 1.01 }}
            >
              <FaPlus className="mr-2" /> Add New Address
            </motion.button>
          </div>
        </>
      )}

      {/* Add New Address Form */}
      {addingNew && (
        <div className="flex-grow px-2 py-1">
          <motion.div
            className="p-4 border rounded-lg bg-white shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-3">Enter New Address</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Full Name"
                value={newAddress.fullName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, fullName: e.target.value })
                }
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={newAddress.phoneNumber}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phoneNumber: e.target.value })
                }
              />
              <Input
                placeholder="Address Line 1"
                value={newAddress.addressLine1}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressLine1: e.target.value })
                }
              />
              <Input
                placeholder="Address Line 2 (Optional)"
                value={newAddress.addressLine2 || ""}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressLine2: e.target.value })
                }
              />
              <Input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              <Input
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />
              <Input
                placeholder="Zip Code"
                value={newAddress.zipCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipCode: e.target.value })
                }
              />
              <Input placeholder="Country" value={newAddress.country} disabled />
            </div>
            <div className="space-y-3 mt-4">
              <Button
                onClick={handleAddNewAddress}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-yellow-600 text-white"
              >
                Save Address
              </Button>
              <Button
                onClick={() => setAddingNew(false)}
                className="w-full text-white bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CheckoutComponent;
