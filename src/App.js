import React, { Fragment } from "react";
import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";
import logo from "./images/logo.png";
import { AiFillCloseSquare, AiFillPlusSquare } from "react-icons/ai";
// import ReactPaginate from "react-paginate";
// import {
//   MdKeyboardDoubleArrowLeft,
//   MdKeyboardDoubleArrowRight,
// } from "react-icons/md";

function App() {
  // For Data Entry
  const [inputvalue, setInputValue] = useState({
    category: "",
    name: "",
    size: "N/A",
    price: 0,
    cost: 0,
    amountinstock: 0,
  });

  // For Reading & Displaying of All Data
  const [readvalue, setReadValue] = useState([]);

  // For Updating of Specific Data
  const [updatevalue, setUpdateValue] = useState(null);

  // For Adding values for the sub fields under the Category
  const [addvalue, setAddValue] = useState(false);

  // Pagination
  // const [itemOffset, setItemOffset] = useState(0);
  // const itemsPerPage = 5;

  // const endOffset = itemOffset + itemsPerPage;
  // const currentItems = readvalue.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(readvalue.length / itemsPerPage);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % readvalue.length;
  //   setItemOffset(newOffset);
  // };

  //CREATE
  const writeToDatabase = () => {
    const ID = uid();
    if (
      inputvalue.category.trim() === "" ||
      inputvalue.name.trim() === "" ||
      inputvalue.size.trim() === ""
    ) {
      alert(
        "Please fill out all fields completely before submitting your entry."
      );
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
      setInputValue({
        category: "",
        name: "",
        size: "N/A",
        price: 0,
        cost: 0,
        amountinstock: 0,
      });
      setAddValue(false);
    }
  };

  //READ
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

  //UPDATE
  const updateToDatabase = () => {
    set(ref(db, `/Collection/${updatevalue.ID}`), {
      category: updatevalue.category,
      name: updatevalue.name,
      size: updatevalue.size,
      price: updatevalue.price,
      cost: updatevalue.cost,
      amountinstock: updatevalue.amountinstock,
      ID: updatevalue.ID,
    });
    setUpdateValue(null);
  };

  //DELETE
  const handleDelete = (ID) => {
    remove(ref(db, `/Collection/${ID}`));
  };

  //console.log(inputvalue);
  //console.log(readvalue);

  // to show only the unique categories on the list //
  let unique_array = () => {
    let unique_values = [
      ...new Set(readvalue.map((element) => element.category)),
    ];
    return unique_values;
  };

  //console.log(unique_array());
  // let totalPrice = readvalue.reduce(
  //   (prev, curr) => parseFloat(prev) + parseFloat(curr.price),
  //   0
  // );
  // //console.log(totalPrice);
  // let totalCost = readvalue.reduce(
  //   (prev, curr) => parseFloat(prev) + parseFloat(curr.cost),
  //   0
  // );
  // //console.log(totalPrice);
  // let totalAmountInStock = readvalue.reduce(
  //   (prev, curr) => parseInt(prev) + parseInt(curr.amountinstock),
  //   0
  // );
  //console.log(totalPrice);

  return (
    <React.Fragment>
      <div className="App">
        {/**************************************** header ****************************************/}
        <div className="Top">
          <img src={logo} width="100px" />
          <label className="Top-Label"> Simple UTAK Test </label>
        </div>

        {/**************************************** body **************************************/}
        <div className="Body">
          {/************************************** input area **************************************/}
          <div className="All-Input-Area">
            {/************************************** category text input **************************************/}
            <div className="Input">
              <label className="Input-Label">Category:</label>
              <input
                required
                type="text"
                className="Input-Text"
                value={inputvalue.category}
                onChange={(e) =>
                  setInputValue({ ...inputvalue, category: e.target.value })
                }
              />
            </div>
            {/* add button for category */}
            {inputvalue.category != "" && (
              <button
                className="Button-For-Add"
                onClick={() => setAddValue(true)}
              >
                Add
              </button>
            )}
          </div>
        </div>

        {/************************************** sub fields under category inputs **************************************/}
        {addvalue && (
          <div className="App-Add">
            <div className="All-Add-Area">
              {/************************************** name text input **************************************/}
              <div className="Add-SubDetails">
                <AiFillCloseSquare
                  onClick={() => {
                    setAddValue(false);
                    setInputValue({ ...inputvalue, category: "" });
                  }}
                  className="Close-Button-ForAdd"
                />
                <div className="Update">
                  <label className="Update-Label">Name:</label>
                  <input
                    required
                    type="text"
                    className="Input-Text"
                    value={inputvalue.name}
                    onChange={(e) =>
                      setInputValue({ ...inputvalue, name: e.target.value })
                    }
                  />
                </div>
                {/************************************** size choice input **************************************/}
                <div className="Add">
                  <label className="Add-Label">Size:</label>
                  <select
                    required
                    value={inputvalue.size}
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
                <div className="Add">
                  <label className="Add-Label">Price:</label>
                  <input
                    required
                    type="number"
                    value={inputvalue.price}
                    className="Input-Text"
                    onChange={(e) =>
                      setInputValue({ ...inputvalue, price: e.target.value })
                    }
                  />
                </div>
                {/************************************** cost input **************************************/}
                <div className="Add">
                  <label className="Add-Label">Cost:</label>
                  <input
                    required
                    type="number"
                    value={inputvalue.cost}
                    className="Input-Text"
                    onChange={(e) =>
                      setInputValue({ ...inputvalue, cost: e.target.value })
                    }
                  />
                </div>
                {/************************************** amount in stock input **************************************/}
                <div className="Add">
                  <label className="Add-Label">Amount in Stock:</label>
                  <input
                    required
                    type="number"
                    onKeyDown={(e) => e.key === "." && e.preventDefault()}
                    className="Input-Text"
                    value={inputvalue.amountinstock}
                    onChange={(e) =>
                      setInputValue({
                        ...inputvalue,
                        amountinstock: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* Submit button to record data for sub fields under Category */}
              <div className="AddSubmit-Button-Container">
                <button
                  className="Button-For-AddSubmit"
                  onClick={() => writeToDatabase()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="Divider"></div>

        {/************************************** Get Data from Firebase **************************************/}
        <div>
          <div className="Read-Area">
            {unique_array().map((data) => (
              <>
                <div className="Read-Area-Label">
                  <span>{data}</span>
                  <AiFillPlusSquare
                    onClick={() => {
                      setAddValue(true);
                      setInputValue({ ...inputvalue, category: data });
                    }}
                    className="Add-For-SubDetails"
                  />
                </div>
                <div>
                  {readvalue
                    .filter((fil) => fil.category == data)
                    .map((subdata) => (
                      <div className="Read-Area-Sub">
                        <p className="SubData">{subdata.name}</p>
                        <p className="SubData">{subdata.size}</p>
                        <p className="SubData">{subdata.price}</p>
                        <p className="SubData">{subdata.cost}</p>
                        <p className="SubData">{subdata.amountinstock}</p>

                        <button
                          className="Button-For-Submit"
                          onClick={() =>
                            setUpdateValue({
                              ID: subdata.ID,
                              category: subdata.category,
                              name: subdata.name,
                              size: subdata.size,
                              price: subdata.price,
                              cost: subdata.cost,
                              amountinstock: subdata.amountinstock,
                            })
                          }
                        >
                          Update
                        </button>

                        <button
                          className="Button-For-Submit"
                          onClick={() => handleDelete(subdata.ID)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </>
            ))}
          </div>
        </div>

        {/************************************** For Data Update **************************************/}
        {updatevalue && (
          <div className="App-Update">
            <div className="All-Update-Area">
              <AiFillCloseSquare
                onClick={() => setUpdateValue(null)}
                className="Close-Button"
              />
              {/************* updating of specific category input *************/}
              <div className="Update">
                <label className="Update-Label">Category</label>
                <input
                  disabled
                  type="text"
                  className="Update-Text"
                  value={updatevalue.category}
                  onChange={(e) =>
                    setUpdateValue({ ...updatevalue, category: e.target.value })
                  }
                />
              </div>

              {/************* updating of specific name input *************/}
              <div className="Update">
                <label className="Update-Label">Name</label>
                <input
                  type="text"
                  className="Update-Text"
                  value={updatevalue.name}
                  onChange={(e) =>
                    setUpdateValue({ ...updatevalue, name: e.target.value })
                  }
                />
              </div>

              {/************* updating of specific size input *************/}
              <div className="Update">
                <label className="Update-Label">Size</label>
                <select
                  className="Update-Text"
                  value={updatevalue.size}
                  onChange={(e) =>
                    setUpdateValue({ ...updatevalue, size: e.target.value })
                  }
                >
                  <option> N/A </option>
                  <option> Small </option>
                  <option> Medium </option>
                  <option> Large </option>
                </select>
              </div>

              {/************* updating of specific price input *************/}
              <div className="Update">
                <label className="Update-Label">Price</label>
                <input
                  type="number"
                  className="Update-Text"
                  value={updatevalue.price}
                  onChange={(e) =>
                    setUpdateValue({ ...updatevalue, price: e.target.value })
                  }
                />
              </div>

              {/************* updating of specific cost input *************/}
              <div className="Update">
                <label className="Update-Label">Cost</label>
                <input
                  type="number"
                  className="Update-Text"
                  value={updatevalue.cost}
                  onChange={(e) =>
                    setUpdateValue({ ...updatevalue, cost: e.target.value })
                  }
                />
              </div>

              {/************* updating of specific amount in stock input *************/}
              <div className="Update">
                <label className="Update-Label">Amount in Stock</label>
                <input
                  type="number"
                  className="Update-Text"
                  value={updatevalue.amountinstock}
                  onKeyDown={(e) => e.key === "." && e.preventDefault()}
                  onChange={(e) =>
                    setUpdateValue({
                      ...updatevalue,
                      amountinstock: e.target.value,
                    })
                  }
                />
              </div>
              {/* update the specific record */}
              <button
                className="Button-Update-Submit"
                onClick={() => updateToDatabase(updatevalue)}
              >
                Update
              </button>
            </div>
          </div>
        )}

        <div className="Divider"></div>

        {/* calculation of total */}
        <div className="Body">
          {/************************************* total area **************************************/}
          {/* <div className="All-Input-Area">
            <div className="Total">
              <span className="Total-Label">Total Price: </span>
              <span className="Total-Value"> {totalPrice ?? 0} </span>
            </div>
            <div className="Total">
              <span className="Total-LabAel">Total Cost: </span>
              <span className="Total-Value">{totalCost ?? 0} </span>
            </div>
            <div className="Total">
              <span className="Total-Label">Total Amount in Stock: </span>
              <span className="Total-Value"> {totalAmountInStock ?? 0} </span>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
