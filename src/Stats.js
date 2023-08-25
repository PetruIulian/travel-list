function Stats({ items }) {

    if (!items.length) {
        return (
            <p className="stats">
                <em>You have no items on your list.</em>
            </p>
        );
    }

    const numItems = items.length;
    const numPackedItems = items.filter((item) => item.packed).length;
    const percentege = Math.round((numPackedItems / numItems) * 100);

    return <footer className="stats">
        <em>
            {percentege === 100 ? "You got everything! Ready to go." : `👜 You have ${numItems} items on your list, and you already packed ${numPackedItems} (${percentege}%).`}

        </em>
    </footer>;
}


export default Stats;