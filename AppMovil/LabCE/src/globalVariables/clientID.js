let clientId = null;

export const setClientId = (id) => {
  clientId = id;
};

export const getClientId = () => {
  return clientId;
};

export const cleanClientId = () => {
  clientId = null;
};
