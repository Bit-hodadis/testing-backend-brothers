const DeleteModal = ({ onDelete, onCancel }) => {
  const deleleteHandler = () => {
    onDelete();
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-navy-800/50">
      <div className="flex flex-col gap-5 rounded bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-red-700">
          Do You Want To Delete IT
        </h2>

        <div className="flex justify-end gap-2">
          <button
            className="rounded bg-lightPrimary px-3 py-2 text-blueSecondary"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="rounded bg-red-100 px-3 py-2 text-red-800"
            onClick={deleleteHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
