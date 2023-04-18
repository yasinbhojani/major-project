const dateFormater = (currentDate) => {
  const date = new Date(currentDate);
  const formattedDate = date
    .toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(/(\d+)(st|nd|rd|th)/, "$1");
  const [day, month, year] = formattedDate.split(" ");
  const newDate = `${month} ${day}, ${year}`;
  return newDate;
};
export default dateFormater;
