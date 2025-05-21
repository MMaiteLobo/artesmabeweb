import { useScrollTo } from '../../hooks/useScrollTo';

export const Link = ({ 
    href, 
    children,
    isActive = false,
    onClick
}) => {
    const { scrollToElement } = useScrollTo();

    return (
      <a
        href={href}
        onClick={(e) => {
            e.preventDefault();
            const elementId = href.replace('#', '');
            scrollToElement(elementId, 64); // 64px es la altura del navbar
            if (onClick) onClick();
          }}
          className={`relative font-medium text-sm transition-colors duration-300 
            ${isActive 
              ? 'text-purple-700' 
              : 'text-gray-600 hover:text-purple-700'
            }
            after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 
            after:bg-purple-700 after:transition-all after:duration-300 
            hover:after:w-full
          `}
        >
          {children}
        </a>
      );
    };