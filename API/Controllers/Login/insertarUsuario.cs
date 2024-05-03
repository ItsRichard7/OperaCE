using API.Recursos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Login
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult InsertarUsuario([FromBody] UsuarioModel usuario)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_usuario", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@cedula", usuario.Cedula);
                        command.Parameters.AddWithValue("@correo", usuario.Correo);
                        command.Parameters.AddWithValue("@contrasena", usuario.Contrasena);
                        command.Parameters.AddWithValue("@carnet", (object)usuario.Carnet ?? DBNull.Value);
                        command.Parameters.AddWithValue("@p_nombre", usuario.PrimerNombre);
                        command.Parameters.AddWithValue("@s_nombre", (object)usuario.SegundoNombre ?? DBNull.Value); // Manejar explícitamente el valor nulo
                        command.Parameters.AddWithValue("@p_apellido", usuario.PrimerApellido);
                        command.Parameters.AddWithValue("@s_apellido", (object)usuario.SegundoApellido ?? DBNull.Value); // Manejar explícitamente el valor nulo
                        command.Parameters.AddWithValue("@f_nacim", usuario.FechaNacimiento);
                        command.Parameters.AddWithValue("@activo", usuario.Activo); // Pasar el valor de la propiedad
                        command.Parameters.AddWithValue("@rol_id", usuario.RolId);


                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar usuario: {ex.Message}");
            }
        }
    }
}
