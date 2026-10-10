import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { titleFor } from './data/seo';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Academics } from './pages/Academics';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = titleFor(location.pathname);
  }, [location.pathname]);

  return (
    // reducedMotion="user": when the OS asks for reduced motion, Motion drops
    // transform/layout animations and keeps simple fades.
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      {/* No initial={false} here: Motion passes it down to every motion component on the
          page, which would block all entrance and looping animations on the first load. */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}
      >
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
          exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.18, ease: 'easeIn' } }}
          className="relative z-10 min-h-[70vh]"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}
