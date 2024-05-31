import React from "react";

const InstancesList = ({ instances, showInstanceDetails }) => {
  return (
    <>
      {instances?.map((instance) => (
        <div
          key={instance.id}
          className="p-4 border border-gray-300 flex w-full flex-shrink-0 flex-grow cursor-pointer flex-col items-center rounded-lg bg-white hover:ring-2 hover:ring-gray-500"
          onClick={() => showInstanceDetails(instance)}
        >
          <div className="flex flex-col justify-between w-full">
            <div className="flex justify-between w-full mb-2">
              <img
                src="https://platform.shadeform.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnvidia-logo.2de03731.png&w=256&q=75"
                alt="Nvidia Logo"
              />
              <p className="ml-4 text-right">{instance.shade_instance_type}</p>
            </div>
            <div className="flex justify-between w-full ">
              <h4 className="text-1xl font-bold mb-2">
                {instance.name ? instance.name : instance.cloud}
              </h4>
              {instance.status && (
                <div className="mb-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20">
                  {instance.status}
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-between w-full">
                <p>Type</p> <p>{instance.gpu_type}</p>
              </div>
              <div className="flex justify-between w-full">
                <p>Hourly Price</p> <p>$0.{instance.hourly_price}</p>
              </div>
              <div className="flex justify-between w-full">
                <p>Memory</p> <p>{instance.memory_in_gb}GB</p>
              </div>
              <div className="flex justify-between w-full">
                <p>Storage</p> <p>{instance.storage_in_gb}Gb</p>
              </div>
              <div className="flex justify-between w-full">
                <p>No. of GPU's</p> <p>{instance.num_gpus}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default InstancesList;
