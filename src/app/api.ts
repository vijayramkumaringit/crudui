  export const getAuthToken = () => {
    return localStorage.getItem('token')
  }
  
  export const fetchItems = async (token: string) => {
    const res = await fetch('http://localhost:5000/items', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('Failed to fetch items')
    }
  }
  
  export const addItem = async (token: string, name: string) => {
    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
    if (!res.ok) {
      throw new Error('Failed to add item')
    }
  }
  
  export const deleteItem = async (token: string, id: string) => {
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error('Failed to delete item')
    }
  }
  
  export const updateItem = async (token: string, id: string, name: string) => {
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
    if (!res.ok) {
      throw new Error('Failed to update item')
    }
  }
  