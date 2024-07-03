import { Routing } from './router/routing';

function App() {
  return (
    <div className="layout" style={{display:'flex', flexDirection: 'column'}}>
      {/* Cargamos toda la configuración de rutas */}
      <Routing/>
    </div>
  );
}

export default App;
