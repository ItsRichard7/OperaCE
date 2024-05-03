using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Recursos;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerSoliLab : Controller
    {
        private readonly string connectionString = "Server=ALE_XPS;Database=OperaCE;Integrated Security=True;";

        [HttpGet("solicitudes-laboratorio")]
        public IActionResult obtSoliLab()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_tabla_soli_lab", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<SoliLabModel> soliLabs = new List<SoliLabModel>();

                            while (reader.Read())
                            {
                                SoliLabModel soliLab = new SoliLabModel
                                {
                                    CorreoSoli = reader.GetString(0),
                                    Fecha = reader.GetDateTime(1).Date,
                                    Hora = reader.GetDateTime(2).TimeOfDay,
                                    Carnet = reader.IsDBNull(3) ? null : (decimal?)reader.GetDecimal(3),
                                    PrimerNombre = reader.GetString(4),
                                    SegundoNombre = reader.IsDBNull(5) ? null : reader.GetString(5),
                                    PrimerApellido = reader.GetString(6),
                                    SegundoApellido = reader.IsDBNull(7) ? null : reader.GetString(7),
                                    CantHoras = reader.GetDecimal(8),
                                    LabNombre = reader.GetString(9),
                                    UserCed = reader.GetDecimal(10)
                                };

                                soliLabs.Add(soliLab);
                            }

                            return Ok(soliLabs);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener la tabla de solicitudes de laboratorio: {ex.Message}");
            }
        }
    }
}