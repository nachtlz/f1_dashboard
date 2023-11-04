import logo from '../f1_logo.svg'


const NavBar = () => {

    return (
        <header>
            <nav class="navbar navbar-expand-lg" style={{background: '#D90404'}}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img src={logo} style={{width: '170px', marginLeft: '100px'}}></img></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link text-white" style={{fontWeight: 700}} href="/drivers">Drivers</a>
                        <a class="nav-link text-white" style={{fontWeight: 700}} href="/races">Races</a>
                        <a class="nav-link text-white" style={{fontWeight: 700}} href="https://github.com/pedrojrv/Formula1ML/tree/master/data/f1db_csv">Data Source</a>
                    </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;