using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Operador
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevolverActivoController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult DevolverActivo([FromBody] DevolucionActivo devolucion)
        {
            try
            {
                if (devolucion == null || string.IsNullOrEmpty(devolucion.ActivoPlaca) || devolucion.FechaDevolucion == null || devolucion.HoraDevolucion == null)
                {
                    return BadRequest("La placa del activo, la fecha de devolución y la hora de devolución son obligatorios para realizar la devolución.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("devolver_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@act_placa", devolucion.ActivoPlaca);
                        command.Parameters.AddWithValue("@fecha_dev", devolucion.FechaDevolucion);
                        command.Parameters.AddWithValue("@hora_dev", devolucion.HoraDevolucion);
                        command.Parameters.AddWithValue("@averia", (object)devolucion.Averia ?? DBNull.Value);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró ningún activo para devolver con los detalles proporcionados.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al devolver el activo: {ex.Message}");
            }
        }
    }
}
