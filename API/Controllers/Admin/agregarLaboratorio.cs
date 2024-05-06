using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class agregarLaboratorio : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult insertarLaboratorio([FromBody] Lab laboratorio)
        {
            try
            {
                if (laboratorio == null || string.IsNullOrEmpty(laboratorio.lab_nombre))
                {
                    return BadRequest("El lab_nombre del laboratorio y la descripción de la facilidad son obligatorios.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_lab", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@nombre", laboratorio.lab_nombre);
                        command.Parameters.AddWithValue("@computadoras", laboratorio.computadoras);
                        command.Parameters.AddWithValue("@capacidad", laboratorio.capacidad);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró un laboratorio con el lab_nombre '{laboratorio.lab_nombre}'.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar el laboratorio: {ex.Message}");
            }
        }
        public class Lab
        {
            public string lab_nombre { get; set; }
            public decimal computadoras { get; set; }
            public decimal capacidad { get; set; }
        }
    }
}