using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class opt_laboratorios : Controller
    {
        private readonly string connectionString = "Server=DYLAN;Database=OperaCE;Integrated Security=True;";

        [HttpGet]

        public IActionResult ObtenerLaboratorios()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("obt_laboratorios", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<Laboratorio> laboratorios = new List<Laboratorio>();

                            while (reader.Read())
                            {
                                Laboratorio laboratorio = new Laboratorio
                                {
                                    Nombre = reader["nombre"].ToString(),
                                    Computadoras = Convert.ToDecimal(reader["computadoras"]),
                                    Capacidad = Convert.ToDecimal(reader["capacidad"])
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