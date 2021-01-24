import { useEffect, useContext } from "react";

import PuffLoader from "react-spinners/PuffLoader";
import { Redirect, Route } from "react-router-dom";

import { useFetch } from "./hooks/useFetch";
import { AppContext } from "./Context/AppContext";
import { CartPage, ShopPage } from "./Pages";

import "./App.css";
function App() {
  const { setBooks, setDBooks } = useContext(AppContext);
  const D = useFetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
  );
  useEffect(() => {
    const fun = () => {
      if (D) {
        const d = D.map((d) => ({
          ...d,
          title: d.title.toString(),
          Qty: 1,
        }));
        setDBooks(d);
        setBooks(d);
      }
    };
    fun();
  }, [D]);

  return (
    <div className="App">
      {D ? (
        <div>
          <Redirect to={{ pathname: "/Page1", state: { from: "/" } }} />
          <Route exact path="/Page1" component={ShopPage} />
          <Route exact path="/Page2" component={CartPage} />
        </div>
      ) : (
        <PuffLoader color={"#D0021B"} loading={true} size={150} />
      )}
    </div>
  );
}

export default App;
