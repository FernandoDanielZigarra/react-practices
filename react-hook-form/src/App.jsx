import { useForm } from "react-hook-form";
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("enviado datos...");
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: { value: true, message: "Nombre es requerido" },
          minLength: { value: 2, message: "Minimo 2 caracteres" },
          maxLength: { value: 20, message: "Maximo 20 caracteres" },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Correo no valido",
          },
        })}
      />

      {errors.correo && <span>{errors.correo.message}</span>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
          minLength: {
            value: 6,
            message: "Minimo 6 caracteres",
          },
        })}
      />

      {errors.password && <span>{errors.password.message}</span>}

      <label htmlFor="confirmPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Confirmar Password es requerido",
          },
          validate: (value) => {
            return value === watch("password") || "Password no coincide";
          },
        })}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register("fechaDeNacimiento", {
          required: {
            value: true,
            message: "Fecha de Nacimiento es requerido",
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edad >= 18 || "Debe ser mayor de edad";
          },
        })}
      />
      {errors.fechaDeNacimiento && (
        <span>{errors.fechaDeNacimiento.message}</span>
      )}

      <label htmlFor="pais">Pais</label>
      <select {...register("pais")}>
        <option value="Argentina">Argentina</option>
        <option value="Brasil">Brasil</option>
        <option value="Colombia">Colombia</option>
      </select>
      {watch("pais") === "Argentina" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia es requerida",
              },
            })}
          />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}

      <label htmlFor="foto">Foto de Perfil</label>
      <input
        type="file"
        onChange={(e) => {
          setValue("fotoDeUsuario", e.target.files[0].name);
        }}
      />

      <label htmlFor="terminos">Aceptar Terminos y Condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar terminos y condiciones",
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}

      <button>Enviar</button>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}

export default App;
