using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class obtenerLaboratorios : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet]

        public IActionResult obtLaboratorios()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_tabla_laboratorio", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<Labs> laboratorios = new List<Labs>();

                            while (reader.Read())
                            {
                                Labs laboratorio = new Labs
                                {
                                    Nombre = reader["nombre"].ToString(),
                                    Computadoras = Convert.ToDecimal(reader["computadoras"]),
                                    Capacidad = Convert.ToDecimal(reader["capacidad"]),
                                };

                                laboratorios.Add(laboratorio);
                            }

                            return Ok(laboratorios);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener laboratorios: {ex.Message}");
            }
        }
    }
}