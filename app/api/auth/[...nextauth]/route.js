import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
const handler = NextAuth({
  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Log user and account details when the JWT is created or updated
    async jwt({ token, account, profile }) {
      console.log("JWT Callback - Token:", token); 
      // JWT payload
      console.log("JWT Callback - Account:", account); // Account details
      console.log("JWT Callback - Profile:", profile);
      // if (account && profile) {
      //   token.email = profile.email; // Add email to the token
      //   token.name = profile.name; // Ensure name is set
      // }
      const client = await clientPromise;
      const db= client.db("imean");
      const collection= db.collection("itsscary")
      const existingUser = await collection.findOne({ email: token.email });

      if (!existingUser) {
        // Insert the user into the database only if they don't already exist
        await collection.insertOne({
          name: token.name,
          email: token.email,
        });
      } else {
        // If the user already exists, you could just update their information if needed
        // or you can leave this empty if no update is needed.
        console.log("User already exists in the database.");
      }

      // Return the token for session usage
      return token;
    },


    // Log session details when a session is created or checked
    async session({ session, token }) {
      console.log("Session Callback - Session:", session); // Session details
      console.log("Session Callback - Token:", token);

    // Token passed to session
      return session;
      
    },
  },
});

export { handler as GET, handler as POST };
