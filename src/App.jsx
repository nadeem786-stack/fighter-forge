import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';
import { Toast } from './components/Toast.jsx';
import { QuickViewModal } from './components/QuickViewModal.jsx';
import { GearCommunityModal } from './components/GearCommunityModal.jsx';
import { EventRentalModal } from './components/EventRentalModal.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';

// Pages
import { HomePage } from './pages/HomePage.jsx';
import { BoxingRingsPage } from './pages/BoxingRingsPage.jsx';
import { MmaCagesPage } from './pages/MmaCagesPage.jsx';
import { CartEnquiryPage } from './pages/CartEnquiryPage.jsx';
import { CustomizePage } from './pages/CustomizePage.jsx';
import { StoriesPage } from './pages/StoriesPage.jsx';
import { StoryDetailPage } from './pages/StoryDetailPage.jsx';

const VALID_PAGES = ['home', 'boxing-rings', 'mma-cages', 'customize', 'stories', 'cart'];

function parseCurrentRoute() {
  if (typeof window === 'undefined') {
    return { page: 'home', slug: null };
  }

  const isFile = window.location.protocol === 'file:';
  const rawHash = (window.location.hash || '').replace(/^#\/?/, '').replace(/\/+$/, '').trim();
  const rawPathname = (window.location.pathname || '').replace(/^\/+/, '').replace(/\/+$/, '').trim();

  // Strip file names like index.html or public/index.html from pathname
  let cleanPath = rawPathname
    .replace(/(^|\/)public\/index\.html$/i, '')
    .replace(/(^|\/)index\.html$/i, '')
    .trim();

  // Under file://, pathname includes drive letter and file paths, so NEVER use pathname as route!
  if (isFile) {
    cleanPath = '';
  }

  // Check if hash matches a known page or story
  const isHashPage = VALID_PAGES.includes(rawHash) || rawHash.startsWith('stories/');
  const isPathPage = VALID_PAGES.includes(cleanPath) || cleanPath.startsWith('stories/');

  let candidate = '';
  if (isFile) {
    candidate = isHashPage ? rawHash : 'home';
  } else if (isHashPage) {
    candidate = rawHash;
  } else if (isPathPage) {
    candidate = cleanPath;
  } else if (!cleanPath || cleanPath === 'home') {
    candidate = isHashPage ? rawHash : 'home';
  } else {
    candidate = cleanPath;
  }

  candidate = candidate.replace(/^\/+/, '').replace(/\/+$/, '');

  if (candidate.startsWith('stories/')) {
    const slug = candidate.replace(/^stories\//, '');
    return { page: 'story-detail', slug };
  }
  if (VALID_PAGES.includes(candidate)) {
    return { page: candidate, slug: null };
  }
  return { page: 'home', slug: null };
}

export function App() {
  const [route, setRoute] = useState(() => parseCurrentRoute());
  const [isLoading, setIsLoading] = useState(true);
  const [isGearModalOpen, setIsGearModalOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [preselectedRentalArena, setPreselectedRentalArena] = useState(null);

  const openRentalModal = (arena = null) => {
    setPreselectedRentalArena(arena);
    setIsRentalModalOpen(true);
  };

  // Sync route state with browser back/forward and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      // Check if hash is an in-page section anchor (e.g. #materials-specs)
      const rawHash = (window.location.hash || '').replace(/^#\/?/, '').trim();
      const isAnchorOnly = rawHash && !VALID_PAGES.includes(rawHash) && !rawHash.startsWith('stories/');
      if (isAnchorOnly) {
        const el = document.getElementById(rawHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return; // Do NOT change the page route!
      }

      const next = parseCurrentRoute();
      setRoute(prev => {
        if (prev.page === next.page && prev.slug === next.slug) {
          return prev; // Prevents unnecessary re-render / race conditions!
        }
        return next;
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (target) => {
    let cleanTarget = (target || 'home').replace(/^\/+/, '');
    if (!cleanTarget) cleanTarget = 'home';

    let newPath = '/';
    let targetHash = '#/home';
    let newRoute = { page: 'home', slug: null };

    if (cleanTarget.startsWith('stories/')) {
      const slug = cleanTarget.replace(/^stories\//, '');
      newPath = `/stories/${slug}`;
      targetHash = `#/stories/${slug}`;
      newRoute = { page: 'story-detail', slug };
    } else if (cleanTarget === 'home') {
      newPath = '/';
      targetHash = '#/home';
      newRoute = { page: 'home', slug: null };
    } else {
      newPath = `/${cleanTarget}`;
      targetHash = `#/${cleanTarget}`;
      newRoute = { page: cleanTarget, slug: null };
    }

    const isFile = window.location.protocol === 'file:';

    if (isFile) {
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    } else {
      try {
        window.history.pushState({}, '', newPath);
      } catch (e) {
        if (window.location.hash !== targetHash) {
          window.location.hash = targetHash;
        }
      }
    }

    setRoute(prev => {
      if (prev.page === newRoute.page && prev.slug === newRoute.slug) {
        return prev;
      }
      return newRoute;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { page, slug } = route;

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#E10B1F] selection:text-white bg-concrete-grain">
        {/* Loading Screen on Entry */}
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

        {/* Global Sticky Navbar */}
        <Navbar
          currentPage={page === 'story-detail' ? 'stories' : page}
          navigateTo={navigateTo}
          onOpenRentalModal={() => openRentalModal()}
        />

        {/* Active Page View */}
        <main className="flex-1">
          {page === 'home' && (
            <HomePage
              navigateTo={navigateTo}
              onOpenGearCommunity={() => setIsGearModalOpen(true)}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {page === 'boxing-rings' && (
            <BoxingRingsPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal('Boxing Rings')}
            />
          )}
          {page === 'mma-cages' && (
            <MmaCagesPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal('MMA Cages')}
            />
          )}
          {page === 'customize' && (
            <CustomizePage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {page === 'stories' && (
            <StoriesPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {page === 'story-detail' && (
            <StoryDetailPage
              slug={slug}
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {page === 'cart' && (
            <CartEnquiryPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          navigateTo={navigateTo}
          onOpenGearCommunity={() => setIsGearModalOpen(true)}
          onOpenRentalModal={() => openRentalModal()}
        />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Quick View Spec Modal */}
        <QuickViewModal />

        {/* Stylish Add-To-Cart Toast */}
        <Toast navigateTo={navigateTo} />

        {/* Gear Community & Idea Builder Modal */}
        <GearCommunityModal
          isOpen={isGearModalOpen}
          onClose={() => setIsGearModalOpen(false)}
        />

        {/* Event Rental Modal (IPBL & Pro MMA) */}
        <EventRentalModal
          isOpen={isRentalModalOpen}
          onClose={() => setIsRentalModalOpen(false)}
          preselectedArena={preselectedRentalArena}
        />
      </div>
    </CartProvider>
  );
}
