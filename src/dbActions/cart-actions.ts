"use server"
import { db } from "@/db";
import { cart } from "@/db/schema/cart";
import { eq } from "drizzle-orm"


export const createCart = async (userId : string) =>{
    if(userId === "" || !userId){
        throw new Error("UserId can not be null or empty");
    }
    try{
        const result = await db.insert(cart).values({userId : userId}).returning();
        return result[0];
    }catch(error){
        console.log(error);
        throw new Error("failed to create cart for the user");
    }
}

export const getCart = async (userId : string) =>{
    try{
        const result = await db.select().from(cart).where(eq(cart.userId, userId));
        if(result.length===0){
            console.log("No cart assigned yet");
            return null;
        }

        return result[0];
    }catch(error){
        console.log(error);
        return null;
    }
}