"use client";

import React, { useEffect, useState } from "react";
import {
  getAuthToken,
  fetchItems,
  addItem,
  deleteItem,
  updateItem,
} from "@/app/api";
import { useRouter } from "next/navigation";
import "./item.css";

interface Item {
  id: string;
  name: string;
}

const ItemPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [updatedItemName, setUpdatedItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const router = useRouter();

  const loadItems = async () => {
    const token = getAuthToken();

    if (!token) {
      alert("No token found.");
      router.push("/Login");
      return;
    }

    try {
      const data = await fetchItems(token);
      setItems(data);
    } catch {
      alert("Unauthorized or error fetching items.");
    }
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      alert("Item name cannot be empty.");
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    try {
      await addItem(token, newItemName);
      setNewItemName("");
      loadItems();
    } catch {
      alert("Failed to add item.");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      await deleteItem(token, id);
      loadItems();
    } catch {
      alert("Failed to delete item.");
    }
  };

  const handleUpdateItem = async (id: string) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      await updateItem(token, id, updatedItemName);
      setUpdatedItemName("");
      setEditingItemId(null);
      loadItems();
    } catch {
      alert("Failed to update item.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/Login");
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="itemListContainer">
      <h1>Item List</h1>
      <input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="New item name"
      />
      <button onClick={handleAddItem}>Add Item</button>
      <ul className="itemsConatiner">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} &nbsp;
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            <button onClick={() => setEditingItemId(item.id)}>Update</button>
            {editingItemId === item.id && (
              <div className="itemContainer">
                <input
                  value={updatedItemName}
                  onChange={(e) => setUpdatedItemName(e.target.value)}
                  placeholder="Updated item name"
                />
                <button onClick={() => handleUpdateItem(item.id)}>Save</button>
                <button onClick={() => setEditingItemId(null)}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default ItemPage;
