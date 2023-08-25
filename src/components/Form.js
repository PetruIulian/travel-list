import { useState } from "react";

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

export default Form;