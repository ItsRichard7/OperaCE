using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Operador
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcarEntregadoController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult MarcarEntregado([FromBody] EntregaActivo entrega)
        {
            try
            {
                if (entrega == null || string.IsNullOrEmpty(entrega.CorreoSolicitante) || entrega.FechaSolicitud == null || entrega.HoraSolicitud == null)
                {
                    return BadRequest("El correo del solicitante, la fecha y la hora de la solicitud son obligatorios para marcar como entregado.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("marcar_entregado", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@correo_soli", entrega.CorreoSolicitante);
                        command.Parameters.AddWithValue("@fecha_soli", entrega.FechaSolicitud);
                        command.Parameters.AddWithValue("@hora_soli", entrega.HoraSolicitud);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se encontró ninguna solicitud para marcar como entregado con los detalles proporcionados.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al marcar como entregado: {ex.Message}");
            }
        }
    }
}
