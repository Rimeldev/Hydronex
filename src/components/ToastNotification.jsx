import { useState, useEffect, useRef } from "react";
import { BellAlertIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function NotificationIndicator({ alert }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(!!alert);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);
  const timerRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Animation d'entrée
  useEffect(() => {
    if (alert) {
      setVisible(true);
      setFadeOut(false);
      // Petite animation d'entrée
      setTimeout(() => setSlideIn(true), 100);
      startAutoHide();
    }
  }, [alert]);

  // Démarre le timer d'auto-hide avec barre de progression
  const startAutoHide = () => {
    clearTimeout(timerRef.current);
    clearInterval(progressTimerRef.current);
    
    setProgressWidth(100);
    const duration = 8000; // 8 secondes
    const interval = 50; // Mise à jour toutes les 50ms
    const decrement = (100 * interval) / duration;

    progressTimerRef.current = setInterval(() => {
      setProgressWidth(prev => {
        const newWidth = prev - decrement;
        if (newWidth <= 0) {
          clearInterval(progressTimerRef.current);
          if (!isHovered) {
            hideNotification();
          }
          return 0;
        }
        return newWidth;
      });
    }, interval);
  };

  // Masque la notification avec animation
  const hideNotification = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      setSlideIn(false);
    }, 500);
  };

  // Gestion du survol
  const handleMouseEnter = () => {
    setIsHovered(true);
    setExpanded(true);
    clearTimeout(timerRef.current);
    clearInterval(progressTimerRef.current);
    setProgressWidth(100); // Arrête la barre de progression
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setExpanded(false);
    startAutoHide(); // Redémarre le timer
  };

  // Fermeture manuelle
  const handleClose = (e) => {
    e.stopPropagation();
    clearTimeout(timerRef.current);
    clearInterval(progressTimerRef.current);
    hideNotification();
  };

  // Navigation vers les recommandations
  const handleClick = () => {
    navigate("/recommendations");
  };

  // Détermine le niveau de criticité
  const getSeverityConfig = () => {
    const severity = alert?.severity || 'medium';
    
    switch (severity.toLowerCase()) {
      case 'high':
      case 'critique':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          hoverBg: 'hover:bg-red-100',
          accentColor: 'bg-red-500',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-red-600'
        };
      case 'medium':
      case 'warning':
        return {
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          hoverBg: 'hover:bg-amber-100',
          accentColor: 'bg-amber-500',
          icon: BellAlertIcon,
          iconColor: 'text-amber-600'
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          hoverBg: 'hover:bg-blue-100',
          accentColor: 'bg-blue-500',
          icon: BellAlertIcon,
          iconColor: 'text-blue-600'
        };
    }
  };

  if (!alert || !visible) return null;

  const severityConfig = getSeverityConfig();
  const IconComponent = severityConfig.icon;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm px-4">
      <div
        className={`
          transform transition-all duration-500 ease-out
          ${slideIn ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          ${fadeOut ? 'translate-x-full opacity-0' : ''}
        `}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className={`
            relative cursor-pointer rounded-lg shadow-lg border backdrop-blur-sm
            transition-all duration-300 ease-in-out overflow-hidden
            ${severityConfig.bgColor} ${severityConfig.borderColor} ${severityConfig.hoverBg}
            ${expanded ? 'shadow-xl scale-[1.02]' : 'shadow-md'}
          `}
        >
          {/* Barre de progression */}
          {!isHovered && progressWidth > 0 && (
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${severityConfig.accentColor}`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          )}

          {/* Contenu principal */}
          <div className={`p-3 ${severityConfig.textColor}`}>
            {expanded ? (
              // Vue étendue
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <IconComponent className={`h-5 w-5 flex-shrink-0 ${severityConfig.iconColor}`} />
                    <h4 className="font-semibold text-sm leading-tight truncate">
                      {alert.title || "Nouvelle alerte"}
                    </h4>
                  </div>
                  <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>

                {alert.deviceName && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-gray-600">Dispositif :</span>
                    <span className="font-medium">{alert.deviceName}</span>
                  </div>
                )}

                <p className="text-sm leading-relaxed">
                  {alert.message}
                </p>

                {alert.timestamp && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>{alert.timestamp}</span>
                  </p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <span>Cliquer pour voir les détails</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ) : (
              // Vue compacte
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <IconComponent className={`h-4 w-4 flex-shrink-0 ${severityConfig.iconColor}`} />
                  <span className="text-sm font-medium truncate">
                    {alert.title || "Nouvelle alerte"}
                  </span>
                </div>
                
                {/* Indicateur de criticité */}
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${severityConfig.accentColor}`} />
                
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors opacity-60 hover:opacity-100"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Animation de pulse pour les alertes critiques */}
          {alert?.severity === 'high' && (
            <div className="absolute inset-0 rounded-lg animate-pulse opacity-20 pointer-events-none">
              <div className={`w-full h-full rounded-lg ${severityConfig.accentColor}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}