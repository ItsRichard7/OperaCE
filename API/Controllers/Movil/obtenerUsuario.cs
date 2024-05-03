using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerUsuario : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult obtActivo()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_tabla_usuario", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<UsuarioModel> usuarios = new List<UsuarioModel>();

                            while (reader.Read())
                            {
                                UsuarioModel usuario = new UsuarioModel
                                {
                                    Cedula = reader.GetDecimal(0),
                                    Correo = reader.GetString(1),
                                    Contrasena = reader.GetString(2),
                                    Carnet = reader.IsDBNull(3) ? null : (decimal?)reader.GetDecimal(3),
                                    PrimerNombre = reader.GetString(4),
                                    SegundoNombre = reader.IsDBNull(5) ? null : reader.GetString(5),
                                    PrimerApellido = reader.GetString(6),
                                    SegundoApellido = reader.IsDBNull(7) ? null : reader.GetString(7),
                                    FechaNacimiento = reader.GetDateTime(8),
                                    Activo = reader.GetBoolean(9),
                                    RolId = reader.GetDecimal(10)
                                };

                                usuarios.Add(usuario);
                            }

                            return Ok(usuarios);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la tabla de usuarios: {ex.Message}");
            }
        }
    }
}