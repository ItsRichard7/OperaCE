using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class eliminarLaboratorio : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpDelete("{nombre}")]
        public IActionResult elimProfe(string nombre)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("eliminar_lab", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@nombre", nombre);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Laboratorio eliminado correctamente.");
                        }
                        else
                        {
                            return NotFound("No se encontró el laboratorio con el nombre especificado.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el laboratorio: {ex.Message}");
            }
        }
    }
}