using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class agregarFacilidad : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult InsertarFacilidad([FromBody] Facilidad facilidad)
        {
            try
            {
                if (facilidad == null || string.IsNullOrEmpty(facilidad.Lab_nombre) || string.IsNullOrEmpty(facilidad.Descripcion))
                {
                    return BadRequest("El nombre del laboratorio y la descripción de la facilidad son obligatorios.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_facilidad", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@lab_nombre", facilidad.Lab_nombre);
                        command.Parameters.AddWithValue("@descripcion", facilidad.Descripcion);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró un laboratorio con el nombre '{facilidad.Lab_nombre}'.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar la facilidad: {ex.Message}");
            }
        }
    }
}