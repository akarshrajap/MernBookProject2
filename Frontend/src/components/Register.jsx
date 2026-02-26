import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector((state) => state.auth);

    // if registration is successful, send user to login page
    useEffect(() => {
        if (status === 'succeeded') {
            // optionally you could flash a message here
            navigate('/login');
        }
    }, [status, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // basic client-side validation
        if (!name.trim()) {
            alert('Please enter your full name');
            return;
        }

        if (password !== confirmPassword) {
            // simple client side check, you could update local error state instead
            alert('Passwords do not match');
            return;
        }
        dispatch(registerUser({ name, email, password }));
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Create an Account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={styles.button}
                >
                    {status === 'loading' ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' },
    form: { padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
    input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Register;
