import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// Slices
import { fetchTasks } from './features/taskslice';

// Components
import Navbar from './components/Navbar';
import TaskForm from './components/Taskforms';
import TaskTable from './components/Tasktables';
import Login from './components/login';
import Register from './components/Register';

const App = () => {
  const dispatch = useDispatch();
  
  // 1. Get Auth and Task state from Redux
  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.tasks);
  
  // Local state for handling form data and editing
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  // 2. Fetch tasks whenever the user logs in or refreshes
  useEffect(() => {
    if (token) {
      dispatch(fetchTasks());
    }
  }, [dispatch, token]);

  const handleEditClick = (task) => {
    setEditingId(task._id);
    // Matching your task structure (title/author vs name/description)
    setForm({ 
      name: task.title || '', 
      description: task.author || task.description || '' 
    });
  };

  return (
    <div className="app-container">
      {/* 3. The Navbar will automatically show/hide Logout based on the token */}
      <Navbar />

      <div className="main-content" style={styles.main}>
        <Routes>
          {/* Public Route */}
          <Route 
            path="/login" 
            element={!token ? <Login /> : <Navigate to="/" />} 
          />

          {/* Registration Route */}
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" />}
          />

          {/* Protected Dashboard Route */}
          <Route 
            path="/" 
            element={
              token ? (
                <div style={styles.dashboard}>
                  <header style={styles.header}>
                    <h1 style={styles.title}>Project Dashboard</h1>
                    <span style={styles.badge}>{items.length} Tasks</span>
                  </header>

                  <div style={styles.contentLayout}>
                    <section style={styles.formSection}>
                      <TaskForm 
                        form={form} 
                        setForm={setForm} 
                        editingId={editingId} 
                        setEditingId={setEditingId} 
                      />
                    </section>
                    
                    <section style={styles.tableSection}>
                      <TaskTable onEdit={handleEditClick} />
                    </section>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

// Layout Styles
const styles = {
  main: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  dashboard: { animation: 'fadeIn 0.5s ease-in' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' },
  title: { color: '#2b7fff', fontSize: '28px', margin: 0 },
  badge: { backgroundColor: '#eef4ff', color: '#2b7fff', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' },
  contentLayout: { display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }, // Can change to '1fr 2fr' for desktop side-by-side
};

export default App;
