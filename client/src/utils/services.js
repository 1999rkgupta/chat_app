export const baseUrl = "http://192.168.1.63:5000/api/v1/";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json;
  return data;
};
