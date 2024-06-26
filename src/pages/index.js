import React, { useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";
import "tailwindcss/tailwind.css";

// Components
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import InstancesList from "@/Components/InstancesList";

export default function Home() {
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
    // Fetch all active instances from the API
    fetch("http://localhost:8080/instances/types")
      .then((response) => response.json())
      .then((data) => setInstances([...data, ...data]));
  }, []);

  const createInstance = (instanceName, instance) => {
    fetch("http://localhost:8080/instances/create", {
      method: "POST",
      body: JSON.stringify({
        cloud: instance?.cloud,
        region: instance?.availability[0]?.region,
        shade_instance_type: instance?.shade_instance_type,
        shade_cloud: true,
        name: instanceName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        handleCloseModal();
        // Forward to the new page
        router.push("/my-instances");
      });
  };

  const showInstanceDetails = (instance) => {
    setSelectedInstance(instance);
  };

  const handleCloseModal = () => {
    setSelectedInstance(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Link href="/my-instances" className="text-blue-500 underline">
        Show my running instances
      </Link>
      <h1 className="text-4xl font-bold mb-6">Shadeform Marketplace</h1>
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
          createInstance={createInstance}
        />
      )}
    </main>
  );
}
