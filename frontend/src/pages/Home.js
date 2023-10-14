import { useEffect } from "react";
import { useResourcesContext } from "../hooks/useResourcesContext";

// components

import ResourcesForm from "../components/ResourcesForm";

import ResourcesDetails from "../components/ResourcesDetails";

const Home = () => {
  const { resources, dispatch } = useResourcesContext();

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch("/api/resources");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_RESOURCES", payload: json });
      }
    };

    fetchResources();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="">
        {resources &&
          resources.map((resources) => (
            <ResourcesDetails resources={resources} key={resources._id} />
          ))}
      </div>
      <ResourcesForm/>
    </div>
  );
};

export default Home;
