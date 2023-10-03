import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import "./Assets/Product.css"

const Visitor = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };
    const calculateTotalPrice = () => {
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        return totalPrice.toFixed(2);
    };


    const calculateTotalItems = () => {
        return cart.length;
    };

    const userstyle = {
        display: "flex",
        justifyContent: "space-between",
        width: "90%",
        margin: "1rem auto"
    }


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (<p>Loading...</p>) : (
                <>

                    <div style={userstyle}>
                        <Link to="/" style={{ backgroundColor: "#3c009d", color: "white", height: "fit-content", padding: ".4rem 1rem", fontWeight: "bold" }}>Sign In to Add cart</Link>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ backgroundColor: "#3c009d", textTransform: "capitalize", padding: "1rem", borderRadius: "50%", height: "3rem", width: "3rem", textAlign: "center" }}>

                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowCart(!showCart)} style={{ marginLeft: "2rem", position: "fixed", top: "100px" }}> <div style={{ fontWeight: "bold" }}>View Cart</div>
                        {showCart ? (<FaShoppingCart style={{ fontSize: "3rem" }} />) : (
                            <>
                                <div className="cart-icon-container">
                                    <FaShoppingCart style={{ fontSize: '3rem' }} />
                                    {calculateTotalItems() > 0 && (
                                        <span className="cart-item-count">{calculateTotalItems()}</span>
                                    )}
                                </div>

                            </>
                        )}
                    </button>

                    <div className="products">
                        {data.map((product) => (
                            <div key={product.id} className="product-card" >
                                <div onClick={() => handleProductClick(product)} className="product-info" ><BsInfoCircle className="info-icon" /></div>
                                <img src={product.image} alt={product.title} className="product-image" />
                                <div className="product-details">
                                    <h3>{product.title}</h3>
                                    <p style={{ fontWeight: "bold", margin: "1rem 0" }}>Price: ${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedProduct && (
                        <div className="product-popup">
                            <img src={selectedProduct.image} alt={selectedProduct.title} style={{ maxWidth: '15rem', maxHeight: '15rem', objectFit: 'cover' }} />
                            <h2 style={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}>{selectedProduct.title}</h2>
                            <p style={{ fontWeight: "bold" }}>Price: ${selectedProduct.price}</p>
                            <p style={{ margin: "1.2rem 0", fontSize: ".8rem" }}>{selectedProduct.description}</p>
                            <div className='reviewdiv'>
                                <p style={{ textDecoration: "underline", fontWeight: "bold", fontSize: ".8rem" }}>Reviews </p>
                                <p style={{ fontSize: ".8rem" }}><span style={{ fontWeight: "bold" }}>Josh4real</span>: Fantastic product, i recommend</p>
                                <p style={{ fontSize: ".8rem" }}><span style={{ fontWeight: "bold" }}>Toby</span>: Nice, really enjoyed it</p>
                                <p style={{ margin: "1rem 0", fontSize: ".8rem" }}><span style={{ fontWeight: "bold", fontSize: ".8rem", textDecoration: "underline" }}>No of times item has been purchased</span> : 35 </p>
                                <p style={{ fontSize: ".8rem" }}><span style={{ fontWeight: "bold", textDecoration: "underline" }}>Rating </span>: Excellent </p>
                            </div>

                            <button onClick={() => setSelectedProduct(null)}> <FaTimes style={{ fontSize: '24px', color: 'red' }} /></button>
                            <Link to="/">
                                <div style={{ backgroundColor: "#3c009d", color: "white", padding: ".3rem 1rem", textAlign: "center", fontWeight: "bold", margin: "2rem 0", cursor: "pointer" }}>Sign in to Add Cart</div>
                            </Link>
                        </div>
                    )}

                    {showCart && (
                        <div className="cart-popup">
                            <button className='popuphide' onClick={() => setShowCart(false)}>Hide Cart</button>
                            <h2 style={{ fontWeight: "bold", fontSize: "2rem", marginTop: "2rem" }}>Total Cart:</h2>
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index} className="sidelist">
                                        <div style={{ fontWeight: "bolder" }}>{item.title}</div>
                                        <div> ${item.price}</div>
                                    </li>
                                ))}
                            </ul>
                            <p><span style={{ fontWeight: "bold" }}>Total Price:</span> ${calculateTotalPrice()}</p>
                            <Link to="/">
                                <div style={{ backgroundColor: "#3c009d", color: "white", padding: ".3rem 1rem", textAlign: "center", fontWeight: "bold", margin: "2rem 0", cursor: "pointer" }}>Sign in to Add Cart</div>
                            </Link>
                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default Visitor;