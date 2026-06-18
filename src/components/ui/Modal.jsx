/**
 * Modal Component
 * Props:
 * isOpen - open/close modal
 * onClose - close function
 * title - modal heading
 * children - modal content
 */

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="text-red-500 font-bold"
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;