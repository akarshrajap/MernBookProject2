import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../features/taskslice';

const TaskForm = ({ form, setForm, editingId, setEditingId }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (editingId) {
      // Connecting to Express PUT route
      dispatch(updateTask({ id: editingId, updatedData: { title: form.name, author: form.description } }));
      setEditingId(null);
    } else {
      // Connecting to Express POST route
      dispatch(addTask({ title: form.name, author: form.description }));
    }
    setForm({ name: '', description: '' });
  };

  return (
    <div style={styles.form}>
      <label>Book Name</label>
      <input 
        style={styles.input} 
        value={form.name} 
        onChange={(e) => setForm({...form, name: e.target.value})} 
        placeholder="Book Name" 
      />
      <label>Book Description</label>
      <input 
        style={styles.input} 
        value={form.description} 
        onChange={(e) => setForm({...form, description: e.target.value})} 
        placeholder="Book Description" 
      />
      <button style={styles.addButton} onClick={handleSubmit}>
        {editingId ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

const styles = {
  form: { textAlign: 'left', marginBottom: '40px' },
  input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' },
  addButton: { float: 'right', padding: '10px 25px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default TaskForm;