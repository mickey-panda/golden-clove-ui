"use server"
import { db } from "@/db"; // Ensure this points to your Drizzle database instance
import { addresses } from "@/db/schema/addresses";
import { eq } from "drizzle-orm";

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

export const getAddresses = async (userId: string) => {
  try {
    const userAddresses = await db.select().from(addresses).where(eq(addresses.userId, userId));
    return userAddresses;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw new Error("Failed to retrieve addresses");
  }
};

export const getAddressForId = async (addressId: string) => {
    try {
      const userAddresses = await db.select().from(addresses).where(eq(addresses.addressId, Number(addressId))).limit(1);
      return userAddresses[0];
    } catch (error) {
      console.error("Error fetching address:", error);
      throw new Error("Failed to retrieve address");
    }
  };

export const addAddress = async (userId: string, newAddress: Omit<Address, "addressId">) => {
    try {
      const insertedAddress = await db.insert(addresses).values({
        userId,
        fullName: newAddress.fullName,
        phoneNumber: newAddress.phoneNumber,
        addressLine1: newAddress.addressLine1,
        addressLine2: newAddress.addressLine2 ?? null,
        city: newAddress.city,
        state: newAddress.state,
        country: newAddress.country,
        zipCode: newAddress.zipCode,
        addressType: "Home",
      }).returning();
  
      return insertedAddress;
    } catch (error) {
      console.error("Error adding address:", error);
      throw new Error("Failed to add address");
    }
  };