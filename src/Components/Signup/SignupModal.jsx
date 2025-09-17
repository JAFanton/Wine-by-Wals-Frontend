import React, { useState } from "react";

export default function LoginModal({ isOpen, onClose, openSignup, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null; // Early return if modal is closed

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    login(email, password)
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        setError(
          err.response?.data?.message || err.message || "Login failed"
        );
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl w-full max-w-md p-6 text-neutral-900">
        <h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 p-2"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openSignup();
              }}
              className="text-sm text-gray-600 underline"
            >
              Need an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
