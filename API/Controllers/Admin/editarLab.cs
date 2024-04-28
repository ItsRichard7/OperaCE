using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class editarLab : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPut]
        public IActionResult EditarLaboratorio([FromBody] Laboratorio laboratorio)
        {
            try
            {
                if (laboratorio == null || string.IsNullOrEmpty(laboratorio.Nombre))
                {
                    return BadRequest("El nombre del laboratorio es obligatorio.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("editar_laboratorio", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@nombre", laboratorio.Nombre);
                        command.Parameters.AddWithValue("@computadoras", laboratorio.Computadoras);
                        command.Parameters.AddWithValue("@capacidad", laboratorio.Capacidad);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró un laboratorio con el nombre '{laboratorio.Nombre}'.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al editar el laboratorio: {ex.Message}");
            }
        }
    }
}