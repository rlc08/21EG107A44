import "./App.css";

import { Routes, Route } from "react-router-dom";
import ProductList from "./_root/pages/ProductList";
import ProductForm from "./_root/pages/ProductForm";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ProductList />} />
            </Routes>
        </div>
    );
}

export default App;
