import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

// Lazy load route components
const HomePage = lazy(() => import("./pages/HomePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const CareerPage = lazy(() => import("./pages/CareerPage"));
const ProjectPage = lazy(() => import("./pages/ProjectsPage"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ErrorPage = lazy(() => import("./components/common/Error"));

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/career" element={<CareerPage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/news/:newsTitle" element={<NewsDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
