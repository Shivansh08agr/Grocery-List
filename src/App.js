import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItems from "./AddItems";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function App() {
  // ALL OF THIS WAS IN Content.js INITIALLY, IT'S DRAGGED HERE TO ESSENTIALLY LEARN PROP DRILLS AND ALSO BECAUSE WE WANTED TO USE CONTENT PROPERTIES IN FOOTER
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList")) || []
  );

  // useEffect(()=>{
  //   console.log('render'); //works on everysingle change that happens in the webpage
  // })
  // useEffect(()=>{
  //   // console.log('load time'); //works only when you reload the webpage
    
  // }, [])
  useEffect(()=>{
    console.log('updating items state'); //works whenever you make a change in item state
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items])

  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems);
  //   localStorage.setItem("shoppingList", JSON.stringify(newItems));
  //we used this function before we learned useEffect
  // };
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // add item
    addItem(newItem);
    // console.log("submitted");
    setNewItem(""); //to set it back to blank
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
