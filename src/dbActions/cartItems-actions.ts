"use server";
import { db } from "@/db";
import { cartItems } from "../db/schema/cartItems";
import { eq, and, sql } from "drizzle-orm";
import { products } from "@/db/schema/products";

// Define the CartItem type
interface CartItem {
  cartId: number;
  productId: number;
  selectedSize: string; // e.g., "50g", "100g"
  quantity: number; // Can be increased or decreased
  pricePerUnit: number;
  totalPrice: number;
}

// Function to add, update, or remove cart items based on quantity
export const addOrUpdateCartItems = async (items: CartItem[]) => {
  if (!items || items.length === 0) {
    throw new Error("No items provided for the cart.");
  }

  try {
    for (const item of items) {
      const existingItem = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.cartId, item.cartId),
            eq(cartItems.productId, item.productId),
            eq(cartItems.selectedSize, item.selectedSize)
          )
        )
        .limit(1);

      if (existingItem.length > 0) {
        // If quantity is 0 or less, remove the item from the cart
        if (item.quantity <= 0) {
          await db
            .delete(cartItems)
            .where(eq(cartItems.cartItemId, existingItem[0].cartItemId));
        } else {
          // Otherwise, update the quantity and total price
          await db
            .update(cartItems)
            .set({
              quantity: item.quantity,
              totalPrice: (item.pricePerUnit * item.quantity).toString(), // Recalculate total price
            })
            .where(eq(cartItems.cartItemId, existingItem[0].cartItemId));
        }
      } else {
        // Insert new item if it doesn't exist and quantity is more than 0
        if (item.quantity > 0) {
            await db.insert(cartItems).values({
              ...item,
              pricePerUnit: item.pricePerUnit.toString(), // Convert numeric to string
              totalPrice: (item.pricePerUnit * item.quantity).toString(), // Convert calculated value to string
            });
          }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding/updating cart items:", error);
    throw new Error("Failed to add/update items in the cart.");
  }
};

//to get all cartitems for the current cartid
export const getCartItems = async(cartId : number) => {
    if(cartId !== 0){
        try {
            const currentCartItems = 
            await db
            .select({
                cartItemId: cartItems.cartItemId,
                cartId: cartItems.cartId,
                productId: cartItems.productId,
                selectedSize: cartItems.selectedSize,
                quantity: cartItems.quantity,
                pricePerUnit: sql<number>`CAST(${cartItems.pricePerUnit} AS FLOAT)`,  // Cast to number
                totalPrice: sql<number>`CAST(${cartItems.totalPrice} AS FLOAT)`,      // Cast to number
                createdAt: cartItems.createdAt,
                productImage: products.image,
                productName: products.name,
            })
            .from(cartItems)
            .innerJoin(products, eq(cartItems.productId, products.productId))
            .where(eq(cartItems.cartId, cartId))

            return currentCartItems;

        } catch (error) {
            console.log("getting cart items error ->",error);
            return [];
        }
    }
};

//to increase cart item number/quantity
export const increaseCartItem = async (item : CartItem) =>{
  if(!item){
    throw new Error("No item was provided to increase.");
  }

  try {
    //check if item is already in cart?
    const existingItem = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.cartId, item.cartId),
            eq(cartItems.productId, item.productId),
            eq(cartItems.selectedSize, item.selectedSize)
          )
        )
        .limit(1);

        //if item is already in cart then increase the quantity by 1 otherwise create/insert a new cart-item.
        if(existingItem.length === 0){
          await db.insert(cartItems).values({
            ...item,
            quantity: 1,
            pricePerUnit: item.pricePerUnit.toString(), // Convert numeric to string
            totalPrice: (item.pricePerUnit * item.quantity).toString(), // Convert calculated value to string
          });
          
        }else{
          await db
            .update(cartItems)
            .set({
              quantity: existingItem[0].quantity+1, //increased the quantity
              totalPrice: (item.pricePerUnit * (existingItem[0].quantity + 1)).toString(), // Recalculate total price
            })
            .where(eq(cartItems.cartItemId, existingItem[0].cartItemId));
        }

  } catch (error) {
    console.log("Error while increasing the quanity -> ", error);
    throw new Error("Could not increase the quantity for this cart-item.");
  }
};

//to reduce cart item number/quantity
export const reduceCartItem = async (item: CartItem) => {
  if (!item) {
    throw new Error("No item was provided to reduce.");
  }

  try {
    // Check if item exists in the cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, item.cartId),
          eq(cartItems.productId, item.productId),
          eq(cartItems.selectedSize, item.selectedSize)
        )
      )
      .limit(1);

    if (existingItem.length === 0) {
      throw new Error("Item not found in the cart.");
    }

    if (existingItem[0].quantity > 1) {
      // Reduce quantity by 1
      await db
        .update(cartItems)
        .set({
          quantity: existingItem[0].quantity - 1,
          totalPrice: ((existingItem[0].quantity - 1) * item.pricePerUnit).toString(),
        })
        .where(eq(cartItems.cartItemId, existingItem[0].cartItemId));
    } else {
      // Remove item if quantity is 0
      await db
        .delete(cartItems)
        .where(eq(cartItems.cartItemId, existingItem[0].cartItemId));
    }
  } catch (error) {
    console.log("Error while reducing the quantity -> ", error);
    throw new Error("Could not reduce the quantity for this cart-item.");
  }
};

//to remove item from the cart
export const removeCartItem = async (cartItemId : number | 0) => {
  if (cartItemId === 0) {
    throw new Error("No item was provided to reduce.");
  }

  try {
    // Check if item exists in the cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartItemId, cartItemId))
      .limit(1);

    if (existingItem.length === 0) {
      throw new Error("Item not found in the cart.");
    }else{
      await db
        .delete(cartItems)
        .where(eq(cartItems.cartItemId, existingItem[0].cartItemId));
    }


  } catch (error) {
    console.log("Error while deleting the cart item -> ", error);
    throw new Error("Could not delete this cart-item.");
  }
};

//to clear all items from the cart
export const clearCart = async (cartId: number | 0) => {
  if (cartId === 0) {
    throw new Error("No cartId provided to clear the cart.");
  }

  try {
    // Check if the cart has items
    const existingItems = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cartId));

    if (existingItems.length === 0) {
      throw new Error("No items found in the cart.");
    }

    // Delete all items in the cart for the given user
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

  } catch (error) {
    console.error("Error while clearing the cart -> ", error);
    throw new Error("Could not clear the cart.");
  }
};


