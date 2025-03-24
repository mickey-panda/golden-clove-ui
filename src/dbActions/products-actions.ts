"use server"
import { db } from "@/db";
import { products } from "@/db/schema/products";
import { eq } from "drizzle-orm";


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

export const getProductImage = async (productId : number) =>{
    try{
        const result = await db.select({
            image : products.image,
        })
        .from(products)
        .where(eq(products.productId, productId))
        .limit(1);
        if(result.length===0){
            console.log("No product image found");
            return "";
        }

        return result;
    }catch(error){
        console.log(error);
        return "";
    }
}