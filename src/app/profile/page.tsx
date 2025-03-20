"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
// import ComparisonTable from "@/components/ComparisonTable";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getUser, updateUser } from "@/dbActions/users-actions";
import { useAuth } from "@/contexts/AuthProvider";
import { users } from "@/db/schema/users";
import { InferInsertModel } from "drizzle-orm";
import { useMediaQuery } from "react-responsive";


const Profile = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    type NewUser = InferInsertModel<typeof users>;
    const[currentUser, setCurrentUser] = useState<NewUser | null>(null);
    const[isEditing, setIsEditing] = useState(false);
    const[isUpdating, setIsUpdating] = useState(false);
    const[updatedFirstName, setUpdatedFirstName] = useState(currentUser?.firstName);
    const[updatedLastName, setUpdatedLastName] = useState(currentUser?.lastName);
    const[updatedEmail, setUpdatedEmail] = useState(currentUser?.email);
    const[isUpdateError, setIsUpdateError] = useState(false);
    const[updateUserMessage, setUpdateUserMessage] = useState("");
    const {user}=useAuth();

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect (() =>{
       if(user && user.uid){
        getUser(user.uid.toString())
        .then((result)=>setCurrentUser(result))
        .catch((error)=>console.log(error));
       }
    },[user]);

    useEffect(()=>{
        if(currentUser){
            setUpdatedFirstName(currentUser?.firstName);
            setUpdatedLastName(currentUser?.lastName);
            setUpdatedEmail(currentUser?.email);
        }
    },[currentUser]);

    const handleEditProfile = () =>{
        setIsEditing(true);
        setIsUpdating(false);
    }
    const handleConfirmEditProfile = async () =>{
        if(!updatedFirstName || updatedFirstName===""){
            setIsUpdating(false);
            setIsUpdateError(true);
            setUpdateUserMessage("First name is required.");

            return;
        }
        setIsUpdating(true);
        setIsUpdateError(false);
        setUpdateUserMessage("");
        try{
            const updatedUser = await updateUser(currentUser?.userId ?? "", {firstName:updatedFirstName, lastName:updatedLastName, email:updatedEmail});
           
            if(updatedUser){
                setIsUpdating(false);
                setIsUpdateError(true);
                setUpdateUserMessage("Profile has been updated");
                setCurrentUser(updatedUser);
                await delay(1200);
                handleCancelEditProfile();

            }else{
                setIsUpdateError(true);
                setUpdateUserMessage("Could not update the profile!!");
            }
        }catch(error){
            console.log(error);
            setIsUpdateError(true);
            setUpdateUserMessage("Something went wrong!!");
        }

    }
    const handleCancelEditProfile = () =>{
        setIsEditing(false);
        setIsUpdateError(false);
        setUpdateUserMessage("");
        setIsUpdating(false);
        setUpdatedFirstName(currentUser?.firstName);
        setUpdatedLastName(currentUser?.lastName);
        setUpdatedEmail(currentUser?.email);
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>
        
      {/* main section */}  
      <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        {isEditing && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
            >
            {isUpdating && (
                <div className="flex items-center justify-center">
                <p className="text-yellow-500 text-center mt-4 mr-8">Updating your profile </p>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
            )}
            {isUpdateError && (
                <div className="flex items-center justify-center">
                <p className="text-yellow-500 text-center mt-4 mr-8">{updateUserMessage}</p>
            </div>
            )}
            
            <input
              type="text"
              disabled={isUpdating}
              placeholder="Enter new First name"
              className={`${isMobile ? "w-full" : "w-96"} p-3 mt-4 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500`}
              value={updatedFirstName!}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
            />
            <input
              type="text"
              disabled={isUpdating}
              placeholder="Enter new Last name"
              className={`${isMobile ? "w-full" : "w-96"} p-3 mt-4 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500`}
              value={updatedLastName!}
              onChange={(e) => setUpdatedLastName(e.target.value)}
            />
            <input
              type="text"
              disabled={isUpdating}
              placeholder="Enter Email"
              className={`${isMobile ? "w-full" : "w-96"} p-3 mt-4 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500`}
              value={updatedEmail ?? ""}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            <p className="text-gray-500">{currentUser?.phoneNumber}</p>
  
            <button 
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                onClick={handleConfirmEditProfile}
                disabled={isUpdating}>
              Confirm
            </button>
            <button 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" 
                onClick={handleCancelEditProfile}
                disabled={isUpdating}>
              Cancel
            </button>
          </motion.div>
        )}

        {!isEditing && (
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
          >
            <div className="w-35 h-35 bg-gray-300 text-black flex items-center justify-center rounded-full text-xl font-bold overflow-hidden border-2 border-yellow-500">
              {currentUser?.firstName?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{currentUser?.firstName}</h2>
            <p className="text-gray-500">{currentUser?.email}</p>
            <p className="text-gray-500">{currentUser?.phoneNumber}</p>
  
            <button 
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                onClick={handleEditProfile}>
              Edit Profile
            </button>

          </motion.div>
        )}

        {/* Tabs for Orders, Payments, Addresses */}
        <div className="mt-6">
        <Tabs defaultValue="orders" className="mt-6">
            <TabsList className="flex space-x-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
                <Orders />
            </TabsContent>
            <TabsContent value="payments">
                <Payments />
            </TabsContent>
            <TabsContent value="addresses">
                <Addresses />
            </TabsContent>
        </Tabs>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

const Orders = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 bg-white p-6 shadow-lg rounded-2xl"
    >
      <h3 className="text-lg font-semibold mb-2">Your Orders</h3>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Golden Clove Spice Pack</h4>
          <p className="text-sm text-gray-500">Order #12345</p>
        </div>
        <span className="text-green-600 font-semibold">Delivered</span>
      </div>
    </motion.div>
  );

  const Payments = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 bg-white p-6 shadow-lg rounded-2xl"
    >
      <h3 className="text-lg font-semibold mb-2">Payment History</h3>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">₹499 - Golden Clove Spices</h4>
          <p className="text-sm text-gray-500">Paid via UPI</p>
        </div>
        <span className="text-blue-600 font-semibold">Completed</span>
      </div>
    </motion.div>
  );

  const Addresses = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 bg-white p-6 shadow-lg rounded-2xl"
    >
      <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>
      <div className="p-4 border rounded-lg">
        <h4 className="font-medium">Home</h4>
        <p className="text-sm text-gray-500">
          123, Main Street, Bhubaneswar, Odisha, India
        </p>
      </div>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Add New Address
      </button>
    </motion.div>
  );

export default Profile;
