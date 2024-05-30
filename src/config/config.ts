export const config = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    nextAuth: {
        url: process.env.NEXTAUTH_URL,
        secret: process.env.NEXTAUTH_SECRET
    }
}