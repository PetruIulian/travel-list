import { useState } from "react";

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

  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} onDeleteItem={handeDeleteItems} onToggleItem={handleToggleItem} />
    <Stats items={items} />
  </div>
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1)



  function hanldleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);

  }

  return <form className="add-form" onSubmit={hanldleSubmit}>
    <h3> What do you need for your 🤭 trip?</h3>
    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => <option value={n} key={n}>{n}</option>)}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
    <button>Add</button>
  </form>
}
function PackingList({ items, onToggleItem, onDeleteItem }) {

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>

    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={() => { onToggleItem(item.id) }}></input>
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      {item.quantity} {item.description}
    </span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>;
}

function Stats({ items }) {

  if (!items.length) {
    return (
      <p className="stats">
        <em>You have no items on your list.</em>
      </p>
    )
  }

  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentege = Math.round((numPackedItems / numItems) * 100);

  return <footer className="stats">
    <em>
      {percentege === 100 ? "You got everything! Ready to go." : `👜 You have ${numItems} items on your list, and you already packed ${numPackedItems} (${percentege}%).`}

    </em>
  </footer>
}

export default App;