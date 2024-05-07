using Microsoft.AspNetCore.Mvc;
using System.Data;
using API.Recursos;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoliActController : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet]
        public IActionResult GetSoliAct()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_tabla_soli_act", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<SoliAct> soliActs = new List<SoliAct>();

                            while (reader.Read())
                            {
                                SoliAct soliAct = new SoliAct
                                {
                                    CorreoSoli = reader.GetString(0),
                                    FechaSoli = reader.GetDateTime(1),
                                    HoraSoli = reader.GetTimeSpan(2),
                                    PNombre = reader.GetString(3),
                                    SNombre = reader.IsDBNull(4) ? null : reader.GetString(4),
                                    PApellido = reader.GetString(5),
                                    SApellido = reader.IsDBNull(6) ? null : reader.GetString(6),
                                    Aprobado = reader.GetBoolean(7),
                                    Entregado = reader.GetBoolean(8),
                                    FechaDev = reader.IsDBNull(9) ? null : (DateTime?)reader.GetDateTime(9),
                                    HoraDev = reader.IsDBNull(10) ? null : (TimeSpan?)reader.GetTimeSpan(10),
                                    Devuelto = reader.GetBoolean(11),
                                    Averia = reader.IsDBNull(12) ? null : reader.GetString(12),
                                    ActPlaca = reader.GetString(13),
                                    UserCed = reader.GetDecimal(14)
                                };

                                soliActs.Add(soliAct);
                            }

                            return Ok(soliActs);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la tabla de solicitudes de activos: {ex.Message}");
            }
        }
    }
}