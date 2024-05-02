using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Operador
{
    [Route("api/[controller]")]
    [ApiController]
    public class insertarHoras : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult insHoras([FromBody] insH horas)
        {
            try
            {
                if (horas == null || horas.fecha == null || horas.horaSalida == null || horas.horasRegistradas <= 0 || horas.userCed <= 0)
                {
                    return BadRequest("La fecha, hora de salida, horas registradas y cédula de usuario son obligatorios.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_reg_horas", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@fecha", horas.fecha);
                        command.Parameters.AddWithValue("@horaEntrada", horas.horaEntrada);
                        command.Parameters.AddWithValue("@horaSalida", horas.horaSalida);
                        command.Parameters.AddWithValue("@horasRegistradas", horas.horasRegistradas);
                        command.Parameters.AddWithValue("@userCed", horas.userCed);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se pudo insertar las horas para la fecha '{horas.fecha}' y la cédula de usuario '{horas.userCed}'.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar las horas: {ex.Message}");
            }
        }
    }
}
