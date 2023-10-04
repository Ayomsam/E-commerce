import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import "./Assets/Product.css"

const Mainpage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };
    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
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
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        position: "sticky",
        zIndex: "10",
        backgroundColor: "white"
    }
    const handleRemoveFromCart = (index) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart.splice(index, 1);
            return updatedCart;
        });
    };

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


    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [itemsToDisplay, setItemsToDisplay] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const filterProductsByCategory = (products) => {
        if (selectedCategory === 'All') {
            return products;
        }
        return products.filter((product) => product.category === selectedCategory);
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                const filteredProducts = filterProductsByCategory(data);
                const sortedProducts = sortProductsByPrice(filteredProducts);
                const searchedProducts = filterProductsBySearchTerm(sortedProducts);
                setData(searchedProducts);
                setItemsToDisplay(searchedProducts.length > 0);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [selectedCategory, sortOrder, searchTerm]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const sortProductsByPrice = (products) => {
        return products.slice().sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);

            if (sortOrder === 'asc') {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });
    };
    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };


    const filterProductsBySearchTerm = (products) => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };




    return (
        <div>

            {loading ? (<p>Loading...</p>) : (
                <>
                    <div className="masterfilter">
                        <div style={userstyle}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Welcome {username}</p>
                            </div>
                            <Link to="/" style={{ backgroundColor: "#3c009d", color: "white", height: "fit-content", padding: ".4rem 1rem", fontWeight: "bold" }}>Sign Out</Link>
                        </div>
                        <div className="filterdiv">
                            <div className='filter1'>
                                <label htmlFor="dropdown">Filter Products by:</label>
                                <select id="dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value="All">All</option>
                                    <option value="men's clothing">Men's Clothing</option>
                                    <option value="women's clothing">Women's Clothing</option>
                                </select>
                            </div>

                            <div className='filter1'>
                                <label htmlFor="sortOrderDropdown">Sort by Price:</label>
                                <select id="sortOrderDropdown" value={sortOrder} onChange={handleSortOrderChange}>
                                    <option value="asc">Lowest to Highest</option>
                                    <option value="desc">Highest to Lowest</option>
                                </select>
                            </div>

                            <div className='searchdiv'>
                                <label htmlFor="searchBar">Search Product</label>
                                <input
                                    type="text"
                                    id="searchBar"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                    placeholder="Search..."
                                />
                            </div>
                        </div>


                    </div>





                    <button onClick={() => setShowCart(!showCart)} style={{ marginLeft: "5rem", position: "fixed", bottom: "0", zIndex: "999999999999" }}> <div style={{ fontWeight: "bold" }}>View Cart</div>
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
                        {itemsToDisplay ? (data.map((product) => (
                            <div key={product.id} className="product-card" >
                                <div onClick={() => handleProductClick(product)} className="product-info" ><BsInfoCircle className="info-icon" /></div>
                                <img src={product.image} alt={product.title} className="product-image" />
                                <div className="product-details">
                                    <h3>{product.title}</h3>
                                    <p style={{ fontWeight: "bold", margin: "1rem 0" }}>Price: ${product.price}</p>
                                    <button className='cartAddBtn' onClick={() => handleAddToCart(product)}><FaShoppingCart style={{ fontSize: "3rem" }} /></button>
                                </div>
                            </div>
                        ))) : (<p>No items to display</p>)}
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
                        </div>
                    )}

                    {showCart && (
                        <div className="cart-popup">
                            <button className='popuphide' onClick={() => setShowCart(false)}>Hide Cart</button>
                            <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginTop: "2rem" }}>{username}'s Cart:</h2>
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index} className="sidelist">
                                        <div style={{ fontWeight: "bolder" }}>{item.title}</div>
                                        <div> ${item.price}</div>
                                        <button className='deletebtn' onClick={() => handleRemoveFromCart(index)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                            <p><span style={{ fontWeight: "bold" }}>Total Price:</span> ${calculateTotalPrice()}</p>
                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default Mainpage;