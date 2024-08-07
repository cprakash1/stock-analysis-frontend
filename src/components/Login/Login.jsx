import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from '../PasswordInput/PasswordInput';
import GlobalContext from '../../context/GlobalState';
import LoginModal from './LoginModal';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { login, sendGmailLogin } = useContext(GlobalContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error(error, 'Login error');
        }
    };

    const googleSignIn = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse, 'tokenResponse');
            sendGmailLogin(tokenResponse.access_token);
        },
        onError: (error) => {
            console.error(error, 'Login error');
        },
    });
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            googleSignIn();
        } catch (error) {
            console.error(error, 'Login error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="mt-6">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700">Password</label>
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <button
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={handleGoogleLogin}
                >
                    Sign in with Google
                </button>
                <button
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => setIsModalOpen(true)}
                >
                    Sign in with E-Mail
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-green-500 hover:text-green-700"
                    >
                        Register
                    </Link>
                </p>
                ;
                <p className="mt-2 text-center text-gray-600">
                    <Link
                        to="/forgot-password"
                        className="text-green-500 hover:text-green-700"
                    >
                        Forgot Password?
                    </Link>
                </p>
            </div>
            <LoginModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default LoginPage;
