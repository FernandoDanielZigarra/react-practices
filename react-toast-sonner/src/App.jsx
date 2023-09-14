import {Toaster,toast} from 'sonner'

async function uploadSomethig(){
  const res = await fetch('https://reqres.in/api/users/2')
  return await res.json()
}

function App() {
  return(
   <div>
    <h1>Hello world</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium doloremque tempora ad animi voluptatibus dolorum eos, accusamus est modi et.</p>
    <button onClick={() => {
      toast.promise(uploadSomethig(),{
        loading:"Subiendo archivo",
        success: (data)=>{
          return `Bienvenido ${data.data.first_name} ${data.data.last_name}`
        },
        error: 'Error'
      })

    }}>Aceptar</button>
    <Toaster/>
   </div>
)
}

export default App;

