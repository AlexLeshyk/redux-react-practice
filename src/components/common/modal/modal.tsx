import classNames from "classnames";
import { FC } from "react";
import "./modal.scss";

interface ModalProps {
  visible: boolean;
  close: () => void;
  children: React.ReactChild | React.ReactNode;
}

const Modal: FC<ModalProps> = ({ visible, close, children }) => {
  const modalClass = classNames({
    modal: true,
    open: visible,
  });

  const modalBackgroundClass = classNames({
    "modal-backdrop": true,
    open: visible,
  });

  return (
    <>
      <div aria-hidden="true" className={modalBackgroundClass} onClick={close} />
      <div className={modalClass}>
        <span role="button" aria-hidden="true" className="modal-close" onClick={close}>
          &times;
        </span>
        {children}
      </div>
    </>
  );
};

export default Modal;
