import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import { useBetSlip } from '@/context/BetSlipContext';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { GameController, House, Receipt, DotsThree, Lightning } from '@phosphor-icons/react';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { navigation, setMobilePanel } = useNavigation();
  const { betSlip } = useBetSlip();
  const isMobile = useIsMobile();

  const handleBetsClick = () => {
    setMobilePanel(null);
    navigate('/my-bets');
  };

  const handleSportsClick = () => {
    if (isMobile) {
      // On mobile, show navigation panel to select sports/leagues
      if (navigation.mobilePanel === 'navigation') {
        setMobilePanel(null);
      } else {
        setMobilePanel('navigation');
      }
    } else {
      // On desktop, navigate to games page
      setMobilePanel(null);
      navigate('/games');
    }
  };

  const handleLiveClick = () => {
    setMobilePanel(null);
    navigate('/games?filter=live');
  };

  const handleOtherClick = () => {
    setMobilePanel(null);
    navigate('/other');
  };

  // Helper for unified nav button style
  const navButtonClass = (active: boolean, extra?: string) =>
    `flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 min-w-[60px] ${
      active ? 'bg-accent text-accent-foreground scale-105' : 'text-muted-foreground hover:text-foreground'
    } ${extra || ''}`;

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-t border-border h-16 flex items-center justify-between px-2 w-full">
      {/* Sports - Far Left */}
      <motion.button
        onClick={handleSportsClick}
        className={navButtonClass((location.pathname === '/games' && !isMobile) || navigation.mobilePanel === 'navigation')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <GameController size={20} weight={(location.pathname === '/games' && !isMobile) || navigation.mobilePanel === 'navigation' ? 'fill' : 'regular'} />
        <span className="text-xs font-medium">Sports</span>
      </motion.button>

      {/* Live - Left of Center */}
      <motion.button
        onClick={handleLiveClick}
        className={navButtonClass(location.search.includes('filter=live'))}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <Lightning size={20} weight={location.search.includes('filter=live') ? 'fill' : 'regular'} />
        <span className="text-xs font-medium">Live</span>
      </motion.button>

      {/* Home - Center (now a button for unified effect) */}
      <motion.button
        onClick={() => { setMobilePanel(null); navigate('/'); }}
        className={navButtonClass(location.pathname === '/', 'p-3 min-w-[70px]') + (location.pathname === '/' ? ' shadow-xl' : ' bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground shadow-lg')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <House size={24} weight={location.pathname === '/' ? 'fill' : 'regular'} />
        <span className="text-xs font-semibold">Home</span>
      </motion.button>

      {/* Bets - Right of Center */}
      <motion.button
        onClick={handleBetsClick}
        className={navButtonClass(location.pathname === '/my-bets', 'relative')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <Receipt size={20} weight={location.pathname === '/my-bets' ? 'fill' : 'regular'} />
        <span className="text-xs font-medium">Bets</span>
        {betSlip.bets.length > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-medium">
            {betSlip.bets.length}
          </div>
        )}
      </motion.button>

      {/* Other - Far Right */}
      <motion.button
        onClick={handleOtherClick}
        className={navButtonClass(location.pathname === '/other')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <DotsThree size={20} weight={location.pathname === '/other' ? 'fill' : 'regular'} />
        <span className="text-xs font-medium">Other</span>
      </motion.button>
    </nav>
  );
}