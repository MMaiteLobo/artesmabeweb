export const Link = ({ 
    href, 
    children,
    isActive = false,
    onClick
}) => {
    return (
      <a
        href={href}
        onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
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