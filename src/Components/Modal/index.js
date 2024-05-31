import React, { useState } from "react";

const Modal = ({
  handleCloseModal,
  selectedInstance,
  createInstance,
  deleteInstance,
}) => {
  const [instanceName, setInstanceName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInstanceName(e.target.value);
    setError("");
  };

  const handleCreateInstance = () => {
    if (instanceName.trim() === "") {
      setError("Please enter an instance name");
      return;
    }
    createInstance(instanceName, selectedInstance);
  };

  const handleDeleteInstance = () => {
    deleteInstance(selectedInstance);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
      onClick={handleCloseModal}
    >
      <div
        className="bg-white p-4 relative rounded-lg w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-1 top-0" onClick={handleCloseModal}>
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-2">
          {createInstance ? "Launch" : "Delete"} instance
        </h2>
        <div className="flex justify-between w-full ">
          <h4 className="text-1xl font-bold mb-2">
            {selectedInstance.name
              ? selectedInstance.name
              : selectedInstance.cloud}
          </h4>
          {selectedInstance.status && (
            <div className="mb-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20">
              {selectedInstance.status}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between w-full">
            <p>Type</p> <p>{selectedInstance.gpu_type}</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Hourly Price</p> <p>$0.{selectedInstance.hourly_price}</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Memory</p> <p>{selectedInstance.memory_in_gb}GB</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Storage</p> <p>{selectedInstance.storage_in_gb}Gb</p>
          </div>
          <div className="flex justify-between w-full">
            <p>No. of GPU's</p> <p>{selectedInstance.num_gpus}</p>
          </div>
          {selectedInstance?.availability?.map(
            (availability) =>
              availability.available && (
                <div className="flex justify-between w-full">
                  <p>Region available</p> <p>{availability.region}</p>
                </div>
              )
          )}
        </div>
        {createInstance ? (
          <>
            <input
              type="text"
              placeholder="Instance Name"
              className="w-full p-2 mt-4 border border-gray-300 rounded-md"
              value={instanceName}
              onChange={handleInputChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-4 block text-center w-full bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100 hover:text-green-800 rounded-md transition duration-150 ease-in-out ring-1 ring-inset h-10 px-4 py-2"
              onClick={handleCreateInstance}
              disabled={error !== ""}
            >
              Create Instance
            </button>
          </>
        ) : (
          <button
            className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-4 block text-center w-full bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100 hover:text-red-800 rounded-md transition duration-150 ease-in-out ring-1 ring-inset h-10 px-4 py-2"
            onClick={handleDeleteInstance}
          >
            Delete Instance
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
