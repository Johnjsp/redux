import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser } from './features/userSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (name && email) {
      dispatch(addUser({ name, email }));
      setName('');
      setEmail('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container">
      <h1>Gay Management</h1>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>

      {loading ? (
        <div className="loader">Loading users...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(u.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
