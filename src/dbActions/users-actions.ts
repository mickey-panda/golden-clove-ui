"use server"
import { db } from "@/db/index"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { InferInsertModel } from "drizzle-orm";

export const getUser = async (id : string) =>{
    try{
        const result = await db.select().from(users).where(eq(users.userId, id));
        if(result.length===0){
            console.log("No user was found");
            return null;
        }

        return result[0];
    }catch(error){
        console.log(error);
        return null;
    }
}


type NewUser = InferInsertModel<typeof users>;

export const registerUser = async (user : NewUser) =>{
    try{
        const result = await db.insert(users).values(user).returning();
        return result[0];
    }catch(error){
        console.log(error);
        throw new Error("failed to register user!!!");
    }
}

export const updateUser = async (userId: string, updatedUser: Partial<NewUser>) => {
    if(!userId){
        throw new Error("Can not update the user with out id.");
    }
    try {
        const result = await db
            .update(users)
            .set(updatedUser)
            .where(eq(users.userId, userId))
            .returning();
        return result[0];
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update user!!!");
    }
};


