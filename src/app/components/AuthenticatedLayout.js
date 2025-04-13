'use client';

import { useAuth } from '@clerk/nextjs';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AuthenticatedLayout({ children }) {
    const { isSignedIn } = useAuth();

    return (
        <>
            {isSignedIn && <Navbar />}
            {children}
            {isSignedIn && <Footer />}
        </>
    );
} 