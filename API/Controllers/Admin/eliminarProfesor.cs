using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class eliminarProfesor : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpDelete("{cedula}")]
        public IActionResult elimProfe(decimal cedula)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("borrar_profesor", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@cedula", cedula);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok("Profesor eliminado correctamente.");
                        }
                        else
                        {
                            return NotFound("No se encontró el profesor con la cédula especificada.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el profesor: {ex.Message}");
            }
        }
    }
}