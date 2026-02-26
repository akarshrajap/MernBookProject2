import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/taskslice';

const TaskTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.tasks);

  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.tableHeader}>
          <th>#</th><th>Book</th><th>Description</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item._id} style={styles.tableRow}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>
              <button style={styles.editBtn} onClick={() => onEdit(item)}>Edit</button>
              <button style={styles.deleteBtn} onClick={() => dispatch(deleteTask(item._id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '60px' },
  tableHeader: { backgroundColor: '#f8f9fa', color: '#333', textAlign: 'left', padding: '10px' },
  tableRow: { borderBottom: '1px solid #eee' },
  editBtn: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', marginRight: '5px', borderRadius: '3px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }
};

export default TaskTable;