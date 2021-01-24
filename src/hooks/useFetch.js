import React, {  useState } from "react";
export const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  React.useEffect(() => {
    const fun = async () => {
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
    };
    fun();
  }, [url]);
  return response;
};