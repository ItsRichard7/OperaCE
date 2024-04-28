using API.Recursos;
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

        [HttpPost]
        public IActionResult VerificarInicio([FromBody] Credenciales credenciales)
        {
            string correo = credenciales.Correo;
            string contrasena = credenciales.Contrasena;

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
                                    return BadRequest("Cuenta no activada");
                                }
                                else if (contrasena == contrasenaDB)
                                {
                                    return Ok(true);
                                }
                                else
                                {
                                    return BadRequest("Contraseña incorrecta");
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
