'use client';

// Spaghetti code form component with terrible practices
import { useState } from 'react';

export default function SpaghettiForm() {
    // Way too many state variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [cityError, setCityError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Massive validation function with copy-pasted logic
    const validateForm = () => {
        let valid = true;

        // No abstraction, repeated patterns
        if (name === '') {
            setNameError('Name is required');
            valid = false;
        } else if (name.length < 2) {
            setNameError('Name must be at least 2 characters');
            valid = false;
        } else if (name.length > 50) {
            setNameError('Name must be less than 50 characters');
            valid = false;
        } else {
            setNameError('');
        }

        if (email === '') {
            setEmailError('Email is required');
            valid = false;
        } else if (!email.includes('@')) {
            setEmailError('Email must contain @');
            valid = false;
        } else if (!email.includes('.')) {
            setEmailError('Email must contain .');
            valid = false;
        } else {
            setEmailError('');
        }

        if (password === '') {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            valid = false;
        } else if (password.length > 100) {
            setPasswordError('Password must be less than 100 characters');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (confirmPassword === '') {
            setConfirmPasswordError('Confirm password is required');
            valid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (age === '') {
            setAgeError('Age is required');
            valid = false;
        } else if (parseInt(age) < 18) {
            setAgeError('You must be at least 18 years old');
            valid = false;
        } else if (parseInt(age) > 120) {
            setAgeError('Invalid age');
            valid = false;
        } else {
            setAgeError('');
        }

        // More copy-pasted validation...
        if (country === '') {
            setCountryError('Country is required');
            valid = false;
        } else {
            setCountryError('');
        }

        if (city === '') {
            setCityError('City is required');
            valid = false;
        } else {
            setCityError('');
        }

        if (address === '') {
            setAddressError('Address is required');
            valid = false;
        } else {
            setAddressError('');
        }

        if (phone === '') {
            setPhoneError('Phone is required');
            valid = false;
        } else {
            setPhoneError('');
        }

        return valid;
    };

    // Massive submit handler with no separation of concerns
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setError('');
        setSuccess(false);

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            // Hardcoded API endpoint
            const response = await fetch('https://api.example.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    age: age,
                    country: country,
                    city: city,
                    address: address,
                    phone: phone,
                }),
            });

            if (response.ok) {
                setSuccess(true);
                // Resetting form the hard way
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAge('');
                setCountry('');
                setCity('');
                setAddress('');
                setPhone('');
            } else {
                setError('Submission failed');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setSubmitting(false);
        }
    };

    // Massive JSX with inline styles and repeated patterns
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Registration Form</h1>

            {success && <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '20px' }}>Registration successful!</div>}
            {error && <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '20px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {nameError && <span style={{ color: 'red', fontSize: '12px' }}>{nameError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {emailError && <span style={{ color: 'red', fontSize: '12px' }}>{emailError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {passwordError && <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {confirmPasswordError && <span style={{ color: 'red', fontSize: '12px' }}>{confirmPasswordError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {ageError && <span style={{ color: 'red', fontSize: '12px' }}>{ageError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {countryError && <span style={{ color: 'red', fontSize: '12px' }}>{countryError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {cityError && <span style={{ color: 'red', fontSize: '12px' }}>{cityError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {addressError && <span style={{ color: 'red', fontSize: '12px' }}>{addressError}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {phoneError && <span style={{ color: 'red', fontSize: '12px' }}>{phoneError}</span>}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: submitting ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
