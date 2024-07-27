//layout.js
import React from 'react';
import { Inter } from 'next/font/google'
import Header from "@/src/components/sagri/header/Header";
import Footer from "@/src/components/sagri/footer/FooterBar";
import FooterBar from '@/src/components/sagri/footer/FooterBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home - SAGRICHAIN'
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
            <main>
              {/* <div> */}
                {children}
              {/* </div> */}
            </main>
            <FooterBar />
      </body>
    </html>
  )
}

