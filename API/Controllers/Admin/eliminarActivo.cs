using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class eliminarActivo : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpDelete("{nombre}")]
        public IActionResult elimiActivo(string placa)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("eliminar_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@placa", placa);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Activo eliminado correctamente.");
                        }
                        else
                        {
                            return NotFound("No se encontró el activo con la placa especificada.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el activo: {ex.Message}");
            }
        }
    }
}