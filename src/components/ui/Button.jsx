/**
 * Button Component
 * Props:
 * - text
 * - onClick
 */

function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
    >
      {text}
    </button>
  );
}

export default Button;