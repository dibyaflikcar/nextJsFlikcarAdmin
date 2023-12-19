
import '../globals.css'

// import Sidebar from '../../../components/Sidebar'
// import Header from '../../../components/Header'
// import Footer from '../../../components/Footer'
export const metadata = {
  title: 'Dashboard | Admin',
  description: 'Admin Panel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
