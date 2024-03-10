import { useEffect } from "react";

const BackNavigationHandler = () => {
  useEffect(() => {
    const handleBackNavigation = () => {
      // Reload the page on back navigation
      window.location.reload();
    };

    const popstateListener = () => {
      // Handle back navigation
      handleBackNavigation();
    };

    // Add event listener for popstate (back/forward navigation)
    window.addEventListener("popstate", popstateListener);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("popstate", popstateListener);
    };
  }, []);
  return <></>;
};

export default BackNavigationHandler;
