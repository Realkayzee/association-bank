import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
// Import google font
import { Fira_Code, Fira_Mono, Lato } from "next/font/google"


// google font setup
const fira = Fira_Code({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira'
})

const fira_mono = Fira_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-mono',
    weight: '400'
})

const lato = Lato({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
    weight: '400'
})

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        // setup for font family
        <div className={`${fira.variable} ${fira_mono.variable} ${lato.variable}`}>
            <div className="bg-black overflow-hidden flex flex-col min-h-screen text-neutral-300">
                <Header />
                <div className="md:container md:mx-auto py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
