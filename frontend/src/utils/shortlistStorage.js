export const getShortlist = () => {
  return JSON.parse(localStorage.getItem("stayfinder_shortlist")) || [];
};

export const saveShortlist = (items) => {
  localStorage.setItem("stayfinder_shortlist", JSON.stringify(items));
};

export const isPropertyShortlisted = (propertyId) => {
  const shortlist = getShortlist();
  return shortlist.some((item) => item.id === Number(propertyId));
};

export const addToShortlist = (property) => {
  const shortlist = getShortlist();

  const alreadyExists = shortlist.some((item) => item.id === property.id);

  if (!alreadyExists) {
    saveShortlist([...shortlist, property]);
  }
};

export const removeFromShortlist = (propertyId) => {
  const shortlist = getShortlist();

  const updatedShortlist = shortlist.filter(
    (item) => item.id !== Number(propertyId)
  );

  saveShortlist(updatedShortlist);
};