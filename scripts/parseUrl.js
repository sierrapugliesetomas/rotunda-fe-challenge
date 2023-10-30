function parseUrl(urlFormat, urlInstance) {
  const parsedUrl = {};
  const urlVariablePartsKeys = getUrlVariablePartsKeys(urlFormat);
  const urlVariablePartsValues = getUrlVariablePartsValues(urlFormat, urlInstance);
  const urlParams = getUrlParams(urlInstance);

  urlVariablePartsKeys.forEach((variable, index) => {
    parsedUrl[variable] = urlVariablePartsValues[index];
  });

  if (urlParams) {
    const params = new URLSearchParams(urlParams);
    params.forEach((value, key) => {
      parsedUrl[key] = parseValue(value);
    });
  }

 return parsedUrl;
}

function getUrlVariablePartsKeys(urlFormat) {
  const variableUrlPartRegex = /:([^/]+)/g;
  return urlFormat.match(variableUrlPartRegex).map(part => part.slice(1));
}

function getUrlVariablePartsValues(urlFormat, urlInstance) {
  const urlPartRegex = /\/|\?/;
  const spaceRegex = /\+/g;

  return urlInstance
    .split(urlPartRegex)
    .filter(variablePart => !urlFormat.includes(variablePart))
    .map(value =>
      parseValue(decodeURIComponent(value.replace(spaceRegex, " ")))
    );
}

function getUrlParams(urlInstance) {
  const urlInstanceParamsRegex = /\?(.+)/;
  const match = urlInstance.match(urlInstanceParamsRegex);
  return match ? match[1] : null;
}

function parseValue(value) {
  let parsedValue = value;

  if (isNumeric(value)) {
    parsedValue = parseFloat(value);
  }
  else if (isBoolean(value)) {
    parsedValue = Boolean(value);
  }

  return parsedValue;
}

function isNumeric(value) {
  return !isNaN(value);
}

function isBoolean(value) {
  return value === 'true' || value === 'false';
}

function handleFormSubmit(event) {
  event.preventDefault();
  const urlFormat = document.getElementById('urlFormat');
  const urlInstance = document.getElementById('urlInstance');

  try {
    const parsedURL = document.getElementById('parsedURL');
    parsedURL.setHTML(JSON.stringify(parseUrl(urlFormat.value, urlInstance.value), null, 2));
    resetAnimation(parsedURL, 'fade-in');
  } catch (error) {
    alert('Invalid URL format or instance');
  }
}

function copyToClipboard() {
  const copyButton = document.getElementById('copy-button');
  const parsedURL = document.getElementById('parsedURL').innerHTML;

  navigator.clipboard.writeText(parsedURL);

  resetAnimation(copyButton, 'shake');
}

function resetAnimation(element, className) {
  element.classList.remove(className);
  setTimeout(() => {
    element.classList.add(className);
  }, 0);
}