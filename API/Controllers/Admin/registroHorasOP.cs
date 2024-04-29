using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API.Models;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class registroHorasOP : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet("registros-hora/{carnet}")]
        public IActionResult ObtenerRegistrosHora(decimal carnet)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_reg_horas_op", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@carnet", carnet);

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<RegistroHora> registrosHora = new List<RegistroHora>();

                            while (reader.Read())
                            {
                                RegistroHora registroHora = new RegistroHora
                                {
                                    Fecha = reader.GetDateTime(0),
                                    HoraEntr = reader.GetTimeSpan(1),
                                    HoraSal = reader.GetTimeSpan(2),
                                    HorasReg = reader.GetDecimal(3)
                                };

                                registrosHora.Add(registroHora);
                            }

                            return Ok(registrosHora);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener los registros de horas: {ex.Message}");
            }
        }
    }
}