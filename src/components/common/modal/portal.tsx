import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  className: string;
  children: React.ReactChild | React.ReactNode;
  el: string;
}

const Portal: FC<PortalProps> = ({ children, className, el }): JSX.Element => {
  const [container] = useState(() => document.createElement(el));

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction) {
      container.classList.add(className);
      document.body.appendChild(container);
    }

    return () => {
      document.body.removeChild(container);
      cleanupFunction = true;
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
