import React, { useState, useEffect } from "react";
import Link from "next/link";

// Components
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import InstancesList from "@/Components/InstancesList";

const MyInstances = () => {
  const [instances, setInstances] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const instancesPerPage = 6;
  const totalPages = Math.ceil(instances.length / instancesPerPage);
  const indexOfLastInstance = currentPage * instancesPerPage;
  const indexOfFirstInstance = indexOfLastInstance - instancesPerPage;
  const currentInstances = instances.slice(
    indexOfFirstInstance,
    indexOfLastInstance
  );

  useEffect(() => {
    // Fetch all active user instances from the API
    fetch("http://localhost:8080/instances/")
      .then((response) => response.json())
      .then((data) => setInstances([...data]));
  }, []);

  const deleteInstance = (instance) => {
    const instanceId = instance.id;
    // Make a DELETE request to the API to delete the instance
    fetch(`http://localhost:8080/instances/delete?instanceId=${instanceId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedInstances = instances.filter(
            (instance) => instance.id !== instanceId
          );
          setInstances(updatedInstances);
          if (selectedInstance && selectedInstance.id === instanceId) {
            setSelectedInstance(null);
          }
        } else {
          throw new Error("Failed to delete instance");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showInstanceDetails = (instance) => {
    setSelectedInstance(instance);
  };

  const handleCloseModal = () => {
    setSelectedInstance(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Link href="/" className="text-blue-500 underline">
        Add new instance
      </Link>
      <h1 className="text-4xl font-bold mb-6">My Instances</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InstancesList
          instances={currentInstances}
          showInstanceDetails={showInstanceDetails}
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {selectedInstance && (
        <Modal
          handleCloseModal={handleCloseModal}
          selectedInstance={selectedInstance}
          deleteInstance={deleteInstance}
        />
      )}
    </main>
  );
};

export default MyInstances;
