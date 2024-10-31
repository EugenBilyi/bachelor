const { useEffect, useState } = React;

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Это вернет дату и время в формате локали пользователя
    };

    return (
        <div>
            <table className='skladTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Názov produktu</th>
                        <th>Kategória</th>
                        <th>Typ produktu</th>
                        <th>Množstvo</th>
                        <th>Predané množstvo</th>
                        <th>Stav</th>
                        <th>Posledná aktualizácia</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.product_name}</td>
                            <td>{item.category}</td>
                            <td>{item.product_type}</td>
                            <td>{item.quantity}<a> L</a></td>
                            <td>{item.sold_quantity}</td>
                            <td>{item.status}</td>
                            <td>{formatDate(item.last_updated)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
