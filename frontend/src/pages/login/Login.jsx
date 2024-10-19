import React, { useState, useCallback } from 'react';
import './style.css'; // Certifique-se de que o CSS correspondente esteja atualizado
import api from '../../services/api';
import Modal from 'react-modal'; // Você pode instalar react-modal com `npm install react-modal`
import {useAuth} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#162447', // Mesma cor do card
        borderRadius: '10px',
        padding: '20px',
        width: '400px', // Aumentar a largura do modal
        color: '#ffffff', // Texto em branco
    },
    overlay: {
        backgroundColor: 'transparent', // Remove o fundo acinzentado
    },
};

Modal.setAppElement('#root'); // Define o elemento pai para o modal

function LoginPage() {
    const [login, setLogin] = useState(''); // Estado para o email
    const [senha, setSenha] = useState(''); // Estado para a senha
    const [error, setError] = useState(''); // Estado para mensagem de erro
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
    const [recoveryEmail, setRecoveryEmail] = useState(''); // Estado para o email de recuperação
    const navigate = useNavigate();
    const { signIn } = useAuth();

    /*const handleLoginClick = async () => {
        setError(''); // Limpar mensagens de erro
        setSuccessMessage(''); // Limpar mensagens de sucesso

        try {
            const response = await api.post('/login', {
                login: email,
                senha: password,
            });

            console.log('Login bem-sucedido:', response.data);
            setSuccessMessage('Login bem-sucedido!');
            setTimeout(() => {
                // Redirecionar para a página inicial ou dashboard
                // navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };*/

    const handleLoginClick = useCallback(async() => {
        event.preventDefault();
        if (!login || !senha) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        try {
            await signIn({ login, senha });
            navigate('dashboard');
        } catch (error) {
            setError("Credenciais inválidas. Por favor, verifique seu login e senha.");
            console.log("Erro login")
        }
    }, [login, senha, signIn, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRecoverySubmit = async (e) => {
        e.preventDefault();
        // Chame a API para enviar um email de recuperação de senha
        try {
            const response = await api.post('/recover-password', {
                login: recoveryEmail,
            });

            console.log('E-mail de recuperação enviado:', response.data);
            setRecoveryEmail(''); // Limpar campo após envio
            setIsModalOpen(false); // Fechar modal
            alert('E-mail de recuperação enviado!'); // Mensagem de sucesso
        } catch (error) {
            console.error('Erro ao enviar e-mail de recuperação:', error);
            alert('Erro ao enviar e-mail de recuperação. Tente novamente.'); // Mensagem de erro
        }
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-in">
                <div className="card">
                    <h1>Login</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <div className="password-container02">
                        <input
                            type={showPassword ? 'text' : 'senha'}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </button>
                    </div>
                    <button className="recovery-link" onClick={() => setIsModalOpen(true)}>Esqueceu a senha?</button>
                    <button className="login-button" onClick={handleLoginClick}>Entrar</button>
                </div>
            </div>

            {/* Modal para recuperação de senha */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
            >
                <h2 style={{ color: '#ffffff' }}>Recuperar Senha</h2>
                <form onSubmit={handleRecoverySubmit}>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        required
                        className="recovery-input" // Classe para borda
                    />
                    <div className="modal-buttons">
                        <button type="submit" className="submit-button">Enviar E-mail</button>
                        <button onClick={() => setIsModalOpen(false)} className="close-button">Fechar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default LoginPage;
