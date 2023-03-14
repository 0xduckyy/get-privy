import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-gray-700 via-gray-900 to-black'>
      <Navbar />
      <main className='mb-auto'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
