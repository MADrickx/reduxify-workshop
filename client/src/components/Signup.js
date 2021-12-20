import React, {useState, useRef} from "react";
import {useAuth} from "../contexts/AuthContext";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("passwords do not match");
        }
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            setError("failed to signing in");
        }
        setLoading(false);
    }

    return (
        <>
            <div className="card">
                <div className="cardBody">
                    <h2>Sign Up</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="emailGroup" id="email">
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                required
                            />
                        </div>
                        <div className="passwordGroup" id="password">
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                name="password"
                                ref={passwordRef}
                                required
                            />
                        </div>
                        <div
                            className="passwordConfirmGroup"
                            id="passwordConfirm">
                            <label htmlFor="passwordConfirm">
                                passwordConfirm
                            </label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                ref={passwordConfirmRef}
                                required
                            />
                        </div>
                        <button disabled={loading} type="submit">
                            send
                        </button>
                    </form>
                </div>
            </div>
            <div className="accountOwner">already have an account ? log in</div>
        </>
    );
}
