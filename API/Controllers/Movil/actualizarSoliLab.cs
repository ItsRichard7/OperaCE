using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Controllers.Movil
{
    [ApiController]
    [Route("api/[controller]")]
    public class actualizarSoliLabsController : ControllerBase
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult ActualizarSoliLab([FromBody] List<SoliLab> soliLabs)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_soli_lab", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        string json = JsonSerializer.Serialize(soliLabs);

                        command.Parameters.AddWithValue("@json", json);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }

                return Ok("Solicitudes de laboratorios actualizadas correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar solicitudes de laboratorios: {ex.Message}");
            }
        }    
        public class SoliLab
        {
            [JsonPropertyName("correo_soli")]
            public string CorreoSoli { get; set; }

            [JsonPropertyName("fecha")]
            public DateTime Fecha { get; set; }

            [JsonPropertyName("hora")]
            public TimeSpan Hora { get; set; }

            [JsonPropertyName("carnet")]
            public decimal Carnet { get; set; }

            [JsonPropertyName("p_nombre")]
            public string PNombre { get; set; }

            [JsonPropertyName("s_nombre")]
            public string SNombre { get; set; }

            [JsonPropertyName("p_apellido")]
            public string PApellido { get; set; }

            [JsonPropertyName("s_apellido")]
            public string SApellido { get; set; }

            [JsonPropertyName("cant_horas")]
            public decimal CantHoras { get; set; }

            [JsonPropertyName("lab_nombre")]
            public string LabNombre { get; set; }

            [JsonPropertyName("user_ced")]
            public decimal UserCed { get; set; }
        }
    }
}
