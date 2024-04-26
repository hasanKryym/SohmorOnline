import { createContext, useContext, useState } from "react";
import { useNotification } from "../../Notification/NotificationContext";
import { notificationTypes } from "../../Notification/notificationEnum";
import { add_domain, get_Domains } from "../../../services/shopService";

const DomainContext = createContext();

export const DomainProvider = ({ children }) => {
  const [domains, setDomains] = useState([]);
  const { addNotification, load, hideLoader } = useNotification();
  const updateDomain = (newDomain) => {
    setDomains(newDomain);
  };

  const getDomains = async () => {
    load();
    const response = await get_Domains();
    if (response.success) {
      setDomains(response.domains);
      hideLoader();
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ?? "error while fetching domains"
      );
  };

  const addDomain = async (domain) => {
    if (!domain) {
      addNotification(
        notificationTypes.INFO,
        "please provide a name for the domain"
      );
      return;
    }
    load();
    const response = await add_domain(domain);
    if (response.success) {
      addNotification(notificationTypes.SUCCESS, response.message);
      setDomains((prevDomains) => [...prevDomains, response.newDomain]);
    } else
      addNotification(
        notificationTypes.ERROR,
        response.message ? response.message : "error while adding new category"
      );

    return response;
  };

  return (
    <DomainContext.Provider
      value={{ domains, updateDomain, getDomains, addDomain }}
    >
      {children}
    </DomainContext.Provider>
  );
};

export const useDomain = () => {
  return useContext(DomainContext);
};
