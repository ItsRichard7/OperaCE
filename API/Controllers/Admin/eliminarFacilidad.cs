using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class elimFacilidad : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpDelete("{labNombre}")]
        public IActionResult EliminarFacilidades(string labNombre)
        {
            try
            {
                if (string.IsNullOrEmpty(labNombre))
                {
                    return BadRequest("El nombre del laboratorio es obligatorio.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("eliminar_facilidades", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@lab_nombre", labNombre);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró un laboratorio con el nombre '{labNombre}'.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar las facilidades del laboratorio: {ex.Message}");
            }
        }
    }
}