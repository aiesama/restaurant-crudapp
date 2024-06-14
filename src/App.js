import React from "react";
import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";
import logo from "./images/logo.png";
import ReactPaginate from "react-paginate";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";

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

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = readvalue.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(readvalue.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % readvalue.length;
    setItemOffset(newOffset);
  };

  //Create
  const writeToDatabase = () => {
    const ID = uid();
    if (
      inputvalue.category.trim() == "" ||
      inputvalue.name.trim() == "" ||
      inputvalue.size.trim() == "" ||
      inputvalue.price.trim() == "" ||
      inputvalue.cost.trim() == "" ||
      inputvalue.amountinstock.trim() == ""
    ) {
      alert("Please fill all fields");
    } else {
      set(ref(db, `/Collection/${ID}`), {
        category: inputvalue.category,
        name: inputvalue.name,
        size: inputvalue.size,
        price: inputvalue.price,
        cost: inputvalue.cost,
        amountinstock: inputvalue.amountinstock,
        ID,
      });
    }
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
      <div className="App">
        {/* header */}
        <div className="Top">
          <img src={logo} width="100px" />
          <label className="Top-Label"> Simple UTAK Test </label>
        </div>

        {/**************************************** body **************************************/}
        <div className="Body">
          <div className="All-Input-Area">
            {/************************************** category text input **************************************/}
            <div className="Input">
              <label className="Input-Label">Category:</label>
              <input
                required
                type="text"
                className="Input-Text"
                onChange={(e) =>
                  setInputValue({ ...inputvalue, category: e.target.value })
                }
              />
            </div>

            {/************************************** name text input **************************************/}
            <div className="Input">
              <label className="Input-Label">Name:</label>
              <input
                required
                type="text"
                className="Input-Text"
                onChange={(e) =>
                  setInputValue({ ...inputvalue, name: e.target.value })
                }
              />
            </div>

            {/************************************** size choose input **************************************/}
            <div className="Input">
              <label className="Input-Label">Size:</label>
              <select
                required
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

            {/************************************** price input **************************************/}
            <div className="Input">
              <label className="Input-Label">Price:</label>
              <input
                required
                type="number"
                className="Input-Text"
                onChange={(e) =>
                  setInputValue({ ...inputvalue, price: e.target.value })
                }
              />
            </div>

            {/************************************** cost input **************************************/}
            <div className="Input">
              <label className="Input-Label">Cost:</label>
              <input
                required
                type="number"
                className="Input-Text"
                onChange={(e) =>
                  setInputValue({ ...inputvalue, cost: e.target.value })
                }
              />
            </div>

            {/************************************** amount in stock input **************************************/}
            <div className="Input">
              <label className="Input-Label">Amount in Stock:</label>
              <input
                required
                type="number"
                className="Input-Text"
                onChange={(e) =>
                  setInputValue({
                    ...inputvalue,
                    amountinstock: e.target.value,
                  })
                }
              />
            </div>
            <button className="Button-For-Submit" onClick={writeToDatabase}>
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>

        {/************************************** Get Data from Firebase **************************************/}
        <div>
          <div className="Table-Area">
            <table>
              <th>Category</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Amount in Stock</th>

              {currentItems?.map((data) => (
                <tr>
                  <td>{data.category}</td>
                  <td>{data.name}</td>
                  <td>{data.size}</td>
                  <td>{data.price}</td>
                  <td>{data.cost}</td>
                  <td>{data.amountinstock}</td>
                  <td>
                    <button
                      className="Button"
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
                    <button
                      className="Button"
                      onClick={() => handleDelete(data.ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <ReactPaginate
              containerClassName="Pagination"
              pageLinkClassName="PaginationCN"
              breakLabel="..."
              nextLabel={<MdKeyboardDoubleArrowRight />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={<MdKeyboardDoubleArrowLeft />}
              renderOnZeroPageCount={null}
              activeLinkClassName="active"
            />
          </div>
        </div>

        {/************************************** For Data Update **************************************/}
        {magic && (
          <div className="App-Update">
            <div className="All-Update-Area">
              <AiFillCloseSquare
                onClick={() => setMagic(null)}
                className="Close-Button"
              />

              <div className="Update">
                <label className="Update-Label">Category</label>
                <input
                  type="text"
                  className="Update-Text"
                  value={magic.category}
                  onChange={(e) =>
                    setMagic({ ...magic, category: e.target.value })
                  }
                />
              </div>

              <div className="Update">
                <label className="Update-Label">Name</label>
                <input
                  type="text"
                  className="Update-Text"
                  value={magic.name}
                  onChange={(e) => setMagic({ ...magic, name: e.target.value })}
                />
              </div>

              <div className="Update">
                <label className="Update-Label">Size</label>
                <select
                  className="Update-Text"
                  value={magic.size}
                  onChange={(e) => setMagic({ ...magic, size: e.target.value })}
                >
                  <option> N/A </option>
                  <option> Small </option>
                  <option> Medium </option>
                  <option> Large </option>
                </select>
              </div>

              <div className="Update">
                <label className="Update-Label">Price</label>
                <input
                  type="text"
                  className="Update-Text"
                  value={magic.price}
                  onChange={(e) =>
                    setMagic({ ...magic, price: e.target.value })
                  }
                />
              </div>

              <div className="Update">
                <label className="Update-Label">Cost</label>
                <input
                  type="text"
                  className="Update-Text"
                  value={magic.cost}
                  onChange={(e) => setMagic({ ...magic, cost: e.target.value })}
                />
              </div>

              <div className="Update">
                <label className="Update-Label">Amount in Stock</label>
                <input
                  type="text"
                  className="Update-Text"
                  value={magic.amountinstock}
                  onChange={(e) =>
                    setMagic({ ...magic, amountinstock: e.target.value })
                  }
                />
              </div>

              <button
                className="Button-Update-Submit"
                onClick={() => updateToDatabase(magic)}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
