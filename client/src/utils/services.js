export const baseUrl = "http://192.168.1.63:5000/api/v1/";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data.error;
    }
    return { error: true, message };
  }

  return data;
};
