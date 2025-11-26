



// window.addEventListener("load", () => {
//   if (getUser()) {
//     VerificarConta()
//   } else {
//     alert("não deu certo");
//   }
// });




// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div id="navbar-logo-box">
//         <a id="navbar-link" href="index.html">
//           <h1 id="navbar-logo">Anima - INOS</h1>
//         </a>
//       </div>
//       <div id="navbar-sections-box">
//         <ul id="navbar-sections">
//           <li className="navbar-sections-item">
//             <a href="#inicio" class="navbar-sections-link">Início</a>
//           </li>
//           <li className="navbar-sections-item">
//             <a href="#projeto" class="navbar-sections-link">Projeto</a>
//           </li>
//           <li className="navbar-sections-item">
//             <a href="#livreto" class="navbar-sections-link">Livreto</a>
//           </li>
//           <li className="navbar-sections-item">
//             <a href="#sobre" class="navbar-sections-link">Sobre</a>
//           </li>
//           <li className="navbar-sections-item">
//             <a href="#participantes" class="navbar-sections-link">Participantes</a>
//           </li>
//         </ul>
//       </div>
//       <VerificarConta name="lucas_ddw" />
//     </nav>
//   );
// }





function NavbarHighlighter() {
  return (
    <div id="navbar-sections-item-highlighter">
      <div id="navbar-sections-box-highlighter">
        <ul id="navbar-sections">
          <li className="navbar-sections-item"><a href="#inicio" className="navbar-sections-link navbar-sections-link-white">Início</a></li>
          <li className="navbar-sections-item"><a href="#projeto" className="navbar-sections-link navbar-sections-link-white">Projeto</a></li>
          <li className="navbar-sections-item"><a href="#livreto" className="navbar-sections-link navbar-sections-link-white">Livreto</a></li>
          <li className="navbar-sections-item"><a href="#sobre" className="navbar-sections-link navbar-sections-link-white">Sobre</a></li>
          <li className="navbar-sections-item"><a href="#participantes" className="navbar-sections-link navbar-sections-link-white">Participantes</a></li>
        </ul>
      </div>
    </div>
  )
}




// function VerificarConta() {

//   if (typeof usuario !== "undefined" && usuario) {
//     return (
//       <div id="navbar-account-box" className="true-account">

//         <img className="navbar-account-pfp" src="#" alt="foto_de_perfil" />

//         <span id="navbar-account-name">{usuario?.nome}</span>

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



const Navbar = () => {
  const [whiteMode, setWhiteMode] = React.useState(false);
  const [opacityWhite, setOpacityWhite] = React.useState(false);
  const [opacity, setOpacity] = React.useState(false);
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


    const onScroll = () => {

      if (window.scrollY >= 200) {
        setOpacityWhite(false);
        setWhiteMode(true);
        setOpacity(true);
      } else if (setWhiteMode == true && window.scrollY < 300) {
        setOpacityWhite(false);
        setWhiteMode(true);
        setOpacity(true);
      } else if (window.scrollY == 0) {
        setOpacityWhite(true);
        setTimeout(() => {
          setWhiteMode(false);
        }, 500);
        setOpacity(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);//fim do useEffect


  React.useEffect(() => {

    const logoutCard = document.getElementById("card_deslogar");
    const logoutCardExitBtn = document.getElementById("exit_btn");


    logoutCardExitBtn.addEventListener("click", () => {
      logoutCard.style.display = 'none';
    })


    let usuarioSeguro = typeof usuario !== "undefined" ? usuario : null;
    // console.log(usuarioSeguro)
    // console.log(usuarioLogado);
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
      <nav className={`navbar ${whiteMode ? "navbar-shown" : "navbar-hidden"} ${opacityWhite ? "navbar-opacity" : ""}`} id="navbar-white">
        <div id="navbar-logo-box">
          <a id="navbar-link" href="index.html">
            <h1 id="navbar-logo">Anima - INOS</h1>
          </a>
        </div>
        <div id="navbar-sections-box">
          <ul id="navbar-sections">
            <NavbarHighlighter />
            <li className="navbar-sections-item"><a href="#inicio" className="navbar-sections-link">Início</a></li>
            <li className="navbar-sections-item"><a href="#projeto" className="navbar-sections-link">Projeto</a></li>
            <li className="navbar-sections-item"><a href="#livreto" className="navbar-sections-link">Livreto</a></li>
            <li className="navbar-sections-item"><a href="#sobre" className="navbar-sections-link">Sobre</a></li>
            <li className="navbar-sections-item"><a href="#participantes" className="navbar-sections-link">Participantes</a></li>
          </ul>
        </div>
        {conteudoConta}
      </nav>
      <nav className={`navbar ${opacity ? "navbar-opacity" : ""}`}>
        <div id="navbar-logo-box">
          <a id="navbar-link" href="index.html">
            <h1 id="navbar-logo">Anima - INOS</h1>
          </a>
        </div>
        <div id="navbar-sections-box">
          <ul id="navbar-sections">
            <li className="navbar-sections-item"><a href="#inicio" className="navbar-sections-link">Início</a></li>
            <li className="navbar-sections-item"><a href="#projeto" className="navbar-sections-link">Projeto</a></li>
            <li className="navbar-sections-item"><a href="#livreto" className="navbar-sections-link">Livreto</a></li>
            <li className="navbar-sections-item"><a href="#sobre" className="navbar-sections-link">Sobre</a></li>
            <li className="navbar-sections-item"><a href="#participantes" className="navbar-sections-link">Participantes</a></li>
          </ul>
        </div>
        {conteudoConta}
      </nav>
    </div>
  );
} // end do navbar

export default Navbar;

setTimeout(() => {
  const ul = Array.from(document.querySelectorAll(".navbar-sections-item")).slice(5, 10);
  let ulWidthLet = [];
  ul.forEach(item => {
    ulWidthLet.push(item.offsetWidth + 34);
  });
  const ulWidth = ulWidthLet;
  const navbarHighlighter = document.getElementById("navbar-sections-item-highlighter");
  const navbarBoxHighlighter = navbarHighlighter.children[0]
  navbarHighlighter.style.width = ulWidth[0] + "px";
  navbarHighlighter.style.left = "5px";
  navbarBoxHighlighter.style.left = "17px"
  ul.forEach(item => {
    item.addEventListener("click", (event) => {
      console.log(event.target.innerText);
      if ((event.target.innerText).toLowerCase() == "início" || window.scrollY >= 0 && window.scrollY < 460) {
        navbarHighlighter.style.width = ulWidth[0] + "px";
        navbarHighlighter.style.left = "5px";
        navbarBoxHighlighter.style.left = "17px"
      }
      else if ((event.target.innerText).toLowerCase() == "projeto" || window.scrollY >= 460 && window.scrollY < 1000) {
        navbarHighlighter.style.width = ulWidth[1] + "px";
        navbarHighlighter.style.left = "92px";
        navbarBoxHighlighter.style.left = "-70px"
      }
      else if ((event.target.innerText).toLowerCase() == "livreto") {
        navbarHighlighter.style.width = ulWidth[2] + "px";
        navbarHighlighter.style.left = "195px";
        navbarBoxHighlighter.style.left = "-173px"
      }
      else if ((event.target.innerText).toLowerCase() == "sobre") {
        navbarHighlighter.style.width = ulWidth[3] + "px";
        navbarHighlighter.style.left = "294px";
        navbarBoxHighlighter.style.left = "-272px"
      }
      else if ((event.target.innerText).toLowerCase() == "participantes") {
        navbarHighlighter.style.width = ulWidth[4] + "px";
        navbarHighlighter.style.left = "386px";
        navbarBoxHighlighter.style.left = "-364px"
      }
    })
    window.addEventListener("scroll", () => {
      //INICIO
      if (window.scrollY >= 0 && window.scrollY < 460) {
        navbarHighlighter.style.width = ulWidth[0] + "px";
        navbarHighlighter.style.left = "5px";
        navbarBoxHighlighter.style.left = "17px"
      }
      //PROJETO
      else if (window.scrollY >= (460) && window.scrollY < (460 + document.getElementById("projeto").offsetHeight)) {
        navbarHighlighter.style.width = ulWidth[1] + "px";
        navbarHighlighter.style.left = "92px";
        navbarBoxHighlighter.style.left = "-70px"
      }
      //LIVRETO
      else if (window.scrollY >= (460 + document.getElementById("projeto").offsetHeight) && window.scrollY < (460 + document.getElementById("projeto").offsetHeight + document.getElementById("livreto").offsetHeight)) {
        navbarHighlighter.style.width = ulWidth[2] + "px";
        navbarHighlighter.style.left = "195px";
        navbarBoxHighlighter.style.left = "-173px"
      }
      //SOBRE
      else if (window.scrollY >= (460 + document.getElementById("projeto").offsetHeight + document.getElementById("livreto").offsetHeight) && window.scrollY < (458 + document.getElementById("projeto").offsetHeight + document.getElementById("livreto").offsetHeight + document.getElementById("sobre").offsetHeight)) {
        navbarHighlighter.style.width = ulWidth[3] + "px";
        navbarHighlighter.style.left = "294px";
        navbarBoxHighlighter.style.left = "-272px"
      }
      //PARTICIPANTES
      else if (window.scrollY >= (458 + document.getElementById("projeto").offsetHeight + document.getElementById("livreto").offsetHeight + document.getElementById("sobre").offsetHeight)) {
        navbarHighlighter.style.width = ulWidth[4] + "px";
        navbarHighlighter.style.left = "386px";
        navbarBoxHighlighter.style.left = "-364px"
      }
    })
  });
}, 100);

const NavbarRoot = ReactDOM.createRoot(document.getElementById("navbar-root"));
NavbarRoot.render(<Navbar />);



// let usuario;
// let supabase = await getSupabaseClient();
// const { data, error } = await supabase.auth.getUser()

// if (error) {
//   console.error('Erro ao buscar usuário:', error.message);
// }

// if (data?.user) {
//   // console.log('Usuário logado:', data?.user)
//   const { data: dataFetchUser, error: errorFetchUser } = await supabase
//     .from('usuario')
//     .select()
//     .eq('id', data?.user?.id)
//   usuario = dataFetchUser[0];
//   console.log(usuario);
//   alert("oi")
//   NavbarRoot.render(<Navbar />);


// } else {
//   console.log('Nenhum usuário logado.')
// }

// window.addEventListener("load", () => {
//   alert("oi")
//   if (getUser()) {
//     NavbarRoot.render(<Navbar />);
//   } else {
//     alert("não deu certo");
//   }
// });



// const navbarWhite = document.getElementById("navbar-white");


// window.addEventListener("scroll", () => {
//   console.log(whiteMode);
//   if (window.scrollY >= 300) {
//     whiteMode = true;
//     Navbar(whiteMode);
//     //navbarWhite.classList.add("navbar-shown");
//     //navbarWhite.classList.remove("navbar-hidden");
//     console.log(navbarWhite.classList)
//   } else {
//     whiteMode = false;
//     Navbar(whiteMode);
//     //navbarWhite.classList.remove("navbar-hidden");
//     //navbarWhite.classList.add("navbar-shown");
//     console.log(navbarWhite.classList)
//   }
// });