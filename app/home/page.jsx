import React from 'react';
import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode"; 

export default function HomePage() {
    const cookieStore = cookies()

    const refreshToken = cookieStore.get('refreshToken');
    const decoded = jwtDecode(refreshToken.value);
    console.log("refreshToken:", refreshToken.value);
    console.log("decoded:", decoded);

    return (
        <div>
            <h1>Home Page</h1>
            
            <ul>
                <li>Login: {decoded.login}</li>
                <li>Full Name: {decoded.full_name}</li>
                <li>Email: {decoded.email}</li>
                <li>Is Email Verified: {decoded.is_email_verified.toString()}</li>
                <li>Profile Picture Path: {decoded.profile_picture_path}</li>
                <li>Rating: {decoded.rating}</li>
                <li>Role: {decoded.role}</li>
                <li>ID: {decoded.id}</li>
                <li>Issued At (iat): {decoded.iat}</li>
                <li>Expiration (exp): {decoded.exp}</li>
            </ul>

        </div>
    )
}