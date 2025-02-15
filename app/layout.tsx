import { Metadata } from "next"
import "../styles/global.css"
export const metadata : Metadata = {
  title: {
    template: "%s | Been Page",
    default :  "Been Portfolio"
  },
  description: 'my portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}</body>
    </html>
  )
}
