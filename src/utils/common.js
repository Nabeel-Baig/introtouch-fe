const formatString = (
  str,
  { maxWords, titleCase, capitalCase, maxLength } = {}
) => {
  let formattedString = str;
  if (titleCase) {
    const splitStr = formattedString.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    formattedString = splitStr.join(" ");
  }

  if (capitalCase) {
    formattedString =
      formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
  }

  if (maxWords) {
    const words = formattedString.split(" ");
    if (words.length > maxWords) {
      formattedString = words.slice(0, maxWords).join(" ");
    }
  }

  if (maxLength) {
    formattedString = formattedString.substring(0, maxLength);
  }

  return formattedString;
};
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const getClickableLink = link => {
  return link?.startsWith("http://") || link?.startsWith("https://") ?
    link
    : `http://${link}`;
};

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return cleaned;
}
export {
  formatString,
  getClickableLink,
  nFormatter,
  formatPhoneNumber
}