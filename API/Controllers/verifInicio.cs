using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InicioSesionController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult VerificarInicio(string correo, string contrasena)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("verificar_inicio", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@correo", correo);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                string contrasenaDB = reader["contrasena"].ToString();
                                bool activo = Convert.ToBoolean(reader["activo"]);

                                if (!activo)
                                {
                                    return Ok("Cuenta no activada");
                                }
                                else if (contrasena == contrasenaDB)
                                {
                                    return Ok(true);
                                }
                                else
                                {
                                    return Ok("Contraseña incorrecta");
                                }
                            }
                            else
                            {
                                return NotFound("Usuario no encontrado.");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al verificar inicio de sesión: {ex.Message}");
            }
        }
    }
}
