using API.Recursos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Login
{
    [Route("api/[controller]")]
    [ApiController]
    public class existeCorreo : ControllerBase
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet("{correo}")]
        public IActionResult VerificarCorreo(string correo)
        {
            try
            {
                if (string.IsNullOrEmpty(correo))
                {
                    return BadRequest("El correo electrónico es obligatorio.");
                }

                bool correoExiste = false;

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("existe_correo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@correo", correo);
                        command.Parameters.Add("@correoExiste", SqlDbType.Bit).Direction = ParameterDirection.Output;

                        connection.Open();

                        command.ExecuteNonQuery();

                        correoExiste = Convert.ToBoolean(command.Parameters["@correoExiste"].Value);
                    }
                }

                if (correoExiste)
                {
                    return Ok(true);
                }
                else
                {
                    return NotFound("El correo electrónico no existe.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al verificar el correo electrónico: {ex.Message}");
            }
        }
    }
}
