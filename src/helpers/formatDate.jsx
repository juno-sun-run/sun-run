const formatDate = (date) => {
  return date.toLocaleString("en-US", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default formatDate