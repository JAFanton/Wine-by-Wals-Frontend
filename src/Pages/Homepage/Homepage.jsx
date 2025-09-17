// src/pages/Homepage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";  // your axios instance

export default function Homepage() {
  const [wines, setWines] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axiosInstance.get("/wines")
      .then(res => {
        const allWines = res.data.data;
        setWines(allWines);
        // pick some featured wines
        setFeatured(allWines.slice(0, 4));
      })
      .catch(err => console.error("Failed to fetch wines:", err));
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero / Banner */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url("/images/hero-banner.jpg")` }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to Wine By Wals</h1>
          <p className="text-xl text-gray-200 mb-6">Curated wines delivered to your door</p>
          <Link to="/catalogue">
            <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded">Shop Now</button>
          </Link>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="px-8 py-16 flex flex-wrap justify-center gap-6 bg-gray-100">
        {["Red", "White", "Sparkling", "Rosé", "Gift Sets"].map((cat) => (
          <Link key={cat} to={`/catalogue?type=${cat.toLowerCase()}`} className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-lg transition">
            {cat}
          </Link>
        ))}
      </section>

      {/* Featured / Spotlight */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Wines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((wine) => (
            <div key={wine._id} className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
              <img
                src={wine.imageUrl || "/images/wine-placeholder.png"}
                alt={wine.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{wine.name}</h3>
                <p className="text-gray-500 mb-2">{wine.type} · {wine.country}</p>
                <p className="text-lg font-bold text-yellow-600">${wine.price}</p>
                <Link to={`/wines/${wine._id}`} className="mt-4 inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works / About */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-gray-700">
            1. Browse the wines. <br />
            2. Add to your cart. <br />
            3. Checkout and enjoy amazing wine delivered to you.
          </p>
        </div>
      </section>

      {/* Newsletter / Promotion */}
      <section className="px-8 py-16 bg-yellow-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="mb-6">Get $10 off your first order when you subscribe.</p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-gray-900 flex-grow"
          />
          <button className="px-6 py-2 bg-gray-900 hover:bg-black rounded-lg font-semibold">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-3">About</h4>
            <p>Wine By Wals is an online wine supplier dedicated to bringing you exclusive selections and exceptional service.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalogue">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">FB</a>
              <a href="#" className="hover:text-white">IG</a>
              <a href="#" className="hover:text-white">TW</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-8">&copy; {new Date().getFullYear()} Wine By Wals. All rights reserved.</div>
      </footer>
    </div>
  );
}
