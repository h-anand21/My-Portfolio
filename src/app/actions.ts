"use server";

import { z } from "zod";
import { initializeApp, getApps, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credential } from "firebase-admin";

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

// Helper function to initialize Firebase Admin SDK on the server
function initializeFirebaseAdmin(): App {
    if (getApps().length > 0) {
        return getApps()[0];
    }
    // Check if the service account key is available in environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        return initializeApp({
            credential: credential.json(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
        });
    }
    // Fallback for local development or other environments without the service account key in the env.
    // Ensure you have the service account file locally and GOOGLE_APPLICATION_CREDENTIALS is set.
    return initializeApp();
}

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
  
  try {
    const adminApp = initializeFirebaseAdmin();
    const firestore = getFirestore(adminApp);
    
    const contactData = {
      name,
      email,
      message,
      createdAt: new Date(),
    };

    const contactsCollection = firestore.collection("contacts");
    await contactsCollection.add(contactData);

  } catch (e) {
    console.error("Failed to submit contact form:", e);
    // In a real app, you might want to avoid exposing raw error messages.
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      message: `Something went wrong on the server: ${errorMessage}. Please try again later.`,
      success: false,
    };
  }
  
  return {
    message: "Thank you for your message! I'll get back to you soon.",
    success: true,
    errors: undefined,
  };
}
