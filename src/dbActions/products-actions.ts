"use server"
import { db } from "@/db";
import { products } from "@/db/schema/products";


export const getProducts = async () =>{
    try{
        const result = await db.select().from(products);
        if(result.length===0){
            console.log("No product found");
            return [];
        }

        return result;
    }catch(error){
        console.log(error);
        return [];
    }
}