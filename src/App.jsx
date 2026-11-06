import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Link } from "react-router-dom";

const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PaintingDetail = lazy(() => import("./pages/PaintingDetail"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Collaborations = lazy(() => import("./pages/Collaborations"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="page-intro container" role="status">Loading page…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<PaintingDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<section className="page-intro container not-found"><p className="eyebrow">404 / Page not found</p><h1>Lost your way?</h1><p>This page does not exist.</p><Link className="button button-dark" to="/">Return Home ↗</Link></section>} />
        </Routes>
      </Suspense>
    </Layout>
  )
}


export default App;
