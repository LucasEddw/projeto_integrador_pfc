// let usuarioLocal = false;

// if (localStorage.getItem("usuarioLocal")) {
//   usuarioLocal = JSON.parse(localStorage.getItem("usuarioLocal"));
// }

// function VerificarConta({ usuarioLocal }) {
//   if (usuarioLocal != false) {
//     return (
//       <div id="navbar-account-box" className="true-account">

//         <img className="navbar-account-pfp" src="#" alt="foto_de_perfil" />

//         <span id="navbar-account-name">{usuarioLocal?.nome}</span>

//       </div>
//     )
//   } else {
//     return (
//       <div id="navbar-account-box" className="false-account">

//         <span className="navbar-account-btn" id="navbar-entrar-btn"><a href="entrar.html">Entrar</a></span>
//         <hr />
//         <span className="navbar-account-btn" id="navbar-cadastrar-btn"><a href="cadastrar.html">Cadastrar</a></span>

//       </div>
//     )
//   }
// }

// VerificarConta(usuarioLocal);

const UserCard = () => {
  const [usuarioLogado, setUsuarioLogado] = React.useState(false);
  const [conteudoConta, setConteudoConta] = React.useState(
    <div id="navbar-account-box" className="false-account">
      <span className="navbar-account-btn" id="navbar-entrar-btn">
        <a href="entrar.html">Entrar</a>
      </span>
      <hr />
      <span className="navbar-account-btn" id="navbar-cadastrar-btn">
        <a href="cadastrar.html">Cadastrar</a>
      </span>
    </div>
  );

  React.useEffect(() => {

    async function getUserNavbar() {
      if (await getUser()) {
        setUsuarioLogado(true);

        // Em um contexto real, 'setNomeUsuario' seria alimentado pelos dados do servidor.
        console.log('Usuário logado com sucesso.');
      } else {
        console.log('Falha no login.');
      }
    }

    getUserNavbar();

  }, []);//fim do useEffect

  React.useEffect(() => {

    const logoutCard = document.getElementById("card_deslogar");
    const logoutCardExitBtn = document.getElementById("exit_btn");


    logoutCardExitBtn.addEventListener("click", () => {
      logoutCard.style.display = 'none';
    })

    let usuarioSeguro = typeof usuario !== "undefined" ? usuario : null;

    if (usuarioLogado) {
      setConteudoConta(
        <div id="navbar-account-box" className="true-account" onClick={() => logoutCard.style.display = 'block'
        }>
          <img className="navbar-account-pfp" src="./assets/img/pfp.jpg" alt="foto_de_perfil" />
          <span id="navbar-account-name">{usuarioSeguro?.nome}</span>
        </div>


      );
    } else {
      setConteudoConta(
        <div id="navbar-account-box" className="false-account">
          <span className="navbar-account-btn" id="navbar-entrar-btn">
            <a href="entrar.html">Entrar</a>
          </span>
          <hr />
          <span className="navbar-account-btn" id="navbar-cadastrar-btn">
            <a href="cadastrar.html">Cadastrar</a>
          </span>
        </div>
      );
    }
  }, [usuarioLogado])//fim do useEffect

  return (
    <div>
            <div className="card-deslogar" id="card_deslogar">

        <div className="card-deslogar-exit-btn" id="exit_btn"><i class="fa-solid fa-xmark"></i></div>
        <input
          type="button"
          value="Sair da Conta"
          onClick={async function logout() {
            let supabase = await getSupabaseClient();

            const { error } = await supabase.auth.signOut();
            if (error) {
              alert('Erro ao deslogar:', error.message);
            } else {
              alert('Usuário deslogado com sucesso!');
            }

            location.reload();

          }}
        />

      </div>
      {conteudoConta}
    </div>
  )
}

const AccountRoot = ReactDOM.createRoot(document.getElementById("account_root"));
AccountRoot.render(<UserCard />);