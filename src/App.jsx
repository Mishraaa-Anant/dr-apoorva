import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import AdminAppointments from './pages/AdminAppointments';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/admin" element={<AdminAppointments />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
