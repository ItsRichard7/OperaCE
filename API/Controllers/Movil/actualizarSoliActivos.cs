using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Controllers.Movil
{
    [ApiController]
    [Route("api/[controller]")]
    public class actualizarSoliActivosController : ControllerBase
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpPost]
        public IActionResult ActualizarSoliAct([FromBody] List<SoliAct> soliActs)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("actualizar_soli_act", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        string json = JsonSerializer.Serialize(soliActs);

                        command.Parameters.AddWithValue("@json", json);

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }

                return Ok("Solicitudes de activos actualizadas correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar solicitudes de activos: {ex.Message}");
            }
        }
  
        public class SoliAct
        {
            [JsonPropertyName("correo_soli")]
            public string CorreoSoli { get; set; }

            [JsonPropertyName("fecha_soli")]
            public DateTime FechaSoli { get; set; }

            [JsonPropertyName("hora_soli")]
            public TimeSpan HoraSoli { get; set; }

            [JsonPropertyName("p_nombre")]
            public string PNombre { get; set; }

            [JsonPropertyName("s_nombre")]
            public string SNombre { get; set; }

            [JsonPropertyName("p_apellido")]
            public string PApellido { get; set; }

            [JsonPropertyName("s_apellido")]
            public string SApellido { get; set; }

            [JsonPropertyName("aprobado")]
            public bool Aprobado { get; set; }

            [JsonPropertyName("entregado")]
            public bool Entregado { get; set; }

            [JsonPropertyName("fecha_dev")]
            public DateTime? FechaDev { get; set; }

            [JsonPropertyName("hora_dev")]
            public TimeSpan? HoraDev { get; set; }

            [JsonPropertyName("devuelto")]
            public bool Devuelto { get; set; }

            [JsonPropertyName("averia")]
            public string? Averia { get; set; }

            [JsonPropertyName("act_placa")]
            public string ActPlaca { get; set; }

            [JsonPropertyName("user_ced")]
            public decimal UserCed { get; set; }
        }
    
    }
}