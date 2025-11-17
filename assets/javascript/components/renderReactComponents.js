import VerificarConta from "./navbar.js";

VerificarConta(usuarioLocal);

const RenderReactComponentsRoot = ReactDOM.createRoot(document.getElementById("render_react_components"));
RenderReactComponentsRoot.render(<VerificarConta/>);