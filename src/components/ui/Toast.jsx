function Toast({ message }) {
  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded">
      {message}
    </div>
  );
}

export default Toast;