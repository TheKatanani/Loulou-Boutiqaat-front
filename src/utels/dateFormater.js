export default function dateFormater(mysqlDate) { 
  // Create a JavaScript Date object from the MySQL date string
  const date = new Date(mysqlDate);

  // Format the date to a human-readable format using toLocaleDateString
  const humanReadableDate = date.toLocaleDateString('en-US', {
    weekday: 'short', // Full name of the day
    year: 'numeric', // Four-digit year
    month: 'short', // Full name of the month
    day: 'numeric' // Numeric day
  });

  // Optionally, format the time as well using toLocaleTimeString
  const humanReadableTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }); 
  return `${humanReadableDate} : ${humanReadableTime}`
}