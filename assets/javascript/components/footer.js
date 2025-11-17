function Footer() {
    return (
        <footer id="footer">

            <div id="footer-content">
                <h1 id="footer-logo">Anima - INOS</h1>
                <span className="footer-contact">inosanima@gmail.com</span>
                <span className="footer-contact">@animainos.if</span>
            </div>

            <div id="footer-rights">
                <span id="footer-rights-text">©2024 Anima-INOS - Conhecimento Técnico em Livretos. Todos os Direitos Reservados.  </span>
            </div>
        </footer>
    );
}

const footerRoot = ReactDOM.createRoot(document.getElementById("footer-root"));
footerRoot.render(<Footer />);