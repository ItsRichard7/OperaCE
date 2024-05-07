using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Operador
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsertarSolicitudActivoController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult InsertarSolicitudActivo([FromBody] SolicitudActivo solicitud)
        {
            try
            {
                if (solicitud == null || string.IsNullOrEmpty(solicitud.CorreoSolicitante) || solicitud.FechaSolicitud == null || solicitud.HoraSolicitud == null || string.IsNullOrEmpty(solicitud.PrimerNombre) || string.IsNullOrEmpty(solicitud.PrimerApellido) || solicitud.Aprobado == null || string.IsNullOrEmpty(solicitud.ActivoPlaca) || solicitud.UsuarioCedula <= 0)
                {
                    return BadRequest("Todos los campos son obligatorios para insertar la solicitud de activo.");
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("insertar_soli_activo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@correo_soli", solicitud.CorreoSolicitante);
                        command.Parameters.AddWithValue("@fecha_soli", solicitud.FechaSolicitud);
                        command.Parameters.AddWithValue("@hora_soli", solicitud.HoraSolicitud);
                        command.Parameters.AddWithValue("@p_nombre", solicitud.PrimerNombre);
                        command.Parameters.AddWithValue("@s_nombre", (object)solicitud.SegundoNombre ?? DBNull.Value);
                        command.Parameters.AddWithValue("@p_apellido", solicitud.PrimerApellido);
                        command.Parameters.AddWithValue("@s_apellido", (object)solicitud.SegundoApellido ?? DBNull.Value);
                        command.Parameters.AddWithValue("@aprobado", solicitud.Aprobado);
                        command.Parameters.AddWithValue("@act_placa", solicitud.ActivoPlaca);
                        command.Parameters.AddWithValue("@user_ced", solicitud.UsuarioCedula);

                        connection.Open();

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return Ok(true);
                        }
                        else
                        {
                            return NotFound($"No se pudo insertar la solicitud de activo.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar la solicitud de activo: {ex.Message}");
            }
        }
    }
}
