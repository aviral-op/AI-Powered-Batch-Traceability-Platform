/**
 * Input Component
 * Props:
 * - label
 * - placeholder
 * - value
 * - onChange
 */

function Input({ label, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}

export default Input;