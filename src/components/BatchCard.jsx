function Card({ batchId, product, status }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold">{batchId}</h3>

      <p>{product}</p>

      <p className="mt-2 font-semibold">
        Status: {status}
      </p>
    </div>
  );
}

export default Card;