import React from "react";
import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";

function App() {
  const [inputvalue, setInputValue] = useState({
    category: "",
    name: "",
    size: "N/A",
    price: 0,
    cost: 0,
    amountinstock: 0,
  });

  const [readvalue, setReadValue] = useState([]);
  const [magic, setMagic] = useState(null);

  //Create
  const writeToDatabase = () => {
    const ID = uid();

    set(ref(db, `/Collection/${ID}`), {
      category: inputvalue.category,
      name: inputvalue.name,
      size: inputvalue.size,
      price: inputvalue.price,
      cost: inputvalue.cost,
      amountinstock: inputvalue.amountinstock,
      ID,
    });
  };

  //Read
  useEffect(() => {
    onValue(ref(db, "/Collection"), (snapshot) => {
      setReadValue([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((readvalue) => {
          setReadValue((oldArray) => [...oldArray, readvalue]);
        });
      }
    });
  }, []);

  //Update
  const updateToDatabase = () => {
    set(ref(db, `/Collection/${magic.ID}`), {
      category: magic.category,
      name: magic.name,
      size: magic.size,
      price: magic.price,
      cost: magic.cost,
      amountinstock: magic.amountinstock,
      ID: magic.ID,
    });
    setMagic(null);
  };

  //Delete
  const handleDelete = (ID) => {
    remove(ref(db, `/Collection/${ID}`));
  };

  //console.log(inputvalue);
  console.log(readvalue);

  return (
    <React.Fragment>
      {/* header */}
      <div className="Top">
        <label className="Input-Text">RESTAURANT</label>
      </div>

      {/* body */}
      <div className="App">
        {/* category text input */}
        <div className="Input">
          <label>Category:</label>
          <input
            required
            type="text"
            className="Input-Text"
            onChange={(e) =>
              setInputValue({ ...inputvalue, category: e.target.value })
            }
          />
        </div>

        {/* name text input */}
        <div className="Input">
          <label>Name:</label>
          <input
            required
            type="text"
            className="Input-Text"
            onChange={(e) =>
              setInputValue({ ...inputvalue, name: e.target.value })
            }
          />
        </div>

        {/* size choose input */}
        <div className="Input">
          <label>Size:</label>
          <select
            onChange={(e) =>
              setInputValue({ ...inputvalue, size: e.target.value })
            }
            className="Input-Text"
          >
            <option> N/A </option>
            <option> Small </option>
            <option> Medium </option>
            <option> Large </option>
          </select>
        </div>

        {/* price input */}
        <div className="Input">
          <label>Price:</label>
          <input
            required
            type="number"
            className="Input-Text"
            onChange={(e) =>
              setInputValue({ ...inputvalue, price: e.target.value })
            }
          />
        </div>

        {/* cost input */}
        <div className="Input">
          <label>Cost:</label>
          <input
            required
            type="number"
            className="Input-Text"
            onChange={(e) =>
              setInputValue({ ...inputvalue, cost: e.target.value })
            }
          />
        </div>

        {/* amount in stock input */}
        <div className="Input">
          <label>Amount in Stock:</label>
          <input
            required
            type="number"
            className="Input-Text"
            onChange={(e) =>
              setInputValue({ ...inputvalue, amountinstock: e.target.value })
            }
          />
        </div>

        <button onClick={writeToDatabase}> Submit </button>
      </div>

      {/* Get Data from Firebase */}
      <div className="Top">
        <label className="Input-Text">Table</label>
        <div>
          <table>
            <th>Category</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Amount in Stock</th>

            {readvalue?.map((data) => (
              <tr>
                <td>{data.category}</td>
                <td>{data.name}</td>
                <td>{data.size}</td>
                <td>{data.price}</td>
                <td>{data.cost}</td>
                <td>{data.amountinstock}</td>
                <td>
                  <button
                    onClick={() =>
                      setMagic({
                        ID: data.ID,
                        category: data.category,
                        name: data.name,
                        size: data.size,
                        price: data.price,
                        cost: data.cost,
                        amountinstock: data.amountinstock,
                      })
                    }
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(data.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>

      {/* For Data Update */}
      {magic && (
        <div className="Top">
          <button onClick={() => setMagic(null)}>Close</button>

          <div className="Input">
            <label>Category</label>
            <input
              type="text"
              value={magic.category}
              onChange={(e) => setMagic({ ...magic, category: e.target.value })}
            />
          </div>

          <div className="Input">
            <label>Name</label>
            <input
              type="text"
              value={magic.name}
              onChange={(e) => setMagic({ ...magic, name: e.target.value })}
            />
          </div>

          <div className="Input">
            <label>Size</label>
            <select
              value={magic.size}
              onChange={(e) => setMagic({ ...magic, size: e.target.value })}
              className="Input-Text"
            >
              <option> N/A </option>
              <option> Small </option>
              <option> Medium </option>
              <option> Large </option>
            </select>
          </div>

          <div className="Input">
            <label>Price</label>
            <input
              type="text"
              value={magic.price}
              onChange={(e) => setMagic({ ...magic, price: e.target.value })}
            />
          </div>

          <div className="Input">
            <label>Cost</label>
            <input
              type="text"
              value={magic.cost}
              onChange={(e) => setMagic({ ...magic, cost: e.target.value })}
            />
          </div>

          <div className="Input">
            <label>Amount in Stock</label>
            <input
              type="text"
              value={magic.amountinstock}
              onChange={(e) =>
                setMagic({ ...magic, amountinstock: e.target.value })
              }
            />
          </div>

          <button onClick={() => updateToDatabase(magic)}> Update </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
