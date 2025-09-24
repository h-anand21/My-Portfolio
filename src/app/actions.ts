"use server";

import { z } from "zod";
import { initializeFirebase } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  const { name, email, message } = validatedFields.data;
  const { firestore } = initializeFirebase();
  
  const contactData = {
    name,
    email,
    message,
    createdAt: new Date(),
  };

  try {
    const contactsCollection = collection(firestore, "contacts");
    await addDoc(contactsCollection, contactData)
      .catch(serverError => {
        const permissionError = new FirestorePermissionError({
          path: contactsCollection.path,
          operation: 'create',
          requestResourceData: contactData
        });
        errorEmitter.emit('permission-error', permissionError);
        // This throw will be caught by the outer try/catch and result in the user-facing error message.
        throw permissionError;
      });

  } catch (e) {
    console.error("Failed to submit contact form:", e);
    return {
      message: "Something went wrong on the server. Please try again later.",
      success: false,
    };
  }
  
  return {
    message: "Thank you for your message! I'll get back to you soon.",
    success: true,
    errors: undefined,
  };
}
