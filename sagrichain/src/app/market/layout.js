// layout.js
import React from 'react';
import { Inter } from 'next/font/google'
import Header from "@/src/components/market/header/Header";
import FooterBar from '@/src/components/market/footer/FooterBar';
import Footer from "@/src/components/sagri/footer/FooterBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SAGRICHAIN: Marketplace'
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>
          <Header />
          <main>
            {children}
          </main>
        </div>
        <footer className="w-full text-center bottom-0">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
