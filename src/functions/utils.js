export const formatDate = (date) => {
  // Create a new Date object using the date string
  const dateObj = new Date(date);

  // Get the day, month, and year from the date object
  const day = String(dateObj.getDate()).padStart(2, "0"); // Adds leading zero if needed
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = dateObj.getFullYear();

  // Combine them in dd-mm-yyyy format
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
