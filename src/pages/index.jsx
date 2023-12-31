import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import Style from '../styles/Start.module.css';
import Cookies from 'js-cookie';


const StartPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  /**
   * Função cria autorização e seta as variáveis de sessão
   * além de verificar se o usuário não está ocupando alguma sala 
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const matricula = event.target.elements.matricula.value;
    const password = event.target.elements.password.value;

    try {
      const response = await fetch('http://127.0.0.1:5000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(matricula), password }),
      });

      const data = await response.json();
      if (data.authorization) {
        Object.keys(Cookies.get()).forEach((cookie) => {
          Cookies.remove(cookie);
        });
        // Definir os novos cookies
        Cookies.set('sessionToken', data.authorization);
        Cookies.set('sessionUserId', data.user.id);
        Cookies.set('sessionUserName', data.user.name);
        Cookies.set('sessionUserType', data.user.isProfessor ? 'professor' : 'user');
        const occupancyResponse = await fetch(`http://127.0.0.1:5000/occupancies/user/${data.user.id}`);
        const occupancyData = await occupancyResponse.json();
        console.log(occupancyData);
        if (occupancyData.data && occupancyData.data.classroom)
          if (occupancyData.data.classroom) {
            Cookies.set("occupancy", occupancyData.data.classroom);
          }

        router.push('/Home');
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocorreu um erro ao processar a solicitação.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className={Style.Login}>
      <img className={Style.Logo} src="assets/portuno-logo.svg" width="300px" alt="Portuno Logo" />

      <form className={Style.Form} onSubmit={handleSubmit}>
        <label className={Style.Label} htmlFor="matricula">
          Matrícula ou Siape:
        </label>
        <input className={Style.Input} type="number" id="matricula" name="matricula" placeholder="Digite sua Matrícula ou Siape" required />
        <br /><br />

        <label className={Style.Label} htmlFor="password">
          Senha:
        </label>
        <input className={Style.Input} type="password" id="password" name="password" placeholder="Digite sua Senha" required />
        <br /><br />

        <input className={Style.Button} type="submit" value="Entrar" />
      </form>

      {errorMessage && (
        <div className={Style.ErrorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}

      <p>
        Ainda não tem conta? <Link className={Style.Link} href="/createAccount">Saiba como criar a sua!</Link>
      </p>
    </div>
  );
};

export default StartPage;