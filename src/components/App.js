import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];


function App() {

  const [items, setItems] = useState([]);

  function handeDeleteItems(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleToggleItem(id) {
    setItems((prevItems) => prevItems.map((item) => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  function handleClearItems() {
    const confirmed = window.confirm("Are you sure you want to clear the list?");
    if (!confirmed) return;
    setItems([]);
  }

  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handeDeleteItems} onToggleItem={handleToggleItem} onClearItems={handleClearItems} />
    <Stats items={items} />
  </div>
}

export default App;