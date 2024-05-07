using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class agregarActivo : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult insertarActivo([FromBody] Activo activo)
        {
            try
            {
                if (activo == null || string.IsNullOrEmpty(activo.placa) || string.IsNullOrEmpty(activo.tipo) || string.IsNullOrEmpty(activo.marca))
                {
                    return BadRequest("La placa, activo y marca son obligatorias.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@placa", activo.placa);
                        command.Parameters.AddWithValue("@tipo", activo.tipo);
                        command.Parameters.AddWithValue("@marca", activo.marca);
                        command.Parameters.AddWithValue("@f_compra", activo.f_compra);
                        command.Parameters.AddWithValue("@aprob_ced", (object)activo.aprob_ced ?? DBNull.Value);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró un activo con el nombre '{activo.placa}'.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar el laboratorio: {ex.Message}");
            }
        }
        public class Activo
        {
            public string placa { get; set; }
            public string tipo { get; set; }
            public string marca { get; set; }
            public DateTime f_compra { get; set; }
            public decimal? aprob_ced { get; set; }
        }
    }
}