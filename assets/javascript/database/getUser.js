async function getUser() {

  let usuario;
  let supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Erro ao buscar usuário:', error.message);
    return false;
  }

  if (data?.user) {
    // console.log('Usuário logado:', data?.user)
    const { data: dataFetchUser, error: errorFetchUser } = await supabase
      .from('usuario')
      .select()
      .eq('id', data?.user?.id)
    usuario = dataFetchUser[0];
    window.usuario = usuario;
    // console.log(usuario);

    return errorFetchUser == null && usuario !== undefined;

  } else {
    console.log('Nenhum usuário logado.')
    return false
  }
}

async function applyUser() {

  let usuario;
  let supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Erro ao buscar usuário:', error.message);
    return false;
  }

  if (data?.user) {
    // console.log('Usuário logado:', data?.user)
    const { data: dataFetchUser, error: errorFetchUser } = await supabase
      .from('usuario')
      .select()
      .eq('id', data?.user?.id)
    usuario = dataFetchUser[0];

    return usuario;

  } else {
    console.log('Nenhum usuário logado.')
    return false
  }
}

// getUser();

exports = {
  getUser,
};

// function appendComponent() {
//   let script = document.createElement("script");
//   script.src = "assets/javascript/components/navbar.js";
//   script.type = "text/babel";
//   document.body.appendChild(script);
// }

// window.addEventListener("load", () => {
//   if (getUser()) {
//     appendComponent();
//   } else {
//     alert("não deu certo");
//   }
// });


