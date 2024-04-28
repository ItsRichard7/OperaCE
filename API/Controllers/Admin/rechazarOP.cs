using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RechazarOperadorController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpDelete("{cedula}")]
        public IActionResult RechazarOperador(string cedula)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("rechazar_operador", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@cedula", cedula);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound("Operador no encontrado.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al rechazar operador: {ex.Message}");
            }
        }
    }
}