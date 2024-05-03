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
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

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
                                    Aprobado = reader.GetBoolean(1),
                                    FechaEnt = reader.GetDateTime(2),
                                    HoraEnt = reader.GetTimeSpan(3),
                                    PNombre = reader.GetString(4),
                                    SNombre = reader.IsDBNull(5) ? null : reader.GetString(5),
                                    PApellido = reader.GetString(6),
                                    SApellido = reader.IsDBNull(7) ? null : reader.GetString(7),
                                    FechaDev = reader.IsDBNull(8) ? null : (DateTime?)reader.GetDateTime(8),
                                    HoraDev = reader.IsDBNull(9) ? null : (TimeSpan?)reader.GetTimeSpan(9),
                                    Devuelto = reader.GetBoolean(10),
                                    Averia = reader.GetString(11),
                                    ActPlaca = reader.GetString(12),
                                    UserCed = reader.GetDecimal(13)
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