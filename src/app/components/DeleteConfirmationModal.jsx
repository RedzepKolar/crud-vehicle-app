const DeleteConfirmationModal = ({ vehicle, isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 border border-gray-400">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">"{vehicle.name}"?</span>
        </p>
        <div className="flex justify-end">
          <button
            className="mr-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
