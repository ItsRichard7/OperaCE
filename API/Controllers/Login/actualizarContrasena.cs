using API.Recursos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Login
{
    [Route("api/[controller]")]
    [ApiController]
    public class actualizarContrasena : ControllerBase
    {
        private readonly string connectionString = "Server= DYLAN; Database= OperaCE; Integrated Security=True;"; // Reemplaza con tu cadena de conexión

        [HttpPut]
        public IActionResult ActualizarContrasena([FromBody] Credenciales credenciales)
        {
            try
            {
                if (credenciales == null || string.IsNullOrEmpty(credenciales.Correo) || string.IsNullOrEmpty(credenciales.Contrasena))
                {
                    return BadRequest("El correo y la contraseña son obligatorios.");
                }

                if (credenciales.Contrasena.Length < 8)
                {
                    return BadRequest("La contraseña debe tener al menos 8 caracteres.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_contrasena", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@correo", credenciales.Correo);
                        command.Parameters.AddWithValue("@contrasena", credenciales.Contrasena);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound("No se encontró un usuario con el correo especificado.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar la contraseña: {ex.Message}");
            }
        }
    }
}
