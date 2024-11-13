import withAuth from 'next-auth/middleware';


export default withAuth({
    pages: {
        signIn: '/sign-in',
        // signOut: '/signout',
    },
});

export const config = {
    // restricted routes
    matcher: ['/', '/user/home', '/hr/home'],
};
